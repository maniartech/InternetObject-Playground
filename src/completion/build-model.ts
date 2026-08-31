/**
 * Flattens io-js2's `IODefinitions` into the plain `CompletionModel` the editor uses.
 *
 * **This module runs in the parser worker, never on the UI thread.** Resolving a schema
 * graph means walking every member of every definition, and that cost must not land on
 * the thread that has to repaint while someone is typing.
 *
 * Two facts about how io-js2 stores a compiled schema drive the whole implementation,
 * both verified against the real build rather than assumed:
 *
 * 1. **References are stored UNRESOLVED.** `addr: $address` compiles to a member with
 *    `type: 'object'` whose `schema` is a `TokenNode` whose `.value` is the *string*
 *    `'$address'`. Resolution happens later, at parse time. So this module must do the
 *    lookup itself — and `schemaRef` (a plain string) is a second spelling of the same
 *    thing on other paths, so both are checked.
 * 2. **Inline schemas are real `IOSchema` instances, but their `.name` is the MEMBER's
 *    name** — `{a: int}` under member `nested` is named `nested`. Names are therefore
 *    not unique and cannot be used as map keys; inline schemas get a path-derived
 *    synthetic key instead.
 *
 * Cycles: `~ $node: {children?: [$node]}` is legitimate (`sample-data/recursive-schema.ts`).
 * Because the output references schemas by KEY rather than by nesting, and because every
 * schema instance is emitted at most once (tracked by identity), recursion terminates.
 */

import type { CompletionModel, MemberInfo, SchemaInfo, VariableInfo } from './types';
import { EMPTY_COMPLETION_MODEL } from './types';

/* eslint-disable @typescript-eslint/no-explicit-any */

/** Structural test for an `IOSchema` — avoids importing the class for an `instanceof`. */
function isSchema(v: any): boolean {
  return !!v && Array.isArray(v.names) && typeof v.defs === 'object' && v.defs !== null;
}

/**
 * Renders a schema value (a choice, a default) as display text.
 *
 * Values arrive as real runtime types — `Date`, `Decimal`, `BigInt` — so `String(v)` is
 * not always right and `JSON.stringify` throws on a BigInt.
 */
function renderValue(v: any): string {
  if (v === null) return 'N';
  if (v === true) return 'T';
  if (v === false) return 'F';
  if (typeof v === 'bigint') return `${v}n`;
  if (v instanceof Date) return v.toISOString();
  if (typeof v === 'object') {
    // Decimal and friends stringify usefully; anything else falls back to its type name.
    try {
      const s = String(v);
      return s === '[object Object]' ? '{…}' : s;
    } catch {
      return '{…}';
    }
  }
  return String(v);
}

/** Longest variable preview kept; past this the dropdown stops being scannable. */
const MAX_VARIABLE_PREVIEW = 60;

/**
 * Renders a variable's value for the suggestion list.
 *
 * `defs.get('@name')` hands back a plain primitive for a scalar variable, and an
 * `IOObject` or `Array` for a structured one — the `IOObject` carrying a `toJSON()` that
 * yields either positional keys (`{"0": ..}` for `{a, b, c}`) or real member names. Both
 * spellings are rendered back into the syntax the author wrote, so the preview matches
 * what is in their schema pane.
 */
function renderVariableValue(v: any, depth = 0): string {
  if (v === null || v === undefined) return 'N';
  if (typeof v !== 'object') return renderValue(v);
  if (v instanceof Date) return renderValue(v);
  if (depth > 1) return Array.isArray(v) ? '[…]' : '{…}';

  const plain = Array.isArray(v) ? v : typeof v.toJSON === 'function' ? v.toJSON() : v;

  if (Array.isArray(plain)) {
    return `[${plain.map((x) => renderVariableValue(x, depth + 1)).join(', ')}]`;
  }
  if (!plain || typeof plain !== 'object') return renderValue(plain);

  const entries = Object.entries(plain);
  // `{a, b, c}` round-trips through toJSON as {"0":..,"1":..} — render it positionally
  // again rather than inventing key names the author never wrote.
  const positional = entries.length > 0 && entries.every(([k], i) => k === String(i));
  const body = entries.map(([k, val]) =>
    positional ? renderVariableValue(val, depth + 1) : `${k}: ${renderVariableValue(val, depth + 1)}`
  );
  return `{${body.join(', ')}}`;
}

/** A variable's display preview, or undefined when nothing useful can be shown. */
function variableInfo(name: string, raw: any): VariableInfo {
  let valueText: string | undefined;
  try {
    const text = renderVariableValue(raw);
    // `{…}` / `[…]` mean "too deep to show" — a preview that conveys nothing is worse
    // than none, since it takes up the row where the value would have been.
    if (text && text !== '{…}' && text !== '[…]') {
      valueText =
        text.length > MAX_VARIABLE_PREVIEW ? `${text.slice(0, MAX_VARIABLE_PREVIEW - 1)}…` : text;
    }
  } catch {
    // A preview is a convenience; never let one stop the model being built.
  }
  return valueText === undefined ? { name } : { name, valueText };
}

