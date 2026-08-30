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

  const defsResult = tryParse(defs, (d, sink) => parseDefinitions(d, null, sink), true);
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

/**
 * Runs one parse and collects everything the panel needs from it.
 *
 * `fn` is handed the **sink** rather than being asked for its errors afterwards. Since the library's
 * §2.5 signature work every entry point takes one in slot three, and since C1a the sink reports the
 * same set as `doc.getErrors()` — syntax errors included, which the old `getErrors()`-only route
 * never saw on some documents.
 *
 * It also has to be the sink now rather than a method call: `io.parse` returns **plain JavaScript**,
 * so there is no `getErrors()` and no `toJSON()` to call on the result. Asking a POJO for its errors
 * would have quietly reported none, and asking it for `toJSON()` would have thrown.
 */
function tryParse<T>(
  input: string,
  fn: (input: string, sink: Error[]) => T,
  isDefs = false
): ParseIntermediateResult {
  const sink: Error[] = [];
  try {
    const result = fn(input, sink);

    const accumulatedErrors: Error[] = sink;

    // `io.parse` already returns the projection, so there is nothing left to convert. Definitions
    // are not projected at all — the panel wants the object, to parse the document with.
    const output = isDefs ? null : (result as any);
    const defs = isDefs ? (result as IODefinitions) : null;

    if (accumulatedErrors.length > 0) {
      const source = isDefs ? 'defs' : 'doc';
      const errorItems = accumulatedErrors.map((e) => errorToErrorItem(e, source));

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
      errorItems: [errorItem],
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
  // `skipErrors` is the DATA axis: it decides whether failed records appear in the result. The sink
  // is the REPORTING axis and is unaffected — the problem list still shows every error either way,
  // which is exactly what the panel's toggle is for.
  const intermediate = tryParse(doc, (d, sink) => parse(d, defs, sink, { skipErrors }), false);

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

/**
 * Where an error is shown when it reports no position of its own.
 *
 * Anchoring at the start of the document is imprecise, but it is the only safe default: an error
 * the user cannot see is far worse than one pointing at the wrong line. A structural error (two
 * sections sharing a name, say) is about the document as a whole, so the top of it is a defensible
 * home.
 */
const DOCUMENT_START_RANGE: ErrorRange = {
  startLine: 1,
  startColumn: 1,
  endLine: 1,
  endColumn: 1,
};

/**
 * Build a problem-list entry for an error.
 *
 * NEVER returns null. This used to drop any error without a position, which meant a real parse
 * failure could be reported by the parser and yet never reach the user - the document rendered as
 * though it were perfectly valid. Positionless errors are now listed at the top of the document
 * rather than discarded.
 */
function errorToErrorItem(e: any, source: 'doc' | 'defs'): ErrorItem {
  const range = errorToRange(e) ?? DOCUMENT_START_RANGE;

  const category = getErrorCategory(e);
  // Include collection index (row number) if available
  const rowInfo = typeof e?.collectionIndex === 'number' ? `[Row ${e.collectionIndex + 1}] ` : '';
  const message = rowInfo + (e?.message || String(e));

  return {
    id: generateErrorId(range, message),
    // io-js2 names this `errorCode`; `code` is kept as a fallback for non-IO errors.
    code: (e as any).errorCode ?? (e as any).code,
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
