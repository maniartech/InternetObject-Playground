/**
 * Web Worker for parsing Internet Object documents.
 * Offloads parsing to prevent UI blocking on large documents.
 */

import type { IODefinitions } from 'internet-object';
import { parse, parseDefinitions } from 'internet-object';
import { IOError, IOSyntaxError, IOValidationError } from 'internet-object';
import { Decimal } from 'internet-object';
import type { ErrorItem, EditorMarker, ErrorRange, ErrorCategory } from '../types/errors';
import { categoryToSeverity, generateErrorId } from '../types/errors';

export interface ParseRequest {
  type: 'parse';
  id: string;
  documentText: string;
  schemaText: string | null;
  skipErrors: boolean;
  minifiedOutput: boolean;
}

export interface ParseResponse {
  type: 'result' | 'error';
  id: string;
  result?: {
    errorMessages: string[];
    errorItems: ErrorItem[];
    docMarkers: EditorMarker[];
    defsMarkers: EditorMarker[];
    jsonText: string;
    error: boolean;
  };
  error?: string;
}

// Type guard for ParseRequest
function isParseRequest(data: any): data is ParseRequest {
  return data && data.type === 'parse' && typeof data.id === 'string';
}

// Worker message handler
self.addEventListener('message', (event: MessageEvent) => {
  const data = event.data;

  if (!isParseRequest(data)) {
    console.error('Invalid message received by parser worker:', data);
    return;
  }

  try {
    const result = parseIO(
      data.documentText,
      data.schemaText,
      data.skipErrors,
      data.minifiedOutput
    );

    const response: ParseResponse = {
      type: 'result',
      id: data.id,
      result,
    };

    self.postMessage(response);
  } catch (error: any) {
    const response: ParseResponse = {
      type: 'error',
      id: data.id,
      error: error?.message || String(error),
    };

    self.postMessage(response);
  }
});

// Parsing logic (same as compiler.ts but returns serializable result)
function parseIO(
  document: string,
  defs: string | null,
  skipErrors: boolean,
  minifiedOutput: boolean
): NonNullable<ParseResponse['result']> {
  if (!defs) {
    return parseDoc(document, null, skipErrors, minifiedOutput);
  }

  const defsResult = tryParse(defs, parseDefinitions, true, skipErrors);
  if (defsResult.errorMessages.length > 0) {
    return {
      ...defsResult,
      jsonText: '',
      error: true,
    };
  }

  return parseDoc(document, defsResult.defs, skipErrors, minifiedOutput);
}

interface ParseIntermediateResult {
  errorMessages: string[];
  errorItems: ErrorItem[];
  defs: IODefinitions | null;
  output: any | null;
  defsMarkers: EditorMarker[];
  docMarkers: EditorMarker[];
}

function tryParse<T>(
  input: string,
  fn: (input: string, defs?: any) => T,
  isDefs = false,
  skipErrors = false
): ParseIntermediateResult {
  try {
    const result = fn(input, null);

    let accumulatedErrors: Error[] = [];
    if (result && typeof (result as any).getErrors === 'function') {
      accumulatedErrors = (result as any).getErrors();
    }

    const output = isDefs ? null : (result as any).toJSON({ skipErrors });
    const defs = isDefs ? (result as IODefinitions) : null;

    if (accumulatedErrors.length > 0) {
      const source = isDefs ? 'defs' : 'doc';
      const errorItems = accumulatedErrors
        .map((e) => errorToErrorItem(e, source))
        .filter((item): item is ErrorItem => item !== null);

      return {
        errorMessages: accumulatedErrors.map((e) => getErrorMessage(e)),
        errorItems,
        defs,
        output,
        defsMarkers: isDefs ? accumulatedErrors.flatMap(getErrorMarkers) : [],
        docMarkers: isDefs ? [] : accumulatedErrors.flatMap(getErrorMarkers),
      };
    }

    return {
      errorMessages: [],
      errorItems: [],
      defs,
      output,
      defsMarkers: [],
      docMarkers: [],
    };
  } catch (e: any) {
    const source = isDefs ? 'defs' : 'doc';
    const errorItem = errorToErrorItem(e, source);

    return {
      errorMessages: [getErrorMessage(e)],
      errorItems: errorItem ? [errorItem] : [],
      defs: null,
      output: null,
      defsMarkers: isDefs ? getErrorMarkers(e) : [],
      docMarkers: isDefs ? [] : getErrorMarkers(e),
    };
  }
}

