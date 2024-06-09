const myLibrary = [];

function Book(title, genre, author) {
  // the constructor
  this.title = title;
  this.genre = genre;
  this.author = author;
}

function addBookToLibrary() {
  const title = prompt("What is the title of the book?");
  const genre = prompt("What is the genre of the book?");
  const author = prompt("What is the author of the book?");

  const newBook = new Book(title, genre, author);
  myLibrary.push(newBook);
}

addBookToLibrary();

console.log(myLibrary);
