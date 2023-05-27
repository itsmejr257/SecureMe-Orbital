firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var displayName = user.displayName;
    document.getElementById("name").innerHTML = displayName;

    // ...
  } else {
    // User is signed out.
  }
});
