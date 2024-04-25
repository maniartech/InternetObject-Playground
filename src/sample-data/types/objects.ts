const schema = `
a:{}, b:object, c: {object, schema:{a, b, c, *}},
d: {int, min:10}
`.trim()

const doc = `
{a, b, c}, {a:1, b:2, c:3}, {a:1, b:2, c:3, d:4},
{a, b, c}
`.trim()

const exportable = {
  doc,
  schema: schema,
  name: 'IO Objects',
  id: 'io-objects',
  schemaPanelHeight: 320,
}

export default exportable;
