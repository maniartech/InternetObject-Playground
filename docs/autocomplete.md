# Playground Autocomplete — IntelliSense for Internet Object

> **Goal:** Schema-aware completion in the playground's Monaco editors — real member
> names, real types, real `choices`, plus positional-slot guidance for `~` records.
>
> **HARD RULE:** No parser/validation semantics change. The library is a *source of
> truth to read*, never a thing this feature rewrites. Everything below either reads
> `IOSchema`/`IODefinitions`/`TypedefRegistry` or scans text in the editor.

---

## ▶ RESUME HERE — current state

- **Phase:** IMPLEMENTED, all four phases. **Not committed — awaiting review.**
- **Constraint held:** playground-only. No io-js2 file was modified.
- **Verified:** `tsc --noEmit` clean · 148 tests pass (122 of them for this feature) ·
  `vite build` green · dev server boots and every new module transforms · confirmed
  working live in the browser (signature help + completion).
- **Not verified:** no browser automation exists in this environment, so nothing was
  click-tested by me. The provider tests drive the real registered Monaco callbacks
  against a fake model, which covers behaviour but not rendering.
- **ESLint does not run in this repo at all** — it has a legacy `.eslintrc.json` and the
  installed ESLint is v10, which requires flat config. Pre-existing; unrelated to this work.

### Files

New — `src/completion/`:
| File | Role |
|---|---|
| `types.ts` | The worker↔editor vocabulary: `CompletionModel`, `CaretContext` |
| `io-types.ts` | Static type/constraint vocabulary mirrored from io-js2 (see provenance note in-file) |
| `build-model.ts` | **Worker side.** Flattens `IODefinitions` into a cycle-free model |
| `scanner.ts` | **UI side, pure.** Caret → `CaretContext`. Bounded, no whole-document scan |
| `model-store.ts` | Holds the latest model outside React; schema-path resolution |
| `providers.ts` | Monaco completion · signature help · hover; `scanWindow` bounds the text read |
| `*.test.ts` | scanner · build-model · resolve (end-to-end) · providers (fake Monaco) |

Changed: `monaco.ts` (register providers) · `parser.worker.ts` (build + attach the model)
· `use-parser-worker.ts` + `use-parse-io-v2.ts` (carry it, push to the store)
· `EditorPane.tsx` (`path` prop) · `App.tsx` + `MobileWorkspace.tsx` (pass model paths)
· `vitest.config.ts` (fix a broken alias — see below).

### Fixed along the way

- **`vitest.config.ts` aliased `internet-object` to `../io-js2/dist/index.js`, which the
  library does not emit** (its build produces `dist/esm/` and `dist/cjs/`). Every test
  importing the library failed to resolve. Now resolved from the sibling source checkout,
  preferring it over the pnpm-copied snapshot for the reason `vite.config.ts` already
  documents.
- **Hover treated `$` as absent from the word** and built `$$address`; Monaco's default
  word pattern includes `$`. Caught by the provider tests.

### Refinements from live use

- Members already filled by a record are no longer re-offered —
  `~ "Gatsby", "Fitzgerald", |` suggests `isbn` onward, not `title`/`author` again.
  Positional exclusion applies only while the record is purely positional; once any
  member is named explicitly, only the named ones are removed.
- **Variables are offered as values**, not only after typing `@`. A schema whose choices
  are variables (`choices: [@r, @g, @b]`) is written by referring to them.
- **Literals are filtered by the slot's declared type** — no more `F`/`-Inf` in a
  `number` or `string` slot; `N` appears only where the member is nullable.
- **Accepting a variable inserted a second sigil** (`@@r`). Monaco's default word pattern
  EXCLUDES `@` (though it includes `$`), so the sigil fell outside the replaced range.
  `replaceRange` now extends left over a leading `@`/`$`. Covered by a test asserting the
  range's actual start/end columns.
- **Variables show their value** — `@r` renders as `@r  red`, `@officeAddr` as
  `{Santacruze, California, CA}`. `defs.get('@name')` returns a plain primitive for a
  scalar and an `IOObject`/`Array` for a structure; positional objects are rendered
  positionally rather than as the `{"0": …}` keys `toJSON()` produces. Previews are
  truncated to 60 characters, and `filterText` keeps type-ahead matching on the NAME so
  typing `@r` still filters correctly.
