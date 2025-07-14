// REF: https://chat.openai.com/c/828fa9d6-981d-404a-8ef8-46e8140111ba
//
import type { Definitions }               from "internet-object";
import { parse }                          from "internet-object"
import { parseDefinitions }               from 'internet-object';
import { InternetObjectError }            from 'internet-object';
import { InternetObjectSyntaxError }      from 'internet-object';
import { InternetObjectValidationError }  from 'internet-object';


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
  errorMessage: string | null;
  defs: Definitions | null;
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
  if (defsResult.errorMessage) return defsResult;
  return parseDoc(document, defsResult.defs);
}




function tryParse<T>(input: string, fn: (input: string, defs?: any) => T, isDefs = false): ParsingResult {
  try {
    const result = fn(input, null);
    return {
      errorMessage: null,
      defs: isDefs ? result as Definitions : null,
      output: isDefs ? null : (result as any).toJSON(),
      defsMarkers: [],
      docMarkers: [],
    };
  } catch (e: any) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error(isDefs ? 'Error parsing defs' : 'Error parsing document', e);
    }
    return {
      errorMessage: getErrorMessage(e),
      defs: null,
      output: null,
      defsMarkers: isDefs ? getErrorMarkers(e) : [],
      docMarkers: isDefs ? [] : getErrorMarkers(e),
    };
  }
}



function parseDoc(doc: string, defs: Definitions | null = null): ParsingResult {
  return tryParse(doc, (d) => parse(d, defs));
}



function getErrorMessage(e: any): string {
  if (e instanceof InternetObjectSyntaxError) return 'SYNTAX_ERROR: ' + (e?.message || String(e));
  if (e instanceof InternetObjectValidationError) return 'VALIDATION_ERROR: ' + (e?.message || String(e));
  return 'ERROR: ' + (e?.message || String(e));
}



function getErrorMarkers(e: any): ErrorMarker[] {
  if (!(e instanceof InternetObjectError)) return [];
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
