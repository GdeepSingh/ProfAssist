/*import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.12.0/firebase-database.js";*/

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCbLxwSWAG0iF60oaH18QzZHdwT9RO1N_0",
    authDomain: "hackathon2024-6c479.firebaseapp.com",
    databaseURL: "https://hackathon2024-6c479-default-rtdb.firebaseio.com/",
    projectId: "hackathon2024-6c479",
    storageBucket: "hackathon2024-6c479.appspot.com",
    messagingSenderId: "1027127554388",
    appId: "1:1027127554388:web:a2019e69bde6283179d8c1",
    measurementId: "G-DVPXMFE88Z"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
debugger;
const auth = firebase.auth();
const database = firebase.firestore();

// Handle sign up
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default form submission
        });
    });

    const signupButton = document.getElementById('signinButton');
    signupButton.addEventListener('click', () => {
        const firstName = document.querySelector('form[id="fname singupForm"] input').value;
        const lastName = document.querySelector('form[id="lname singupForm"] input').value;
        const email = document.querySelector('form[id="email singupForm"] input').value;
        const password = document.querySelector('form[id="pass singupForm"] input').value;
        const confirmPassword = document.querySelector('form[id="pass signUpForm"] input').value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Create a new user
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;

                // Save user data to the database
                set(ref(database, 'users/' + user.uid), {
                    firstName: firstName,
                    lastName: lastName,
                    email: email
                }).then(() => {
                    alert("Sign Up Successful!");
                    // Redirect or perform additional actions
                }).catch((error) => {
                    alert("Error saving data: " + error.message);
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
            });
    });
});
