/**
 * The latest schema knowledge from the parser worker, held outside React.
 *
 * Monaco's completion providers are registered once against the *language*, not against
 * a component, and they are called imperatively while the user types. Routing this
 * through React state would mean a full re-render of the workspace on every parse for
 * data that is never rendered — so the model lives here instead, and providers read the
 * current value at the moment they are invoked.
 */

import type { CompletionModel, MemberInfo, SchemaInfo } from './types';
import { EMPTY_COMPLETION_MODEL } from './types';

let current: CompletionModel = EMPTY_COMPLETION_MODEL;

/** Replaces the model. Called from the worker's result handler. */
export function setCompletionModel(model: CompletionModel | undefined | null): void {
  current = model ?? EMPTY_COMPLETION_MODEL;
}

/** The model as of right now. Never null. */
export function getCompletionModel(): CompletionModel {
  return current;
}

/**
 * The schema a record belongs to: the one its section names, else the document default.
 *
 * Returns undefined when neither is known — an untyped document, which is perfectly
 * legal and simply has nothing to suggest.
 */
export function rootSchemaFor(model: CompletionModel, sectionSchema: string | null): SchemaInfo | undefined {
  const key = sectionSchema ?? model.defaultSchema;
  return key ? model.schemas[key] : undefined;
}

/**
 * Walks from a root schema down the path the caret sits on.
 *
 * `path` entries are member names, or null where the descent was positional — an
 * unnamed `{...}` at slot N. A null step is resolved through `slotPath`, which is what
 * makes completion work inside positional records, the shape most Internet Object
 * documents actually use.
 *
 * Descending out of an ARRAY frame is the exception: `[{...}, {...}]` enters an array
 * *element*, and every element shares the array's item schema, so the schema is carried
 * through unchanged rather than being indexed by the element's position.
 *
 * Returns undefined as soon as a step cannot be resolved; a partially-typed document is
 * the normal case and "no suggestions" is the right answer, not a guess.
 */
export function schemaAtPath(
  model: CompletionModel,
  root: SchemaInfo | undefined,
  path: (string | null)[],
  brackets: ('{' | '[')[],
  slotPath: number[]
): SchemaInfo | undefined {
  let schema = root;

  for (let depth = 0; depth < path.length && schema; depth++) {
    // Entering an element of the array we are already inside: same schema, next element.
    if (depth > 0 && brackets[depth - 1] === '[') continue;

    const step = path[depth];
    // slotPath[depth] is the slot in the PARENT that this step descended from.
    const member = step === null ? schema.members[slotPath[depth] ?? -1] : schema.members.find((m) => m.name === step);
    if (!member) return undefined;
    schema = nestedSchema(model, member);
  }

  return schema;
}

/** The schema of a member's value: its object schema, or its array element's. */
export function nestedSchema(model: CompletionModel, member: MemberInfo | undefined): SchemaInfo | undefined {
  if (!member) return undefined;
  const key = member.objectSchema ?? member.arrayItem?.objectSchema;
  return key ? model.schemas[key] : undefined;
}

/** The member filling a given positional slot of a schema. */
export function memberAtSlot(schema: SchemaInfo | undefined, slot: number): MemberInfo | undefined {
  return schema?.members[slot];
}

/** Renders a member as a one-line type signature, e.g. `age?: int` or `tags: [string]`. */
export function signatureOf(member: MemberInfo): string {
  let type = member.type;
  if (member.type === 'array' && member.arrayItem) {
    type = `[${member.arrayItem.objectSchema ?? member.arrayItem.type}]`;
  } else if (member.type === 'object' && member.objectSchema) {
    type = member.objectSchema;
  }
  return `${member.name}${member.optional ? '?' : ''}${member.nullable ? '*' : ''}: ${type}`;
}
