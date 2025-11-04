// REF: https://chat.openai.com/c/828fa9d6-981d-404a-8ef8-46e8140111ba
//
import type { IODefinitions }   from "internet-object";
import { parse }                from "internet-object"
import { parseDefinitions }     from 'internet-object';
import { IOError }              from 'internet-object';
import { IOSyntaxError }        from 'internet-object';
import { IOValidationError }    from 'internet-object';
import { ErrorItem, EditorMarker, ErrorRange, ErrorCategory, categoryToSeverity, generateErrorId } from '../../types/errors';


/**
 * Result of parsing an Internet Object document and/or definitions.
 */
export interface ParsingResult {
  errorMessages: string[];  // Deprecated: use errorItems instead
  errorItems: ErrorItem[];   // Structured errors with full metadata
  defs: IODefinitions | null;
  output: any | null;
  defsMarkers: EditorMarker[];
  docMarkers: EditorMarker[];
}


/**
 * Parses an Internet Object document and optional definitions.
 * Returns a ParsingResult with all fields always present.
 */

export default function parseIO(document: string, defs: string | null, skipErrors = false): ParsingResult {
  if (!defs) return parseDoc(document, null, skipErrors);
  const defsResult = tryParse(defs, parseDefinitions, true, skipErrors);
  if (defsResult.errorMessages.length > 0) return defsResult;
  return parseDoc(document, defsResult.defs, skipErrors);
}




function tryParse<T>(input: string, fn: (input: string, defs?: any) => T, isDefs = false, skipErrors = false): ParsingResult {
  try {
    const result = fn(input, null);

    // Check if result has getErrors method (Document/DocumentNode)
    let accumulatedErrors: Error[] = [];
    if (result && typeof (result as any).getErrors === 'function') {
      accumulatedErrors = (result as any).getErrors();
    }

    // Get output and defs regardless of errors (resilient parsing)
    const output = isDefs ? null : (result as any).toJSON({ skipErrors });
    const defs = isDefs ? result as IODefinitions : null;

    // If there are accumulated errors, include them with the output
    if (accumulatedErrors.length > 0) {
      const source = isDefs ? 'defs' : 'doc';
      const errorItems = accumulatedErrors.map(e => errorToErrorItem(e, source)).filter((item): item is ErrorItem => item !== null);

      return {
        errorMessages: accumulatedErrors.map(e => getErrorMessage(e)),
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
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error(isDefs ? 'Error parsing defs' : 'Error parsing document', e);
    }

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



function parseDoc(doc: string, defs: IODefinitions | null = null, skipErrors = false): ParsingResult {
  return tryParse(doc, (d) => parse(d, defs), false, skipErrors);
}



function getErrorMessage(e: any): string {
  if (e instanceof IOSyntaxError) return 'SYNTAX_ERROR: ' + (e?.message || String(e));
  if (e instanceof IOValidationError) return 'VALIDATION_ERROR: ' + (e?.message || String(e));
  return 'ERROR: ' + (e?.message || String(e));
}

function getErrorCategory(e: any): ErrorCategory {
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
  const message = e?.message || String(e);

  return {
    id: generateErrorId(range, message),
    code: (e as any).code, // IOError may have a code property
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
