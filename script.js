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