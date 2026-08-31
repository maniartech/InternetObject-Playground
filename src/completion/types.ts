/**
 * The vocabulary shared between the parser worker (which knows the schema) and the
 * editor (which knows the caret).
 *
 * Everything here must survive `postMessage`, so it is plain data only — no class
 * instances, no functions, and, critically, **no object cycles**. Schemas therefore
 * reference each other by KEY into `CompletionModel.schemas` rather than by nesting.
 * That is not a stylistic choice: `~ $node: {children?: [$node]}` is a legitimate and
 * well-used Internet Object schema (see `sample-data/recursive-schema.ts`), and a nested
 * representation of it does not terminate.
 */

/** One member (property) of a schema, flattened for display and insertion. */
export interface MemberInfo {
  name: string;
  /** The declared type name, e.g. `string`, `int`, `object`, `array`. */
  type: string;
  optional: boolean;
  nullable: boolean;
  /** Allowed values, pre-rendered to display strings. Absent when unconstrained. */
  choices?: string[];
  /** The declared default, pre-rendered. Absent when there is none. */
  defaultText?: string;
  /** Key into `CompletionModel.schemas` when this member is an object with a schema. */
  objectSchema?: string;
  /** For arrays: the element type, plus its schema key when elements are objects. */
  arrayItem?: { type: string; objectSchema?: string };
}

/** One schema — either named (`$person`) or an anonymous inline one. */
export interface SchemaInfo {
  /** Display name: `$person`, or a path-derived label for inline schemas. */
  name: string;
  /** True when the schema accepts members it does not declare (`*`). */
  open: boolean;
  members: MemberInfo[];
}

/** A document variable, and a preview of what it holds. */
export interface VariableInfo {
  /** The name including its sigil, e.g. `@officeAddr`. */
  name: string;
  /**
   * The value rendered for display, e.g. `red` or `{Santacruze, California, CA}`.
   *
   * Truncated, and absent when the value cannot be rendered usefully. It exists so the
   * suggestion list can show `@r — red`: a bare list of variable names tells you nothing
   * about which one you want.
   */
  valueText?: string;
}

/**
 * Everything the editor needs to make suggestions, computed off the UI thread.
 *
 * Keys of `schemas` are either a real definition name (`$person`) or a synthetic
 * path-derived key for an inline schema (`$person.address`, `$person.tags[]`).
 */
export interface CompletionModel {
  schemas: Record<string, SchemaInfo>;
  variables: VariableInfo[];
  /** The key of the document's default schema (`$schema`), when one is defined. */
  defaultSchema: string | null;
}

export const EMPTY_COMPLETION_MODEL: CompletionModel = {
  schemas: {},
  variables: [],
  defaultSchema: null,
};

/** What the caret is positioned to complete. */
export type CaretMode =
  /** Typing a member name before a `:` — suggest schema member names. */
  | 'key'
  /** Just after `key:` — suggest that member's choices/default/literals. */
  | 'value'
  /** In a positional slot of a `~` record or `{}` — slot N of the active schema. */
  | 'positional'
  /** On a `---` section header line — suggest `$schema` names. */
  | 'sectionHeader'
  /** After `@` — suggest variable names. */
  | 'variable'
  /** After `$` — suggest schema names. */
  | 'schemaRef'
  /** Inside a comment or string literal — suggest nothing at all. */
  | 'none';

/** Where the caret is, resolved against the document text alone (no schema needed). */
export interface CaretContext {
  mode: CaretMode;
  /**
   * The schema the caret's record belongs to, as written in the section header
   * (`--- people: $person` → `$person`). Null means "the document default".
   */
  sectionSchema: string | null;
  /**
   * Member names entered on the way down to the caret, e.g. `['address']` inside
   * `~ Alice, addr: {street: ...}`.
   *
   * Positional descent contributes a null (the slot index is in `slotPath`).
   */
  path: (string | null)[];
  /**
   * The bracket opening each descent in `path`, same length and order.
   *
   * Needed because entering `{` from inside `[...]` is entering an array ELEMENT — the
   * schema does not change — whereas entering `{` from an object selects a member. Both
   * look identical in `path`, so without this an array of objects resolves its members
   * by element index.
   */
  brackets: ('{' | '[')[];
  /** Positional index at each nesting level; the last entry is the caret's own slot. */
  slotPath: number[];
  /** Text already typed for the token under the caret (used to filter suggestions). */
  word: string;
  /** True when the caret sits inside `[...]` at the innermost level. */
  inArray: boolean;
  /**
   * Raw text of slot 0 of the innermost `{...}` — what the object leads with.
   *
   * This is how the SCHEMA editor tells a constraint object from a member object:
   * `{string, minLen: 3}` leads with a type name, so its remaining keys are that type's
   * constraints, while `{name: string}` leads with a member declaration. The two are
   * otherwise identical in shape.
   */
  frameHead: string | null;
  /**
   * Member names already given explicitly as `name:` at the caret's level.
   *
   * Together with the caret's slot this is what stops a record from re-offering fields
   * it has already filled — `~ "Gatsby", "Fitzgerald", |` should suggest `isbn`, not
   * `title` and `author` again.
   */
  usedKeys: string[];
}
