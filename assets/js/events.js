// handle submitted add book
addBookForm.addEventListener("submit", (e) => {
	e.preventDefault();

	const title = bookTitleAdd.value;
	const author = bookAuthorAdd.value;
	const year = bookYearAdd.value;
	const isRead = bookIsReadAdd.checked;

	const book = createBookObject(title, author, year, isRead);
	addNewBook(book);

	bookTitleAdd.value = "";
	bookAuthorAdd.value = "";
	bookYearAdd.value = "";
	bookIsReadAdd.checked = false;

	const books = getBookLists();
	renderBookshelf(books);
});

// handle submitted search form
searchForm.addEventListener("submit", function (e) {
	e.preventDefault();

	const searchText = bookTitleSearch.value;
	if (searchText.length == 0) {
		const books = getBookLists();
		renderBookshelf(books);
	} else {
		const books = getBooksByTitle(searchText);
		renderBookshelf(books);
	}
});

// handle submitted edit form
editBookForm.addEventListener("submit", function (e) {
	e.preventDefault();

	const id = bookIdEdit.value;
	const title = bookTitleEdit.value;
	const author = bookAuthorEdit.value;
	const year = bookYearEdit.value;

	updateBookById(id, {
		title,
		author,
		year,
	});

	bookIdEdit.value = "";
	bookTitleEdit.value = "";
	bookAuthorEdit.value = "";
	bookYearEdit.value = "";

	hideEditForm();

	const books = getBookLists();
	renderBookshelf(books);
});

// handle edit book cancel button
editBookCancelButton.addEventListener("click", function (e) {
	e.preventDefault();

	bookIdEdit.value = "";
	bookTitleEdit.value = "";
	bookAuthorEdit.value = "";
	bookYearEdit.value = "";

	hideEditForm();
});

// handle content laoded
window.addEventListener("DOMContentLoaded", (e) => {
	const books = getBookLists();
	renderBookshelf(books);
});
