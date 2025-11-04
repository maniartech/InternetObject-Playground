# IO Playground — Editor Refactor Plan

Goal: Professional-grade editor UX with robust architecture and zero regressions.

This plan documents tasks, scope, acceptance criteria, and a non-breaking rollout. Use the repo TODOs to track progress; each section references those items.

## Non-functional requirements
- Functional parity: no behavior changes during refactor. Use feature flags and a regression checklist for safe rollout/rollback.
- Performance: smooth typing with no UI jank; parsing off the main thread when feasible. Phase 0 will record a baseline; later phases must meet or beat baseline metrics.
- Error fidelity: accurate and consistent error rendering across source and output panes (1:1 mapping, correct severity/colors/squiggles, position-based sorting, and click-to-jump).
- Accessibility: WCAG 2.1 AA targets; full keyboard navigation; proper ARIA roles/labels; focus management for overlays; high-contrast support.
- Code quality: strong typing and maintainable structure. Keep it simple (avoid overengineering), follow SRP/SOLID/DRY, small focused modules.
- Testability: unit + E2E coverage for critical paths (sorting, navigation, decorations). CI quality gates (build/typecheck/lint/test) must PASS.
- Design tokens: centralize colors/severities via CSS variables to keep themes consistent and configurable (dark/light/high-contrast).
- Documentation: capture architecture and design decisions (ADRs), and define clear contracts (ErrorItem, markers, decorations API).
- Best practices: align with established editor projects (Monaco, VS Code) where appropriate.
- Future: a learning panel in the left sidebar to explain errors and fixes (deferred to a later phase).

## Phased work

### Phase 0 — Guardrails and baselines
- Add unit tests for: error sorting, navigation mapping, selection stickiness (Todo: Unit tests for UI logic)
- Add minimal E2E for click-to-jump and severity styling (Todo: Integration tests)
- Add simple parse duration metric (console + perf mark) (Todo: Performance profiling)
- Acceptance: Tests PASS now (current behavior), collect baseline perf

### Phase 1 — Structured error objects end-to-end
- Define `ErrorItem` { id, code, category, message, range, source }
- `compiler.ts` emits `errorItems[]` and `EditorMarker[]`
- `use-parse-io` returns `errorItems` (keep string messages for UI)
- `Output.tsx` consumes `errorItems` (no regex) and sorts by `range`
- Acceptance: UI identical, no string parsing; tests updated and PASS

### Phase 2 — Accurate JSON decorations
- Remove brace scanning in `Output`
- Emit decoration ranges from parse/serialize step
- Pass to `Output` and render Monaco decorations
- Acceptance: Decorations align with error objects; no missed/nested cases

### Phase 3 — Web Worker parsing
- Move `parseIO` to worker via Comlink
- Debounce + version token to avoid race updates
- Acceptance: Typing remains smooth; outputs identical; tests PASS

### Phase 4 — Accessibility and interaction polish
- Error items as accessible buttons (keyboard + roles)
- Overlay is dialog with focus trap; restore focus on close
- Add temporary flash decoration on navigate; F8/Shift+F8 support
- Acceptance: Axe checks clean; keyboard nav works; tests PASS

### Phase 5 — Theming + design tokens
- Introduce CSS variables: `--io-syntax`, `--io-validation`, etc.
- Apply across squiggles, gutter, text, and overview ruler
- Prep light / high-contrast themes
- Acceptance: Single source of truth for colors; visual parity

### Phase 6 — Build modernization
- Plan Vite migration; ensure Monaco worker config
- Interim: add `@babel/plugin-proposal-private-property-in-object` to devDependencies to silence CRA warning
- Acceptance: Dev/build faster; warnings removed; no behavior change

### Phase 7 — State and structure
- Either remove Recoil (if unused) or formalize shared store
- Organize folders: `components/editor`, `components/output`, `parsing`, `types`
- Acceptance: Cleaner imports; types centralized; no API breaks

### Phase 8 — CI and documentation
- Add CI for typecheck, lint, test, build (Quality gates)
- Document ErrorItem contract, worker model, decorations API, theme tokens
- Regression checklist for releases
- Acceptance: Green CI; docs in repo; checklist followed before merge

## Risk and mitigation
- Behavior divergence in parsing → Feature flags, A/B compare outputs; tests
- Hidden reliance on string-formatted errors → Keep string message in `ErrorItem` and provide a short-term adapter
- Monaco worker config pitfalls during Vite migration → Prototype in a branch; keep CRA until parity proven

## Acceptance criteria (global)
- Build PASS, Typecheck PASS, Lint PASS, Tests PASS at every phase
- Clicking an error selects the correct source range (validated by E2E)
- Validation vs syntax colors consistent in squiggles, gutter, text, and overview ruler
- No duplicate errors; error list sorted by position
- Parse performance not worse than baseline; improved with worker

## Rollout strategy
- Feature flags for: structured errors, JSON decorations via ranges, worker parse
- Enable flags one-by-one after tests pass
- Keep rollback toggles until two releases stabilize

## Appendix: Proposed types
```ts
export type ErrorCategory = 'syntax' | 'validation' | 'runtime';

export interface ErrorRange {
  startLine: number; startColumn: number;
  endLine: number; endColumn: number;
}

export interface ErrorItem {
  id: string;              // stable id for de-dup and focus management
  code?: string;           // machine-readable error code
  category: ErrorCategory; // maps to UI severity/theme
  message: string;         // user-facing description (kept for UI)
  range: ErrorRange;       // source range
  source: 'doc' | 'defs';  // which editor
}

export type EditorMarker = Pick<monaco.editor.IMarkerData,
  'severity'|'message'|'startLineNumber'|'startColumn'|'endLineNumber'|'endColumn'
> & { id?: string; category?: ErrorCategory };
```

## Performance plan and targets

Baseline first (Phase 0), then enforce targets. Instrument with `performance.now()` and `performance.mark/measure`; log only in development.

Metrics to capture
- Parse duration (doc + defs) per cycle
- Markers update time (setModelMarkers) and count
- Decorations build time (JSON output) and count
- Typing latency proxy: time from onChange → parse complete (dev only)

Document sizes
- Small (S): ≤ 200 lines; Medium (M): ~1,000 lines; Large (L): ~5,000 lines

Initial targets (to be adjusted after baseline)
- S: parse ≤ 50 ms; M: ≤ 150 ms; L: ≤ 400 ms
- Markers/decorations update ≤ 30 ms per cycle; keep counts ≤ 2,000 total
- Maintain 60 fps feel (no visible jank on typical machines)

Key optimizations
- Move parse off main thread (Web Worker)
- Remove brace scanning; use emitted decoration ranges
- Debounce parse (configurable 300–700 ms; default 500 ms)
- Batch markers and deltaDecorations once per cycle; avoid churn
- Memoize heavy computations; keep React props stable
- Virtualize error list when > 200 items

Detection and regression control
- Log metrics in dev; compare to baseline after each phase
- Add a CI step to print aggregated metrics from sample runs (optional)
