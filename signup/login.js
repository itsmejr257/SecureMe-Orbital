let loginbtn = document.getElementById('submit_login');

loginbtn.addEventListener("click", login);

function login(){
  let email_details = document.getElementById('emails').value;
  let password_details = document.getElementById('passwords').value;
  firebase.auth().signInWithEmailAndPassword(email_details, password_details).then(function(){
    location.href = 'welcome.html'
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);

  });

  alert('Logged in!')

}


