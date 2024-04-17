const schema = `
# This example showcases all kinds of strings supported by Internet Object

# a) Open b) Regular Enclosed c) Raw string
# It also showcase built in email and url validator types
#
# References:
# https://docs.internetobject.org/the-values/number - Number Values
# https://docs.internetobject.org/the-schema/data-types/number - Number Type


~ $notations: { hex: uint8, oct: uint8, bin: uint8, decimal: number, scientific: {number, min:999999999}, other?: number }
~ $intRanges: { num1: int8, num2: int16, num3: int32, num4: int, num5: bigint }
~ $uintRanges: { num1: uint8, num2: uint16, num3: uint32, num4: uint64, num5: number }
`.trim()

const doc = `
--- notations: $notations # Various number notations
~ 0x000011, 0o002, 0b11, 10, 4.329e+10, NaN
~ 0x000022, 0o003, 0b100, 20, 2.329e+20, Inf
~ 0x000033, 0o004, 0b101, 30, 4.345e12, -Inf

`.trim()


const exportable = {
  doc,
  schema: schema,
  name: 'IO Numbers',
  id: 'io-numbers',
  schemaPanelHeight: 310,
}

export default exportable;