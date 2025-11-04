/**
 * React hook for managing the parser Web Worker.
 * Provides timeout, cancellation, and automatic cleanup.
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import type { ParseRequest, ParseResponse } from '../workers/parser.worker';
import type { ErrorItem, EditorMarker } from '../types/errors';

export interface WorkerParseResult {
  errorMessages: string[];
  errorItems: ErrorItem[];
  docMarkers: EditorMarker[];
  defsMarkers: EditorMarker[];
  jsonText: string;
  error: boolean;
}

export interface UseParserWorkerOptions {
  /** Timeout in milliseconds (default: 5000) */
  timeout?: number;
  /** Enable debug logging */
  debug?: boolean;
}

export interface UseParserWorkerResult {
  /** Parse function to call with document and schema */
  parse: (
    documentText: string,
    schemaText: string | null,
    skipErrors: boolean,
    minifiedOutput: boolean
  ) => Promise<WorkerParseResult>;
  /** Cancel current parse operation */
  cancel: () => void;
  /** Whether a parse is currently in progress */
  isParsing: boolean;
  /** Whether the worker is ready */
  isReady: boolean;
  /** Last error from worker initialization */
  workerError: string | null;
}

let nextRequestId = 0;

export function useParserWorker(
  options: UseParserWorkerOptions = {}
): UseParserWorkerResult {
  const { timeout = 5000, debug = false } = options;

  const workerRef = useRef<Worker | null>(null);
  const pendingRequestRef = useRef<{
    id: string;
    resolve: (result: WorkerParseResult) => void;
    reject: (error: Error) => void;
    timeoutId: number;
  } | null>(null);

  const [isParsing, setIsParsing] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [workerError, setWorkerError] = useState<string | null>(null);

  // Initialize worker
  useEffect(() => {
    // TODO: Enable worker after Vite migration (Phase 5)
    // CRA doesn't support modern worker syntax well
    // For now, return without initializing worker
    // The parse function will use fallback (main thread)

    setIsReady(false);
    setWorkerError('Worker parsing not yet enabled - waiting for Vite migration');

    if (debug) {
      console.log('[ParserWorker] Worker disabled until Vite migration');
    }

    return () => {
      // Cleanup placeholder
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMessage = useCallback(
    (event: MessageEvent<ParseResponse>) => {
      const response = event.data;

      if (!pendingRequestRef.current || response.id !== pendingRequestRef.current.id) {
        if (debug) {
          console.warn('[ParserWorker] Received response for unknown request:', response.id);
        }
        return;
      }

      const { resolve, reject, timeoutId } = pendingRequestRef.current;

      // Clear timeout
      window.clearTimeout(timeoutId);

      if (response.type === 'result' && response.result) {
        if (debug) {
          console.log('[ParserWorker] Parse completed:', response.id);
        }
        resolve(response.result);
      } else if (response.type === 'error') {
        if (debug) {
          console.error('[ParserWorker] Parse error:', response.error);
        }
        reject(new Error(response.error || 'Unknown worker error'));
      }

      pendingRequestRef.current = null;
      setIsParsing(false);
    },
    [debug]
  );

  const handleError = useCallback(
    (error: ErrorEvent) => {
      const errorMsg = `Worker error: ${error.message}`;
      console.error('[ParserWorker]', errorMsg, error);

      if (pendingRequestRef.current) {
        const { reject, timeoutId } = pendingRequestRef.current;
        window.clearTimeout(timeoutId);
        reject(new Error(errorMsg));
        pendingRequestRef.current = null;
        setIsParsing(false);
      }

      setWorkerError(errorMsg);
    },
    []
  );

  const cancel = useCallback(() => {
    if (pendingRequestRef.current) {
      const { reject, timeoutId } = pendingRequestRef.current;
      window.clearTimeout(timeoutId);
      reject(new Error('Parse operation cancelled'));
      pendingRequestRef.current = null;
      setIsParsing(false);

      if (debug) {
        console.log('[ParserWorker] Parse cancelled');
      }
    }
  }, [debug]);

  const parse = useCallback(
    (
      documentText: string,
      schemaText: string | null,
      skipErrors: boolean,
      minifiedOutput: boolean
    ): Promise<WorkerParseResult> => {
      return new Promise((resolve, reject) => {
        if (!workerRef.current) {
          reject(new Error('Worker not initialized'));
          return;
        }

        // Cancel any pending request
        if (pendingRequestRef.current) {
          cancel();
        }

        const id = `parse-${++nextRequestId}`;

        const timeoutId = window.setTimeout(() => {
          if (pendingRequestRef.current?.id === id) {
            pendingRequestRef.current = null;
            setIsParsing(false);
            reject(new Error(`Parse operation timed out after ${timeout}ms`));

            if (debug) {
              console.error('[ParserWorker] Parse timeout:', id);
            }
          }
        }, timeout);

        pendingRequestRef.current = { id, resolve, reject, timeoutId };
        setIsParsing(true);

        const request: ParseRequest = {
          type: 'parse',
          id,
          documentText,
          schemaText,
          skipErrors,
          minifiedOutput,
        };

        if (debug) {
          console.log('[ParserWorker] Sending parse request:', id);
        }

        workerRef.current.postMessage(request);
      });
    },
    [timeout, debug, cancel]
  );

  return {
    parse,
    cancel,
    isParsing,
    isReady,
    workerError,
  };
}
