
const dummyData = `~ recordCount: 22
~ page: 3
~ prevPage: "/api/v1/people/page/2"
~ nextPage: N
~ $schema: {
    name: string,  # The person name
    age: {int, min:20, max:35},  # The person age!
    isActive?: {bool, F},
    joiningDt: date,  # The person joining date
    address?*: { # Person's address (optional) (Nullable)
      street: string,
      city: {string, choices:[New York, San Fransisco, Washington],
      state: {string: maxLen:2, choices:[NY, CA, WA]}
    },
    colors?: [string] # Color array in the form of string array
  }
---
~ John Doe, 25, T, d'2022-01-01', {Bond Street, New York, NY}, [red, blue]
~ Jane Done, 20, T, d'2022-10-10', {Bond Street, New York, NY}, [green, purple]
`

export default dummyData;