- **Schema suggestions explain themselves.** Every type and constraint in `io-types.ts`
  now carries a `doc` sentence *and* a worked `example`, rendered as markdown with an
  ` ```io ` block. The constraint's `detail` line shows `type — what it does` (visible
  without expanding anything); the details pane adds the example and, for constraints
  like `format`, the allowed values.
  - Monaco keeps that pane collapsed until Ctrl+Space and reads the preference from a
    storage service the standalone build holds **in memory only** — so there is no option
    to set. `expandSuggestionDetailsOnce` toggles it the first time the widget appears,
    which writes the preference for the session. It is **module-level guarded**: the
    command is a flip, so a second editor doing it would close the pane the first opened.
    This touches Monaco internals (`suggestController.widget`), so it is wrapped in
    try/catch — worst case the pane stays collapsed and nothing else is affected.
  - `suggest.showStatusBar` is on, so the toggle is discoverable rather than hidden.
- **Every suggestion appeared twice.** A module-level `registered` flag does not survive
  Vite HMR: re-executing the module reset it while the previous registration was still
  live, leaving two providers on `io`. The handles are now parked on the **monaco
  namespace object** … which turned out to be **sealed**: `monaco` is an ES *module
  namespace object*, so the assignment threw `Cannot assign to property … of
  [object Module]` and blanked the page. The handles live on **`globalThis`** instead —
  the one store that both survives module re-execution and accepts a property.
  - The first attempt passed its own test because the fake `monaco` in the suite was a
    plain, writable object. The fake is now `Object.freeze`d to match reality, plus an
    explicit test that registering against a sealed namespace does not throw and does not
    write to it. Regression-tested alongside repeated `registerIoProviders` calls
    asserting one live provider per kind.
- **The details pane is now set, not toggled.** The earlier approach drove the widget's
  own toggle on first show; that only expands when an item already has focus, and would
  flip the pane *shut* if it ran twice. `monaco.ts` instead writes `expandSuggestionDocs`
  straight into Monaco's storage service (`StandaloneServices.get(IStorageService)`)
  before any widget exists. A sentinel key makes it a default rather than a policy, so a
  reader who collapses the pane keeps it collapsed.
- **`$schema` is no longer offered where a TYPE is expected.** It is not a reusable type:
  it designates the document's default schema and is written on the *left* of a
  definition (`~ $schema: $employee`). Recursion goes through named schemas instead
  (`managers?*: $employee`) — which is what both recursive samples do. Leaving it in was
  actively harmful rather than untidy: `$` sorts before every letter, so it became the
  **pre-selected** entry in every type position and Enter would insert it. It is still
  offered on a `---` section header, and once the reader has typed `$` — both make the
  intent explicit.
- **A value serving two purposes is now one entry.** `active: {bool, default: T}` emitted
  `T` twice — once as the default, once as the boolean literal — as two visually
  identical rows. `mergeByLabel` collapses same-label suggestions, keeping the
  highest-priority entry as the base and joining the others' details and documentation
  (`default value · literal`).

## Revisions after empirical probing (2026-08-31)

Verified against the real `dist/esm` build before writing any code.

1. **DROPPED: the `parse` → `parseDocument` swap.** `parseDocument(source, defs?, sink?)`
   takes **no options parameter** — the swap would have silently dropped `skipErrors` and
   broken that toggle. Replaced by: split the document at the first line beginning `---`
   and feed the header to the already-exported `parseDefinitions(headerText, defs, sink)`.
   Confirmed to return full defs for inline headers, for a bare header
   (`name: string, age: int` → `$schema`), and to correctly yield nothing when there is no
   header. **This leaves the existing `parse()` call completely untouched** — strictly
   better against the reuse-unchanged rule than the original plan.
2. **DROPPED: exporting `TypedefRegistry` from io-js2.** Its `exports` map publishes only
   `.` and `./package.json`, so deep imports are blocked by Vite/Node resolution — the
   registry is genuinely unreachable without a core change. Per the playground-only
   constraint, the schema editor's type/constraint vocabulary is a **local table** in
   `completion/io-types.ts`, carrying a provenance comment naming the io-js2 files it
   mirrors. Accepted cost: it must be updated by hand when io-js2 adds a type.

### Shape of `MemberDef` as actually built (drives the flattener)

- `$ref` members are **unresolved**: `addr: $address` → `d.type === 'object'` and
  `d.schema` is a **`TokenNode`** whose `.value` is the string `'$address'`. Resolve by
  name against `defs`. (`d.schemaRef`, a plain string, exists on some paths — check both.)
- Inline objects → `d.schema` is a real **`IOSchema`** (its `.name` is the *member* name,
  so it is **not** unique — synthetic keys must be path-derived).
- Arrays → `d.of`: `{type:'string'}` for `[string]`; `{type:'object', schema:TokenNode}`
  for `[$book]`; `{type:'object', schema:IOSchema}` for `[{a:int}]`; `undefined` for a
  bare `array`.
- Because refs are stored **by name**, the raw structure holds no cycles at all; a
  `visited` set over emitted keys is still required since resolution reintroduces them.
- **Variables** (`@officeAddr`) are stored as raw **AST nodes**, not values — completion
  offers the name only, never a rendered value.
- A malformed schema **throws** out of `parseDefinitions` even when a sink is supplied,
  so the flattener must be wrapped in try/catch (a half-typed schema is the *normal*
  state while someone is typing).

---

## Decisions taken

| Question | Decision |
|---|---|
| Which editors | **Both** — document editor *and* schema editor |
| Depth | **Schema-aware completion + positional hints** for `~` records |
| Freshness | **Reuse the existing 500ms debounced worker parse** — no second request path |

---

## Why this is tractable

1. **`IOSchema` is fully introspectable** (`io-js2/src/schema/schema.ts`): `names`,
   `defs` (each a `MemberDef` with `type`, `optional`, `null`, `default`, `choices`),
   and `open`/`wildcard`. `IODefinitions.keys` enumerates `$schemas` and `@variables`.
2. **Every typedef declares its own constraint set as an `IOSchema`**, exposed via
   `TypeDef.get schema()` — e.g. `types/string.ts` declares `default, choices, pattern,
   flags, len, minLen, maxLen, format, escapeLines, encloser, optional, null`, several
   carrying their own `choices` (`format: auto|regular|raw`). Driving the schema-editor
   completions off `TypedefRegistry` means **the suggestion list cannot drift from the
   library** — a new type or constraint shows up for free.

---

## Architecture

Two halves, split along the thread boundary. The rule: **all schema *resolution* happens
in the worker** (it has the library and the `defs`); **the main thread only does text
scanning and map lookups**.

```
 worker (has io-js2 + IODefinitions)          main thread (Monaco)
 ────────────────────────────────────         ─────────────────────────────
 parse (existing, debounced 500ms)            completionModelRef  (mutable)
   └─ buildCompletionModel(defs) ──────────►      ▲
        flatten schema graph                      │ read by
        to serializable maps                      │
                                             ┌────┴─────────────────────┐
                                             │ scanner: caret → path    │
                                             │ providers: completion,   │
                                             │   signature help, hover  │
                                             └──────────────────────────┘
