/**
 * Monaco language providers for Internet Object: completion, signature help and hover.
 *
 * Registered ONCE against the `io` language rather than per editor, because Monaco keys
 * providers by language. The two `io` editors are told apart by their model URI, which
 * is why `EditorPane` gives each a stable `path` (see `MODEL_PATHS`).
 *
 * **Everything here runs on the UI thread**, so everything here is cheap by
 * construction: a bounded text scan (`scanCaret`) over a window that never exceeds one
 * record (`scanWindow`), plus lookups in a map the worker already built. Nothing in this
 * file is proportional to the size of the document.
 */

import {
  IO_TYPES,
  TAGGED_STRING_PREFIXES,
  constraintDocs,
  getTypeInfo,
  literalsForType,
  typeDocs,
} from './io-types';
import {
  getCompletionModel,
  memberAtSlot,
  rootSchemaFor,
  schemaAtPath,
  signatureOf,
} from './model-store';
import { scanCaret, type SectionMark } from './scanner';
import type { CaretContext, CompletionModel, MemberInfo, SchemaInfo } from './types';

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Stable model paths, so a provider can tell which editor it is completing for.
 * Without these `@monaco-editor/react` generates anonymous URIs and the two `io`
 * editors are indistinguishable.
 */
export const MODEL_PATHS = {
  document: 'inmemory://io/document.io',
  schema: 'inmemory://io/schema.io',
} as const;

const isSchemaEditor = (model: any): boolean => String(model?.uri ?? '').endsWith('schema.io');

/* ── The scan window ────────────────────────────────────────────────────────────── */

/**
 * The most text a provider will ever read to answer one request.
 *
 * 64 KB is far more than any record needs and keeps the per-keystroke cost flat no
 * matter how large the document grows.
 */
const MAX_SCAN_CHARS = 65536;

/**
 * The slice of document a provider needs, and nothing more.
 *
 * The naive implementation of all three providers is `model.getValue()` — which
 * concatenates the *entire* buffer into a fresh string on every keystroke, allocating
 * megabytes per suggestion on a large document and making the editor progressively less
 * responsive as the document grows. That is precisely the cost this feature must not
 * introduce, so the text is bounded instead:
 *
 *  - `findPreviousMatch` locates the enclosing `---` header through Monaco's own search
 *    over its piece table, without materialising the document;
 *  - the window then runs from just after that header to the caret, snapped forward to
 *    the nearest `~` record marker if the section is larger than `MAX_SCAN_CHARS`.
 *
 * Cost is therefore a function of the current record, not of the document.
 */
function scanWindow(model: any, position: any): { text: string; offset: number; marks: SectionMark[] } {
  const caretOffset = model.getOffsetAt(position);

  // Nearest `---` at or before the caret's line. `findPreviousMatch` wraps around, so a
  // match below the caret means there is none above it.
  const header = model.findPreviousMatch('^---.*$', position, true, false, null, true);
  const headerLine =
    header && header.range.startLineNumber <= position.lineNumber ? header.range.startLineNumber : 0;

  // The caret's own `---` line is completing the header itself, so it stays in the window.
  const onHeaderLine = headerLine === position.lineNumber;
  let startLine = headerLine > 0 && !onHeaderLine ? headerLine + 1 : Math.max(headerLine, 1);

  const marks: SectionMark[] = [];
  if (headerLine > 0 && !onHeaderLine) {
    const text = header.matches?.[0] ?? model.getLineContent(headerLine);
    const body = String(text).replace(/^---/, '');
    const colon = body.indexOf(':');
    const ref = (colon === -1 ? body : body.slice(colon + 1)).trim();
    // The window begins at the section's first character, so offset 0 is its start.
    marks.push({ start: 0, schema: ref.startsWith('$') ? ref : null });
  }

  // Keep the window bounded; prefer to start at a record marker so nesting stays exact.
  if (caretOffset - model.getOffsetAt({ lineNumber: startLine, column: 1 }) > MAX_SCAN_CHARS) {
    const record = model.findPreviousMatch('^~', position, true, false, null, false);
    if (record && record.range.startLineNumber > startLine && record.range.startLineNumber <= position.lineNumber) {
      startLine = record.range.startLineNumber;
      // Nesting context above this point is no longer in view, so neither is the section.
      marks.length = 0;
    }
  }

  const text = model.getValueInRange({
    startLineNumber: startLine,
    startColumn: 1,
    endLineNumber: position.lineNumber,
    endColumn: position.column,
  });

  return { text, offset: text.length, marks };
}

