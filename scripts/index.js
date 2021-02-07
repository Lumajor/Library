const bookTable = document.getElementById("book-table");
const loggedOutLinks = document.querySelectorAll(".logged-out-header");
const loggedInLinks = document.querySelectorAll(".logged-in-header");
const accountDetails = document.querySelector(".account-details");

const setupUI = (user) => {
    if (user) {
        //account info 
        console.log(user);
        db.collection("users").doc(user.uid).get().then(doc => {
            const html = `
            <div>Logged in as ${user.email}</div>
            <div>${doc.data().bio}</div>
            `
            accountDetails.innerHTML = html;
        })
       
        //toggle UI elements
        loggedInLinks.forEach(item => item.style.display = "block");
        loggedOutLinks.forEach(item => item.style.display = "none");
    } else {
        //hide account details
        accountDetails.innerHTML = "";
        // toggle UI elements
        loggedInLinks.forEach(item => item.style.display = "none");
        loggedOutLinks.forEach(item => item.style.display = "block");
    }
}

// setup table
const setupTable = (data) => {
    
    if (data.length) {
    let html = `<tr>
                    <th>Book's Author</th>
                    <th>Book's Name</th>
                    <th>Book's Pages</th>
                    <th>Read Status</th>
                    <th>Delete Book?</th>
                </tr>`;
    data.forEach(doc => {  
        const book = doc.data();
        if (book.read == 'yes') {
            const table = `
            <tr>
                <td>${book.author}</td> 
                <td>${book.name}</td>
                <td>${book.pages}</td>
                <td><button id="book-num-${book.bookNum}" class="read-button"> Read </button></td>
                <td><button id="book-num-${book.bookNum}" class="delete-button"> Delete </button></td>
            </tr>
        `
        html += table
        } else {
            const table = `
            <tr>
                <td>${book.author}</td> 
                <td>${book.name}</td>
                <td>${book.pages}</td>
                <td><button id="book-num-${book.bookNum}" class="read-button"> Unread </button></td>
                <td><button id="book-num-${book.bookNum}" class="delete-button"> Delete </button></td>
            </tr>
        `
        html += table
        };
        
    });
    
    bookTable.innerHTML = html;
} else {
    auth.onAuthStateChanged(user =>  {
        if (user) {
            bookTable.innerHTML = '<h5 class="center-align"> Insert a book to start your collection. </h5>'
        } else {
            bookTable.innerHTML = '<h5 class="center-align"> Signup or Login to start tracking books. </h5>'
        }
});
}};



// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
});