// add book form
const addBookForm = document.getElementById("add-book-form");
const bookTitleAdd = addBookForm.querySelector("#book-title");
const bookAuthorAdd = addBookForm.querySelector("#book-author");
const bookYearAdd = addBookForm.querySelector("#book-year");
const bookIsReadAdd = addBookForm.querySelector("#book-is-read");

// search form
const searchForm = document.getElementById("search-form");
const bookTitleSearch = searchForm.querySelector("#search-input");

// bookshelf
const bookshelfUnread = document.getElementById("bookshelf-unread");
const bookshelfRead = document.getElementById("bookshelf-read");

// edit book form
const editBookForm = document.getElementById("edit-book-form");
const bookIdEdit = editBookForm.querySelector("#edit-book-id");
const bookTitleEdit = editBookForm.querySelector("#edit-book-title");
const bookAuthorEdit = editBookForm.querySelector("#edit-book-author");
const bookYearEdit = editBookForm.querySelector("#edit-book-year");

// edit book alert
const editBookOverlay = document.getElementById("edit-book-overlay");
const editBookCancelButton = document.getElementById("edit-cancel-button");

// confirm alert
const cancelButtonConfirm = document.getElementById("cancel-button-confirm");
const acceptButtonConfirm = document.getElementById("accept-button-confirm");

// others
const RENDER_BOOK_EVENT = "render-book-event";
const BOOK_LIST_KEY = "BOOK_LIST";
const isSupportLocalStorage = typeof Storage !== "undefined";