/* ── Suggestion helpers ─────────────────────────────────────────────────────────── */

/** Monaco's CompletionItemKind values, taken from the injected namespace. */
function kinds(monaco: any) {
  const K = monaco.languages.CompletionItemKind;
  return {
    field: K.Field,
    value: K.Value,
    enum: K.EnumMember,
    type: K.Class,
    keyword: K.Keyword,
    variable: K.Variable,
    snippet: K.Snippet,
    property: K.Property,
  };
}

/**
 * The range a suggestion replaces: the word already typed under the caret, plus its
 * sigil when it has one.
 *
 * Monaco's default word pattern EXCLUDES `@` (though it includes `$`), so after typing
 * `@` the word begins *after* the sigil. Accepting `@r` then inserted it alongside the
 * `@` already there and produced `@@r`. Extending the range left over a leading `@`/`$`
 * makes the replacement cover what the author actually typed.
 */
function replaceRange(monaco: any, model: any, position: any) {
  const word = model.getWordUntilPosition(position);
  const line = model.getLineContent(position.lineNumber);
  let startColumn = word.startColumn;

  // Columns are 1-based, so the character before the word sits at `startColumn - 2`.
  const preceding = startColumn >= 2 ? line[startColumn - 2] : '';
  if (preceding === '@' || preceding === '$') startColumn -= 1;

  return new monaco.Range(position.lineNumber, startColumn, position.lineNumber, word.endColumn);
}

/** A suggestion's label text, whether it is a plain string or Monaco's `{label, …}` form. */
function labelOf(item: any): string {
  return typeof item.label === 'string' ? item.label : item.label?.label ?? '';
}

/**
 * Collapses suggestions that share a label into one entry describing every purpose.
 *
 * The same text legitimately arrives from more than one direction: `T` is both the
 * `default` of `active: {bool, default: T}` and the boolean literal; a member name can
 * equal one of the schema's own `choices`. Listing it twice is not just untidy — the two
 * rows look identical, so the reader cannot tell why there are two or which to pick.
 *
 * Merging keeps the highest-priority entry (lowest `sortText`) as the base, so insertion
 * behaviour and ordering come from the most specific purpose, and joins the others'
 * details and documentation onto it.
 */
function mergeByLabel(items: any[]): any[] {
  const merged = new Map<string, { item: any; details: string[]; docs: string[] }>();

  for (const item of items) {
    const key = labelOf(item);
    const detail = typeof item.detail === 'string' ? item.detail : '';
    const doc: string = item.documentation?.value ?? '';
    const entry = merged.get(key);

    if (!entry) {
      merged.set(key, { item, details: detail ? [detail] : [], docs: doc ? [doc] : [] });
      continue;
    }

    if ((item.sortText ?? '') < (entry.item.sortText ?? '')) entry.item = item;
    if (detail && !entry.details.includes(detail)) entry.details.push(detail);
    if (doc && !entry.docs.includes(doc)) entry.docs.push(doc);
  }

  return [...merged.values()].map(({ item, details, docs }) => ({
    ...item,
    detail: details.length ? details.join(' · ') : item.detail,
    documentation: docs.length ? { value: docs.join('\n\n---\n\n') } : item.documentation,
  }));
}

/** Documentation markdown for a member, showing everything the schema says about it. */
function memberDocs(member: MemberInfo): string {
  const lines = [`\`${signatureOf(member)}\``];
  if (member.choices?.length) lines.push(`**Choices:** ${member.choices.map((c) => `\`${c}\``).join(', ')}`);
  if (member.defaultText !== undefined) lines.push(`**Default:** \`${member.defaultText}\``);
  if (member.optional) lines.push('_Optional._');
  if (member.nullable) lines.push('_Nullable._');
  return lines.join('\n\n');
}

/**
 * Suggestions for the VALUE of a member.
 *
 * Ordered by how likely each is to be the answer: the schema's own `choices` first,
 * then its default, then a literal template for date/time types, then the document's
 * variables, and only then the generic literals.
 *
 * Variables are offered here rather than only after an explicit `@`, because `@officeAddr`
 * IS a value — and a schema whose choices are themselves variables (`choices: [@r, @g, @b]`)
 * is written by referring to them, so the reference has to be reachable without knowing
 * to type the sigil first.
 */
