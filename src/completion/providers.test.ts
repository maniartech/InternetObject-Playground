/**
 * Drives the ACTUAL registered Monaco providers against a fake editor.
 *
 * There is no browser in this suite, so this stands in for clicking: it registers the
 * providers exactly as `setupMonaco` does, hands them a model whose URI decides which
 * pane they think they are completing, and asserts on the suggestions they return.
 */
import { beforeAll, describe, expect, it } from 'vitest';
import { parseDefinitions } from 'internet-object';
import { buildCompletionModel } from './build-model';
import { setCompletionModel } from './model-store';
import { MODEL_PATHS, registerIoProviders } from './providers';

/* eslint-disable @typescript-eslint/no-explicit-any */

const registered: any = {};

/** How many providers of each kind are currently registered and not disposed. */
const active = { completion: 0, signature: 0, hover: 0 };

/** Records a provider and hands back a disposable, exactly as Monaco does. */
function track(kind: 'completion' | 'signature' | 'hover', provider: any) {
  registered[kind] = provider;
  active[kind] += 1;
  let disposed = false;
  return {
    dispose() {
      if (disposed) return;
      disposed = true;
      active[kind] -= 1;
    },
  };
}

const monaco: any = {
  languages: {
    CompletionItemKind: { Field: 3, Value: 12, EnumMember: 16, Class: 5, Keyword: 17, Variable: 4, Snippet: 27, Property: 9 },
    CompletionItemInsertTextRule: { InsertAsSnippet: 4 },
    registerCompletionItemProvider: (_l: string, p: any) => track('completion', p),
    registerSignatureHelpProvider: (_l: string, p: any) => track('signature', p),
    registerHoverProvider: (_l: string, p: any) => track('hover', p),
  },
  Range: class {
    constructor(
      public startLineNumber: number,
      public startColumn: number,
      public endLineNumber: number,
      public endColumn: number
    ) {}
  },
};

// The real `monaco` is an ES module namespace object, which is SEALED. Freezing the fake
// reproduces that: registration once parked its handles on the namespace, which threw
// `Cannot assign to property … of [object Module]` at runtime and blanked the page —
// while this suite passed, because a plain object accepted the write.
Object.freeze(monaco);
Object.freeze(monaco.languages);

/**
 * A Monaco-shaped model over `text`, with the caret at the `|` marker.
 *
 * `findPreviousMatch`, `getValueInRange` and `getOffsetAt` are implemented for real
 * rather than stubbed, because `scanWindow` uses them to bound how much text it reads —
 * so a stub would quietly bypass the very logic that keeps the editor responsive.
 */
