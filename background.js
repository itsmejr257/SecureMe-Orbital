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

function translate() {
    for (const id in lang[current_lang].icon_content) {
        document.querySelector("#"+id).innerHTML = lang[current_lang].icon_content[id];
    }
}

const languages = document.querySelectorAll(".languages > div");

for (const language of languages) {
    language.addEventListener("click", function(e) {
        const lang = this.dataset.lang;

        chrome.storage.local.set({lang: lang}, function() {
            current_lang = lang;
            translate();
        });
    });
}




chrome.storage.local.get(["restrictiveness"], function(result) {
    const restrictiveness = result.restrictiveness ? result.restrictiveness : 5;

    for (let i = 1; i <= restrictiveness; i++) {
        document.querySelector(".restrict_bar > div:nth-child("+i+")").classList.add("red");
    }
});