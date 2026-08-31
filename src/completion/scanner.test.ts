import { describe, expect, it } from 'vitest';
import { findSections, scanCaret } from './scanner';

/**
 * Places the caret at the `|` marker and scans. Keeps the tests readable — the thing
 * under test is entirely about *where* the caret is.
 */
function at(source: string) {
  const offset = source.indexOf('|');
  if (offset === -1) throw new Error('test source must contain a | caret marker');
  const text = source.slice(0, offset) + source.slice(offset + 1);
  return scanCaret(text, offset);
}

describe('findSections', () => {
  it('returns nothing for a document with no separator', () => {
    expect(findSections('~ Alice, 30\n~ Bob, 25')).toEqual([]);
  });

  it('reads a bare separator, a schema ref, and a named section', () => {
    const text = ['~ $a: {x: int}', '---', '~ 1', '--- $books', '~ 2', '--- subs: $users', '~ 3'].join('\n');
    expect(findSections(text).map((s) => s.schema)).toEqual([null, '$books', '$users']);
  });

  it('ignores a --- that is not at the start of a line', () => {
    expect(findSections('~ Alice, "a --- b"')).toEqual([]);
  });
});

describe('scanCaret — mode', () => {
  it('treats the start of a record as a key-or-positional slot', () => {
    const c = at('~ |');
    expect(c.mode).toBe('key');
    expect(c.slotPath).toEqual([0]);
  });

  it('counts positional slots across commas', () => {
    const c = at('~ Alice, 30, |');
    expect(c.mode).toBe('key');
    expect(c.slotPath).toEqual([2]);
  });

  it('switches to value mode after a colon', () => {
    const c = at('~ name: |');
    expect(c.mode).toBe('value');
  });

  it('reports array elements as positional', () => {
    const c = at('~ colors: [red, |');
    expect(c.mode).toBe('positional');
    expect(c.inArray).toBe(true);
    expect(c.slotPath).toEqual([0, 1]);
  });

  it('detects a variable reference', () => {
    expect(at('~ Alice, @off|').mode).toBe('variable');
  });

  it('detects a schema reference', () => {
    expect(at('~ $addr: {a: int}\n~ $s: {addr: $ad|').mode).toBe('schemaRef');
  });

  it('suggests nothing inside a comment', () => {
    expect(at('~ Alice, 30 # a note |').mode).toBe('none');
  });

  it('suggests nothing inside a string', () => {
    expect(at('~ "hello wor|').mode).toBe('none');
  });

  it('is not fooled by an escaped quote', () => {
    expect(at('~ "a \\" b", |').mode).toBe('key');
  });

  it('is not fooled by a colon inside a time literal', () => {
    const c = at('~ start: t"10:30:00", |');
    expect(c.mode).toBe('key');
    expect(c.slotPath).toEqual([1]);
  });
});

describe('scanCaret — nesting', () => {
  it('descends into a keyed object', () => {
    const c = at('~ Alice, addr: {street: |');
    expect(c.path).toEqual(['addr']);
    expect(c.mode).toBe('value');
  });

  it('descends into a positional object with no label', () => {
    const c = at('~ Alice, {|');
    expect(c.path).toEqual([null]);
    expect(c.slotPath).toEqual([1, 0]);
  });

  it('tracks slots at each level independently', () => {
    const c = at('~ Alice, 30, {a, b, |');
    expect(c.slotPath).toEqual([2, 2]);
  });

  it('pops back out of a closed object', () => {
    const c = at('~ Alice, {a, b}, |');
    expect(c.path).toEqual([]);
    expect(c.slotPath).toEqual([2]);
  });

  it('handles an array of objects', () => {
    const c = at('~ books: [{title: a}, {title: |');
    expect(c.path).toEqual(['books', null]);
    expect(c.mode).toBe('value');
  });

  it('strips optional/null modifiers from a key', () => {
    // `perm?*: $address` — the member name is `perm`, not `perm?*`.
    const c = at('~ $s: {perm?*: |');
    expect(c.mode).toBe('value');
  });
});

describe('scanCaret — sections', () => {
  const doc = ['--- $library', 'City Central', '', '--- subs: $users', '~ user123, |'].join('\n');

  it('resolves the schema of the caret’s section', () => {
    const offset = doc.indexOf('|');
    const c = scanCaret(doc.replace('|', ''), offset);
    expect(c.sectionSchema).toBe('$users');
  });

  it('reports no section schema in the document header', () => {
    const text = '~ recordCount: 23\n---\n~ Alice';
    expect(scanCaret(text, 5).sectionSchema).toBeNull();
  });

  it('completes the header line itself', () => {
    const c = at('--- people: $per|');
    expect(c.mode).toBe('sectionHeader');
    expect(c.word).toBe('$per');
  });

  it('starts a fresh record at each ~', () => {
    const c = at('~ a, b, c\n~ d, |');
    expect(c.slotPath).toEqual([1]);
  });
});

describe('scanCaret — the typed word', () => {
  it('captures a partially typed key', () => {
    expect(at('~ Alice, nam|').word).toBe('nam');
  });

  it('captures a partially typed value', () => {
    expect(at('~ city: New Yo|').word).toBe('New Yo');
  });

  it('is empty right after a separator', () => {
    expect(at('~ Alice, |').word).toBe('');
  });
});
