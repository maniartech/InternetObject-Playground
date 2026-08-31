# Playground Redesign — Modern, Responsive, MUI + React 19

> **Goal:** Rebuild the Internet Object Playground UI to match the *structure* of a
> sibling playground application (React 19 + MUI 6 + Monaco + `react-resizable-panels`,
> one token source, a real mobile path) — modern and fully responsive.
>
> **HARD RULE (non-negotiable):** Every existing playground feature must keep working.
> This is a **presentation-layer rework**, not a parser/logic rewrite. All parsing,
> worker, sample-data, sharing, and error logic is **reused unchanged**.

---

## ▶ RESUME HERE — current state

- **Phase:** COMPLETE. All 4 phases implemented. `tsc --noEmit` clean; `vite build` green.
  **Runtime-verified in a live dev server (no console errors):** app boot · 26 samples in groups
  + routing · worker parse → real JSON output (models inspected) · byte counts + comparison badge ·
  error markers (5 err + 7 warn) + "Compiled with N problems" overlay + category prefixes +
  click-to-navigate · Separate-Schema (schema pane populates) · theme dark↔light (persisted) ·
  Minify (json 1056→699 B, persisted) · Share dialog (URL with d/s/sep/min/skip + LZString +
  setting tags) · Import-JSON dialog (embedded editor) · mobile tabs (Schema/Document/JSON, one
  editor visible) · mobile samples drawer + nav links · desktop PanelGroup (3 panes, 3 handles).
  Note: MUI `useMediaQuery` re-renders on real browser resize; the CDP preview harness doesn't
  fire matchMedia change events, so each layout was verified by mounting at that width.
- **Not exhaustively clicked (verbatim-ported, same wiring as verified siblings):** Reset button
  (isDirty), Welcome snackbar first-visit, Share "Shorten" network calls.

### Post-build refinements (all verified live)
- Immersive shell: transparent header/footer (no bg/border); workspace has px-only breathing
  margin (header/footer content vertically centered).
- Sidebar is a rounded card matching the editor panes.
- Monaco white-pane race fixed: themes defined in `beforeMount` (not `onMount`).
- Separate-Schema toggle moved to the **Document** pane header (desktop); schema panel is
  toggle-only (no drag handle when collapsed — conditional Panel render, no imperative collapse).
- Footer: responsive (cursor hidden `<sm`), dynamic year (`getFullYear`).
- Mobile tabs: name-only labels + vertical separators; a selection-tinted **status row** under
  the tabs shows `{bytes} · {comparison}`, and on the JSON tab hosts the **Minify + Skip Errors**
  toggles (previously unreachable on mobile).
- Mobile errors: cross-tab **problems bar + bottom drawer** (`ProblemList` shared with desktop
  overlay); clicking a problem opens its source editor (schema vs document) with the position
  selected (`schemaSelection` added; navigate takes the full `ErrorItem`).
- Mobile header actions collapsed into a labeled **kebab menu** (Separate Schema / JSON to IO /
  Share / theme). MUI `Menu` opens+unmounts cleanly under React 19 here.
- Share dialog mobile: URL full-width row, Shorten/Copy split below, tighter padding/margins.
- **Env note:** the `file:../io-js2` dependency needs a sibling checkout of the library
  next to this repository. See the README for how dev resolves it from source.
- **New structure (all under `src/`):** `App.tsx`, `main.tsx`, `monaco.ts`, `url.ts`,
  `theme/muiTheme.ts`, `types/cursor.ts`, `components/{Header,Sidebar,EditorPane,PaneHeader,
  OutputPane,StatusBar,ResizeHandle,MobileWorkspace}.tsx`, `components/dialogs/{Share,ImportJson,
  Warning,WelcomeNotification}.tsx`, `styles/global.css` (Monaco squiggle/decoration CSS only).
  Reused unchanged: `hooks/{use-parse-io-v2,use-parser-worker}`, `workers/parser.worker`,
  `types/errors`, `utils/*`, `sample-data/*`, `reportWebVitals`.
