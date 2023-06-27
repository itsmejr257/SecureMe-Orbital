const sign_up_btn = document.getElementById('signing_up');

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        
        var displayName = user.displayName;
        console.log("logged in")
        sign_up_btn.setAttribute("href", "signup/welcome.html");
        sign_up_btn.innerHTML = "Logged In : " + displayName;

    }else{
        console.log("logged out")
    }
});




chrome.storage.local.get(["restrictiveness"], function(result) {
    const restrictiveness = result.restrictiveness ? result.restrictiveness : 5;

    for (let i = 1; i <= restrictiveness; i++) {
        document.querySelector(".restrict_bar > div:nth-child("+i+")").classList.add("red");
    }
});