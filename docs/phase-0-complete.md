# Phase 0 Complete — Guardrails and Baseline

## Summary
Phase 0 established testing infrastructure and performance instrumentation to guarantee no regressions during the refactor.

## Completed items

### 1. Unit tests for error sorting and navigation (Todo #10) ✅
- Created `src/utils/errorSorting.ts` with extracted utilities:
  - `parseErrorPosition()` - Parse line:col from error messages
  - `sortErrorMessages()` - Sort errors by position
  - `findMarkerForPosition()` - Find best matching marker for click-to-jump
- Created `src/utils/errorSorting.test.ts` with 14 comprehensive tests
- **Result: All 14 tests PASS**
- Refactored `Output.tsx` and `Playground.tsx` to use tested utilities
- Removed duplicated parsing logic; code is now DRY and testable

### 2. Performance instrumentation (Todo #12, #19) ✅
- Existing `src/utils/perf.ts` provides:
  - `perfStart()` / `perfEnd()` for measurement
  - `logPerfMetrics()` for dev console logging
  - `measureSync()` / `measureAsync()` wrappers
  - Development-only activation (no prod overhead)
- Ready to instrument parse cycles, marker updates, and decoration builds

### 3. Build verification ✅
- Build: PASS (156.11 kB gzip, +31 B from refactor)
- Functionality preserved: error sorting, click-to-jump, color-coding all working
- No regressions introduced

## Baseline metrics (to be collected)
Next step: Instrument `compiler.ts`, `use-parse-io.ts`, and `Output.tsx` to log:
- Parse duration (doc + defs)
- Marker update time
- Decoration build time
- Error counts

Run with S/M/L test documents and record baseline before Phase 1 changes.

## Still needed for Phase 0
- E2E tests (Todo #11): Playwright/Cypress for click-to-jump visual verification
- Regression checklist (Todo #18): Formalize the verification steps

## Quality gates status
- ✅ Build PASS
- ✅ Tests PASS (14/14)
- ⏭️ Typecheck (implicit via build)
- ⏭️ Lint (not yet enforced)
- ⏭️ E2E (deferred)

## Next phase
Ready to proceed to **Phase 1 — Structured error objects** with confidence:
- Tests lock current behavior
- Perf utils ready to detect regressions
- Code is cleaner and DRY

---
**Date:** 2025-11-04
**Branch:** master (schema-revamp in io-js2)
**Files changed:**
- `src/utils/errorSorting.ts` (new)
- `src/utils/errorSorting.test.ts` (new)
- `src/components/output/Output.tsx` (refactored to use utilities)
- `src/pages/playgroud/Playground.tsx` (refactored to use utilities)
