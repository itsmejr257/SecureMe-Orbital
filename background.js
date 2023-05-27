function translate() {
    for (const id in lang[current_lang].icon_content) {
        document.querySelector("#"+id).innerHTML = lang[current_lang].icon_content[id];
    }

    document.querySelector("#quiz_button").setAttribute("href", "quiz/"+current_lang+"/index.html");
    document.querySelector("#history").setAttribute("href", "history/"+current_lang+"/index.html");
	document.querySelector("#sign_up").setAttribute("href", "signup"+"/signup.html");
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