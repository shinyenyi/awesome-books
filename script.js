const booksListSection = document.querySelector('.books-list');
const inputTitle = document.querySelector('.input-title');
const inputAuthor = document.querySelector('.input-author');
const addBookButton = document.querySelector('.add-book-button');

let books = Array.from(JSON.parse(localStorage.getItem('books') || '[]'));

let booksList = '';

function createBooksList(books) {
  if (books) {
    books.forEach((book, index) => {
      booksList += `
        <li class="book">
          <p class="book-title">${book.title}</p>
          by
          <p class="book-author">${book.author}</p>
          <button class="remove-book-button" onclick="removeBookButton(${index},${book.title})">Remove</button>
        </li>
      `;
    });
  }

  booksListSection.innerHTML = booksList;
}

createBooksList(books);
let bookIndex;

class Book {
  constructor(title, author, index) {
    this.title = title;
    this.author = author;
    this.index = index;
  }
  removeBook() {
    this.index = bookIndex;
    books.splice(this.index, 1);
    booksList = '';
    localStorage.setItem('books', JSON.stringify(books));
    books = Array.from(JSON.parse(localStorage.getItem('books') || '[]'));
    createBooksList(books);
  }
  addBook() {
    if (books.length) {
      bookIndex = (books.length - 1);
    }
    this.author = inputAuthor.value;
    this.title = inputTitle.value;
    this.index = bookIndex;
    booksList = '';
    localStorage.setItem('books', JSON.stringify(books));
    books = Array.from(JSON.parse(localStorage.getItem('books') || '[]'));
    createBooksList(books);
    inputAuthor.value = '';
    inputTitle.value = '';
  }
}

if (books.length) {
  bookIndex = (books.length - 1);
}

let newBook;
function createNewBook() {
  if (inputAuthor.value && inputTitle.value) {
    newBook = new Book(inputTitle.value, inputAuthor.value, bookIndex);
  }
}

addBookButton.onclick = (() => {
  createNewBook();
  books.push(newBook);
  newBook.addBook();
});

// eslint-disable-next-line no-unused-vars
function removeBookButton(index, title) {
  if (index) {
    bookIndex = index;
  } else {
    bookIndex = books.findIndex((book) => book.title === title);
  }
  newBook.removeBook();
}

// addBookButton.onclick = (() => {
//   if (inputAuthor.value && inputTitle.value) {
//     let bookIndex = 0;
//     if (books.length) {
//       bookIndex = books.length;
//     }
//     const newBook = new Book(inputTitle.value, inputAuthor.value, bookIndex);
//     books.push({ title: inputTitle.value, author: inputAuthor.value });
//     books.push(newBook);
//   }
//   booksList = '';
//   localStorage.setItem('books', JSON.stringify(books));
//   books = Array.from(JSON.parse(localStorage.getItem('books') || '[]'));
//   createBooksList(books);
//   inputAuthor.value = '';
//   inputTitle.value = '';
// });

// eslint-disable-next-line no-unused-vars
// function removeBook(index) {
//   books.splice(index, 1);
//   booksList = '';
//   localStorage.setItem('books', JSON.stringify(books));
//   books = Array.from(JSON.parse(localStorage.getItem('books') || '[]'));
//   createBooksList(books);
// }