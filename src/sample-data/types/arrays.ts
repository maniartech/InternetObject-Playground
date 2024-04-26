const schema = `
# With string notations
array_of_any: array,                      # Empty array shows

# With array notations
array_of_any2: [],                        # Empty array shows
array_of_strings: [string],               # array of string
array_of_strings2: [{string, minLen:2}],  # array of string with minimum length of string required to be 2

# With object notations
array_of_any_min_len2: {array, minLen:2, of:{string, minLen: 2}},  # array of any with minimum length of array and string to be 2
array_of_objects:{array, of:{}},
array_of_objects2: {array, of:{name, age, type}}
`.trim()

const doc = `
[1, two, 3.0, true, false],
[one, 2, 3.0, true, false, null,, d'2021-01-01'],
[a, b],
[aa, bbb, cccc],
[aa, bb, cc],
[{a: 1, b: 2}, {a: 3, b: 4}],
[{John Doe, 25, Student}, {Jane Doe, 30, Teacher}]
`.trim()

const exportable = {
  doc,
  schema: schema,
  name: 'IO Arrays',
  id: 'io-arrays',
  schemaPanelHeight: 320,
}

export default exportable;