
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const loginCheck = (user) => {
    loggedInLinks.forEach((link) => link.style.display = 'none');
    loggedOutLinks.forEach((link) => link.style.display = 'block');
  if (user) {
  } else {
    loggedOutLinks.forEach((link) => link.style.display = 'none');
    loggedInLinks.forEach((link) => link.style.display = 'block');
  }
}



// Sign Up
const signUpForm = document.querySelector('#signup-form');

signUpForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.querySelector('#signup-email').value;
  const password = document.querySelector('#signup-password').value;
  
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(userCredentials => {

      signUpForm.reset();

      // close modal
      $('#signupmodal').modal('hide');

      console.log('sign up');
    })
  
})


// Sign In
const signInForm = document.querySelector('#login-form');

signInForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const email = document.querySelector('#login-email').value;
  const password = document.querySelector('#login-password').value;

  auth
    .signInWithEmailAndPassword(email, password)
    .then(userCredentials => {

      signUpForm.reset();

      // close modal
      $('#signinmodal').modal('hide');

      console.log('sign in');
    })
});


const logout = document.querySelector('#logout');
logout.addEventListener('click', e => {
  e.preventDefault();
  auth.signOut().then(() => {
    console.log('Sing Out');
  })
})

// Google Login

const googleButton = document.querySelector('#googleLogin');
googleButton.addEventListener('click', e => {
  e.preventDefault();
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(result => {
      
      signUpForm.reset();
      // close modal
      $('#signinmodal').modal('hide');
    })
    .catch((error) => {
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;
    // The email of the user's account used.
    let email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    let credential = error.credential;
    // ...
  }) 
})

// Facebook Login
const facebookButton = document.querySelector('#facebookLogin');
facebookButton.addEventListener('click', (event) => {
  event.preventDefault();
  console.log('facebbok login');
  const provider = new firebase.auth.FacebookAuthProvider();
  auth.signInWithPopup(provider)
    .then((result) => {
      console.log(result);
      console.log('facebook loged');
      $('#signinmodal').modal('hide');
    })
    .catch((error) => {
    console.log(error);
  })

})


// Posts

const postList = document.querySelector('.posts');
const setUpPost = data => {

  if (data.length) {
    let html = '';
    data.forEach(doc => {
      const post = doc.data();
      const li = `
        <li class="list-group-item list-group-item-action">
          <h5>${post.title}</h5>
          <p>${post.description}</p>
        </li>
      `;

      html += li;
    })

    postList.innerHTML = html;
  } else {
    postList.innerHTML = '<p class="text-center">No hay Datos</p>';
  }
}


// Events
// List for auth state changes

auth.onAuthStateChanged(user => {
  if (user) {
    fs.collection('posts')
      .get()
      .then((snapshot) => {
        setUpPost(snapshot.docs);
        loginCheck(user);
      })

  } else {
    setUpPost([]);
    loginCheck(user);
  }
});



