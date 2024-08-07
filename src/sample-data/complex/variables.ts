const schema = `
~ @r: red
~ @g: green
~ @b: blue
~$schema: {
  name: string,
  email: email,
  joiningDt: date,
  color: {string, choices: [@r, @g, @b]}
}
`.trim()

const doc = `
~ John Doe, john.doe@example.com, d'2020-01-01', @r
`.trim()


const exportable = {
  doc,
  schema: schema,
  name: 'Variables',
  id: 'variables',
  schemaPanelHeight: 320,
}

export default exportable;