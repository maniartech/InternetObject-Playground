/**
 * The Internet Object type vocabulary — type names and the constraint keys each type
 * accepts — used to drive completion in the SCHEMA editor.
 *
 * ─── Provenance ──────────────────────────────────────────────────────────────────
 * This table MIRRORS io-js2. Each type there declares its own constraints as an
 * `IOSchema` exposed via `TypeDef.get schema()`, and `TypedefRegistry` holds the
 * registered names. Reading those directly would make this file unnecessary and
 * drift-proof — but io-js2's `package.json` `exports` map publishes only `.` and
 * `./package.json`, so `TypedefRegistry` (not re-exported from `index.ts`) cannot be
 * imported without a change to that package. The playground is deliberately
 * self-contained, so the vocabulary is mirrored here instead.
 *
 * **When io-js2 adds or changes a type or constraint, update this file.** Sources:
 *   io-js2/src/schema/types/{string,number,bigint,decimal,boolean,datetime,object,array,any}.ts
 *   io-js2/src/schema/types/common-number.ts   (NUMBER_TYPES, RESERVED_TYPES)
 * ─────────────────────────────────────────────────────────────────────────────────
 *
 * Every entry carries a `doc` AND an `example`. The example is the part that actually
 * teaches: "minimum length, in code points" is far less use than seeing
 * `name: {string, minLen: 2}` written out, because the constraint's *syntax* is the
 * thing being looked up as often as its meaning.
 */

export interface ConstraintInfo {
  name: string;
  /** The constraint's own value type, shown as the suggestion's detail. */
  type: string;
  /** Allowed values for the constraint itself, e.g. `format: auto | regular | raw`. */
  choices?: string[];
  /** One sentence on what it does. */
  doc: string;
  /** A complete, valid member declaration using it. */
  example: string;
}

export interface TypeInfo {
  name: string;
  doc: string;
  /** A complete, valid member declaration of this type. */
  example: string;
  constraints: ConstraintInfo[];
}

/* ── Constraint groups, shared exactly as the typedefs share them ───────────────── */

/** Present on every type. */
const COMMON: ConstraintInfo[] = [
  {
    name: 'optional',
    type: 'bool',
    doc: 'The member may be omitted from a record.',
    example: 'age?: int          # shorthand\nage: {int, optional: T}',
  },
  {
    name: 'null',
    type: 'bool',
    doc: 'The member may be null (`N`).',
    example: 'nickname*: string          # shorthand\nnickname: {string, null: T}',
  },
];

const STRING_CONSTRAINTS: ConstraintInfo[] = [
  { name: 'default', type: 'string', doc: 'Value used when the member is absent.', example: 'country: {string, default: India}' },
  { name: 'choices', type: 'array', doc: 'The complete set of allowed values. Anything else is a validation error.', example: 'state: {string, choices: [NY, CA, WA]}' },
  { name: 'pattern', type: 'string', doc: 'A regular expression the value must match in full.', example: 'code: {string, pattern: "^[A-Z]{3}$"}' },
  { name: 'flags', type: 'string', doc: 'Regular-expression flags applied to `pattern`, e.g. `i` for case-insensitive.', example: 'code: {string, pattern: "^abc$", flags: i}' },
  { name: 'len', type: 'number', doc: 'Exact length, measured in Unicode code points.', example: 'pin: {string, len: 6}' },
  { name: 'minLen', type: 'number', doc: 'Minimum length, measured in Unicode code points.', example: 'name: {string, minLen: 2}' },
  { name: 'maxLen', type: 'number', doc: 'Maximum length, measured in Unicode code points.', example: 'name: {string, maxLen: 50}' },
  { name: 'format', type: 'string', choices: ['auto', 'regular', 'raw'], doc: 'How the string is written out. Defaults to `auto`.', example: 'note: {string, format: raw}' },
  { name: 'escapeLines', type: 'bool', doc: 'Escape newlines when serializing. Defaults to `F`.', example: 'note: {string, escapeLines: T}' },
  { name: 'encloser', type: 'string', choices: ['"', "'"], doc: 'Quote character used when serializing. Defaults to `"`.', example: 'note: {string, encloser: "\'"}' },
  ...COMMON,
];

