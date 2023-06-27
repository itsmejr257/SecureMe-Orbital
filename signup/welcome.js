/** Function runs on page load
 * Description : Function determines if the user which is accessing welcome page is logged in or not, if logged in, it displays their username. Else, it redirects them back to the sign up
 * page
 */ 
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in, displays name
    var displayName = user.displayName;
    document.getElementById("name").innerHTML = displayName;
    console.log("logged in");

    chrome.storage.local.set({'current_user': displayName}, function() {
      console.log("you saved me!!");
    });

  } else {
    //Redirect back to signup page
    location.href = 'signup.html'
    console.log("not logged in")
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

