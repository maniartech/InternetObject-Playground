
const doc = `~ recordCount: 22
~ page: 3
~ prevPage: "/api/v1/people/page/2"
~ nextPage: F
~ cymk: [cyan, yellow, magenta, black]
~ $schema: {
    name: string,  # The person name
    age: {int, min:20, max:35},  # The person age!
    joiningDt: date,  # The person joining date
    gender?: {string, choices:[m, f, u]},
    address?*: { # Person's address (optional) (Nullable)
      street: string,
      city: {string, choices:[New York, San Fransisco, Washington]},
      state: {string, maxLen:2, choices:[NY, CA, WA]}
    },
    colors?: [string], # Color array inthe form of string array
    isActive?: {bool, F}
  }
---
~ John Doe, 25, d'2022-01-01', m, {Bond Street, New York, NY}, $cymk, T
~ Jane Done, 20, d'2022-10-10', f, {Bond Street, "\uD83D\uDCC8 New York", NY}, [green, purple]
`

const exportable = {
  doc,
  schema: null,
  name: 'full',
}

export default exportable;
