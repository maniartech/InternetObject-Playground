
const schema = `
# Employee Schema
~ $employee: { name:string, age:{number, min:25}, isActive:bool, joiningDt:date, managers?*: $user }
~ $user: $employee
~ $schema: $employee
`.trim()

const doc = `
~ John Doe, 25, T, d'2022-01-01', { Peter Parker, 30, T, d'2018-10-01' }
`.trim()

const exportable = {
  doc,
  schema,
  name: 'Simple Deeply Nested Schema',
  id: 'simple-deeply-nested-schema'
}

export default exportable;