const NUMBER_CONSTRAINTS: ConstraintInfo[] = [
  { name: 'default', type: 'number', doc: 'Value used when the member is absent.', example: 'count: {int, default: 0}' },
  { name: 'choices', type: 'array', doc: 'The complete set of allowed values.', example: 'size: {int, choices: [1, 2, 3]}' },
  { name: 'min', type: 'number', doc: 'Minimum allowed value, inclusive.', example: 'age: {int, min: 18}' },
  { name: 'max', type: 'number', doc: 'Maximum allowed value, inclusive.', example: 'age: {int, max: 65}' },
  { name: 'multipleOf', type: 'number', doc: 'The value must be an exact multiple of this number.', example: 'qty: {int, multipleOf: 5}' },
  { name: 'format', type: 'string', choices: ['decimal', 'hex', 'octal', 'binary', 'scientific'], doc: 'Numeric notation used when serializing.', example: 'id: {int, format: hex}' },
  ...COMMON,
];

const DECIMAL_CONSTRAINTS: ConstraintInfo[] = [
  { name: 'default', type: 'decimal', doc: 'Value used when the member is absent.', example: 'price: {decimal, default: 0.00}' },
  { name: 'choices', type: 'array', doc: 'The complete set of allowed values.', example: 'rate: {decimal, choices: [0.5, 1.0]}' },
  { name: 'precision', type: 'number', doc: 'Total number of significant digits.', example: 'price: {decimal, precision: 10, scale: 2}' },
  { name: 'scale', type: 'number', doc: 'Number of digits after the decimal point.', example: 'price: {decimal, precision: 10, scale: 2}' },
  { name: 'min', type: 'decimal', doc: 'Minimum allowed value, inclusive.', example: 'price: {decimal, min: 0.00}' },
  { name: 'max', type: 'decimal', doc: 'Maximum allowed value, inclusive.', example: 'price: {decimal, max: 9999.99}' },
  { name: 'multipleOf', type: 'decimal', doc: 'The value must be an exact multiple of this number.', example: 'price: {decimal, multipleOf: 0.05}' },
  ...COMMON,
];

const DATETIME_CONSTRAINTS: ConstraintInfo[] = [
  { name: 'default', type: 'datetime', doc: 'Value used when the member is absent.', example: 'joined: {date, default: d"2024-01-01"}' },
  { name: 'choices', type: 'array', doc: 'The complete set of allowed values.', example: 'day: {date, choices: [d"2024-01-01", d"2024-07-01"]}' },
  { name: 'min', type: 'datetime', doc: 'Earliest allowed value, inclusive.', example: 'joined: {date, min: d"2020-01-01"}' },
  { name: 'max', type: 'datetime', doc: 'Latest allowed value, inclusive.', example: 'joined: {date, max: d"2030-12-31"}' },
  ...COMMON,
];

const BOOL_CONSTRAINTS: ConstraintInfo[] = [
  { name: 'default', type: 'bool', doc: 'Value used when the member is absent.', example: 'active: {bool, default: T}' },
  ...COMMON,
];

const OBJECT_CONSTRAINTS: ConstraintInfo[] = [
  { name: 'default', type: 'object', doc: 'Value used when the member is absent.', example: 'addr: {object, default: {Main St, Pune}}' },
  { name: 'schema', type: 'object', doc: 'The object’s shape — inline, or a `$name` reference.', example: 'addr: $address          # shorthand\naddr: {object, schema: $address}' },
  ...COMMON,
];

const ARRAY_CONSTRAINTS: ConstraintInfo[] = [
  { name: 'default', type: 'array', doc: 'Value used when the member is absent.', example: 'tags: {array, default: []}' },
  { name: 'of', type: 'any', doc: 'The type of every element.', example: 'tags: [string]          # shorthand\ntags: {array, of: string}' },
  { name: 'len', type: 'number', doc: 'Exact number of elements.', example: 'point: {array, of: number, len: 2}' },
  { name: 'minLen', type: 'number', doc: 'Minimum number of elements.', example: 'tags: {array, of: string, minLen: 1}' },
  { name: 'maxLen', type: 'number', doc: 'Maximum number of elements.', example: 'tags: {array, of: string, maxLen: 5}' },
  ...COMMON,
];

