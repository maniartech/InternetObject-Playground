import { describe, expect, it } from 'vitest';
import { parseDefinitions } from 'internet-object';
import { buildCompletionModel, extractHeaderText } from './build-model';
import sampleData from '../sample-data';
import type { CompletionModel } from './types';

/** Compiles header text with the real library, then flattens it. */
function model(header: string): CompletionModel {
  return buildCompletionModel(parseDefinitions(header.trim(), null, []));
}

const memberNames = (m: CompletionModel, key: string) => m.schemas[key]?.members.map((x) => x.name);
const member = (m: CompletionModel, key: string, name: string) =>
  m.schemas[key]?.members.find((x) => x.name === name);

describe('extractHeaderText', () => {
  it('returns null when the document has no separator', () => {
    expect(extractHeaderText('~ Alice, 30')).toBeNull();
  });

  it('returns the text before the first separator', () => {
    expect(extractHeaderText('~ $s: {a: int}\n---\n~ 1')).toBe('~ $s: {a: int}');
  });

  it('returns empty string when the document opens with a separator', () => {
    expect(extractHeaderText('--- $books\n~ 1')).toBe('');
  });
});

describe('buildCompletionModel', () => {
  it('returns an empty model for no definitions', () => {
    expect(buildCompletionModel(null)).toEqual({ schemas: {}, variables: [], defaultSchema: null });
  });

  it('flattens members with their type and modifiers', () => {
    const m = model(`
      ~ $schema: {name: string, age?: int, nick*: string}
    `);
    expect(memberNames(m, '$schema')).toEqual(['name', 'age', 'nick']);
    expect(member(m, '$schema', 'name')).toMatchObject({ type: 'string', optional: false, nullable: false });
    expect(member(m, '$schema', 'age')).toMatchObject({ type: 'int', optional: true });
    expect(member(m, '$schema', 'nick')).toMatchObject({ nullable: true });
  });

  it('marks the default schema', () => {
    expect(model('~ $schema: {a: int}').defaultSchema).toBe('$schema');
    expect(model('~ $other: {a: int}').defaultSchema).toBeNull();
  });

  it('captures choices and defaults as display text', () => {
    const m = model(`
      ~ $schema: {
        state: {string, choices:[NY, CA]},
        active: {bool, default: T}
      }
    `);
    expect(member(m, '$schema', 'state')?.choices).toEqual(['NY', 'CA']);
    expect(member(m, '$schema', 'active')?.defaultText).toBe('T');
  });

  it('resolves a $ref member to the referenced schema, not a copy', () => {
    const m = model(`
      ~ $address: {street: string, city: string}
      ~ $schema: {name: string, addr: $address}
    `);
    // The key is the real definition name — that is what makes the ref navigable.
    expect(member(m, '$schema', 'addr')?.objectSchema).toBe('$address');
    expect(memberNames(m, '$address')).toEqual(['street', 'city']);
  });

  it('gives an inline object a path-derived key', () => {
    const m = model('~ $schema: {meta: {a: int, b: string}}');
    const key = member(m, '$schema', 'meta')?.objectSchema;
    expect(key).toBe('$schema.meta');
    expect(memberNames(m, key!)).toEqual(['a', 'b']);
  });

  it('records the element type of a typed array', () => {
    const m = model('~ $schema: {colors: [string], tags: array}');
    expect(member(m, '$schema', 'colors')?.arrayItem).toEqual({ type: 'string' });
    expect(member(m, '$schema', 'tags')?.arrayItem).toEqual({ type: 'any' });
  });

  it('resolves an array of $refs to the referenced schema', () => {
    const m = model(`
      ~ $book: {title: string}
      ~ $schema: {books: [$book]}
    `);
    expect(member(m, '$schema', 'books')?.arrayItem).toEqual({ type: 'object', objectSchema: '$book' });
  });

  it('flags an open schema', () => {
    const m = model('~ $schema: {a: int, *}');
    expect(m.schemas['$schema'].open).toBe(true);
    expect(model('~ $schema: {a: int}').schemas['$schema'].open).toBe(false);
  });

  it('collects variables with a readable preview of their value', () => {
    const m = model(`
      ~ @r: red
      ~ @n: 42
      ~ @flag: T
      ~ @officeAddr: {Santacruze, California, CA}
      ~ @keyed: {city: Pune, state: MH}
      ~ @list: [a, b, c]
      ~ $schema: {a: int}
    `);
    expect(m.variables).toEqual([
      { name: '@r', valueText: 'red' },
      { name: '@n', valueText: '42' },
      { name: '@flag', valueText: 'T' },
      // Positional objects render positionally — not as {"0": ...} keys nobody wrote.
      { name: '@officeAddr', valueText: '{Santacruze, California, CA}' },
      { name: '@keyed', valueText: '{city: Pune, state: MH}' },
      { name: '@list', valueText: '[a, b, c]' },
    ]);
  });

  it('truncates a long variable preview', () => {
    const long = 'x'.repeat(200);
    const m = model(`~ @big: "${long}"
~ $schema: {a: int}`);
    const v = m.variables[0];
    expect(v.name).toBe('@big');
    expect(v.valueText!.length).toBeLessThanOrEqual(60);
    expect(v.valueText!.endsWith('…')).toBe(true);
  });

  it('ignores plain metadata definitions', () => {
    const m = model('~ recordCount: 23\n~ $schema: {a: int}');
    expect(Object.keys(m.schemas)).toEqual(['$schema']);
    expect(m.variables).toEqual([]);
  });

  // The whole reason the model references schemas by key instead of by nesting.
  it('terminates on a directly recursive schema', () => {
    const m = model('~ $node: {value: string, parent?: $node}');
    expect(member(m, '$node', 'parent')?.objectSchema).toBe('$node');
    expect(Object.keys(m.schemas)).toEqual(['$node']);
  });

  it('terminates on recursion through an array', () => {
    const m = model('~ $node: {value: string, children?: [$node]}');
    expect(member(m, '$node', 'children')?.arrayItem).toEqual({ type: 'object', objectSchema: '$node' });
  });

  it('terminates on mutual recursion', () => {
    const m = model(`
      ~ $a: {x: int, b?: $b}
      ~ $b: {y: int, a?: $a}
    `);
    expect(member(m, '$a', 'b')?.objectSchema).toBe('$b');
    expect(member(m, '$b', 'a')?.objectSchema).toBe('$a');
  });

  it('emits a named schema under its name regardless of walk order', () => {
    // `$address` is referenced by `$schema` before it is defined further down.
    const forward = model('~ $schema: {addr: $address}\n~ $address: {street: string}');
    const backward = model('~ $address: {street: string}\n~ $schema: {addr: $address}');
    expect(forward.schemas['$address']).toEqual(backward.schemas['$address']);
    expect(forward.schemas['$schema'].members).toEqual(backward.schemas['$schema'].members);
  });
});

