# Web Worker Parsing

This document describes the Web Worker implementation for background parsing in the Internet Object Playground.

## Overview

The playground uses Web Workers to offload IO document parsing to a separate thread, preventing UI blocking during complex parsing operations.

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Main Thread                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Playground Component                                            │
│  └─> useParseIO (v2)                                            │
│       └─> useParserWorker                                       │
│            ├─> Worker initialization                            │
│            ├─> Message passing                                  │
│            ├─> Timeout handling                                 │
│            └─> Cancellation support                             │
│                                                                   │
└───────────────────────┬─────────────────────────────────────────┘
                        │
                        │ postMessage(ParseRequest)
                        │
                        ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Worker Thread                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  parser.worker.ts                                               │
│  ├─> Receive ParseRequest                                      │
│  ├─> Parse IO document (same logic as compiler.ts)             │
│  ├─> Generate error markers                                    │
│  ├─> Create structured ErrorItems                              │
│  └─> Send ParseResponse                                        │
│                                                                   │
└───────────────────────┬─────────────────────────────────────────┘
                        │
                        │ postMessage(ParseResponse)
                        │
                        ▼
┌─────────────────────────────────────────────────────────────────┐
│                         Main Thread                              │
│  Update UI with results (non-blocking!)                         │
└─────────────────────────────────────────────────────────────────┘
```

## Files

### Core Implementation

1. **`src/workers/parser.worker.ts`** (83 kB bundle)
   - Main worker implementation
   - Handles parse requests and responses
   - Generates error markers and structured errors
   - Runs in separate thread

2. **`src/hooks/use-parser-worker.ts`**
   - React hook for worker management
   - Handles worker lifecycle (initialization, cleanup)
   - Provides timeout and cancellation
   - Message passing abstraction

3. **`src/hooks/use-parse-io-v2.ts`**
   - Enhanced parsing hook with worker support
   - Automatic fallback to main thread
   - Same interface as original `use-parse-io`
   - Optional worker enabling via `useWorker` flag

## Usage

### Basic Usage

```typescript
import { useParseIO } from '../../hooks/use-parse-io-v2';

function MyComponent() {
  const {
    markers,      // Editor markers for errors
    defMarkers,   // Schema definition markers
    jsonText,     // Parsed JSON output
    error,        // Whether errors occurred
    errorItems,   // Structured error data
    parse,        // Parse function
    isParsing     // Worker parsing status
  } = useParseIO(
    documentText,
    schemaText,
    showSchema,
    minifiedOutput,
    skipErrors,
    { useWorker: true }  // Enable background parsing
  );

  // parse() is called automatically on text changes
  // isParsing indicates async work in progress
}
```

### Configuration Options

```typescript
interface UseParseIOOptions {
  /** Enable Web Worker parsing (default: false) */
  useWorker?: boolean;

  /** Worker timeout in ms (default: 5000) */
  timeout?: number;

