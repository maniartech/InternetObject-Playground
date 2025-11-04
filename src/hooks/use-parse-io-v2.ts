/**
 * Enhanced parsing hook with optional Web Worker support.
 * Falls back to main thread if worker is unavailable.
 *
 * Phase 6: Web Worker Implementation
 * - Supports worker-based parsing (when enabled)
 * - Automatic fallback to main thread
 * - Timeout and cancellation support
 * - Same interface as original use-parse-io
 */

import { useCallback, useState, useEffect } from 'react';
import { Decimal } from 'internet-object';
import parseIO from '../pages/playgroud/compiler';
import { useParserWorker } from './use-parser-worker';
import type { ErrorItem, EditorMarker } from '../types/errors';

export interface ParseIOResult {
  markers: EditorMarker[];
  defMarkers: EditorMarker[];
  jsonText: string;
  error: boolean;
  errorMessages: string[];  // Deprecated: use errorItems instead
  errorItems: ErrorItem[];  // Structured errors with full metadata
  parse: () => void;
  isParsing?: boolean;  // New: indicates async parsing in progress
  parseError?: string;  // New: worker/timeout errors
}

export interface UseParseIOOptions {
  /** Enable Web Worker parsing (default: false until Vite migration) */
  useWorker?: boolean;
  /** Worker timeout in ms (default: 5000) */
  timeout?: number;
  /** Debug logging */
  debug?: boolean;
}

export function useParseIO(
  documentText: string,
  schemaText: string,
  showSchema: boolean,
  minifiedOutput: boolean,
  skipErrors: boolean,
  options: UseParseIOOptions = {}
): ParseIOResult {
  const { useWorker = false, timeout = 5000, debug = false } = options;

  const [markers, setMarkers] = useState<EditorMarker[]>([]);
  const [defMarkers, setDefMarkers] = useState<EditorMarker[]>([]);
  const [jsonText, setJsonText] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [errorItems, setErrorItems] = useState<ErrorItem[]>([]);
  const [parseError, setParseError] = useState<string | undefined>(undefined);

  // Initialize worker (no-op if useWorker=false)
  const worker = useParserWorker({ timeout, debug });

  // Determine if we can use worker
  const canUseWorker = useWorker && worker.isReady;

  // Log worker status on initialization
  useEffect(() => {
    if (useWorker) {
      console.log('[useParseIO] Worker enabled:', {
        useWorker,
        isReady: worker.isReady,
        canUse: canUseWorker,
        error: worker.workerError,
      });
    }
  }, [useWorker, worker.isReady, canUseWorker, worker.workerError]);

  // Parse function - supports both sync (main thread) and async (worker)
  const parse = useCallback(() => {
    setParseError(undefined);

    if (canUseWorker) {
      // Async worker parsing
      if (debug) {
        console.log('[useParseIO] Using worker for parsing');
      }

      worker
        .parse(documentText, showSchema ? schemaText : null, skipErrors, minifiedOutput)
        .then((result) => {
          setDefMarkers(result.defsMarkers);
          setMarkers(result.docMarkers);
          setErrorMessages(result.errorMessages);
          setErrorItems(result.errorItems);
          setJsonText(result.jsonText);
          setError(result.error);
        })
        .catch((err: Error) => {
          setParseError(err.message);
          setJsonText('');
          setError(true);
          setErrorMessages([err.message]);
          setErrorItems([]);

          if (debug) {
            console.error('[useParseIO] Worker parse error:', err);
          }
        });
    } else {
      // Sync main thread parsing (current behavior)
      if (debug && useWorker) {
        console.log('[useParseIO] Worker not available, using main thread');
      }

      const result = parseIO(documentText, showSchema ? schemaText : null, skipErrors);

      if (result.defsMarkers) {
        setDefMarkers(result.defsMarkers);
      } else {
        setDefMarkers([]);
      }

      if (result.docMarkers) {
        setMarkers(result.docMarkers);
      } else {
        setMarkers([]);
      }

      const hasErrors = result.errorMessages.length > 0;
      setErrorMessages(result.errorMessages);
      setErrorItems(result.errorItems);

      if (result.output) {
        const output = JSON.stringify(
          result.output,
          function (k, v: any) {
            if (typeof v === 'bigint') return `io:big:${v.toString()}`;
            if (typeof v === 'number' && isNaN(v)) return 'io:number:NaN';
            if (v instanceof Decimal) return `io:decimal:${v.toString()}`;
            if (v === Infinity) return 'io:number:Inf';
            if (v === -Infinity) return 'io:number:-Inf';
            if (typeof v === 'undefined') return 'io:undefined';
            return v;
          },
          minifiedOutput ? 0 : 2
        );
        setJsonText(output);
        setError(hasErrors);
      } else if (hasErrors) {
        setJsonText('');
        setError(true);
      } else {
        setJsonText('');
        setError(false);
      }
    }
  }, [
    documentText,
    showSchema,
    schemaText,
    minifiedOutput,
    skipErrors,
    canUseWorker,
    worker,
    debug,
    useWorker,
  ]);

  // Auto-cancel on unmount
  useEffect(() => {
    return () => {
      if (canUseWorker && worker.isParsing) {
        worker.cancel();
      }
    };
  }, [canUseWorker, worker]);

  return {
    markers,
    defMarkers,
    jsonText,
    error,
    errorMessages,
    errorItems,
    parse,
    isParsing: canUseWorker ? worker.isParsing : undefined,
    parseError,
  };
}
