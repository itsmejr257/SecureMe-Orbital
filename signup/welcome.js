firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var displayName = user.displayName;
    document.getElementById("name").innerHTML = displayName;
  } else {
    location.href = 'signup.html'
  }
});

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

