const schema = `
~ $borrower: {userId:string, dueDate:date}
~ $borrowedBooks: {bookIsbn:number, borrowDate:date}
~ $users: {userId:string, name:string, membershipType:{type:string, choices:[Standard, Premium]}, currentlyBorrowedBooks:[$borrowedBooks]}
~ $books: {title:string, author:string, isbn:number, availability:bool, categories:[string], published:number, borrowedBy?: $borrower}
~ $library: {name: string, address: string}
# ~ $schema: $library
`.trim()

const doc = `
--- $library
# Bookville Library
City Central Library, "123 Library St, Bookville"

--- $books
~ The Great Gatsby, "F. Scott Fitzgerald", 1234567890, T,[Fiction, Classic], 1925
~ "1984", George Orwell, 2345678901, F, [Fiction, Dystopian], 1949, { user123, d"2024-02-20"}

--- $users
~ user123, John Doe, Standard,  [{2345678901,d"2024-01-20"}]
~ user456, Jane Smith, Premium, []
`.trim()

const exportable = {
  doc,
  schema,
  name: 'Multiple Sections',
}

export default exportable;
