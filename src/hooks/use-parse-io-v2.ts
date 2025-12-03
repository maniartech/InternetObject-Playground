/**
 * Parsing hook using Web Worker.
 * All parsing is done in a worker thread to prevent UI blocking.
 */

import { useCallback, useState, useEffect } from 'react';
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
  isParsing: boolean;
  parseError?: string;
}

export interface UseParseIOOptions {
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
  const { timeout = 5000, debug = false } = options;

  const [markers, setMarkers] = useState<EditorMarker[]>([]);
  const [defMarkers, setDefMarkers] = useState<EditorMarker[]>([]);
  const [jsonText, setJsonText] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [errorItems, setErrorItems] = useState<ErrorItem[]>([]);
  const [parseError, setParseError] = useState<string | undefined>(undefined);

  // Initialize worker
  const worker = useParserWorker({ timeout, debug });

  // Extract stable worker.parse function to avoid dependency on entire worker object
  // This prevents the parse callback from being recreated when worker.isParsing changes
  const workerParse = worker.parse;

  // Parse function using worker
  const parse = useCallback(() => {
    setParseError(undefined);

    if (!worker.isReady) {
      if (debug) {
        console.log('[useParseIO] Worker not ready yet');
      }
      return;
    }

    if (debug) {
      console.log('[useParseIO] Parsing with worker');
    }

    workerParse(documentText, showSchema ? schemaText : null, skipErrors, minifiedOutput)
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
  }, [
    documentText,
    showSchema,
    schemaText,
    minifiedOutput,
    skipErrors,
    worker.isReady,
    workerParse,
    debug,
  ]);

  // Extract stable cancel function
  const workerCancel = worker.cancel;

  // Auto-cancel on unmount
  useEffect(() => {
    return () => {
      workerCancel();
    };
  }, [workerCancel]);

  return {
    markers,
    defMarkers,
    jsonText,
    error,
    errorMessages,
    errorItems,
    parse,
    isParsing: worker.isParsing,
    parseError,
  };
}
