const schema = `
# This example showcases all kinds of strings supported by Internet Object

# a) Open b) Regular Enclosed c) Raw string
# It also showcase built in email and url validator types
#
# References:
# https://docs.internetobject.org/the-values/number - Number Values
# https://docs.internetobject.org/the-schema/data-types/number - Number Type

~ $notations:   { hex: uint8, oct: uint8, bin: uint8, decimal: number, scientific: {number, min:999999999}, other?: number }
~ $intRanges:   { num1: int8, num2: int16, num3: int32, num4: int }
~ $uintRanges:  { num1: uint8, num2: uint16, num3: uint32, num4: uint64, num5: number }
~ $float:       { num1: float64, num2: float }
~ $bigNumbers:  { num1: bigint, num2: {bigint, min:999999999999999999999999999999999999999999999999999999n} }
~ $decimals:    { num1: decimal, num2: {decimal, min:999999999999999999999999999999999999999999999999.9999999999999999999m} }
`.trim()

const doc = `
--- notations: $notations # Various number notations
~ 0x000011, 0o002, 0b11, 10, 4.329e+10, NaN
~ 0x000022, 0o003, 0b100, 20, 2.329e+20, Inf
~ 0x000033, 0o004, 0b101, 30, 4.345e12, -Inf

--- $bigNumbers # Big numbers
~ 999999999999999999999999999999999999999999999999999999n, 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFn

--- $decimals # Decimal numbers
~ 99.9999999999999999999999999999999999999999999m, 99999999999999999999999999999999999999999999999999999m
`.trim()

const exportable = {
  doc,
  schema: schema,
  name: 'IO Numbers',
  id: 'io-numbers',
  schemaPanelHeight: 310,
}

export default exportable;