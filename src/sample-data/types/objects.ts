const schema = `
a:{}, b:object,                                       # both a and b can accept any object
c: {object, schema:{a, b, c}}, d: {a, b, c},          # c and d must have a, b, and c members and both of them are not open
e: {a, b, c, *},                                      # * as the last member in the schema makes object open.
                                                      # That is it can accept any non-defined members
f: {a, b?, c?},                                       # here last two members are optional
g: {a:any, b:{any, optional:T}, c:{any, optional:T}}  # same as f
`.trim()

const doc = `
{a, b, c},                # a
{a:1, b:2, c:3},          # b
{a:1, b:2, c:3},          # c
{a, b, c},                # d
{1, 2, 3, d:4, e:5},      # e
{1},                      # f
{1}                       # g
`.trim()

const exportable = {
  doc,
  schema: schema,
  name: 'IO Objects',
  id: 'io-objects',
  schemaPanelHeight: 320,
}

export default exportable;
