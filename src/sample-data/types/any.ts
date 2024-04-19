const schema = `
# This example showcases values of type "any" by Internet Object

# a) Open b) Regular Enclosed c) Raw string
# It also showcase built in email and url validator types
#
# References:
# https://docs.internetobject.org/the-values/string - String Value Structure
# https://docs.internetobject.org/the-schema/data-types/string - String Type

~ $schema: {
  name, age, gender,                # When type is not specified, it's considered as "any"
  address: {
    any, anyOf: [                           # Address can be any type or any of the following
      { string, choices:[N/A, N/R, N/M ]},  # not available, not required, not mentioned
      { street, city, state, zip }          # Address in object format
    ]
  }, colors: {
    any, anyOf: [ string, number ]  # Colors can be string or number
  }, isActive: bool
}
`.trim()

const doc = `
~ John Doe, 25, m, {Bond Street, New York, NY, 10001}, [red, blue], T
~ Jane Done, 20, f, N/A, [0xFF0000, 0x0000FF], F
~ Jack Doe, 30, m, {Queen Rd, San Fransisco, CA, 94101}, [0xFF0000, "orange"], T
`.trim()

const exportable = {
  doc,
  schema: schema,
  name: 'IO Any',
  id: 'io-any',
  schemaPanelHeight: 430,
}

export default exportable;
