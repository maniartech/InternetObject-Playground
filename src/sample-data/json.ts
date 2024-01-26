
const doc = `
# JSON format is compatible with Internet Object
{
  "library": {
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
  }
}`.trim()

const exportable = {
  doc,
  schema: null,
  name: 'json',
}

export default exportable;
