
const schema = `
# Employee Schema
~ $employee: { name:string, age:{number, min:25}, isActive:bool, joiningDt:date, managers?*: [$employee] }
~ $schema: $employee
`.trim()

const doc = `
~ John Doe, 25, T, d'2022-01-01', [{ Peter Parker, 30, T, d'2018-10-01' }]
~ Peter Parker, 30, T, d'2018-10-01', [{ Tony Stark, 40, T, d'2015-10-01' }]
~ Tony Stark, 40, T, d'2015-10-01', [{ Bruce Wayne, 45, T, d'2010-10-01' }]
~ Bruce Wayne, 45, T, d'2010-10-01', [{ Clark Kent, 35, T, d'2005-10-01' }]
~ Clark Kent, 35, T, d'2005-10-01', [{ Jane Doe, 25, T, d'2022-01-01' }]
~ Jane Doe, 25, T, d'2022-01-01', N

`.trim()

const exportable = {
  doc,
  schema,
  name: 'Recursive Schema Complex',
}

export default exportable;