const ANY_CONSTRAINTS: ConstraintInfo[] = [
  { name: 'default', type: 'any', doc: 'Value used when the member is absent.', example: 'meta: {any, default: N}' },
  { name: 'choices', type: 'array', doc: 'The complete set of allowed values.', example: 'flag: {any, choices: [yes, no, 1, 0]}' },
  { name: 'anyOf', type: 'array', doc: 'The value must match one of these type definitions.', example: 'id: {any, anyOf: [string, int]}' },
  { name: 'isSchema', type: 'bool', doc: 'Treat the value as a schema definition. Defaults to `F`.', example: 'shape: {any, isSchema: T}' },
  ...COMMON,
];

/* ── The registered, USABLE types ──────────────────────────────────────────────── */

const numberType = (name: string, doc: string, example: string): TypeInfo => ({
  name,
  doc,
  example,
  constraints: NUMBER_CONSTRAINTS,
});

/**
 * Every type a document may legally name.
 *
 * `int64`, `uint64`, `float32` and `float64` are deliberately ABSENT: io-js2's
 * `RESERVED_TYPES` reserves them for a future version and rejects them outright, so
 * suggesting one would only ever produce an error.
 */
export const IO_TYPES: TypeInfo[] = [
  { name: 'string', doc: 'Text.', example: 'name: string', constraints: STRING_CONSTRAINTS },
  { name: 'url', doc: 'Text validated as a URL.', example: 'site: url', constraints: STRING_CONSTRAINTS },
  { name: 'email', doc: 'Text validated as an email address.', example: 'email: email', constraints: STRING_CONSTRAINTS },

  numberType('number', 'Any number, integer or fractional.', 'score: number'),
  numberType('int', 'Signed integer.', 'age: int'),
  numberType('uint', 'Unsigned integer.', 'count: uint'),
  numberType('float', 'Floating-point number.', 'ratio: float'),
  numberType('int8', 'Signed 8-bit integer.', 'level: int8'),
  numberType('int16', 'Signed 16-bit integer.', 'offset: int16'),
  numberType('int32', 'Signed 32-bit integer.', 'total: int32'),
  numberType('uint8', 'Unsigned 8-bit integer.', 'red: uint8'),
  numberType('uint16', 'Unsigned 16-bit integer.', 'port: uint16'),
  numberType('uint32', 'Unsigned 32-bit integer.', 'size: uint32'),
  { name: 'bigint', doc: 'Arbitrary-precision integer.', example: 'id: bigint', constraints: NUMBER_CONSTRAINTS },
  { name: 'decimal', doc: 'Exact decimal number — no floating-point rounding.', example: 'price: {decimal, precision: 10, scale: 2}', constraints: DECIMAL_CONSTRAINTS },

  { name: 'bool', doc: 'Boolean — written `T` or `F`.', example: 'active: bool', constraints: BOOL_CONSTRAINTS },

  { name: 'datetime', doc: 'Date and time, written `dt"2024-01-20T10:30:00"`.', example: 'createdAt: datetime', constraints: DATETIME_CONSTRAINTS },
  { name: 'date', doc: 'Calendar date, written `d"2024-01-20"`.', example: 'joined: date', constraints: DATETIME_CONSTRAINTS },
  { name: 'time', doc: 'Time of day, written `t"10:30:00"`.', example: 'opensAt: time', constraints: DATETIME_CONSTRAINTS },

  { name: 'object', doc: 'A nested object.', example: 'addr: {street: string, city: string}', constraints: OBJECT_CONSTRAINTS },
  { name: 'array', doc: 'A list of values.', example: 'tags: [string]', constraints: ARRAY_CONSTRAINTS },
  { name: 'any', doc: 'Any value, unvalidated.', example: 'meta: any', constraints: ANY_CONSTRAINTS },
];

const TYPE_INDEX = new Map(IO_TYPES.map((t) => [t.name, t]));

/** Reserved for a future version of the spec — never suggest these; naming one is an error. */
export const RESERVED_TYPE_NAMES = ['int64', 'uint64', 'float32', 'float64'];