function valueSuggestions(
  monaco: any,
  member: MemberInfo | undefined,
  range: any,
  model: CompletionModel
): any[] {
  const K = kinds(monaco);
  const items: any[] = [];

  // Choices are the highest-value suggestion there is: a closed set of correct answers.
  member?.choices?.forEach((choice, i) => {
    items.push({
      label: choice,
      kind: K.enum,
      detail: 'choice',
      // `sortText` keeps choices above the generic literals regardless of label.
      sortText: `0${String(i).padStart(3, '0')}`,
      insertText: choice,
      range,
    });
  });

  if (member?.defaultText !== undefined) {
    items.push({
      label: member.defaultText,
      kind: K.value,
      detail: 'default value',
      sortText: '1',
      insertText: member.defaultText,
      range,
    });
  }

  const tagged = member ? TAGGED_STRING_PREFIXES[member.type] : undefined;
  if (tagged) {
    items.push({
      label: tagged.snippet.replace('$1', ''),
      kind: K.snippet,
      detail: `${member!.type} literal`,
      documentation: { value: tagged.doc },
      insertText: tagged.snippet,
      insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      sortText: '2',
      range,
    });
  }

  // A variable is a legal value anywhere, including where choices are declared as
  // variables — so these stay on the list even when `choices` is present.
  items.push(...variableSuggestions(monaco, model, range, '3'));

  // Literals only where the declared type could actually hold one. A closed `choices`
  // set is exhaustive by definition, so nothing generic belongs beside it.
  if (!member?.choices?.length) {
    literalsForType(member?.type, !!member?.nullable).forEach((lit) => {
      items.push({
        label: lit.label,
        kind: K.keyword,
        detail: 'literal',
        documentation: { value: lit.doc },
        sortText: `4${lit.label}`,
        insertText: lit.label,
        range,
      });
    });
  }

  return items;
}

/**
 * Member-name suggestions, inserted as `name: ` ready for a value.
 *
 * Members the record has ALREADY filled are left out. In a positional record the slots
 * before the caret have consumed the leading members, so `~ "Gatsby", "Fitzgerald", |`
 * must offer `isbn` onward rather than re-offering `title` and `author`.
 *
 * Once any member has been named explicitly the positional correspondence no longer
 * holds — `~ isbn: 123, |` has not filled `title` — so in that case only the names
 * actually used are removed. Erring toward offering too much is right here: a missing
 * suggestion is worse than a redundant one.
 */
function memberKeySuggestions(
  monaco: any,
  schema: SchemaInfo | undefined,
  range: any,
  ctx: CaretContext
): any[] {
  const K = kinds(monaco);
  const members = schema?.members ?? [];

  const used = new Set(ctx.usedKeys);
  if (used.size === 0) {
    // Purely positional so far: every slot before the caret consumed a member in order.
    const slot = ctx.slotPath[ctx.slotPath.length - 1] ?? 0;
    for (let i = 0; i < slot && i < members.length; i++) used.add(members[i].name);
  }

  return members
    .map((m, i) => ({ m, i }))
    .filter(({ m }) => !used.has(m.name))
    .map(({ m, i }) => ({
      label: m.name,
      kind: K.field,
      detail: signatureOf(m),
      documentation: { value: memberDocs(m) },
      // Schema order is meaningful in Internet Object — it is the positional order.
      sortText: `0${String(i).padStart(3, '0')}`,
      insertText: `${m.name}: `,
      range,
    }));
}

/** Named schemas only — the synthetic keys for inline schemas are not referenceable. */
function namedSchemas(model: CompletionModel): string[] {
  return Object.keys(model.schemas).filter((k) => k.startsWith('$') && !k.includes('.'));
}

/**
 * Schema references, e.g. `$address`.
 *
 * `$schema` is EXCLUDED unless `includeDefault` is set, because it is not a reusable
 * type — it is the name that designates the document's default schema, written on the
 * left of a definition (`~ $schema: $employee`). Recursion is expressed through named
 * schemas instead (`managers?*: $employee`), which is what every recursive sample does.
 *
 * Leaving it in was actively harmful rather than merely noisy: `$` sorts before every
 * letter, so `$schema` became the PRE-SELECTED entry wherever a type was expected, and
 * accepting the default suggestion inserted it.
 *
 * It is still offered where naming the document root is the point — a `---` section
 * header — and where the reader has already typed `$`, which makes the intent explicit.
 */
