//Listen for auth status changes
auth.onAuthStateChanged(user =>  {
    if (user) {
        db.collection("users").doc(user.uid).collection("books").onSnapshot(snapshot => {
            setupTable(snapshot.docs);
            setupUI(user);
        }, err => {
            console.log(err.message);
        });
    } else {
        setupUI();
        setupTable([]);
    };
});

//signup
const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // get user info
    const email = signupForm["signup-email"].value;
    const password = signupForm['signup-password'].value;

    //sign up user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        return db.collection("users").doc(cred.user.uid).set({
            bio: signupForm["signup-bio"].value
        });
    }).then(() => {
        const modal = document.querySelector("#modal-signup");
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('error: ', errorMessage);
    });
});

//logout
const logout = document.querySelector("#logout");
logout.addEventListener("click", (e) => {
    e.preventDefault();
    auth.signOut();
});

//login
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    //get user info
    const email = loginForm["login-email"].value;
    const password = loginForm["login-password"].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        //close the login moadl and reset form
        const modal = document.querySelector("#modal-login");
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('error: ', errorMessage);
    });
});

//enter books for users
const insertForm = document.querySelector('#insert-form');
insertForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    auth.onAuthStateChanged(user =>  {
        if (user) {

            db.collection("users").doc(user.uid).collection("books").get().then(snap => {
                let size = snap.size;
                db.collection("users").doc(user.uid).collection("books").add({
                    author: insertForm['author'].value,
                    name: insertForm['name'].value,
                    pages: insertForm['pages'].value,
                    read: insertForm['read'].value,
                    bookNum: size += 1
                })
            }).then(() => {
                // close modal and reset form
                const modal = document.querySelector("#modal-insert");
                M.Modal.getInstance(modal).close();
                insertForm.reset();
            }).catch(err => {
                console.log(err.message)
            })
        } else {
            console.log('user logged out.')
        }
    })
})

container.addEventListener('click', (e) => {
    
    auth.onAuthStateChanged(user =>  {
        var userBooksRef = db.collection('users').doc(user.uid).collection('books')
        if (user) {
            if(e.target.matches(".read-button")) {
                let readButtonID = parseInt(e.target.id.substring(9, e.target.id.length));
                var readQuery = userBooksRef.where("bookNum", "==", readButtonID).limit(1);
                readQuery.get()
                .then((querySnapshot) => {
                    let document = querySnapshot.docs[0]
                    let docInfo = document.data()
                    if (docInfo.read == "yes") {
                        document.ref.update({read: "no"})
                    } else {
                        document.ref.update({read: "yes"})
                    }
                })
            }
            if(e.target.matches(".delete-button")) {
                let deleteButtonID = parseInt(e.target.id.substring(9, e.target.id.length));
                var deleteQuery = userBooksRef.where("bookNum", "==", deleteButtonID).limit(1);
                deleteQuery.get()
                .then((querySnapshot) => {
                    let document = querySnapshot.docs[0]
                    document.ref.delete();
                    console.log('Book Deleted.')
                })
            }
        } else {
            console.log('no user logged in.')
        }
    })
})