const firebaseConfig = {

  apiKey: "AIzaSyDhfsksSl4vKHR0g_Ta9kP2vFP-UDozHKA",
  authDomain: "me-34ec1.firebaseapp.com",
  databaseURL: "https://me-34ec1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "me-34ec1",
  storageBucket: "me-34ec1.appspot.com",
  messagingSenderId: "1054306522006",
  appId: "1:1054306522006:web:285287d2166231955883b7"

};

// Initialize Firebase
try{
  firebase.initializeApp(firebaseConfig);

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var displayName = user.displayName;
      document.getElementById("name").innerHTML = displayName;
      console.log("logged in");
  
      chrome.storage.local.set({'current_user': displayName}, function() {
        console.log("you saved me!!");
      });
    } else {
      //Redirect back to signup page
    }
  });
  
}
catch(e){
  console.log(e);
}