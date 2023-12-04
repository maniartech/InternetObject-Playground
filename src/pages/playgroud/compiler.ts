

// REF: https://chat.openai.com/c/828fa9d6-981d-404a-8ef8-46e8140111ba

import parse from "internet-object/dist/parser"
import InternetObjectError from 'internet-object/dist/errors/io-error';
import Token from 'internet-object/dist/tokenizer/tokens';

export const parseIO = function (text: string, monaco:any): any {
  try {
    const parsedData = parse(text)
    return {
      data: JSON.stringify(parsedData.toObject()),
      markers: []
    }
  } catch (e: any) {
    console.error(e)
    return {
      data: "ERROR: " + e.message,
      markers: getMarkers(e)
    }
  }
}

function getMarkers(e:any): any {

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