```

### 1. Worker: the completion model

Extend `ParseResponse['result']` with one new field. Everything is a **flat map of
string-keyed entries** — never a nested object graph, so recursive schemas
(`sample-data/recursive-schema.ts`) are cycle-safe by construction:

```ts
interface CompletionModel {
  schemas:   Record<string, SchemaInfo>;  // '$person', and synthetic '$person.address'
  sections:  { name: string | null; schemaName: string | null }[];
  variables: string[];                    // '@officeAddr'
  defaultSchema: string | null;           // '$schema'
}

interface SchemaInfo {
  name: string;
  open: boolean;
  members: {
    name: string;
    type: string;                 // 'string' | 'int' | 'object' | 'array' | ...
    optional: boolean;
    nullable: boolean;
    default?: unknown;
    choices?: unknown[];
    objectSchema?: string;        // key into `schemas`
    arrayItem?: { type: string; objectSchema?: string };
  }[];
}
```

Anonymous inline schemas (`currentAddress: {street: string, ...}`) get a synthetic key
derived from their path. Named refs (`$address`) point at the real key.

Nested-schema resolution must mirror what the library already does — `memberDef.schema`
(a `Schema`, or a variable ref) **or** `memberDef.schemaRef` (a name resolved against
`defs`); for arrays, `memberDef.of` (`Schema | {type} | string`) or `memberDef.schemaRef`.
See `io-js2/src/schema/types/object.ts` and `types/array.ts`. Doing this in the worker is
the whole point: the main thread must not reimplement it.

**Two changes to `workers/parser.worker.ts`:**
- `parseDoc` switches `parse(...)` → `parseDocument(...)` so defs exist on the **inline
  header** path too (today defs only exist in separate-schema mode). Same pipeline, same
  validation, richer return; JSON output then comes from `.toObject()`.
- On success, build and attach `completionModel`.

> ⚠ This touches the parse path that `playground-redesign.md` marks reuse-unchanged.
> It is additive — no error/marker/JSON behaviour changes — and is covered by the
> snapshot check in Verification below.

### 2. Static model (no worker needed)

Built once on the main thread from `TypedefRegistry`, for the **schema editor**:
type names, and per-type constraint keys + their `choices`.

`TypedefRegistry` is **not currently exported** from `io-js2/src/index.ts`. Cleanest fix
is to add the export there (one line) rather than hardcode a type list that will rot.

### 3. Main thread: the caret scanner

A small, forgiving scanner — *not* a parser. Given (text, caret) it returns:

```ts
interface CaretContext {
  section: string | null;      // from the nearest preceding '---' header
  schemaName: string | null;
  path: string[];              // member path, e.g. ['currentAddress']
  slotIndex: number;           // positional slot at the current depth
  mode: 'key' | 'value' | 'positional' | 'sectionHeader' | 'variable' | 'schemaRef';
}
```

It scans from the start of the current record (last line beginning `~`, or section start)
to the caret, tracking bracket depth, string/comment state, comma counts per depth, and
the last `key:` seen per depth. Must respect: `#` comments, `'`/`"` strings, tagged
strings (`d'2024-01-20'`), and `?`/`?*` member modifiers.

