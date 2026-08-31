# Playground Autocomplete — IntelliSense for Internet Object

> **Goal:** Schema-aware completion in the playground's Monaco editors — real member
> names, real types, real `choices`, plus positional-slot guidance for `~` records.
>
> **HARD RULE:** No parser/validation semantics change. The library is a *source of
> truth to read*, never a thing this feature rewrites. Everything below either reads
> `IOSchema`/`IODefinitions`/`TypedefRegistry` or scans text in the editor.

---

## ▶ RESUME HERE — current state

- **Phase:** PLAN — awaiting sign-off. No code written yet.
- **Next:** approve the open questions in "Decisions still open", then implement Phase 1.

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

> ⚠ This touches the parse path that `PLAYGROUND-REDESIGN.md` marks reuse-unchanged.
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
