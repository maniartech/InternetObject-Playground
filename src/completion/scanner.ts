/**
 * Works out what the caret is positioned to complete, from the document text alone.
 *
 * **This is the only part of the feature that runs on the UI thread**, because Monaco's
 * completion providers are synchronous and a suggestion must reflect the character just
 * typed — a 500ms-old answer from the worker would be wrong, not merely stale. It is
 * therefore written to be *bounded*: it never scans the whole document per keystroke.
 *
 * Two bounds do that work:
 *  - `findSections` is a single pass, memoized by the caller against Monaco's model
 *    version, so it runs once per edit rather than once per suggestion.
 *  - The character-level scan starts at the caret's own section, and falls back to the
 *    nearest preceding `~` record marker once a section grows past `MAX_EXACT_SCAN`.
 *    Exact for documents of ordinary size; still O(one record) for a huge one.
 */

import type { CaretContext, CaretMode } from './types';

/**
 * Above this many characters between the section start and the caret, the scan gives up
 * on exactness and restarts from the nearest `~`. 64 KB of a single section is far more
 * than any hand-written record, and keeping the per-keystroke cost flat matters more
 * than perfect nesting analysis in a document that large.
 */
const MAX_EXACT_SCAN = 65536;

export interface SectionMark {
  /** Offset of the first character AFTER the section header line. */
  start: number;
  /** The `$schema` named in the header, if any. */
  schema: string | null;
}

/**
 * Finds every `---` section separator and the schema each section declares.
 *
 * Header forms: `---`, `--- $person`, `--- people: $person`. A separator is recognised
 * only at the very start of a line, which is where the format puts it.
 */
export function findSections(text: string): SectionMark[] {
  const marks: SectionMark[] = [];
  let i = 0;

  while (i < text.length) {
    const lineEnd = text.indexOf('\n', i);
    const end = lineEnd === -1 ? text.length : lineEnd;

    if (text.startsWith('---', i)) {
      const header = text.slice(i + 3, end);
      // `people: $person` names the schema after the colon; `$person` is the whole rest.
      const colon = header.indexOf(':');
      const ref = (colon === -1 ? header : header.slice(colon + 1)).trim();
      marks.push({ start: end + 1, schema: ref.startsWith('$') ? ref : null });
    }

    if (lineEnd === -1) break;
    i = lineEnd + 1;
  }

  return marks;
}

/** The section containing `offset`, or null when the caret is in the document header. */
function sectionAt(marks: SectionMark[], offset: number): SectionMark | null {
  let found: SectionMark | null = null;
  for (const m of marks) {
    if (m.start > offset) break;
    found = m;
  }
  return found;
}

/** One level of `{}` / `[]` nesting; the root record is a frame too. */
interface Frame {
  bracket: '{' | '[' | 'root';
  /** How many commas have been passed at this level — the current positional slot. */
  slot: number;
  /** The member name of the `key:` currently being filled at this level, if any. */
  key: string | null;
  /** Whether a `:` has been seen since the last comma — i.e. we are past a key. */
  sawColon: boolean;
  /** Offset where the token under construction began. */
  tokenStart: number;
  /** The member name this frame was entered through (`addr: {` → `addr`). */
  label: string | null;
  /** Offset of the first character inside this frame. */
  start: number;
  /** Raw text of slot 0, captured when the first comma closes it. */
  head: string | null;
  /** Member names given explicitly as `name:` at this level. */
  keys: string[];
}

/**
 * Resolves the caret's position into a completion context.
 *
 * @param text   The full document text.
 * @param offset The caret's character offset into `text`.
 * @param marks  Section separators, from `findSections`. Pass a memoized value; it is
 *               computed here only as a convenience for tests.
 */
