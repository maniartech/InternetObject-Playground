const schema = `
# This examples showcases all kinds of strings supported by Internet Object

# a) Open b) Regular Enclosed c) Raw string
# It also showcase built in email and url validator types
#
# References:
# https://docs.internetobject.org/the-values/string - String Value Structure
# https://docs.internetobject.org/the-schema/data-types/string - String Type

username: {string, pattern: r'^[a-z0-9_-]{3,16}$'}, # Pattern is defined using raw string format r'...'
name: {string, minLen: 3, maxLen: 50},
email: email, website: url,
bio?: {string, minLen: 50, maxLen: 500},
joiningDt: {string, pattern: r'^\\d{4}-\\d{2}-\\d{2}$'} # Here joining is NOT an io-date type. It is a string value with date like format.
`.trim()

const doc = `
~ john-001, John Doe, john.doe@example.com, 'https://johndoe.com',
  "John Doe is a software engineer with 10 years of experience in web development.
  He is a full-stack developer with expertise in React, Node.js, and MongoDB.", 2020-01-01

~ jane-002, Jane Doe, jane.doe@examples.com, 'https://janedoe.com',, 2020-02-03

~ alice-003, "Alice D'Costa", alice@wonderland.com, 'https://wonderland.com',
  "Alice D'Costa is an artist with specialization in watercolor painting and sketching.
  She has been awarded several times for her work.", 2020-03-04

`.trim()


const exportable = {
  doc,
  schema: schema,
  name: 'IO Strings',
  id: 'io-strings',
  schemaPanelHeight: 310,
}

export default exportable;