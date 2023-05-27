//Listeners-----------------------------------------------------------
/// 1. Login Button
let loginbtn = document.getElementById('submit_login');
loginbtn.addEventListener("click", login);


/**
 * Function Name : login
 * Description : Function takes in inputs and logs user in should it be a valid account
 * @param {string} emails - User-Inputted Email
 * @param {string} passwords - User-Inputted Password
 */
function login(){
  
  //initialize variables
  let email_details = document.getElementById('emails').value;
  let password_details = document.getElementById('passwords').value;


  //Use firebase signInWithEmailAndPassword to validate account
  firebase.auth().signInWithEmailAndPassword(email_details, password_details).then(function(){

    //if successful, redirect to welcome page
    location.href = 'welcome.html'

    //Error Handling
  }).catch(function(error) {

    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);

  });

  alert('Logged in!')

}


