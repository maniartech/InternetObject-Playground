# Phase 6: Web Worker Parsing - Implementation Plan

**Status:** ⏸️ **Blocked by Phase 5** (Vite Migration)
**Completion:** 80% (infrastructure ready, waiting for build tool migration)

## Overview

This phase implements non-blocking parsing using Web Workers to prevent UI freezes during large document parsing. The infrastructure is complete but disabled until after the Vite migration (Phase 5) due to CRA's poor Web Worker support.

---

## What's Been Done ✅

### 1. Worker Implementation (`src/workers/parser.worker.ts`)
- **230 lines** - Complete Web Worker with IO parsing logic
- Supports both document and schema parsing
- Structured error handling with ErrorItem/EditorMarker
- JSON serialization with Decimal/BigInt support
- Message protocol with request IDs for correlation

**Key Features:**
```typescript
interface ParseRequest {
  type: 'parse';
  id: string;
  documentText: string;
  schemaText: string | null;
  skipErrors: boolean;
  minifiedOutput: boolean;
}

interface ParseResponse {
  type: 'result' | 'error';
  id: string;
  result?: WorkerParseResult;
  error?: string;
}
```

### 2. Worker Hook (`src/hooks/use-parser-worker.ts`)
- **186 lines** - React hook for worker lifecycle management
- Automatic worker initialization and cleanup
- **Timeout support** (default: 5000ms, configurable)
- **Cancellation support** for pending operations
- Request/response correlation with unique IDs
- Error boundary with fallback states

**API:**
```typescript
const { parse, cancel, isParsing, isReady, workerError } = useParserWorker({
  timeout: 5000,
  debug: false
});

// Returns promise for async parsing
const result = await parse(documentText, schemaText, skipErrors, minifiedOutput);
```

### 3. Enhanced Parse Hook (`src/hooks/use-parse-io-v2.ts`)
- **155 lines** - Drop-in replacement for original `use-parse-io`
- **Automatic fallback** from worker to main thread
- Same interface as original + new `isParsing` and `parseError` fields
- Feature flag: `useWorker` option (default: false)
- Zero breaking changes to existing components

**Migration Path:**
```typescript
// Current (main thread)
const result = useParseIO(doc, schema, showSchema, minified, skipErrors);

// Future (with worker, after Vite)
const result = useParseIO(doc, schema, showSchema, minified, skipErrors, {
  useWorker: true,
  timeout: 5000
});
```

---

## Current State

### Why Disabled?
**CRA (Create React App) Web Worker Limitations:**
- No native support for `new Worker(new URL(..., import.meta.url))`
- Requires additional webpack config (worker-loader) which conflicts with CRA's abstraction
- Inline worker blobs don't support TypeScript/imports properly
- `importScripts()` requires pre-bundled files in public folder

**Vite Web Worker Support:**
- ✅ Native `?worker` suffix support
- ✅ Built-in TypeScript compilation
- ✅ ESM module support in workers
- ✅ No additional config needed

### Fallback Behavior
```typescript
// Worker is initialized but immediately disabled
useEffect(() => {
  setIsReady(false);
  setWorkerError('Worker parsing not yet enabled - waiting for Vite migration');
  return () => {}; // No-op cleanup
}, []);
```

All parsing currently uses **main thread** (original `compiler.ts` logic).

---

## What's Left TODO (After Phase 5) 🚧

### 1. Enable Worker After Vite Migration
**File:** `src/hooks/use-parser-worker.ts`

```typescript
// Replace disabled initialization with:
useEffect(() => {
  try {
    // Vite's native worker support
    const worker = new Worker(
      new URL('../workers/parser.worker.ts', import.meta.url),
      { type: 'module' }
    );

    worker.addEventListener('message', handleMessage);
    worker.addEventListener('error', handleError);

    workerRef.current = worker;
    setIsReady(true);
    setWorkerError(null);

    return () => {
      worker.removeEventListener('message', handleMessage);
      worker.removeEventListener('error', handleError);
      worker.terminate();
      workerRef.current = null;
    };
  } catch (error: any) {
    setWorkerError(`Failed to initialize parser worker: ${error.message}`);
    setIsReady(false);
  }
}, []);
```

**Lines to change:** ~66-81 (15 lines)

### 2. Switch to Enhanced Hook
**File:** `src/components/playground/Playground.tsx` (or wherever `useParseIO` is called)

```typescript
// Change import
- import { useParseIO } from '../hooks/use-parse-io';
+ import { useParseIO } from '../hooks/use-parse-io-v2';

// Add worker option
const parseResult = useParseIO(
  documentText,
  schemaText,
  showSchema,
  minifiedOutput,
  skipErrors,
+ { useWorker: true, timeout: 5000 }
);

// Use new isParsing state (optional)
+if (parseResult.isParsing) {
+  // Show loading spinner
+}
```

**Impact:** 2-5 lines per component using `useParseIO`

### 3. Add UI Indicators
**Optional but recommended:**

```tsx
// Show parsing status
{isParsing && <Spinner />}

// Show timeout/error state
{parseError && <ErrorBanner message={parseError} />}

// Add cancel button for long parses
{isParsing && <button onClick={cancel}>Cancel</button>}
```

### 4. Update Vite Config
**File:** `vite.config.ts` (created in Phase 5)

