import { useCallback, useState } from 'react';
import { Decimal } from 'internet-object';
import parseIO from '../pages/playgroud/compiler';
import type { ErrorItem } from '../types/errors';

export interface Marker {
  // Define the actual marker properties here
  // Example:
  // start: number;
  // end: number;
  // message?: string;
  [key: string]: any;
}

export interface ParseIOResult {
  markers: Marker[];
  defMarkers: Marker[];
  jsonText: string;
  error: boolean;
  errorMessages: string[];  // Deprecated: use errorItems instead
  errorItems: ErrorItem[];  // Structured errors with full metadata
  parse: () => void;
}

export function useParseIO(documentText: string, schemaText: string, showSchema: boolean, minifiedOutput: boolean, skipErrors: boolean): ParseIOResult {
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [defMarkers, setDefMarkers] = useState<Marker[]>([]);
  const [jsonText, setJsonText] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [errorItems, setErrorItems] = useState<ErrorItem[]>([]);

  const parse = useCallback(() => {
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

    // Check if we have errors
    const hasErrors = result.errorMessages.length > 0;
    setErrorMessages(result.errorMessages);
    setErrorItems(result.errorItems);

    if (result.output) {
      // We have output - show it even if there are accumulated errors
      const output = JSON.stringify(result.output, function (k, v: any) {
        if (typeof v === 'bigint') return `io:big:${v.toString()}`;
        if (typeof v === 'number') {
          if (isNaN(v)) return 'io:number:NaN';
        }
        if (v instanceof Decimal) {
          return `io:decimal:${v.toString()}`;
        }
        if (v === Infinity) return 'io:number:Inf';
        if (v === -Infinity) return 'io:number:-Inf';
        if (typeof v === 'undefined') return 'io:undefined';
        return v;
      }, minifiedOutput ? 0 : 2);
      setJsonText(output);
      setError(hasErrors);
    } else if (hasErrors) {
      // No output, but we have errors - clear JSON output
      setJsonText('');
      setError(true);
    } else {
      // No output, no errors - empty
      setJsonText('');
      setError(false);
    }
  }, [documentText, showSchema, schemaText, minifiedOutput, skipErrors]);

  return { markers, defMarkers, jsonText, error, errorMessages, errorItems, parse };
}
