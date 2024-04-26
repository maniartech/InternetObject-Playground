const schema = `
# This example illustrates how Internet Object handles values of the "any" type,
# allowing for flexible data representation. Additionally, it demonstrates the "anyOf"
# feature, which enables specifying multiple possible types for a single field.


name, age, gender,                # When type is not specified, it's considered as "any"
address: {
  any, anyOf: [                           # Address can be any type or any of the following
    { string, choices:[N/A, N/R, N/M ]},  # not available, not required, not mentioned
    { street, city, state, zip }          # Address in object format
  ]
},
colors: [{                        # Array of colors
  any, anyOf: [ string, number ]  # Color can be string or number
}],
isActive: bool
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
  schemaPanelHeight: 320,
}

export default exportable;
