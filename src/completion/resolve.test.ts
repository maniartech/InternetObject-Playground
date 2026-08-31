/**
 * End-to-end resolution: real schema text → worker model → caret scan → the members the
 * editor should offer. These are the tests that would actually catch a wrong suggestion.
 */
import { describe, expect, it } from 'vitest';
import { parseDefinitions } from 'internet-object';
import { buildCompletionModel } from './build-model';
import { scanCaret } from './scanner';
import { memberAtSlot, rootSchemaFor, schemaAtPath, signatureOf } from './model-store';
import type { CompletionModel } from './types';

function modelOf(header: string): CompletionModel {
  return buildCompletionModel(parseDefinitions(header.trim(), null, []));
}

/** Resolves the schema in force at the `|` caret marker in `doc`. */
function resolve(header: string, doc: string) {
  const model = modelOf(header);
  const offset = doc.indexOf('|');
  if (offset === -1) throw new Error('doc must contain a | caret marker');
  const text = doc.slice(0, offset) + doc.slice(offset + 1);
  const ctx = scanCaret(text, offset);
  const root = rootSchemaFor(model, ctx.sectionSchema);
  return { ctx, model, schema: schemaAtPath(model, root, ctx.path, ctx.brackets, ctx.slotPath) };
}

const names = (s?: { members: { name: string }[] }) => s?.members.map((m) => m.name);

const HEADER = `
  ~ $address: {street: string, city: {string, choices:[NY, CA]}}
  ~ $book: {title: string, isbn: number}
  ~ $schema: {
      name: string,
      age?: int,
      addr: $address,
      books: [$book],
      colors: [string],
      meta: {a: int, b: string}
    }
`;

describe('resolution at the caret', () => {
  it('offers the default schema at the top level of a record', () => {
    const { schema } = resolve(HEADER, '~ |');
    expect(names(schema)).toEqual(['name', 'age', 'addr', 'books', 'colors', 'meta']);
  });

  it('descends into a keyed object member', () => {
    const { schema } = resolve(HEADER, '~ Alice, addr: {|');
    expect(names(schema)).toEqual(['street', 'city']);
  });

  it('descends into a POSITIONAL object member by slot', () => {
    // Slot 2 of $schema is `addr` — nothing names it, so the slot has to.
    const { schema } = resolve(HEADER, '~ Alice, 30, {|');
    expect(names(schema)).toEqual(['street', 'city']);
  });

  it('descends into an inline object schema', () => {
    const { schema } = resolve(HEADER, '~ Alice, meta: {|');
    expect(names(schema)).toEqual(['a', 'b']);
  });

  it('resolves array elements to the item schema, not by element index', () => {
    const first = resolve(HEADER, '~ books: [{|');
    expect(names(first.schema)).toEqual(['title', 'isbn']);

    // The regression this guards: a later element must not index members by position.
    const third = resolve(HEADER, '~ books: [{title: a}, {title: b}, {|');
    expect(names(third.schema)).toEqual(['title', 'isbn']);
  });

  it('resolves a nested member inside an array element', () => {
    const { ctx } = resolve(HEADER, '~ books: [{title: |');
    expect(ctx.mode).toBe('value');
    expect(ctx.path).toEqual(['books', null]);
    expect(ctx.brackets).toEqual(['[', '{']);
  });

  it('gives no schema for a member that does not exist', () => {
    const { schema } = resolve(HEADER, '~ Alice, nosuch: {|');
    expect(schema).toBeUndefined();
  });

  it('gives no schema when a positional slot runs past the member list', () => {
    const { schema } = resolve(HEADER, '~ a, b, c, d, e, f, g, {|');
    expect(schema).toBeUndefined();
  });
});

describe('positional slots', () => {
  it('names the member filling each slot', () => {
    const model = modelOf(HEADER);
    const schema = model.schemas['$schema'];
    expect(memberAtSlot(schema, 0)?.name).toBe('name');
    expect(memberAtSlot(schema, 1)?.name).toBe('age');
    expect(memberAtSlot(schema, 2)?.name).toBe('addr');
    expect(memberAtSlot(schema, 99)).toBeUndefined();
  });

  it('tracks the caret’s own slot as the record is typed', () => {
    expect(resolve(HEADER, '~ |').ctx.slotPath).toEqual([0]);
    expect(resolve(HEADER, '~ Alice, |').ctx.slotPath).toEqual([1]);
    expect(resolve(HEADER, '~ Alice, 30, |').ctx.slotPath).toEqual([2]);
  });
});

describe('section-scoped resolution', () => {
  const header = `
    ~ $users: {userId: string, name: string}
    ~ $books: {title: string, isbn: number}
  `;
  const doc = ['--- $books', '~ Gatsby, 123', '', '--- subs: $users', '~ u1, |'].join('\n');

  it('uses the schema named by the caret’s section', () => {
    const { schema, ctx } = resolve(header, doc);
    expect(ctx.sectionSchema).toBe('$users');
    expect(names(schema)).toEqual(['userId', 'name']);
  });

  it('uses the earlier section’s schema for an earlier caret', () => {
    const earlier = ['--- $books', '~ Gatsby, |', '', '--- subs: $users', '~ u1, x'].join('\n');
    const { schema } = resolve(header, earlier);
    expect(names(schema)).toEqual(['title', 'isbn']);
  });

  it('falls back to $schema when a section names none', () => {
    const { schema } = resolve(HEADER, '---\n~ Alice, |');
    expect(names(schema)).toEqual(['name', 'age', 'addr', 'books', 'colors', 'meta']);
  });
});

describe('recursive schemas resolve without hanging', () => {
  const header = '~ $schema: {value: string, children?: [$schema], parent?: $schema}';

  it('descends through an array of itself', () => {
    const { schema } = resolve(header, '~ root, [{|');
    expect(names(schema)).toEqual(['value', 'children', 'parent']);
  });

  it('descends through a self reference repeatedly', () => {
    const { schema } = resolve(header, '~ root, [], {value: a, children: [], parent: {|');
    expect(names(schema)).toEqual(['value', 'children', 'parent']);
  });
});

describe('signatureOf', () => {
  const model = modelOf(HEADER);
  const m = (name: string) => model.schemas['$schema'].members.find((x) => x.name === name)!;

  it('renders a plain member', () => {
    expect(signatureOf(m('name'))).toBe('name: string');
  });

  it('marks an optional member', () => {
    expect(signatureOf(m('age'))).toBe('age?: int');
  });

  it('renders an object member as its schema name', () => {
    expect(signatureOf(m('addr'))).toBe('addr: $address');
  });

  it('renders arrays with their element type', () => {
    expect(signatureOf(m('books'))).toBe('books: [$book]');
    expect(signatureOf(m('colors'))).toBe('colors: [string]');
  });
});
