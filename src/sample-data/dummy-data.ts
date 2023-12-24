
const doc = `~ recordCount: 22
~ page: 3
~ prevPage: "/api/v1/people/page/2"
~ nextPage: F
---
~ John Doe, 25, d'2022-01-01', m, @officeAddr, [red, green, blue]
~ Jane Done, 20, d'2022-10-10', f, {\\uD83D\\uDCC8 Bond Street, "New York", NY}, [green, purple]
`

const schema = `# Employee Shema and Variables
~ @officeAddr: {Santacruze, California, CA}
~ $schema: {
    name: string,  # The person name
    age: {int, min:20, max:35},  # The person age!
    joiningDt: date,  # The person joining date
    gender?: {string, choices:[m, f, u]},
    address?*: { # Person's address (optional) (Nullable)
      street: string,
      city: {string, choices:[New York, California, San Fransisco, Washington]},
      state: {string, maxLen:2, choices:[NY, CA, WA]}
    },
    colors?: [string], # Color array inthe form of string array
    isActive?: {bool, F}
  }
`

const exportable = {
  doc,
  schema,
  name: 'full',
}

export default exportable;