/**
 * The text before the document's first `---` separator: its definitions header.
 *
 * Returns null when the document has no separator at all — then it is pure data and
 * carries no definitions of its own.
 *
 * A `---` occurring inside a multi-line string would be mistaken for a separator here.
 * That is accepted deliberately: the cost is *less accurate completion*, never a wrong
 * parse, because this text is only ever fed to a throwaway `parseDefinitions` whose
 * failure is caught. The document's real parse is untouched by any of this.
 */
export function extractHeaderText(source: string): string | null {
  const lines = source.split(/\r?\n/);
  const i = lines.findIndex((l) => l.startsWith('---'));
  return i === -1 ? null : lines.slice(0, i).join('\n');
}

export function buildCompletionModel(defs: any): CompletionModel {
  if (!defs || !Array.isArray(defs.keys)) return EMPTY_COMPLETION_MODEL;

  const schemas: Record<string, SchemaInfo> = {};
  const variables: VariableInfo[] = [];
  /** Schema instance → its definition name (`$address`), for every NAMED schema. */
  const namedKey = new Map<object, string>();
  /** Schema instance → the key it was emitted under. The recursion guard. */
  const emitted = new Map<object, string>();

  /** Resolves a `schema` / `schemaRef` slot to an `IOSchema`, following `$name` refs. */
  const resolve = (ref: any): any => {
    if (!ref) return undefined;
    if (isSchema(ref)) return ref;
    // A TokenNode carries the reference text in `.value`; some paths store a bare string.
    const name = typeof ref === 'string' ? ref : typeof ref.value === 'string' ? ref.value : undefined;
    if (!name || !name.startsWith('$')) return undefined;
    const target = defs.get(name);
    return isSchema(target) ? target : undefined;
  };

  /**
   * Emits a schema and returns the key it lives under.
   *
   * A named schema always emits under its definition name, whichever route reaches it
   * first — so the order definitions are walked in cannot change the output. Returning
   * early for an already-emitted instance is what makes recursion terminate.
   */
  const emit = (schema: any, fallbackKey: string): string => {
    const already = emitted.get(schema);
    if (already) return already;

    const key = namedKey.get(schema) ?? fallbackKey;
    // Claim the slot BEFORE walking members: a self-referential schema resolves back to
    // this instance mid-walk and must find it already claimed.
    emitted.set(schema, key);
    const info: SchemaInfo = { name: key, open: !!schema.open, members: [] };
    schemas[key] = info;

    for (const name of schema.names) {
      const d = schema.defs[name];
      if (!d) continue;
      info.members.push(toMemberInfo(name, d, key));
    }
    return key;
  };

  const toMemberInfo = (name: string, d: any, ownerKey: string): MemberInfo => {
    const m: MemberInfo = {
      name,
      type: typeof d.type === 'string' ? d.type : 'any',
      optional: !!d.optional,
      nullable: !!d.null,
    };

    if (Array.isArray(d.choices) && d.choices.length > 0) m.choices = d.choices.map(renderValue);
    if (d.default !== undefined) m.defaultText = renderValue(d.default);

    if (m.type === 'object') {
      const sub = resolve(d.schema) ?? resolve(d.schemaRef);
      if (sub) m.objectSchema = emit(sub, `${ownerKey}.${name}`);
    } else if (m.type === 'array') {
      const of = d.of;
      const itemType = of && typeof of.type === 'string' ? of.type : 'any';
      const item: NonNullable<MemberInfo['arrayItem']> = { type: itemType };
      if (itemType === 'object' && of) {
        const sub = resolve(of.schema) ?? resolve(of.schemaRef) ?? resolve(d.schemaRef);
        if (sub) item.objectSchema = emit(sub, `${ownerKey}.${name}[]`);
      }
      m.arrayItem = item;
    }

    return m;
  };

  // Pass 1 — record every NAMED schema, so a member referencing `$address` resolves to
  // the key `$address` instead of minting a synthetic duplicate of it.
  for (const key of defs.keys as string[]) {
    if (key.startsWith('@')) {
      variables.push(variableInfo(key, defs.get(key)));
      continue;
    }
    if (!key.startsWith('$')) continue; // plain metadata (`recordCount`) — not a schema
    const s = defs.get(key);
    if (isSchema(s)) namedKey.set(s, key);
  }

  // Pass 2 — emit. Names are already known, so whether a schema is reached here or
  // through another schema's member first makes no difference to where it lands.
  for (const [schema, key] of namedKey) emit(schema, key);

  return {
    schemas,
    variables,
    defaultSchema: schemas['$schema'] ? '$schema' : null,
  };
}
