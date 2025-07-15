import { useCallback, useState } from 'react';
import { Decimal } from 'internet-object';
import parseIO from '../pages/playgroud/compiler';

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
  parse: () => void;
}

export function useParseIO(documentText: string, schemaText: string, showSchema: boolean, minifiedOutput: boolean): ParseIOResult {
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [defMarkers, setDefMarkers] = useState<Marker[]>([]);
  const [jsonText, setJsonText] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const parse = useCallback(() => {
    const result = parseIO(documentText, showSchema ? schemaText : null);
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

    if (result.output) {
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
      setError(false);
    } else {
      setJsonText(result.errorMessage || '');
      setError(true);
    }
  }, [documentText, showSchema, schemaText, minifiedOutput]);

  return { markers, defMarkers, jsonText, error, parse };
}
