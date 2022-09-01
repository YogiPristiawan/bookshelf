function handleUnsupportedBrowser() {
	alert("Browser anda tidak support untuk menjalankan aplikasi ini :( .");
}

function getBookLists() {
	if (!isSupportLocalStorage) return handleUnsupportedBrowser();

	const localBook = localStorage.getItem(BOOK_LIST_KEY);

	if (localBook !== null) {
		return JSON.parse(localBook);
	}

	return [];
}

function getBooksByTitle(title) {
	if (!isSupportLocalStorage) return handleUnsupportedBrowser();

	const books = getBookLists();
	return books.filter((book) => book.title.search(title) != -1);
}

function findBookById(bookID) {
	if (!isSupportLocalStorage) return handleUnsupportedBrowser();

	const books = getBookLists();
	return books.find((book) => book.id === bookID);
}

function createBookObject(title, author, year, isRead) {
	return {
		id: +new Date(),
		title,
		author,
		year,
		isRead,
	};
}

function renderBookshelf(books) {
	document.dispatchEvent(
		new CustomEvent(RENDER_BOOK_EVENT, {
			detail: {
				books: books,
			},
		}),
	);
}

document.addEventListener(RENDER_BOOK_EVENT, function (evt) {
	const books = evt.detail.books;

	bookshelfUnread.innerHTML = "";
	bookshelfRead.innerHTML = "";

	for (const book of books) {
		if (book.isRead) {
			bookshelfRead.appendChild(createReadBookItem(book));
		} else {
			bookshelfUnread.appendChild(createUnreadBookItem(book));
		}
	}
});

function showEditForm(book) {
	editBookOverlay.classList.remove("hide");
	editBookOverlay.classList.add("show");

	bookIdEdit.value = book.id;
	bookTitleEdit.value = book.title;
	bookAuthorEdit.value = book.author;
	bookYearEdit.value = book.year;
}

function hideEditForm() {
	editBookOverlay.classList.remove("show");
	editBookOverlay.classList.add("hide");
}

function addNewBook(book) {
	if (!isSupportLocalStorage) return handleUnsupportedBrowser();

	const books = getBookLists();

	books.unshift(book);
	localStorage.setItem(BOOK_LIST_KEY, JSON.stringify(books));
}

function updateBookById(bookID, options) {
	if (!isSupportLocalStorage) return handleUnsupportedBrowser();

	const books = getBookLists();

	for (let i = 0; i < books.length; i++) {
		if (books[i].id === parseInt(bookID)) {
			books[i] = { ...books[i], ...options };

			break;
		}
	}

	localStorage.setItem(BOOK_LIST_KEY, JSON.stringify(books));
}

function deleteBookById(bookID) {
	if (!isSupportLocalStorage) return handleUnsupportedBrowser();

	const books = getBookLists();

	for (let i = 0; i < books.length; i++) {
		if (books[i].id === bookID) {
			books.splice(i, 1);
			break;
		}
	}

	localStorage.setItem(BOOK_LIST_KEY, JSON.stringify(books));
}

// CREATE ELEMENT FUNCITON
function showConfirmAlert() {
	const promise = new Promise((resolve, reject) => {
		const alertConfirmOverlay = document.createElement("div");
		alertConfirmOverlay.classList.add("alert-confirm-overlay");

		const confirmAlert = document.createElement("div");
		confirmAlert.classList.add("confirm-alert");

		const h3 = document.createElement("h3");
		h3.classList.add("card-title");
		h3.innerText = "Apakah anda yakin ingin menghapus data ini?";

		const cancelButton = document.createElement("button");
		cancelButton.classList.add("cancel-button-confirm");
		cancelButton.setAttribute("id", "cancel-button-confirm");
		cancelButton.innerText = "Tidak";
		cancelButton.addEventListener("click", function (e) {
			document.body.removeChild(alertConfirmOverlay);
			reject();
		});

		const acceptButton = document.createElement("button");
		acceptButton.classList.add("accept-button-confirm");
		acceptButton.setAttribute("id", "accept-button-confirm");
		acceptButton.innerText = "Iya";
		acceptButton.addEventListener("click", function (e) {
			document.body.removeChild(alertConfirmOverlay);
			resolve();
		});

		const confirmButtonGroup = document.createElement("div");
		confirmButtonGroup.classList.add("confirm-button-group");
		confirmButtonGroup.appendChild(cancelButton);
		confirmButtonGroup.appendChild(acceptButton);

		confirmAlert.appendChild(h3);
		confirmAlert.appendChild(confirmButtonGroup);

		alertConfirmOverlay.appendChild(confirmAlert);

		document.body.appendChild(alertConfirmOverlay);
	});

	return promise;
}