export function scanCaret(text: string, offset: number, marks?: SectionMark[]): CaretContext {
  const sections = marks ?? findSections(text);
  const section = sectionAt(sections, offset);
  const sectionSchema = section ? section.schema : null;
  const sectionStart = section ? section.start : 0;

  // The caret sitting on a `---` line is completing the header itself, not a record.
  const lineStart = text.lastIndexOf('\n', offset - 1) + 1;
  if (text.startsWith('---', lineStart)) {
    return {
      mode: 'sectionHeader',
      sectionSchema: null,
      path: [],
      brackets: [],
      slotPath: [],
      word: text.slice(lineStart, offset).replace(/^---/, '').replace(/^.*:/, '').trim(),
      inArray: false,
      frameHead: null,
      usedKeys: [],
    };
  }

  // Where to begin the exact scan (see MAX_EXACT_SCAN).
  let start = sectionStart;
  if (offset - sectionStart > MAX_EXACT_SCAN) {
    const lastRecord = text.lastIndexOf('\n~', offset);
    if (lastRecord > sectionStart) start = lastRecord + 1;
  }

  const root: Frame = { bracket: 'root', slot: 0, key: null, sawColon: false, tokenStart: start, label: null, start, head: null, keys: [] };
  const stack: Frame[] = [root];
  const top = () => stack[stack.length - 1];

  let i = start;
  while (i < offset) {
    const ch = text[i];

    // Comments run to end of line.
    if (ch === '#') {
      const nl = text.indexOf('\n', i);
      if (nl === -1 || nl >= offset) {
        // The caret is inside the comment — nothing to suggest.
        return { mode: 'none', sectionSchema, path: [], brackets: [], slotPath: [], word: '', inArray: false, frameHead: null, usedKeys: [] };
      }
      i = nl + 1;
      top().tokenStart = i;
      continue;
    }

    // Quoted strings, with backslash escapes. Tagged strings (`d"..."`) fall out of this
    // naturally: the tag is an ordinary token and the quote starts the string.
    if (ch === '"' || ch === "'") {
      const quote = ch;
      let j = i + 1;
      while (j < text.length) {
        if (text[j] === '\\') { j += 2; continue; }
        if (text[j] === quote) break;
        j++;
      }
      if (j >= offset) {
        // Caret is inside the string literal.
        return { mode: 'none', sectionSchema, path: [], brackets: [], slotPath: [], word: '', inArray: false, frameHead: null, usedKeys: [] };
      }
      i = j + 1;
      continue;
    }

    if (ch === '{' || ch === '[') {
      const parent = top();
      const label = parent.sawColon ? parent.key : null;
      stack.push({ bracket: ch, slot: 0, key: null, sawColon: false, tokenStart: i + 1, label, start: i + 1, head: null, keys: [] });
      i++;
      continue;
    }

    if (ch === '}' || ch === ']') {
      if (stack.length > 1) stack.pop();
      const f = top();
      f.sawColon = false;
      f.key = null;
      f.tokenStart = i + 1;
      i++;
      continue;
    }

    if (ch === ',') {
      const f = top();
      // Slot 0's text identifies what kind of object this is (a type, or a member name).
      if (f.slot === 0) f.head = text.slice(f.start, i).trim();
      f.slot++;
      f.key = null;
      f.sawColon = false;
      f.tokenStart = i + 1;
      i++;
      continue;
    }

    if (ch === ':') {
      const f = top();
      // A second colon at the same level (inside a time literal, say) must not re-key.
      if (!f.sawColon) {
        f.sawColon = true;
        f.key = text.slice(f.tokenStart, i).trim().replace(/[?*]+$/, '');
        if (f.key) f.keys.push(f.key);
      }
      f.tokenStart = i + 1;
      i++;
      continue;
    }

    // A `~` at the start of a line begins a new record: reset the root frame.
    if (ch === '~' && (i === 0 || text[i - 1] === '\n')) {
      stack.length = 1;
      root.slot = 0;
      root.key = null;
      root.sawColon = false;
      root.tokenStart = i + 1;
      root.label = null;
      i++;
      continue;
    }

    i++;
  }

  const frame = top();
  const word = text.slice(frame.tokenStart, offset).trimStart();

  let mode: CaretMode;
  if (word.startsWith('@')) mode = 'variable';
  else if (word.startsWith('$')) mode = 'schemaRef';
  else if (frame.sawColon) mode = 'value';
  else if (frame.bracket === '[') mode = 'positional';
  else mode = 'key';

  return {
    mode,
    sectionSchema,
    // The root frame is not a descent step, so it is dropped from both.
    path: stack.slice(1).map((f) => f.label),
    brackets: stack.slice(1).map((f) => f.bracket as '{' | '['),
    frameHead: frame.slot === 0 ? text.slice(frame.start, offset).trim() : frame.head,
    usedKeys: frame.keys.slice(),
    slotPath: stack.map((f) => f.slot),
    word,
    inArray: frame.bracket === '[',
  };
}
