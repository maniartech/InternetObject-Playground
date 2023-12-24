// REF: https://chat.openai.com/c/828fa9d6-981d-404a-8ef8-46e8140111ba
//
import Definitions                    from "internet-object/dist/core/definitions";
import parse                          from "internet-object/dist/parser"
import parseDefinitions               from 'internet-object/dist/parser/parse-defs';
import InternetObjectError            from 'internet-object/dist/errors/io-error';
import Token                          from 'internet-object/dist/tokenizer/tokens';
import InternetObjectSyntaxError      from 'internet-object/dist/errors/io-syntax-error';
import InternetObjectValidationError  from 'internet-object/dist/errors/io-validation-error';

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
      output: d.toObject(),
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
  if (e instanceof InternetObjectError) {
    const startPos = e.position
    if (e.position instanceof Token) {
      const token = e.position as Token
      const endPos = e.position.getEndPosition()

      return [
        {
          startLineNumber: token.row,
          startColumn: token.col,
          endLineNumber: endPos.row,
          endColumn: endPos.col,
          message: e.message,
          severity: 8 // monaco.MarkerSeverity.Error
        }
      ]
    } else if (startPos !== undefined) {
      return [
        {
          startLineNumber: startPos.row,
          startColumn: startPos.col,
          endLineNumber: startPos.row,
          endColumn: startPos.col,
          message: e.message,
          severity: 8 // monaco.MarkerSeverity.Error
        }
      ]
    }
  }

  return []
}