/** Looks up a type by name. Returns undefined for unknown or reserved names. */
export function getTypeInfo(name: string): TypeInfo | undefined {
  return TYPE_INDEX.get(name);
}

/* ── Documentation rendering ────────────────────────────────────────────────────── */

/** An `io`-fenced example block, so the suggestion docs syntax-highlight it. */
const codeBlock = (source: string) => ['```io', source, '```'].join('\n');

/** Markdown shown in the details pane for a constraint suggestion. */
export function constraintDocs(c: ConstraintInfo): string {
  const parts = [`**${c.name}** — ${c.doc}`];
  if (c.choices?.length) parts.push(`Allowed: ${c.choices.map((v) => `\`${v}\``).join(' · ')}`);
  parts.push(`Type: \`${c.type}\``);
  parts.push(codeBlock(c.example));
  return parts.join('\n\n');
}

/** Markdown shown in the details pane for a type suggestion. */
export function typeDocs(t: TypeInfo): string {
  const names = t.constraints.map((c) => c.name).filter((n) => n !== 'optional' && n !== 'null');
  return [
    `**${t.name}** — ${t.doc}`,
    codeBlock(t.example),
    names.length ? `Constraints: ${names.map((n) => `\`${n}\``).join(' · ')}` : '',
  ]
    .filter(Boolean)
    .join('\n\n');
}

/* ── Value literals ─────────────────────────────────────────────────────────────── */

/**
 * Value literals, tagged with the kind of member each one can legally fill.
 *
 * The tag is what keeps the suggestion list honest: offering `F` or `-Inf` in a slot the
 * schema declares as `number` or `string` is noise that pushes the real answer off the
 * top of the list. A literal is offered only where it could actually be valid.
 */
export type LiteralFamily = 'bool' | 'null' | 'number';

export const IO_LITERALS: { label: string; doc: string; family: LiteralFamily }[] = [
  { label: 'T', doc: 'True.', family: 'bool' },
  { label: 'F', doc: 'False.', family: 'bool' },
  { label: 'true', doc: 'True (long form).', family: 'bool' },
  { label: 'false', doc: 'False (long form).', family: 'bool' },
  { label: 'N', doc: 'Null.', family: 'null' },
  { label: 'null', doc: 'Null (long form).', family: 'null' },
  { label: 'Inf', doc: 'Positive infinity.', family: 'number' },
  { label: '-Inf', doc: 'Negative infinity.', family: 'number' },
  { label: 'NaN', doc: 'Not a number.', family: 'number' },
];

/**
 * Types whose values are numeric. Mirrors `NUMBER_TYPES` in io-js2's `common-number.ts`,
 * minus the reserved names — see the provenance note at the top of this file.
 */
export const NUMERIC_TYPE_NAMES = new Set([
  'number', 'int', 'uint', 'float', 'int8', 'int16', 'int32',
  'uint8', 'uint16', 'uint32', 'bigint', 'decimal',
]);

/** Only `float`-like types can hold the non-finite literals; `int` cannot. */
const NON_FINITE_TYPE_NAMES = new Set(['number', 'float', 'decimal', 'any']);

/** The literals worth offering for a member of `type`. Unknown type → offer everything. */
export function literalsForType(type: string | undefined, nullable: boolean): typeof IO_LITERALS {
  if (!type) return IO_LITERALS;
  return IO_LITERALS.filter((lit) => {
    switch (lit.family) {
      case 'bool':
        return type === 'bool' || type === 'any';
      case 'number':
        return NON_FINITE_TYPE_NAMES.has(type);
      case 'null':
        return nullable || type === 'any';
    }
  });
}

/** Prefixes for tagged string literals, offered when a member is a date/time type. */
export const TAGGED_STRING_PREFIXES: Record<string, { snippet: string; doc: string }> = {
  date: { snippet: 'd"$1"', doc: 'Date literal, e.g. `d"2024-01-20"`.' },
  time: { snippet: 't"$1"', doc: 'Time literal, e.g. `t"10:30:00"`.' },
  datetime: { snippet: 'dt"$1"', doc: 'Date-time literal, e.g. `dt"2024-01-20T10:30:00"`.' },
};