function parseDoc(
  doc: string,
  defs: IODefinitions | null,
  skipErrors: boolean,
  minifiedOutput: boolean
): NonNullable<ParseResponse['result']> {
  const intermediate = tryParse(doc, (d) => parse(d, defs), false, skipErrors);

  const hasErrors = intermediate.errorMessages.length > 0;
  let jsonText = '';
  let error = false;

  if (intermediate.output) {
    jsonText = JSON.stringify(
      intermediate.output,
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
    error = hasErrors;
  } else if (hasErrors) {
    jsonText = '';
    error = true;
  }

  return {
    errorMessages: intermediate.errorMessages,
    errorItems: intermediate.errorItems,
    docMarkers: intermediate.docMarkers,
    defsMarkers: intermediate.defsMarkers,
    jsonText,
    error,
  };
}

// Helper functions
function getErrorMessage(e: any): string {
  // Include collection index (row number) if available
  const rowInfo = typeof e?.collectionIndex === 'number' ? ` [Row ${e.collectionIndex + 1}]` : '';
  // console.log('[WORKER] getErrorMessage:', { msg: e?.message?.slice(0, 30), collectionIndex: e?.collectionIndex, rowInfo });

  if (e instanceof IOSyntaxError) return 'SYNTAX_ERROR:' + rowInfo + ' ' + (e?.message || String(e));
  if (e instanceof IOValidationError) return 'VALIDATION_ERROR:' + rowInfo + ' ' + (e?.message || String(e));
  return 'ERROR:' + rowInfo + ' ' + (e?.message || String(e));
}function getErrorCategory(e: any): ErrorCategory {
  if (e instanceof IOSyntaxError) return 'syntax';
  if (e instanceof IOValidationError) return 'validation';
  return 'runtime';
}

function errorToRange(e: any): ErrorRange | null {
  if (!(e instanceof IOError)) return null;
  const startPos: any = e.positionRange?.getStartPos();
  const endPos: any = e.positionRange?.getEndPos();
  if (!startPos || !endPos) return null;

  return {
    startLine: startPos.row,
    startColumn: startPos.col,
    endLine: endPos.row,
    endColumn: endPos.col,
  };
}

function errorToErrorItem(e: any, source: 'doc' | 'defs'): ErrorItem | null {
  const range = errorToRange(e);
  if (!range) return null;

  const category = getErrorCategory(e);
  // Include collection index (row number) if available
  const rowInfo = typeof e?.collectionIndex === 'number' ? `[Row ${e.collectionIndex + 1}] ` : '';
  const message = rowInfo + (e?.message || String(e));

  return {
    id: generateErrorId(range, message),
    code: (e as any).code,
    category,
    message,
    range,
    source,
  };
}

function getErrorMarkers(e: any): EditorMarker[] {
  if (!(e instanceof IOError)) return [];
  const range = errorToRange(e);
  if (!range) return [];

  const category = getErrorCategory(e);
  const severity = categoryToSeverity(category) as 1 | 2 | 4 | 8;
  const message = e?.message || String(e);

  const marker: EditorMarker = {
    message,
    severity,
    startLineNumber: range.startLine,
    startColumn: range.startColumn,
    endLineNumber: range.endLine,
    endColumn: range.endColumn,
    id: generateErrorId(range, message),
    category,
  };
  return [marker];
}

// Export empty object to satisfy TypeScript module requirements
export {};
