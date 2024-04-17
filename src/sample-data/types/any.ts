const schema = `
# This example showcases values of type "any" by Internet Object

# a) Open b) Regular Enclosed c) Raw string
# It also showcase built in email and url validator types
#
# References:
# https://docs.internetobject.org/the-values/string - String Value Structure
# https://docs.internetobject.org/the-schema/data-types/string - String Type

~ @stringV: Hello World
~ $schema: { test: {any, anyOf: [string, {number, min: 1000}]} }
`.trim()

const doc = `
~ @stringV

~ 100
`.trim()


const exportable = {
  doc,
  schema: schema,
  name: 'IO Any',
  id: 'io-any',
  schemaPanelHeight: 320,
}

export default exportable;