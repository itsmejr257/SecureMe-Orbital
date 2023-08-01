//Listeners-----------------------------------------------------------
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("logged in");
    location.href = 'welcome.html'
  } else {
    console.log("not logged in")
  }
});

/// 1. Submit Button
let submitbtn = document.getElementById('submitting');
submitbtn.addEventListener("click", signup);



/**
 * Function Name : Sign-Up
 * Description : Function takes in inputs and creates an account via Firebase using email and password. If successful, it updates new user's displayName in Firebase to username input
 * @param {string} emails - User-Inputted Email
 * @param {string} passwords - User-Inputted Password
 * @param {string} username - User-Inputted Name
 */
function signup(){

  //Initialization of Variables
  let email_details = document.getElementById('emails').value;
  let password_details = document.getElementById('passwords').value;
  let name_details = document.getElementById('username').value;

  //Validates format of email and password
  if (validate_email(email_details) == false || validate_password(password_details) == false){
    alert('Invalid Email / Password')
    return;
  }


  //Creates a New User
  firebase.auth().createUserWithEmailAndPassword(email_details, password_details).then(function(){

    //If Successful, update Firebase profile displayName
    firebase.auth().onAuthStateChanged(function(user){

      var user = firebase.auth().currentUser;

      user.updateProfile({
        displayName: name_details
      })
      .then(function() {
        // Update successful.
        console.log('User Profile Updated Successfully');
        //Redirect to Welcome Page
        location.href = 'welcome.html'
      })
      //Error Handling for updateProfile
      .catch(function(error) {
        console.log(error.Message);
      });
    });

    //Error Handling for createUserWithEmailandPassword
  }).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;

    if(errorCode)
    {
      alert(errorMessage);
      console.log(errorCode);
      console.log(errorMessage);
      return;
    }

  });


}

/**
 * Function Name : validate_email
 * Description : Function takes in email input and determines if it is a valid format via regex
 * @param {string} email - User-Inputted Email
 * @returns {boolean} - True if valid, False if not
 */
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

/**
 * Function Name : validate_password
 * Description : Function takes in password input and determines if it is a valid format via regex, in this case, password just has to be > 6 characters long
 * @param {string} password - User-Inputted Passwiord
 * @returns {boolean} - True if valid, False if not
 */
function validate_password(password){
  //Accepts Lengths Greater than 6
  if (password.length < 6) {
    return false;
  } else {
    return true;
  }
}