  /** Enable debug logging (default: false) */
  debug?: boolean;
}
```

### Debug Mode

Enable debug logging to see worker activity:

```typescript
const result = useParseIO(
  documentText,
  schemaText,
  showSchema,
  minifiedOutput,
  skipErrors,
  {
    useWorker: true,
    debug: true  // Logs worker initialization, requests, responses
  }
);
```

Console output:
```
[ParserWorker] Initializing parser worker
[ParserWorker] Worker initialized successfully
[useParseIO] Worker enabled: { useWorker: true, isReady: true, ... }
[useParseIO] Using worker for parsing
[ParserWorker] Sending parse request: parse-1
[ParserWorker] Parse completed: parse-1
```

## Benefits

### Performance

- **Non-blocking UI**: Main thread stays responsive during parsing
- **Fast HMR**: Vite rebuilds worker quickly during development
- **Parallel execution**: Parsing happens concurrently with UI updates

### Reliability

- **Timeout protection**: Automatically aborts after 5 seconds (configurable)
- **Cancellation**: Clean abort when user navigates away
- **Error handling**: Graceful degradation on worker failures
- **Fallback support**: Uses main thread if worker unavailable

### Developer Experience

- **Same interface**: Drop-in replacement for original hook
- **Type safety**: Full TypeScript support
- **Debug logging**: Easy troubleshooting
- **Hot reload**: Worker updates automatically during development

## Implementation Details

### Message Protocol

**ParseRequest:**
```typescript
interface ParseRequest {
  type: 'parse';
  id: string;              // Unique request ID
  documentText: string;    // IO document to parse
  schemaText: string | null;  // Optional schema
  skipErrors: boolean;     // Skip error objects in output
  minifiedOutput: boolean; // Minify JSON output
}
```

**ParseResponse:**
```typescript
interface ParseResponse {
  type: 'result' | 'error';
  id: string;
  result?: {
    errorMessages: string[];   // Human-readable errors
    errorItems: ErrorItem[];   // Structured error data
    docMarkers: EditorMarker[]; // Document error markers
    defsMarkers: EditorMarker[]; // Schema error markers
    jsonText: string;          // Parsed JSON output
    error: boolean;            // Whether errors occurred
  };
  error?: string;  // Error message if type='error'
}
```

### Worker Lifecycle

1. **Initialization** (on component mount)
   ```typescript
   const worker = new Worker(
     new URL('../workers/parser.worker.ts', import.meta.url),
     { type: 'module' }
   );
   ```

2. **Message Handling**
   - Parse request sent via `worker.postMessage()`
   - Response received via `message` event listener
   - Timeout tracked per request with `setTimeout()`

3. **Cleanup** (on unmount)
   ```typescript
   worker.removeEventListener('message', handleMessage);
   worker.removeEventListener('error', handleError);
   worker.terminate();
   ```

### Error Handling

The worker handles three error categories:

1. **Syntax Errors** (`IOSyntaxError`)
   - Invalid IO syntax
   - Severity: Error (Monaco red squiggle)

2. **Validation Errors** (`IOValidationError`)
   - Schema validation failures
   - Severity: Warning (Monaco yellow squiggle)

3. **Runtime Errors** (general `Error`)
   - Unexpected parsing failures
   - Severity: Error

All errors are:
- Converted to `ErrorItem[]` with structured metadata
- Mapped to Monaco `EditorMarker[]` for visual feedback
- Formatted as human-readable messages

### Timeout Handling

Each parse request has a configurable timeout:

```typescript
const timeoutId = window.setTimeout(() => {
  reject(new Error(`Parse operation timed out after ${timeout}ms`));
  // Clean up pending request
}, timeout);
```

On successful response, timeout is cleared:
```typescript
window.clearTimeout(timeoutId);
```

### Cancellation

Users can cancel parsing on navigation:

```typescript
useEffect(() => {
  return () => {
    if (canUseWorker && worker.isParsing) {
      worker.cancel();  // Aborts current parse
    }
  };
}, [canUseWorker, worker]);
```

## Build Configuration

### Vite Configuration

Vite automatically handles worker bundling:

```typescript
// vite.config.ts
export default defineConfig({
  worker: {
    format: 'es'  // Use ES modules for workers
  }
});
```

### Bundle Output

Production build creates separate worker chunk:

```
build/
├── assets/
│   ├── parser.worker-6038pBsv.js  (83.40 kB)  ← Worker bundle
│   ├── index-8X5DKYm6.js          (208.13 kB) ← Main bundle
│   └── ...
```

### Code Splitting Benefits

- **Lazy loading**: Worker only loads when needed
- **Cache efficiency**: Worker can be cached separately
- **Parallel downloads**: Browser can fetch both simultaneously

## Testing

### Manual Testing

1. **Open dev tools console** (debug mode enabled)
2. **Type in document editor**
3. **Observe logs**:
   - Worker initialization
   - Parse requests sent
   - Parse responses received
   - Timing information

### Performance Testing

Compare with/without worker:

```typescript
// Without worker (main thread)
const result = useParseIO(..., { useWorker: false });

// With worker (background thread)
const result = useParseIO(..., { useWorker: true });
```

Monitor:
- UI responsiveness during parsing
- Parse times in console
- `isParsing` state transitions

## Migration from v1

### Before (use-parse-io.ts)

```typescript
import { useParseIO } from '../../hooks/use-parse-io';

const { markers, jsonText, error } = useParseIO(
  documentText,
  schemaText,
  showSchema,
  minifiedOutput,
  skipErrors
);
```

### After (use-parse-io-v2.ts)

```typescript
import { useParseIO } from '../../hooks/use-parse-io-v2';

const { markers, jsonText, error, isParsing } = useParseIO(
  documentText,
  schemaText,
  showSchema,
  minifiedOutput,
  skipErrors,
  { useWorker: true }  // Add worker option
);

// New: isParsing indicates async work
{isParsing && <Spinner />}
```

## Troubleshooting

### Worker Not Initializing

**Symptoms**: `isReady: false`, `workerError: "Failed to initialize worker"`

**Solutions**:
1. Check browser console for worker script errors
2. Verify `parser.worker.ts` compiles without errors
3. Check Vite dev server logs for worker build issues

### Parse Timeout

**Symptoms**: `parseError: "Parse operation timed out after 5000ms"`

**Solutions**:
1. Increase timeout: `{ timeout: 10000 }`
2. Simplify input document
3. Check for infinite loops in parser

### Fallback to Main Thread

**Symptoms**: `canUseWorker: false` despite `useWorker: true`

**Causes**:
- Worker failed to initialize
- Browser doesn't support workers
- Worker script failed to load

**Fallback**: Automatically uses main thread parsing (sync)

## Future Enhancements

Potential improvements:

1. **Worker Pool**: Multiple workers for parallel parsing
2. **Incremental Parsing**: Parse only changed portions
3. **Shared Memory**: Use SharedArrayBuffer for large documents
4. **Service Worker**: Cache parsed results across sessions
5. **Progress Updates**: Stream parsing progress for large files

## References

- [Web Workers API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
- [Vite Worker Support](https://vitejs.dev/guide/features.html#web-workers)
- [Monaco Editor Markers](https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.IMarkerData.html)