function modelFor(source: string, uri: string) {
  const offset = source.indexOf('|');
  if (offset === -1) throw new Error('source must contain a | caret marker');
  const text = source.slice(0, offset) + source.slice(offset + 1);
  const lines = text.split('\n');

  const upto = text.slice(0, offset);
  const line = upto.split('\n').length;
  const col = offset - (upto.lastIndexOf('\n') + 1) + 1;
  const wordMatch = /[\w$@-]*$/.exec(upto)![0];

  const offsetAt = (lineNumber: number, column: number) => {
    let n = 0;
    for (let i = 0; i < lineNumber - 1; i++) n += lines[i].length + 1;
    return n + column - 1;
  };

  const model = {
    uri,
    getValue: () => text,
    getVersionId: () => 1,
    getLineContent: (n: number) => lines[n - 1] ?? '',
    getOffsetAt: (p: any) => offsetAt(p.lineNumber, p.column),

    findPreviousMatch: (search: string, start: any, isRegex: boolean) => {
      const re = new RegExp(isRegex ? search : search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
      // Backwards from the caret's line, then wrapping — as Monaco does.
      const order = [
        ...Array.from({ length: start.lineNumber }, (_, i) => start.lineNumber - i),
        ...Array.from({ length: lines.length - start.lineNumber }, (_, i) => lines.length - i),
      ];
      for (const n of order) {
        const m = re.exec(lines[n - 1] ?? '');
        if (m) return { range: { startLineNumber: n, startColumn: m.index + 1 }, matches: [m[0]] };
      }
      return null;
    },

    getValueInRange: (r: any) => {
      if (r.startLineNumber === r.endLineNumber) {
        return (lines[r.startLineNumber - 1] ?? '').slice(r.startColumn - 1, r.endColumn - 1);
      }
      const out = [(lines[r.startLineNumber - 1] ?? '').slice(r.startColumn - 1)];
      for (let n = r.startLineNumber + 1; n < r.endLineNumber; n++) out.push(lines[n - 1] ?? '');
      out.push((lines[r.endLineNumber - 1] ?? '').slice(0, r.endColumn - 1));
      return out.join('\n');
    },

    getWordUntilPosition: () => ({ startColumn: col - wordMatch.length, endColumn: col }),
    getWordAtPosition: () => (wordMatch ? { word: wordMatch, startColumn: col - wordMatch.length, endColumn: col } : null),
  };
  return { model, position: { lineNumber: line, column: col } };
}

function items(source: string, uri = MODEL_PATHS.document): any[] {
  const { model, position } = modelFor(source, uri);
  const result = registered.completion.provideCompletionItems(model, position);
  return result?.suggestions ?? [];
}

/** Suggestion labels, flattening Monaco's `{label, description}` form to the label. */
function complete(source: string, uri = MODEL_PATHS.document): string[] {
  return items(source, uri).map((s: any) => (typeof s.label === 'string' ? s.label : s.label.label));
}

const HEADER = `
  ~ $address: {street: string, state: {string, choices:[NY, CA, WA]}}
  ~ @officeAddr: {Santacruze, California, CA}
  ~ $schema: {
      name: string,
      gender?: {string, choices:[m, f, u]},
      active: {bool, default: T},
      joined: date,
      addr: $address,
      nickname*: string
    }
`;

beforeAll(() => {
  registerIoProviders(monaco);
  setCompletionModel(buildCompletionModel(parseDefinitions(HEADER.trim(), null, [])));
});

describe('registration', () => {
  it('never writes to the monaco namespace, which is sealed', () => {
    // Registering against a frozen namespace must not throw.
    expect(() => registerIoProviders(monaco)).not.toThrow();
    expect(Object.prototype.hasOwnProperty.call(monaco, '__ioCompletionProviders')).toBe(false);
  });

  it('leaves exactly one provider per kind however often it is called', () => {
    // Vite HMR re-executes the module, which reset the old module-level guard and left a
    // second live provider — every suggestion then appeared twice in the dropdown.
    registerIoProviders(monaco);
    registerIoProviders(monaco);
    expect(active).toEqual({ completion: 1, signature: 1, hover: 1 });
  });

  it('still answers normally after re-registering', () => {
    expect(complete('~ |')).toContain('name');
  });
});

describe('document editor — completion', () => {
  it('offers the schema’s members at the start of a record', () => {
    const labels = complete('~ |');
    expect(labels.slice(0, 5)).toEqual(['name', 'gender', 'active', 'joined', 'addr']);
  });

  it('offers a member’s choices after its key', () => {
    expect(complete('~ gender: |').slice(0, 3)).toEqual(['m', 'f', 'u']);
  });

  it('offers the choices of the POSITIONAL slot, with no key typed at all', () => {
    // Slot 1 of $schema is `gender` — this is the positional case that makes the
    // whole feature worth having for Internet Object specifically.
    expect(complete('~ Alice, |')).toContain('m');
    expect(complete('~ Alice, |')).toContain('f');
  });

  it('offers a nested schema’s choices through a $ref', () => {
    const labels = complete('~ Alice, m, T, d"2024-01-01", {Main St, |');
    expect(labels).toEqual(expect.arrayContaining(['NY', 'CA', 'WA']));
  });

  it('offers a date literal snippet for a date member', () => {
    expect(complete('~ joined: |')).toContain('d""');
  });

  it('offers a boolean member T/F and its default', () => {
    const labels = complete('~ active: |');
    expect(labels).toContain('T');
    expect(labels).toContain('F');
  });

  it('never lists the same value twice', () => {
    // `active: {bool, default: T}` produces `T` as BOTH the default and the literal.
    const labels = complete('~ active: |');
    expect(labels.length).toBe(new Set(labels).size);
  });

  it('merges the purposes of a repeated value into one entry', () => {
    const [t] = items('~ active: |').filter((i: any) => i.label === 'T');
    expect(t.detail).toBe('default value · literal');
    // Both explanations survive, separated by a rule.
    expect(t.documentation.value).toContain('True.');
  });

  it('never lists a duplicate in a positional slot either', () => {
    const labels = complete('~ Alice, |');
    expect(labels.length).toBe(new Set(labels).size);
  });

  it('offers only literals the declared type could hold', () => {
    // A string member is not a boolean and not a number.
    const name = complete('~ name: |');
    expect(name).not.toContain('T');
    expect(name).not.toContain('F');
    expect(name).not.toContain('Inf');
    expect(name).not.toContain('NaN');
  });

  it('offers N only where the member is nullable', () => {
    expect(complete('~ nickname: |')).toContain('N');
    // `active` is `bool` with a default but is not nullable.
    expect(complete('~ active: |')).not.toContain('N');
  });

  it('offers variables as values, without needing the @ typed first', () => {
    // `choices: [@r, @g, @b]` is written by REFERRING to the variables, so they have to
    // be reachable from a plain value position.
    expect(complete('~ name: |')).toContain('@officeAddr');
    expect(complete('~ Alice, |')).toContain('@officeAddr');
  });

  it('drops members the record has already filled positionally', () => {
    // Slots 0 and 1 are taken, so `name` and `gender` must not be offered again.
    const labels = complete('~ "Gatsby", m, |');
    expect(labels).not.toContain('name');
    expect(labels).not.toContain('gender');
    expect(labels).toContain('active');
    expect(labels).toContain('joined');
  });

  it('offers every member at the very start of a record', () => {
    const labels = complete('~ |');
    expect(labels).toContain('name');
    expect(labels).toContain('gender');
  });

  it('drops only the named members once keys are in use', () => {
    // `~ gender: m, |` has NOT filled `name`, so positional exclusion must not apply.
    const labels = complete('~ gender: m, |');
    expect(labels).not.toContain('gender');
    expect(labels).toContain('name');
  });

  it('offers variables after @', () => {
    expect(complete('~ Alice, @|')).toEqual(['@officeAddr']);
  });

  it('replaces the @ rather than inserting a second one', () => {
    // Monaco's default word pattern excludes `@`, so without an adjusted range
    // accepting `@officeAddr` after typing `@` produced `@@officeAddr`.
    const [suggestion] = items('~ Alice, @|');
    const line = '~ Alice, @';
    // Columns are 1-based, so the sigil sits at column `line.length` and the caret at
    // `line.length + 1`. The replaced range must cover the sigil.
    expect(suggestion.range.startColumn).toBe(line.length);
    expect(suggestion.range.endColumn).toBe(line.length + 1);
    expect(suggestion.insertText).toBe('@officeAddr');
  });

  it('replaces the $ of a schema reference exactly once', () => {
    const [suggestion] = items('~ Alice, $|');
    const line = '~ Alice, $';
    expect(suggestion.range.startColumn).toBe(line.length);
    expect(suggestion.range.endColumn).toBe(line.length + 1);
  });

  it('shows each variable’s value beside its name', () => {
    const [v] = items('~ Alice, @|');
    expect(v.label).toEqual({ label: '@officeAddr', description: '{Santacruze, California, CA}' });
    expect(v.detail).toContain('{Santacruze, California, CA}');
    // Filtering must still match on the name, not the rendered value.
    expect(v.filterText).toBe('@officeAddr');
  });

  it('offers named schemas after $, and never synthetic inline keys', () => {
    const labels = complete('~ Alice, $|');
    expect(labels).toEqual(expect.arrayContaining(['$address', '$schema']));
    expect(labels.some((l) => l.includes('.'))).toBe(false);
  });

  it('offers schemas on a section header line, including the default', () => {
    // Naming the document's root schema IS meaningful here, unlike in a type position.
    expect(complete('--- people: $|')).toEqual(expect.arrayContaining(['$address', '$schema']));
  });

  it('suggests nothing inside a comment', () => {
    expect(complete('~ Alice, 30 # note |')).toEqual([]);
  });

  it('suggests nothing inside a string', () => {
    expect(complete('~ "half typed |')).toEqual([]);
  });
});

describe('schema editor — completion', () => {
  const schemaUri = MODEL_PATHS.schema;

  it('offers types after a member’s colon', () => {
    const labels = complete('~ $s: {name: |', schemaUri);
    expect(labels).toEqual(expect.arrayContaining(['string', 'int', 'bool', 'date', 'array', 'object']));
  });

  it('never offers a type the spec reserves', () => {
    const labels = complete('~ $s: {name: |', schemaUri);
    for (const reserved of ['int64', 'uint64', 'float32', 'float64']) {
      expect(labels).not.toContain(reserved);
    }
  });

  it('offers $refs alongside types', () => {
    expect(complete('~ $s: {addr: |', schemaUri)).toEqual(expect.arrayContaining(['$address']));
  });

  it('never offers $schema where a TYPE is expected', () => {
    // `$schema` designates the document's default schema; it is written on the left of a
    // definition, not used as a member's type. And `$` sorts first, so leaving it in made
    // it the pre-selected entry — Enter would have inserted it.
    expect(complete('~ $s: {addr: |', schemaUri)).not.toContain('$schema');
    expect(complete('~ $s: {addr: {|', schemaUri)).not.toContain('$schema');
  });

  it('still offers $schema once the reader has typed $', () => {
    // Typing the sigil makes the intent explicit, so nothing is hidden at that point.
    expect(complete('~ $s: {addr: $|', schemaUri)).toContain('$schema');
  });

  it('offers a type’s constraints inside a constraint object', () => {
    const labels = complete('~ $s: {name: {string, |', schemaUri);
    expect(labels).toEqual(expect.arrayContaining(['minLen', 'maxLen', 'pattern', 'choices', 'optional']));
  });

  it('offers constraints appropriate to the type, not a generic list', () => {
    const numeric = complete('~ $s: {age: {int, |', schemaUri);
    expect(numeric).toEqual(expect.arrayContaining(['min', 'max', 'multipleOf']));
    expect(numeric).not.toContain('minLen');

    const decimal = complete('~ $s: {price: {decimal, |', schemaUri);
    expect(decimal).toEqual(expect.arrayContaining(['precision', 'scale']));
  });

  it('documents each constraint with its meaning and a worked example', () => {
    const [minLen] = items('~ $s: {name: {string, |', schemaUri).filter(
      (i: any) => i.label === 'minLen'
    );
    // The detail line is visible without expanding anything, so it carries both the
    // constraint's own type and what it does.
    expect(minLen.detail).toBe('number — Minimum length, measured in Unicode code points.');
    // The details pane gets the full explanation plus valid syntax to copy.
    expect(minLen.documentation.value).toContain('**minLen**');
    expect(minLen.documentation.value).toContain('name: {string, minLen: 2}');
    expect(minLen.documentation.value).toContain('```io');
  });

  it('lists a constraint’s allowed values in its documentation', () => {
    const [format] = items('~ $s: {name: {string, |', schemaUri).filter(
      (i: any) => i.label === 'format'
    );
    expect(format.documentation.value).toContain('`auto`');
    expect(format.documentation.value).toContain('`raw`');
  });

  it('documents each type with an example and its constraint list', () => {
    const [decimal] = items('~ $s: {price: |', schemaUri).filter((i: any) => i.label === 'decimal');
    expect(decimal.detail).toBe('Exact decimal number — no floating-point rounding.');
    expect(decimal.documentation.value).toContain('**decimal**');
    expect(decimal.documentation.value).toContain('precision');
    expect(decimal.documentation.value).toContain('scale');
  });

  it('offers a constraint’s own allowed values', () => {
    expect(complete('~ $s: {name: {string, format: |', schemaUri)).toEqual(['auto', 'regular', 'raw']);
  });

  it('offers types at slot 0 of a constraint object', () => {
    expect(complete('~ $s: {name: {|', schemaUri)).toEqual(expect.arrayContaining(['string', 'int']));
  });

  it('does not offer data values where a member is being declared', () => {
    // `{name: string}` is a declaration — its keys are the author's own names.
    expect(complete('~ $s: {|', schemaUri)).toEqual([]);
  });
});

describe('signature help — positional records', () => {
  function sig(source: string, uri = MODEL_PATHS.document) {
    const { model, position } = modelFor(source, uri);
    return registered.signature.provideSignatureHelp(model, position);
  }

  it('lists the schema’s members and highlights the active slot', () => {
    const help = sig('~ Alice, |');
    expect(help.value.signatures[0].parameters.map((p: any) => p.label)).toEqual([
      'name: string',
      'gender?: string',
      'active: bool',
      'joined: date',
      'addr: $address',
      'nickname*: string',
    ]);
    expect(help.value.activeParameter).toBe(1);
  });

  it('advances the active slot with each comma', () => {
    expect(sig('~ |').value.activeParameter).toBe(0);
    expect(sig('~ a, b, |').value.activeParameter).toBe(2);
  });

  it('clamps past the last member rather than pointing at nothing', () => {
    expect(sig('~ a, b, c, d, e, f, g, |').value.activeParameter).toBe(5);
  });

  it('switches to the nested schema inside an object', () => {
    const help = sig('~ Alice, m, T, d"2024-01-01", {|');
    expect(help.value.signatures[0].parameters.map((p: any) => p.label)).toEqual(['street: string', 'state: string']);
  });

  it('is silent in the schema editor', () => {
    expect(sig('~ $s: {name: |', MODEL_PATHS.schema)).toBeNull();
  });
});

describe('hover', () => {
  function hover(source: string, uri = MODEL_PATHS.document) {
    const { model, position } = modelFor(source, uri);
    return registered.hover.provideHover(model, position);
  }

  it('describes a member under the pointer', () => {
    const h = hover('~ gender|');
    expect(h.contents[0].value).toContain('gender?: string');
    expect(h.contents[0].value).toContain('m');
  });

  it('describes a $ref as its schema', () => {
    const h = hover('~ Alice, $address|');
    expect(h.contents[0].value).toContain('$address');
    expect(h.contents[1].value).toContain('street: string');
  });

  it('returns nothing for an unknown word', () => {
    expect(hover('~ zzzz|')).toBeNull();
  });
});