function schemaRefSuggestions(
  monaco: any,
  model: CompletionModel,
  range: any,
  options: { includeDefault?: boolean } = {}
): any[] {
  const K = kinds(monaco);
  const keys = options.includeDefault
    ? namedSchemas(model)
    : namedSchemas(model).filter((k) => k !== model.defaultSchema);
  return keys.map((key) => ({
    label: key,
    kind: K.type,
    detail: `${model.schemas[key].members.length} members`,
    documentation: { value: model.schemas[key].members.map((m) => `\`${signatureOf(m)}\``).join('\n\n') },
    insertText: key,
    range,
  }));
}

/**
 * Variable suggestions, each showing what it holds — `@r` alone says nothing about
 * which variable you want, so the value is the useful half of the entry.
 */
function variableSuggestions(monaco: any, model: CompletionModel, range: any, sortPrefix = ''): any[] {
  const K = kinds(monaco);
  return model.variables.map((v) => ({
    label: v.valueText === undefined ? v.name : { label: v.name, description: v.valueText },
    filterText: v.name,
    kind: K.variable,
    detail: v.valueText === undefined ? 'variable' : `variable · ${v.valueText}`,
    documentation: v.valueText === undefined ? undefined : { value: `\`${v.name}\` = \`${v.valueText}\`` },
    sortText: `${sortPrefix}${v.name}`,
    insertText: v.name,
    range,
  }));
}

/* ── Schema-editor suggestions ──────────────────────────────────────────────────── */

function typeSuggestions(monaco: any, range: any): any[] {
  const K = kinds(monaco);
  return IO_TYPES.map((t) => ({
    label: t.name,
    kind: K.type,
    detail: t.doc,
    documentation: { value: typeDocs(t) },
    insertText: t.name,
    range,
  }));
}

/**
 * Constraint keys for a type, e.g. `minLen`, `choices`, `pattern` for a string.
 *
 * Offered only inside a constraint object — one that leads with a type name, as in
 * `{string, minLen: 3}`. `{name: string}` leads with a member declaration instead and
 * its keys are the author's own member names, which nothing can suggest.
 */
function constraintSuggestions(monaco: any, typeName: string, range: any): any[] {
  const K = kinds(monaco);
  const info = getTypeInfo(typeName);
  if (!info) return [];
  return info.constraints.map((c, i) => ({
    label: c.name,
    kind: K.property,
    // Both halves matter: the type says what to write, the sentence says why.
    detail: `${c.type} — ${c.doc}`,
    documentation: { value: constraintDocs(c) },
    sortText: `0${String(i).padStart(3, '0')}`,
    insertText: `${c.name}: `,
    range,
  }));
}

/** The type a constraint object is constraining, or null if this is not one. */
function constrainedType(ctx: CaretContext): string | null {
  const head = ctx.frameHead?.trim();
  if (!head || head.includes(':')) return null;
  return getTypeInfo(head) ? head : null;
}

/**
 * Completions for the schema editor.
 *
 * The shape being written here is a *declaration*, so the useful suggestions are the
 * type vocabulary and cross-references — never data values.
 */
function schemaEditorSuggestions(
  monaco: any,
  ctx: CaretContext,
  model: CompletionModel,
  range: any,
  keyName: string | null
): any[] {
  switch (ctx.mode) {
    case 'none':
      return [];

    case 'variable':
      return variableSuggestions(monaco, model, range);

    case 'schemaRef':
      return schemaRefSuggestions(monaco, model, range, { includeDefault: true });

    case 'value': {
      // After `key:` — a type, a `$ref`, or a constraint's own allowed values.
      const type = constrainedType(ctx);
      if (type) {
        const constraint = getTypeInfo(type)?.constraints.find((c) => c.name === keyName);
        if (constraint?.choices) {
          const K = kinds(monaco);
          return constraint.choices.map((v) => ({
            label: v,
            kind: K.enum,
            detail: `${constraint.name} value`,
            documentation: { value: constraintDocs(constraint) },
            insertText: v,
            range,
          }));
        }
      }
      return [...typeSuggestions(monaco, range), ...schemaRefSuggestions(monaco, model, range)];
    }

    case 'positional':
    case 'key':
    default: {
      const type = constrainedType(ctx);
      if (type) return constraintSuggestions(monaco, type, range);

      // Slot 0 of an object may be the type of a constraint object (`{string, minLen: 3}`)
      // or the first member name of a schema body (`{name: string}`) — nothing in the
      // text distinguishes them yet. Depth decides which is the better guess: the object
      // opened directly by `$name:` is a schema BODY, so stay quiet and let the author
      // name their member. Anything nested below that is a type position worth helping in.
      if (ctx.slotPath[ctx.slotPath.length - 1] === 0 && ctx.brackets.length > 1) {
        return [...typeSuggestions(monaco, range), ...schemaRefSuggestions(monaco, model, range)];
      }
      return [];
    }
  }
}

