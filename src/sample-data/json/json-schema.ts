
const schema = `
~ $borrower: {userId:string, dueDate:string}
~ $borrowedBooks: {bookIsbn:number, borrowDate:string}
~ $users: {userId:string, name:string, membershipType:{type:string, choices:[Standard, Premium]}, currentlyBorrowedBooks:[$borrowedBooks]}
~ $books: {title:string, author:string, isbn:number, availability:bool, categories:[string], published:number, borrowedBy?: $borrower}
~ $library: {name: string, address: string, books: [$books], users: [$users]}
~ $schema: $library
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
      "availability": "yes",  # <- Change this to boolean true
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
  name: 'JSON with Schema',
  id: 'json-with-schema'
}

export default exportable;
