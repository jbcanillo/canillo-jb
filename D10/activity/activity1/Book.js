export class Book {
  constructor() {
    let title = "";
    let author = "";
    let genre = "";
    let availability = true;

    Object.defineProperty(this, "title", {
      get: () => title,
      set: (value) => {
        if (!value || value === "" || value == null)
          throw new Error("Title is required.");
        title = value;
      },
    });

    Object.defineProperty(this, "author", {
      get: () => author,
      set: (value) => {
        if (!value || value === "" || value == null)
          throw new Error("Author is required.");
        author = value;
      },
    });

    Object.defineProperty(this, "genre", {
      get: () => genre,
      set: (value) => {
        if (!value || value === "" || value == null)
          throw new Error("Genre is required.");
        genre = value;
      },
    });

    Object.defineProperty(this, "availability", {
      get: () => availability,
      set: (value) => {
        if (typeof value !== "boolean")
          throw new Error("Availability is required.");
        availability = value;
      },
    });
  }

  // Borrow a book
  borrowBook() {
    if (!this.availability)
      throw new Error(`"${this.title}" book is not available in the library.`);
    this.availability = false;
    console.log("You have borrowed this book:");
    this.displayInfo();
  }

  // Return a book
  returnBook() {
    if (this.availability)
      throw new Error(
        `"${this.title}" book is already available at the library.`
      );
    this.availability = true;
    console.log("You have returned this book:");
    this.displayInfo();
  }

  // Display book information
  displayInfo() {
    console.log(`Title: ${this.title}`);
    console.log(`Author: ${this.author}`);
    console.log(`Genre: ${this.genre}`);
    console.log(`Availability?: ${this.availability ? "Yes" : "No"}`);
  }
}