/* ── Document-editor suggestions ────────────────────────────────────────────────── */

/** The schema in force at the caret, and the member its slot corresponds to. */
function resolveAt(ctx: CaretContext, model: CompletionModel): { schema?: SchemaInfo; member?: MemberInfo } {
  const root = rootSchemaFor(model, ctx.sectionSchema);
  const schema = schemaAtPath(model, root, ctx.path, ctx.brackets, ctx.slotPath);
  if (!schema) return {};

  const slot = ctx.slotPath[ctx.slotPath.length - 1] ?? 0;

  if (ctx.mode === 'value') {
    // `key: ` — the member is named, not positional. The scanner consumed the name, so
    // recover it from the frame's own key rather than by slot.
    return { schema, member: undefined };
  }

  return { schema, member: memberAtSlot(schema, slot) };
}

function documentSuggestions(monaco: any, ctx: CaretContext, model: CompletionModel, range: any, keyed?: MemberInfo): any[] {
  switch (ctx.mode) {
    case 'none':
      return [];

    case 'variable':
      return variableSuggestions(monaco, model, range);

    case 'schemaRef':
    case 'sectionHeader':
      return schemaRefSuggestions(monaco, model, range, { includeDefault: true });

    case 'value':
      // The value of an explicitly named member.
      return valueSuggestions(monaco, keyed, range, model);

    case 'positional': {
      // Inside `[...]`: every element shares the array's element type.
      const { member } = resolveAt(ctx, model);
      return valueSuggestions(monaco, member, range, model);
    }

    case 'key':
    default: {
      // Ambiguous by nature: a record slot may be filled positionally OR by name, and
      // both are valid Internet Object. Offer both — member names to key it, and the
      // values that the positional slot would accept.
      const { schema, member } = resolveAt(ctx, model);
      return [
        ...memberKeySuggestions(monaco, schema, range, ctx),
        ...valueSuggestions(monaco, member, range, model),
      ];
    }
  }
}

/**
 * The `key` in `key: <caret>`, read back from the caret's own line.
 *
 * `scanCaret` reports where the caret *is*, not the name it follows, and both editors
 * need that name — the document editor to find the member being given a value, the
 * schema editor to find the constraint. Bounded to one line, which is where a key
 * always is.
 */
function keyBefore(text: string, offset: number): string | null {
  const lineStart = text.lastIndexOf('\n', offset - 1) + 1;
  const before = text.slice(lineStart, offset);
  const match = /([A-Za-z_][\w-]*)\s*:\s*[^,:{}[\]]*$/.exec(before);
  return match ? match[1] : null;
}

/* ── Registration ───────────────────────────────────────────────────────────────── */

/**
 * Where the previous registration's handles are parked — on `globalThis`, deliberately
 * NOT in a module variable and NOT on the monaco namespace.
 *
 * A module-level flag is not enough: Vite's HMR re-executes this module whenever it
 * changes, resetting the flag while the *previous* registration is still live. Monaco
 * then holds two providers for `io` and every suggestion appears twice (`$schema`,
 * `$schema`, `any`, `any`, …).
 *
 * The monaco namespace looks like the natural home but is an ES **module namespace
 * object**, which is sealed — assigning to it throws `Cannot assign to property … of
 * [object Module]` and takes the whole editor down with it. `globalThis` is the one
 * store that both survives module re-execution and accepts a property.
 */
const REGISTRY_KEY = '__ioCompletionProviders';

