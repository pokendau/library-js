const row1 = document.getElementById("row1");
const row2 = document.getElementById("row2");
const bookForm = document.querySelector("form");

const genres = {
  fantasy: "purple",
  fiction: "blue",
  "self-improvement": "yellow",
};

const myLibrary = [
  {
    id: 0,
    title: "Harry Potter. The philosopher stone",
    genre: "fantasy",
    author: "J. K. Rowling",
  },
  {
    id: 1,
    title: "The Hobbit",
    genre: "fantasy",
    author: "J. R. R. Tolkien",
  },
  {
    id: 2,
    title: "The Alchemist",
    genre: "fiction",
    author: "Paulo Coelho",
  },
];

let index = myLibrary.length;

class Book {
  constructor(title, genre, author) {
    this.id = index + 1;
    index += 1;
    this.title = title;
    this.genre = genre;
    this.author = author
  }
}

function addBookToLibrary() {
  const title = prompt("What is the title of the book?");
  const genre = prompt("What is the genre of the book?");
  const author = prompt("What is the author of the book?");

  const newBook = new Book(title, genre, author);
  myLibrary.push(newBook);
}

function drawBooks() {
  row1.innerHTML = "";
  row2.innerHTML = "";
  myLibrary.forEach((book) => {
    const b = document.createElement("div");
    b.id = book.id;
    b.classList.add("book");
    b.style.backgroundColor = genres[book.genre];

    b.setAttribute("draggable", true);
    b.setAttribute("ondragstart", "drag(event)");

    const txt = document.createElement("span");
    const author = document.createElement("span");

    author.style.color = "gray";

    b.appendChild(txt);
    b.appendChild(author);

    txt.innerHTML = book.title;
    author.innerHTML = book.author;

    if (row1.childNodes.length < 9) {
      row1.appendChild(b);
    } else {
      row2.appendChild(b);
    }
  });
}

console.log(myLibrary);
drawBooks();

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  const id = ev.dataTransfer.getData("text");
  const el = document.getElementById(id);
  const b = myLibrary.filter((element) => {
    element.id == id;
  });
  myLibrary.splice(myLibrary.indexOf(b) - 1, 1);
  el.remove();
}

function submit(ev) {
  ev.preventDefault();
  console.log(ev);
  return false;
}

bookForm.addEventListener("submit", (ev) => {
  ev.preventDefault();
  const title = bookForm.children[0].children[0].value;
  const author = bookForm.children[0].children[1].value;
  const genre =
    bookForm.children[1].options[
      bookForm.children[1].selectedIndex
    ].text.toLowerCase();
  const book = new Book(title, genre, author);
  myLibrary.push(book);
  drawBooks();
});