describe('buildCompletionModel — the real sample corpus', () => {
  const samples = sampleData.groups.flatMap((g: any) => g.items);

  it('covers every shipped sample', () => {
    expect(samples.length).toBeGreaterThan(20);
  });

  it.each(samples.map((s: any) => [s.id ?? s.name, s]))('flattens %s without throwing or hanging', (_id, sample: any) => {
    // Definitions come from the sample's schema pane, and/or the document's own header.
    const sources = [sample.schema, sample.doc ? extractHeaderText(sample.doc) : null].filter(Boolean) as string[];

    for (const src of sources) {
      if (!src.trim()) continue;
      let defs: unknown = null;
      try {
        defs = parseDefinitions(src.trim(), null, []);
      } catch {
        continue; // a sample that deliberately carries errors — the worker catches this too
      }
      const m = buildCompletionModel(defs);
      expect(m.schemas).toBeTypeOf('object');
      // Every reference must point at a schema that actually exists in the model.
      for (const info of Object.values(m.schemas)) {
        for (const mem of info.members) {
          if (mem.objectSchema) expect(m.schemas[mem.objectSchema]).toBeDefined();
          if (mem.arrayItem?.objectSchema) expect(m.schemas[mem.arrayItem.objectSchema]).toBeDefined();
        }
      }
    }
  });
});
