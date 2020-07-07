
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
  console.log(email, password);
})