/* get information from HTML */
const insertButton = document.getElementById("insert-book");
const deleteButton = document.querySelector("delete-book");
const bookTable = document.getElementById("book-table");
const tableHeader = document.getElementById("table-header");
const pageContainer = document.getElementById("container");

/* get user values from user's inputs on HTML */
const bookName = document.getElementById("book-name-input");
const bookAuthor = document.getElementById("book-author-input");
const bookPage = document.getElementById("book-page-input");
const bookRead = document.getElementById("book-read-input");

let myLibrary = [];
let arrayCounter = 0;

function Book(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(Book) {
    myLibrary.push(Book);
}

const theHobbit = new Book("The Hobbit", "JRR Tolkien", 295, "no");
addBookToLibrary(theHobbit);

const whiteIsForWitching = new Book("White Is For Witching", "Helen Oyemi", 255, "yes");
addBookToLibrary(whiteIsForWitching);

function insertHeader() {
    let tableHeader = document.createElement('tr');
    let nameHeader = document.createElement('th');
    let authorHeader = document.createElement('th');
    let pageHeader = document.createElement('th');
    let readHeader = document.createElement('th');
    let deleteHeader = document.createElement('th');

    nameHeader.innerHTML = "Book's Name";
    authorHeader.innerHTML = "Book's Author";
    pageHeader.innerHTML = "Book's Pages";
    readHeader.innerHTML = "Has the book been Read?";
    deleteHeader.innerHTML = "Delete Book";

    bookTable.appendChild(tableHeader);
    tableHeader.appendChild(nameHeader);
    tableHeader.appendChild(authorHeader);
    tableHeader.appendChild(pageHeader);
    tableHeader.appendChild(readHeader);
    tableHeader.appendChild(deleteHeader);
}

function insertRow(Book) {
    let tableRow = document.createElement('tr');
    let bookName = document.createElement('td');
    let bookAuthor = document.createElement('td');
    let bookPage = document.createElement('td');
    let bookRead = document.createElement('td');
    let bookDelete = document.createElement('td');

    bookName.innerHTML = Book.name;
    bookAuthor.innerHTML = Book.author;
    bookPage.innerHTML = Book.pages;
    if (Book.read == "yes") {
        bookRead.innerHTML = "Yes";
    }
    else {
        bookRead.innerHTML = "No";
    }
    /* assign ID to delete button based on the global counter to keep track of button's ID related to position in array */
    bookDelete.innerHTML = "<button class='delete-buttons' id='delete-book-" + arrayCounter.toString() + "'>Delete</button>"
    arrayCounter++;

    bookTable.appendChild(tableRow);
    tableRow.appendChild(bookName);
    tableRow.appendChild(bookAuthor);
    tableRow.appendChild(bookPage);
    tableRow.appendChild(bookRead);
    tableRow.appendChild(bookDelete);
}

function createTable() {
    while (bookTable.firstChild) {
        bookTable.removeChild(bookTable.firstChild);
    }

    insertHeader();
    myLibrary.forEach(book => {
        insertRow(book);
    })
};

pageContainer.addEventListener("click", function(e) {
    if (e.target.matches("#insert-book")) {
        if (bookName.value && bookAuthor.value && bookPage.value) {
            let newBook = new Book(bookName.value, bookAuthor.value, parseInt(bookPage.value), bookRead.value);
            addBookToLibrary(newBook);
            insertRow(newBook);
            bookName.value = "";
            bookAuthor.value = "";
            bookPage.value = "";
            bookRead.value = "yes";
        }
        else {
            alert("You seem to be missing some information, fill out all forms to insert a book");
        } 
    }
    if (e.target.matches(".delete-buttons")) {
        /*get the ID of the button*/
        myLibrary.splice(e.target.id.substring(12, e.target.id.length),1);
        arrayCounter = 0;
        createTable();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    createTable();
})