function createBookTitle(title) {
	const bookTitle = document.createElement("h3");
	bookTitle.classList.add("book-title");
	bookTitle.innerText = title;

	return bookTitle;
}

function _createDescriptionRow(key, value) {
	const firstTd = document.createElement("td");
	firstTd.innerText = key;
	const secondTd = document.createElement("td");
	secondTd.innerText = " : ";
	const thirdTd = document.createElement("td");
	thirdTd.innerText = value;

	const tr = document.createElement("tr");
	tr.appendChild(firstTd);
	tr.appendChild(secondTd);
	tr.appendChild(thirdTd);

	return tr;
}

function createBookDescription(book) {
	const bookDescription = document.createElement("table");
	bookDescription.appendChild(_createDescriptionRow("Penulis", book.author));
	bookDescription.appendChild(_createDescriptionRow("Tahun", book.year));
	bookDescription.classList.add("book-description");

	return bookDescription;
}

function createReadButton(bookID) {
	const readButton = document.createElement("button");
	readButton.classList.add("read-btn");
	readButton.innerText = "Selesai dibaca";

	readButton.addEventListener("click", function (e) {
		updateBookById(bookID, { isRead: true });

		const books = getBookLists();
		renderBookshelf(books);
	});

	return readButton;
}

function createEditButton(bookID) {
	const editButton = document.createElement("button");
	editButton.classList.add("edit-btn");
	editButton.innerText = "Edit";

	editButton.addEventListener("click", function (e) {
		const book = findBookById(bookID);
		showEditForm(book);
	});

	return editButton;
}

function createUnreadButton(bookID) {
	const unreadButton = document.createElement("button");
	unreadButton.classList.add("unread-btn");
	unreadButton.innerText = "Belum dibaca";

	unreadButton.addEventListener("click", function (e) {
		updateBookById(bookID, { isRead: false });

		const books = getBookLists();
		renderBookshelf(books);
	});

	return unreadButton;
}

function createDeleteButton(bookID) {
	const deleteButton = document.createElement("button");
	deleteButton.classList.add("delete-btn");
	deleteButton.innerText = "Hapus";

	deleteButton.addEventListener("click", function (e) {
		const alert = showConfirmAlert();
		alert
			.then((result) => {
				deleteBookById(bookID);
				const books = getBookLists();
				renderBookshelf(books);
			})
			.catch((err) => {});
	});

	return deleteButton;
}

function createUnreadBookItem(book) {
	const bookItem = document.createElement("div");
	bookItem.classList.add("book-item-unread");

	const bookTitle = createBookTitle(book.title);
	const bookDescription = createBookDescription(book);
	const bookAction = document.createElement("div");
	bookAction.classList.add("book-action");
	bookAction.appendChild(createReadButton(book.id));
	bookAction.appendChild(createEditButton(book.id));
	bookAction.appendChild(createDeleteButton(book.id));

	bookItem.appendChild(bookTitle);
	bookItem.appendChild(bookDescription);
	bookItem.appendChild(bookAction);

	return bookItem;
}

function createReadBookItem(book) {
	const bookItem = document.createElement("div");
	bookItem.classList.add("book-item-read");

	const bookTitle = createBookTitle(book.title);
	const bookDescription = createBookDescription(book);
	const bookAction = document.createElement("div");
	bookAction.classList.add("book-action");
	bookAction.appendChild(createUnreadButton(book.id));
	bookAction.appendChild(createEditButton(book.id));
	bookAction.appendChild(createDeleteButton(book.id));

	bookItem.appendChild(bookTitle);
	bookItem.appendChild(bookDescription);
	bookItem.appendChild(bookAction);

	return bookItem;
}