- **Removed:** old `pages/`, `states/` (recoil), `components/{header,logo,toolbar,bar,editor,
  output,overlay,tab,button-menu,*-dialog,welcome-notification}`, `styles/{index,root,tags,
  toggle,general-classes}.css`, `index.tsx`, `config-overrides.js`, `use-debounce`,
  `types/split-pane-react.d.ts`. Deps: dropped recoil/split-pane-react/react-toggle/prop-types;
  added mui/emotion/react-resizable-panels/fontsource-inter; React 18→19; monaco 0.44→0.52.

---

## Reference structure

```
src/
  main.tsx                   entry; ThemeProvider lives in App
  App.tsx                    mode+isMobile; desktop grid vs <MobileWorkspace>
  theme/muiTheme.ts          Tokens iface + palette{dark,light} + makeTheme + TokensContext
  monaco.ts                  language + themes fed from tokens
  components/
    Header.tsx  Sidebar.tsx  EditorPane.tsx  OutputDock.tsx
    StatusBar.tsx  ResizeHandle.tsx  MobileWorkspace.tsx
  worker/ hooks/ url.ts types.ts data/
```

Key patterns to copy:
1. **One token source** — `Tokens` interface, `palette: Record<Mode,Tokens>`,
   `makeTheme(mode)` builds MUI theme from tokens, `TokensContext`/`useTokens()` exposes
   raw tokens to `sx`. Same tokens feed Monaco themes. (Fixes IO's bypassed CSS vars.)
2. **Two render paths** — `isMobile = useMediaQuery(theme.breakpoints.down('md'))` →
   `<MobileWorkspace>` else desktop grid `52px 1fr 26px` + nested `react-resizable-panels`.
3. **Mobile** — editor card with Tabs (one full pane at a time), persistent output bar,
   FAB, output bottom-sheet overlay, nav drawer. Overlays **hand-rolled** (display toggle +
   CSS) because MUI Drawer/Menu transitions don't animate under React 19.
4. **Reusable `EditorPane`** parameterized by `kind`, with `hideHeader`/`bare` flags.
5. **No CSS files** — MUI `sx`. Only Monaco-targeting CSS (error squiggles/decorations) stays.

---

## IO playground mapping

| Reference app | Internet Object |
|---|---|
| Its two source editors | **Schema** (top-left) / **Document** (bottom-left) editors |
| Output dock | **JSON Output** pane (right) + error overlay |
| Sidebar = lessons | Sidebar = **sample-data** picker (optgroups → list) |
| Header: Run/Share/theme | Header: **JSON→IO, Share, Separate-Schema, theme, nav** |
| Its mobile source tabs | Mobile tabs **Schema / Document / JSON** |
| StatusBar lines | Footer: **cursor Ln·Col·Pos** + © Maniar Technologies |

---

## FEATURE INVENTORY — must all keep working (the hard-rule checklist)

### Parsing / output (REUSE logic unchanged)
- [ ] Web-worker parsing (`workers/parser.worker.ts`) — debounced 500ms.
- [ ] Hooks `use-parse-io-v2`, `use-parser-worker`, `use-debounce` — unchanged.
- [ ] JSON output special serialization: bigint→`io:big:`, NaN→`io:number:NaN`,
      Decimal→`io:decimal:`, ±Inf, undefined.
- [ ] Minified vs 2-space output.
- [ ] Monaco `io` language + syntax highlight (`monaco.ts`).
- [ ] Doc + defs error **markers** (squiggles) via `setModelMarkers`.
- [ ] Output **decorations** for JSON error objects (`utils/jsonDecorations`).
- [ ] Error **overlay** in output: sorted errors, category colors (syntax red / validation
      orange), **clickable → jump to source** in doc editor (`utils/errorSorting`
      `findMarkerForPosition`), dismiss-on-change behavior.
- [ ] Caret position (row/col/offset) surfaced to footer.
- [ ] Programmatic selection/reveal in doc editor when navigating to an error.

### Toolbar / controls
- [ ] **JSON→IO** import dialog: Monaco JSON editor, `loadInferred`+`stringifyDocument`,
      schema/data split, error nav + "Report Issue" GitHub link, large-JSON file download.
- [ ] **Share** dialog: URL, **Shorten** (da.gd → clck.ru → tinyurl fallbacks, abortable),
      Copy, settings tags (Separate Schema / Minified / Skip Errors).
- [ ] **Separate Schema** toggle (`showSchema`) shows/hides schema pane.
- [ ] **Sample-data** selector: groups + items + "Blank"; highlight until first visit.
- [ ] **Reset** button: `isDirty` enable/disable; clears session storage; restores sample.
- [ ] **Skip Errors** toggle (persist `localStorage.skipErrors`).
- [ ] **Minify** toggle (persist `localStorage.minifiedOutput`).
- [ ] Byte counts per pane + **"NN% Smaller/Larger than [minified] JSON"** comparison.
- [ ] **Warning** dialog (e.g. "Nothing to Share").
- [ ] **Welcome** notification on first visit (localStorage `io-playground-visited`).

### State / persistence / routing
- [ ] URL share params: `d`, `s`, `sep`, `min`, `skip` (LZString compress/decompress).
- [ ] Session storage: `io-playground-doc/schema/show-schema/sample-id`.
- [ ] localStorage: `minifiedOutput`, `skipErrors`, `io-playground-visited`.
- [ ] Router `/:sampleId?`; navigation-vs-refresh reset logic (`prevSampleIdRef`).
- [ ] `schemaPanelHeight` per sample → initial schema-pane size.

### Layout / a11y
- [ ] 3 panes, resizable; dragging schema pane to collapse toggles `showSchema`.
- [ ] Header nav: Home, IO vs JSON, The Story, Join Community, Specification.
- [ ] Footer: cursor pos + © Maniar Technologies (logo + link).
- [ ] Skip-link + `sr-only`; `aria-label`s; keyboard focus states.

### NEW (the point of the rework)
- [ ] Responsive: `<md` → Schema/Document/JSON **tabs**, drawer nav, sheet output.
- [ ] **Light + dark** themes (toggle in header), persisted.
- [ ] MUI 6 + React 19; drop `recoil`, `split-pane-react`, `react-toggle`.

---

## Dependency changes
- **Add:** `@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled`,
  `react-resizable-panels`; bump `react`/`react-dom`→19, `@types/react(-dom)`→19.
- **Remove:** `split-pane-react`, `react-toggle`, `@types/react-toggle`, `recoil`.
- **Keep:** `@monaco-editor/react`, `monaco-editor`, `lz-string`, `internet-object`
  (`file:../io-js2`), `react-router-dom`, `web-vitals`.
- `vite.config.ts` `manualChunks`: drop recoil/split-pane, add `mui`.
- `index.html`: trim font set toward Inter + one mono.

---

## Phased plan (verify app runs after each phase)
1. **Deps + theme + shell** — install; `theme/muiTheme.ts`; `main.tsx` (drop Recoil, keep
   Router); new `App.tsx` shell (header/body/status grid) desktop-only first; app boots.
2. **Desktop panels** — `react-resizable-panels` 3-pane; `EditorPane`, `OutputPane`,
   `Header`, `StatusBar`, `Sidebar`(samples). Wire parsing/markers/decorations/caret.
   Full feature parity on desktop.
3. **Mobile** — `MobileWorkspace` (tabs + sheet + FAB + drawer); `useMediaQuery` switch.
4. **Dialogs + polish** — Share/ImportJSON/Warning/Welcome → MUI; light/dark; a11y;
   transitions; remove dead CSS + old components.

## Verification
- `npm run dev` boots; parse a sample → JSON output correct.
- Each checklist item exercised manually (samples, share, shorten, import JSON, toggles,
  reset, error-click navigation, resize/collapse, mobile tabs, theme toggle).
- `npm run build:check` (tsc + vite build) passes.