### 4. Monaco providers

Registered **once, globally, per language** (not per editor) in `monaco.ts`, reading a
module-level mutable ref that `App.tsx` updates when a parse result lands.

The two `io` editors are told apart by **model URI** — so `EditorPane` gains a `path`
prop and `App.tsx` passes stable paths (`inmemory://io/document.io`,
`inmemory://io/schema.io`). Today `@monaco-editor/react` auto-generates these and they
are not distinguishable.

| Provider | Editor | Behaviour |
|---|---|---|
| `registerCompletionItemProvider` | document | member names after `{`/`,` when typing a key; `choices` values after `key:`; `T`/`F`/`N`; `$schema` after `$`; `@var` after `@`; section refs after `--- ` |
| `registerCompletionItemProvider` | schema | type names; constraint keys per type; constraint `choices`; `$ref`s to defined schemas; `@vars` |
| `registerSignatureHelpProvider` | document | **the positional feature** — triggered on `~`, `,`, `{`; shows the member list of the active schema with Monaco highlighting the active slot |
| `registerHoverProvider` | both | member's full `MemberDef` — type, optional, nullable, default, choices |

---

## Decisions still open

1. **Positional hints — signature help, inlay hints, or both?**
   Signature help (recommended) is the idiomatic "which slot am I in" UI, appears only
   while typing, and Monaco highlights the active parameter for free. Inlay hints render
   `age:` ghost text permanently before each positional value — striking in a demo, but
   visually noisy on a wide collection and needs exact per-value offsets. *Recommendation:
   signature help in Phase 3; inlay hints as an opt-in follow-up if it feels wanting.*
2. **Export `TypedefRegistry` from io-js2's `index.ts`?** Recommended — the alternative
   is a hardcoded list in the playground that silently rots.
3. **Accept the `parse` → `parseDocument` swap in the worker?** Required for schema-aware
   completion in inline-header documents (i.e. most samples).

---

## Phases (app must run green after each)

1. **Static schema-editor completion** — `TypedefRegistry` export; static model; the
   `path` prop on `EditorPane`; completion provider for the schema editor. Self-contained,
   no worker change, immediately useful.
2. **Schema-aware document completion** — worker `completionModel`; the caret scanner;
   document completion provider (keys, choices, `$`/`@` refs, section headers).
3. **Positional slot guidance** — signature help provider driven by `slotIndex`.
4. **Hovers + polish** — hover provider both editors; suggestion icons/detail/docs;
   trigger characters tuned; dark/light styling check.

## Verification

- Unit tests (vitest, alongside `utils/errorSorting.test.ts`) for the **scanner** —
  it is the only genuinely tricky logic: nested brackets, strings, tagged strings,
  comments, `?*` modifiers, sections, recursive schemas.
- Unit tests for `buildCompletionModel` against the `sample-data/` corpus — every sample
  must flatten without throwing and without infinite recursion.
- Snapshot: JSON output + markers for all samples **unchanged** before/after the
  `parseDocument` swap. This is the guard on the hard rule.
- Manual: `multiple-sections`, `variable-and-schema-refs`, `recursive-schema` — the three
  samples that exercise sections, refs/variables, and cycles.
- `npm run build:check` (tsc + vite build) green.
