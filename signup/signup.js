document.getElementById('logout').addEventListener("click", logouts);

function logouts(){
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    location.href = 'signup.html'
    alert('User Logged Out!');
  }).catch(function(error) {
    // An error happened.
    console.log(error);
  });
}

let submitbtn = document.getElementById('submitting');

submitbtn.addEventListener("click", signup);

function signup(){

  let email_details = document.getElementById('emails').value;
  let password_details = document.getElementById('passwords').value;
  let name_details = document.getElementById('username').value;

  //Validates format of email and password
  if (validate_email(email_details) == false || validate_password(password_details) == false){
    alert('Invalid Email / Password')
    return;
  }

  firebase.auth().createUserWithEmailAndPassword(email_details, password_details).then(function(){
    firebase.auth().onAuthStateChanged(function(user){
      var user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: name_details
      }).then(function() {
        // Update successful.
        console.log('User Profile Updated Successfully');
      }).catch(function(error) {
        console.log(error.Message);
        // An error happened.
      });
      location.href = 'welcome.html'
    });
  }).catch(function(error) {
    //Error Handling
    var errorCode = error.code;
    var errorMessage = error.message;
    if(errorCode){
      alert(errorMessage);
      console.log(errorCode);
      console.log(errorMessage);
      return;
    }
  })


}

function validate_email(email){
  expression = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  if (expression.test(email) == true) {
    // Email is Good
    return true;
  } else {
    //Email is not Good
    return false;
  }
}

function validate_password(password){
  //Accepts Lengths Greater than 6
  if (password.length < 6) {
    return false;
  } else {
    return true;
  }
}

function update_name(name){
  var user = firebase.auth().currentUser;
  user.updateProfile({
    displayName: "name"
  }).then(function() {
    // Update successful.
    console.log('User Profile Updated Successfully');
    console.log(user.email);
  }).catch(function(error) {
    console.log(error.Message);
    // An error happened.
  });

}
