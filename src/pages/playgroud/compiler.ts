// REF: https://chat.openai.com/c/828fa9d6-981d-404a-8ef8-46e8140111ba
//
import type { Definitions }               from "internet-object";
import { parse }                          from "internet-object"
import { parseDefinitions }               from 'internet-object';
import { InternetObjectError }            from 'internet-object';
import { InternetObjectSyntaxError }      from 'internet-object';
import { InternetObjectValidationError }  from 'internet-object';

type ParsingResult = {
  errorMessage?   : string,
  defs?           : Definitions | null,
  output?         : any         | null,
  defsMarkers?    : any[]       | null,
  docMarkers?     : any[]       | null,
}

export default function parseIO(document: string, defs: string | null): ParsingResult {
  if (defs === null) {
    return parseDoc(document, null)
  }
  const defsResult = parseDefs(defs)
  if (defsResult.errorMessage) {
    return defsResult
  }

  return parseDoc(document, defsResult.defs)
}

function parseDefs(defs: string): ParsingResult {
  try {
    return {
      defs: parseDefinitions(defs, null),
    }
  } catch (e: any) {
    console.log("Error parsing defs")
    console.log(e)
    return {
      errorMessage: getErrorMessage(e),
      defsMarkers: getErrorMarkers(e)
    }
  }
}

function parseDoc(doc: string, defs: Definitions | null = null): ParsingResult {
  try {
    const d = parse(doc, defs )
    return {
      output: d.toJSON(),
    }
  } catch (e: any) {
    console.log("Error parsing document")
    console.log(e)
    return {
      errorMessage: getErrorMessage(e),
      docMarkers: getErrorMarkers(e)
    }
  }
}

function getErrorMessage(e: any): string {
  let errType = "ERROR:"
  if (e instanceof InternetObjectSyntaxError) {
    errType = "SYNTAX_ERROR: "
  } else if (e instanceof InternetObjectValidationError) {
    errType = "VALIDATION_ERROR: "
  }

  return errType + e.message
}

function getErrorMarkers(e:any): any {
  if (e instanceof InternetObjectError == false) return []

  const startPos:any = e.positionRange?.getStartPos()
  const endPos:any = e.positionRange?.getEndPos()

  if (!startPos && !endPos) {
    return []
  }

  const marker= {
    message: e.message,
    severity: 8 // monaco.MarkerSeverity.Error
  } as any

  if (startPos) {
    marker.startLineNumber = startPos.row
    marker.startColumn = startPos.col
  }

  if (endPos) {
    marker.endLineNumber = endPos.row
    marker.endColumn = endPos.col
  }

  return [marker]
}
