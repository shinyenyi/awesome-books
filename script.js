const booksListSection = document.querySelector('.books-list');
const inputTitle = document.querySelector('.input-title');
const inputAuthor = document.querySelector('.input-author');
const removeBookButton = document.querySelector('.remove-book-button');
const addBookButton = document.querySelector('.add-book-button');

let books = Array.from(JSON.parse(localStorage.getItem('books') || '[]'));

let booksList = '';

function createBooksList(books) {
  if (books) {
    books.forEach((book, index) => {
      booksList += `
        <li class="book">
          <p class="book-title">${book.title}</p>
          <p class="book-author">${book.author}</p>
          <button class="remove-book-button" onclick="removeBook(${index})">Remove</button>
        </li>
      `;
    });
  }

  booksListSection.innerHTML = booksList;
}

createBooksList(books);
addBookButton.onclick = (() => {
  if (inputAuthor.value && inputTitle.value) {
    books.push({ title: inputTitle.value, author: inputAuthor.value });
  }
  booksList = '';
  localStorage.setItem("books", JSON.stringify(books));
  books = Array.from(JSON.parse(localStorage.getItem('books') || '[]'));
  createBooksList(books);
  return true;
});
function removeBook(index) {
  books.splice(index, 1);
  booksList = '';
  localStorage.setItem("books", JSON.stringify(books));
  books = Array.from(JSON.parse(localStorage.getItem('books') || '[]'));
  createBooksList(books);
}