```typescript
export default defineConfig({
  plugins: [react()],
  worker: {
    format: 'es', // ESM workers
  },
  // ... rest of config
});
```

Already documented in `docs/build-modernization-plan.md` - no additional changes needed.

### 5. Testing
- [ ] Verify worker initializes in Vite dev mode
- [ ] Test with large documents (10KB+)
- [ ] Verify timeout triggers correctly
- [ ] Test cancellation during parse
- [ ] Verify fallback when worker fails
- [ ] Check for memory leaks (worker cleanup)

---

## Technical Decisions

### Why Separate Hook Instead of Modifying Original?
- **Zero breaking changes** - existing code continues to work
- **Gradual migration** - can test worker in isolation
- **Easy rollback** - just revert import if issues arise
- **Feature flag** - `useWorker` defaults to false

### Why Promise-Based API?
- Async parsing is inherently promise-based
- Allows `await` in components (with async event handlers)
- Natural error handling with try/catch
- Matches modern React patterns (React 18+ startTransition)

### Why Not Use Comlink?
- **Comlink** is 2KB but adds complexity
- Our message protocol is simple (2 message types)
- Direct `postMessage` is easier to debug
- Reduces dependencies

### Memory Management
- Worker terminated on hook unmount
- Pending requests cancelled automatically
- Timeouts cleared on completion/error
- Blob URLs revoked (when using blob workers)

---

## Performance Expectations

### Before (Main Thread)
- **Large doc (50KB):** ~200-500ms parse time
- **UI blocked** during parse
- **No cancel** - must wait for completion
- **No timeout** - can hang indefinitely

### After (Web Worker)
- **Same parse time** but UI remains responsive
- **Parallel execution** - UI thread free
- **Cancellable** - stop long-running parses
- **Timeout protection** - guaranteed return within 5s

### Metrics to Track
```typescript
// Add to performance instrumentation (Phase 12)
performance.mark('parse-start');
await worker.parse(...);
performance.mark('parse-end');
performance.measure('worker-parse', 'parse-start', 'parse-end');
```

---

## File Summary

| File | Lines | Status | Purpose |
|------|-------|--------|---------|
| `src/workers/parser.worker.ts` | 230 | ✅ Complete | Web Worker implementation |
| `src/hooks/use-parser-worker.ts` | 186 | ⏸️ Disabled | Worker lifecycle hook |
| `src/hooks/use-parse-io-v2.ts` | 155 | ✅ Complete | Enhanced parse hook with worker support |
| `src/hooks/use-parse-io.ts` | 75 | ✅ Unchanged | Original hook (backwards compat) |

**Total:** 646 lines of new code (all complete, just waiting for Vite)

---

## Migration Checklist

After completing Phase 5 (Vite Migration):

- [ ] Uncomment worker initialization in `use-parser-worker.ts` (15 lines)
- [ ] Change imports from `use-parse-io` to `use-parse-io-v2` (1 line per component)
- [ ] Add `{ useWorker: true }` option (1 line per usage)
- [ ] Test worker initializes without errors
- [ ] Verify parsing works with worker enabled
- [ ] Test timeout behavior with slow/large documents
- [ ] Add UI indicators for `isParsing` state (optional)
- [ ] Update tests to mock worker (if needed)
- [ ] Remove old `use-parse-io.ts` after migration (optional cleanup)

**Estimated Time:** 1-2 hours (mostly testing)

---

## Known Limitations

### Not Implemented Yet
- **Streaming parsing** - worker still parses entire document
- **Incremental updates** - re-parses full document on each change
- **Worker pooling** - only one worker instance
- **SharedArrayBuffer** - not needed for current use case

### Future Enhancements (Post-Phase 6)
1. **Debounced worker dispatch** - don't parse on every keystroke
2. **Diff-based parsing** - only parse changed sections
3. **Worker pool** - multiple workers for parallel documents
4. **Transferable objects** - faster large document transfer
5. **WASM parser** - 10x faster parsing (long-term)

---

## Testing Strategy

### Unit Tests
```typescript
describe('useParserWorker', () => {
  it('should initialize worker', () => {
    const { isReady } = renderHook(() => useParserWorker());
    expect(isReady).toBe(true);
  });

  it('should timeout long parses', async () => {
    const { parse } = renderHook(() => useParserWorker({ timeout: 100 }));
    await expect(parse(largeDoc, null, false, false)).rejects.toThrow('timed out');
  });

  it('should cancel pending parse', async () => {
    const { parse, cancel } = renderHook(() => useParserWorker());
    const promise = parse(largeDoc, null, false, false);
    cancel();
    await expect(promise).rejects.toThrow('cancelled');
  });
});
```

### Integration Tests
- Test with real documents from test suite
- Verify worker returns same results as main thread
- Test error handling (syntax/validation errors)
- Test memory cleanup (no leaks)

---

## Success Criteria

- [x] Worker infrastructure complete (parser.worker.ts)
- [x] Worker hook complete (use-parser-worker.ts)
- [x] Enhanced parse hook complete (use-parse-io-v2.ts)
- [x] Documentation complete (this file)
- [ ] Worker enabled after Vite migration
- [ ] All tests passing with worker enabled
- [ ] UI remains responsive during large document parsing
- [ ] Timeout/cancel work as expected
- [ ] Zero breaking changes to existing components

**Phase 6 Status:** Ready for activation post-Vite migration ✅
