import { Book } from "./Book.js";

export class Library {
  constructor() {
    let books = [];
    Object.defineProperty(this, "books", {
      get: () => books,
      set: (value) => {
        if (!Array.isArray(value)) throw new Error("Books should be array.");
        books = value;
      },
    });
  }

  // Add a book to the library
  addBook(title, author, genre) {
    const book = new Book();
    book.title = title;
    book.author = author;
    book.genre = genre;
    console.log("You have added this book to the library:");
    book.displayInfo();
    this.books.push(book);
  }

  // Search for a book by title
  searchBook(title) {
    const foundBooks = this.books.filter((book) =>
      book.title.toLowerCase().includes(title.toLowerCase())
    );
    if (foundBooks.length > 0) {
      console.log(`Found ${foundBooks.length} book(s):`);
      foundBooks.forEach((book) => {
        book.displayInfo();
      });
    } else {
      console.log("No books found with that title.");
    }
  }

  // Display all books in the library
  displayBooks() {
    if (this.books.length === 0) {
      console.log("No books in the library.");
    } else {
      console.log(`There are ${this.books.length} book(s) in the library:`);
      this.books.forEach((book) => {
        book.displayInfo();
      });
    }
  }

  // Borrow a book from the library
  borrowBook(title) {
    const book = this.books.find(
      (book) => book.title.toLowerCase() === title.toLowerCase()
    );
    if (!book)
      throw new Error(
        `"${title}" book is not listed in the library, thus cannot be borrowed.`
      );
    book.borrowBook();
  }

  // Return a book to the library
  returnBook(title) {
    const book = this.books.find(
      (book) => book.title.toLowerCase() === title.toLowerCase()
    );
    if (!book)
      throw new Error(
        `"${title}" book is not listed in the library, thus cannot be returned.`
      );
    book.returnBook();
  }
}
