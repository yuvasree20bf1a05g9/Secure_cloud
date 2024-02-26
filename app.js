// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRRdEHjdGd3RFdWlKk1vtW7GYWetWz2Hc",
  authDomain: "codeupload-dca0a.firebaseapp.com",
  projectId: "codeupload-dca0a",
  storageBucket: "codeupload-dca0a.appspot.com",
  messagingSenderId: "934207807496",
  appId: "1:934207807496:web:638d7129b3048d4a0531bd",
  measurementId: "G-TQRZ9QDSTT"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const storage = firebase.storage(); // Initialize storage
const db = firebase.firestore();
const filesCollection = db.collection('files'); 

  // Selecting elements
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const formTitle = document.getElementById('form-title');
  const toggleBtn = document.getElementById('toggle-btn');
  const loginError = document.getElementById('login-error');
  const registerError = document.getElementById('register-error');
  
  // Function to display login error
  const displayLoginError = (errorMessage) => {
    loginError.innerText = errorMessage;
  };
  
  // Function to display register error
  const displayRegisterError = (errorMessage) => {
    registerError.innerText = errorMessage;
  };

  
  // Function to redirect to upload page
  const redirectToUploadPage = () => {
    console.log('Redirecting to upload page'); // Check if the function is called
    window.location.href = 'upload.html';
  };
  // Event listener for login form submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const email = loginForm.elements['email'].value; // Access form elements by their names
    const password = loginForm.elements['password'].value;
    // Firebase authentication logic for login
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Redirect user after successful login
        redirectToUploadPage();
      })
      .catch((error) => {
        // Display error message if login fails
        displayLoginError(error.message);
      });
});

// Event listener for toggling between login and register forms
toggleBtn.addEventListener('click', () => {
    if (loginForm.style.display === 'block') {
      loginForm.style.display = 'none';
      registerForm.style.display = 'block';
      formTitle.innerText = 'Register'; // Change the title to "Register"
      loginError.innerText = ''; // Reset login error message if any
    } else {
      loginForm.style.display = 'block';
      registerForm.style.display = 'none';
      formTitle.innerText = 'Login'; // Change the title back to "Login"
      registerError.innerText = ''; // Reset register error message if any
    }
});


// Function to handle user registration
function registerUser(email, password) {
    auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Signed up successfully
        console.log("User registered:", userCredential.user.email);
        showLoginForm(); // Show login form after registration
    })
    .catch((error) => {
        // Handle errors
        console.error("Error registering user:", error.message);
    });
}

// Function to handle user login
function loginUser(email, password) {
    auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Logged in successfully
        console.log("User logged in:", userCredential.user.email);
        alert("Redirecting to upload.html");
    })
    .catch((error) => {
        // Handle errors
        console.error("Error logging in:", error.message);
    });
}

// Event listener for login form submission
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    loginUser(email, password);
});

// Event listener for register form submission
document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var email = document.getElementById("regEmail").value;
    var password = document.getElementById("regPassword").value;
    registerUser(email, password);
});

// Function to handle logout
function logout() {
 
 // Redirect to the login page
  window.location.href = "index.html";
}
