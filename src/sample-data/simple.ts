const doc = `name, age, isActive, joiningDt, address, colors
---
John Doe, 25, T, d'2022-01-01', {Bond Street, New York, NY}, [red, blue]
`

const exportable = {
  doc,
  schema: null,
  name: 'simple',
}

export default exportable;