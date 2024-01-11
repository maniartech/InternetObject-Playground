const schema = `
~ $borrower: {userId, dueDate:date}
~ $borrowedBooks: {bookIsbn, borrowDate:date}
~ $users: {userId, name, membershipType, currentlyBorrowedBooks:[$borrowedBooks]}
~ $books: {title, author, isbn, availability, categories, published, borrowedBy?: $borrower}
~ $library: {name: string, address: string, books: [$books], users: [$users]}
~ $schema: $library
`.trim()

const doc = `
City Central Library, "123 Library St, Bookville",
books: [{
    The Great Gatsby,
    "F. Scott Fitzgerald",
    1234567890,
    true,
    [Fiction, Classic],
    1925
}, {
    "1984",
    George Orwell,
    2345678901,
    false,
    [Fiction, Dystopian],
    1949,
    { user123, d"2024-02-20"}
}],
users: [
    { user123, John Doe, Standard,  [{2345678901,d"2024-01-20"}]  },
    { user456, Jane Smith, Premium, [] }
]
`.trim()

const exportable = {
  doc,
  schema,
  name: 'complex',
}

export default exportable;