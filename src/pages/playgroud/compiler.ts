// REF: https://chat.openai.com/c/828fa9d6-981d-404a-8ef8-46e8140111ba
//
import type { IODefinitions }   from "internet-object";
import { parse }                from "internet-object"
import { parseDefinitions }     from 'internet-object';
import { IOError }              from 'internet-object';
import { IOSyntaxError }        from 'internet-object';
import { IOValidationError }    from 'internet-object';


/**
 * Marker for editor error highlighting.
 */
export interface ErrorMarker {
  message: string;
  severity: number;
  startLineNumber?: number;
  startColumn?: number;
  endLineNumber?: number;
  endColumn?: number;
}

/**
 * Result of parsing an Internet Object document and/or definitions.
 */
export interface ParsingResult {
  errorMessages: string[];  // Changed from errorMessage to support multiple errors
  defs: IODefinitions | null;
  output: any | null;
  defsMarkers: ErrorMarker[];
  docMarkers: ErrorMarker[];
}


/**
 * Parses an Internet Object document and optional definitions.
 * Returns a ParsingResult with all fields always present.
 */

export default function parseIO(document: string, defs: string | null): ParsingResult {
  if (!defs) return parseDoc(document);
  const defsResult = tryParse(defs, parseDefinitions, true);
  if (defsResult.errorMessages.length > 0) return defsResult;
  return parseDoc(document, defsResult.defs);
}




function tryParse<T>(input: string, fn: (input: string, defs?: any) => T, isDefs = false): ParsingResult {
  try {
    const result = fn(input, null);

    // Check if result has getErrors method (Document/DocumentNode)
    let accumulatedErrors: Error[] = [];
    if (result && typeof (result as any).getErrors === 'function') {
      accumulatedErrors = (result as any).getErrors();
    }

    // Get output and defs regardless of errors (resilient parsing)
    const output = isDefs ? null : (result as any).toJSON();
    const defs = isDefs ? result as IODefinitions : null;

    // If there are accumulated errors, include them with the output
    if (accumulatedErrors.length > 0) {
      return {
        errorMessages: accumulatedErrors.map(e => getErrorMessage(e)),
        defs,
        output,
        defsMarkers: isDefs ? accumulatedErrors.flatMap(getErrorMarkers) : [],
        docMarkers: isDefs ? [] : accumulatedErrors.flatMap(getErrorMarkers),
      };
    }

    return {
      errorMessages: [],
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
    return {
      errorMessages: [getErrorMessage(e)],
      defs: null,
      output: null,
      defsMarkers: isDefs ? getErrorMarkers(e) : [],
      docMarkers: isDefs ? [] : getErrorMarkers(e),
    };
  }
}



function parseDoc(doc: string, defs: IODefinitions | null = null): ParsingResult {
  return tryParse(doc, (d) => parse(d, defs));
}



function getErrorMessage(e: any): string {
  if (e instanceof IOSyntaxError) return 'SYNTAX_ERROR: ' + (e?.message || String(e));
  if (e instanceof IOValidationError) return 'VALIDATION_ERROR: ' + (e?.message || String(e));
  return 'ERROR: ' + (e?.message || String(e));
}



function getErrorMarkers(e: any): ErrorMarker[] {
  if (!(e instanceof IOError)) return [];
  const startPos: any = e.positionRange?.getStartPos();
  const endPos: any = e.positionRange?.getEndPos();
  if (!startPos && !endPos) return [];
  const marker: ErrorMarker = {
    message: e.message,
    severity: 8, // monaco.MarkerSeverity.Error
    ...(startPos && { startLineNumber: startPos.row, startColumn: startPos.col }),
    ...(endPos && { endLineNumber: endPos.row, endColumn: endPos.col })
  };
  return [marker];
}
