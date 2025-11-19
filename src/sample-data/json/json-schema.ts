
const schema = `
~ $borrower: {userId:string, dueDate:string}
~ $borrowedBooks: {bookIsbn:string, borrowDate:string}
~ $users: {userId:string, name:string, membershipType:{type:string, choices:[Standard, Premium]}, currentlyBorrowedBooks:[$borrowedBooks]}
~ $books: {title:string, author:string, isbn:string, availability:bool, categories:[string], published:number, borrowedBy?: $borrower}
~ $library: {name: string, address: string, books: [$books], users: [$users]}
~ $schema: $library

# This example intentionally fails validation to demonstrate schema checks.
`.trim()

const doc = `
{
  "name": "City Central Library",
  "address": "123 Library St, Bookville",
  "books": [
    {
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "isbn": "1234567890",
      "availability": "yes",  # INTENTIONAL ERROR: expected boolean (e.g., true)
      "categories": ["Fiction", "Classic"],
      "published": 1925
    },
    {
      "title": "1984",
      "author": "George Orwell",
      "isbn": "2345678901",
      "availability": false,
      "categories": ["Fiction", "Dystopian"],
      "published": 1949,
      "borrowedBy": {
        "userId": "user123",
        "dueDate": "2024-02-20"
      }
    }
  ],
  "users": [
    {
      "userId": "user123",
      "name": "John Doe",
      "membershipType": "Standard",
      "currentlyBorrowedBooks": [
        {
          "bookIsbn": "2345678901",
          "borrowDate": "2024-01-20"
        }
      ]
    },
    {
      "userId": "user456",
      "name": "Jane Smith",
      "membershipType": "Premium",
      "currentlyBorrowedBooks": []
    }
  ]
}`.trim()

// Brief guidance shown by the playground (safe if ignored by consumer)
const hint = `
This sample intentionally fails validation to demonstrate schema checks.

- Error: books[0].availability must be a boolean, but it's a string ("yes").
- Fix: change "yes" to true below to pass validation.

Tip: Try running validation first to see the precise error location, then apply the fix.
`.trim()

// A corrected version you can switch to if needed
const validDoc = `
{
  "name": "City Central Library",
  "address": "123 Library St, Bookville",
  "books": [
    {
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "isbn": "1234567890",
      "availability": true,
      "categories": ["Fiction", "Classic"],
      "published": 1925
    },
    {
      "title": "1984",
      "author": "George Orwell",
      "isbn": "2345678901",
      "availability": false,
      "categories": ["Fiction", "Dystopian"],
      "published": 1949,
      "borrowedBy": {
        "userId": "user123",
        "dueDate": "2024-02-20"
      }
    }
  ],
  "users": [
    {
      "userId": "user123",
      "name": "John Doe",
      "membershipType": "Standard",
      "currentlyBorrowedBooks": [
        {
          "bookIsbn": "2345678901",
          "borrowDate": "2024-01-20"
        }
      ]
    },
    {
      "userId": "user456",
      "name": "Jane Smith",
      "membershipType": "Premium",
      "currentlyBorrowedBooks": []
    }
  ]
}`.trim()

const exportable = {
  doc,
  schema: schema,
  name: 'JSON with IO Schema (Intentional Error)',
  id: 'json-with-schema',
  hint,
  validDoc
}

export default exportable;
