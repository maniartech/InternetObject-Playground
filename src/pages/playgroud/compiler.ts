

// REF: https://chat.openai.com/c/828fa9d6-981d-404a-8ef8-46e8140111ba

import parse from "internet-object/dist/parser"

export const parseIO = function (text: string, monaco:any): string {
  try {
    const parsedData = parse(text)
    return JSON.stringify(parsedData.toObject(), null, 2)
  } catch (error) {
    console.log(error)
  }

  return ""
}