/** Registers the io providers. Idempotent — safe to call on every editor mount. */
export function registerIoProviders(monaco: any): void {
  const host = globalThis as any;
  const previous: { dispose(): void }[] | undefined = host[REGISTRY_KEY];
  if (previous) {
    for (const handle of previous) {
      try {
        handle.dispose();
      } catch {
        /* Already disposed by a full reload; nothing to undo. */
      }
    }
  }

  const disposables: { dispose(): void }[] = [];

  disposables.push(monaco.languages.registerCompletionItemProvider('io', {
    // `:` and `,` and the brackets are where a new suggestion becomes relevant; `$`/`@`
    // open a reference. Monaco also triggers on word characters by default.
    triggerCharacters: [':', ',', '{', '[', '$', '@', ' ', '~'],

    provideCompletionItems(model: any, position: any) {
      const { text, offset, marks } = scanWindow(model, position);
      const ctx = scanCaret(text, offset, marks);
      if (ctx.mode === 'none') return { suggestions: [] };

      const completion = getCompletionModel();
      const range = replaceRange(monaco, model, position);

      const keyName = ctx.mode === 'value' ? keyBefore(text, offset) : null;

      if (isSchemaEditor(model)) {
        return { suggestions: mergeByLabel(schemaEditorSuggestions(monaco, ctx, completion, range, keyName)) };
      }

      const { schema } = resolveAt(ctx, completion);
      const keyed = keyName ? schema?.members.find((m) => m.name === keyName) : undefined;
      return { suggestions: mergeByLabel(documentSuggestions(monaco, ctx, completion, range, keyed)) };
    },
  }));

  /**
   * Signature help — the answer to "which field am I typing?" in a positional record.
   *
   * Internet Object records are usually positional (`~ Alice, 30, T`), so there is no
   * key to complete and a dropdown has nothing to attach to. Monaco's signature widget
   * is exactly the right shape for this: it lists the schema's members and highlights
   * the one the caret is on.
   */
  disposables.push(monaco.languages.registerSignatureHelpProvider('io', {
    signatureHelpTriggerCharacters: ['~', ',', '{', '['],
    signatureHelpRetriggerCharacters: [','],

    provideSignatureHelp(model: any, position: any) {
      if (isSchemaEditor(model)) return null;

      const { text, offset, marks } = scanWindow(model, position);
      const ctx = scanCaret(text, offset, marks);
      if (ctx.mode === 'none') return null;

      const completion = getCompletionModel();
      const root = rootSchemaFor(completion, ctx.sectionSchema);
      const schema = schemaAtPath(completion, root, ctx.path, ctx.brackets, ctx.slotPath);
      if (!schema || schema.members.length === 0) return null;

      const slot = ctx.slotPath[ctx.slotPath.length - 1] ?? 0;
      const parameters = schema.members.map((m) => ({
        label: signatureOf(m),
        documentation: { value: memberDocs(m) },
      }));

      return {
        value: {
          signatures: [
            {
              label: `${schema.name}(${schema.members.map(signatureOf).join(', ')})`,
              documentation: { value: schema.open ? 'Open schema — additional members allowed.' : '' },
              parameters,
            },
          ],
          activeSignature: 0,
          // Past the last member the widget still shows, with nothing highlighted.
          activeParameter: Math.min(slot, parameters.length - 1),
        },
        dispose: () => undefined,
      };
    },
  }));

  /** Hover — the full definition of the member or schema under the pointer. */
  disposables.push(monaco.languages.registerHoverProvider('io', {
    provideHover(model: any, position: any) {
      const word = model.getWordAtPosition(position);
      if (!word) return null;

      const completion = getCompletionModel();

      // A `$ref` anywhere resolves to its schema. Monaco's default word pattern treats
      // `$` as a word character, so the word may or may not already carry the sigil
      // depending on the pattern in force — normalise rather than assume either.
      const refKey = word.word.startsWith('$') ? word.word : `$${word.word}`;
      const schemaInfo = completion.schemas[refKey];
      if (schemaInfo) {
        return {
          contents: [
            { value: `**${refKey}**${schemaInfo.open ? ' _(open)_' : ''}` },
            { value: schemaInfo.members.map((m) => `\`${signatureOf(m)}\``).join('\n\n') },
          ],
        };
      }

      const { text, offset, marks } = scanWindow(model, position);
      const ctx = scanCaret(text, offset, marks);
      const root = rootSchemaFor(completion, ctx.sectionSchema);
      const schema = schemaAtPath(completion, root, ctx.path, ctx.brackets, ctx.slotPath);
      const member = schema?.members.find((m) => m.name === word.word);
      if (!member) return null;

      return { contents: [{ value: memberDocs(member) }] };
    },
  }));

  host[REGISTRY_KEY] = disposables;
}

/** Exposed for tests: the pure suggestion logic, independent of Monaco registration. */
export const __testables = { constrainedType, keyBefore, namedSchemas };
