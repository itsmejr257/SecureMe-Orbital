/** Function runs on page load
 * Description : Function determines if the user whcih is accessing welcome page is logged in or not, if logged in, it displays their username. Else, it redirects them back to the sign up
 * page
 */ 
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var displayName = user.displayName;
    document.getElementById("name").innerHTML = displayName;
  } else {
    location.href = 'signup.html'
  }
});


//Listeners-----------------------------------------------------------
/// 1. Logout Button
document.getElementById('logout').addEventListener("click", logouts);


/**
 * Function Name : Logouts
 * Description : When Logout Button is clicked, it using Firebase Auth to Sign Current User Out
 */
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

