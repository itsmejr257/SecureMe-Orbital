var answers = {
    "1": "3",
    "2": "2",
    "3": "2",
    "4": "2",
    "5": "1"
}

var restrict_test;

chrome.storage.local.get(["restrict_test"], function(result) {
    restrict_test = result.restrict_test;

    if (!restrict_test) {
        restrict_test = {
            adblock: false,
            false_domain: false,
            main: false,
            messenger: false
        }
    }
});

var answer_buttons = document.querySelectorAll(".answer");

if (answer_buttons.length > 0) {

    if (answer_buttons[0].dataset.question == "1") {
        chrome.storage.local.set({restrictiveness: 5});
        chrome.storage.local.set({restrictiveness_test: 5});
        chrome.storage.local.set({restrict: 
            {
                adblock: false,
                false_domain: false,
                main: false,
                messenger: false
            }
        });
    }

    for (const answer_button of answer_buttons) {
        answer_button.addEventListener("click", function() {
            var question = this.dataset.question;
            var answer   = this.dataset.answer;
            var answer_url = "question"+question+"_answer";

            chrome.storage.local.get(["restrictiveness_test"], function(result) {
                if (answers[question] == answer) {
                    answer_url += "right";

                    var restrictiveness_test = result.restrictiveness_test - 1;

                    chrome.storage.local.set({restrictiveness_test: restrictiveness_test});

                    switch(question) {
                        case "1": restrict_test.adblock = true; break;
                        case "3": restrict_test.false_domain = true; break;
                        case "4": restrict_test.main = true; break;
                        case "5": restrict_test.messenger = true; break;
                    }
                } else {
                    answer_url += "wrong";

                    switch(question) {
                        case "1": restrict_test.adblock = false; break;
                        case "2": restrict_test.adblock = false; break;
                        case "3": restrict_test.false_domain = false; break;
                        case "4": restrict_test.main = false; break;
                        case "5": restrict_test.messenger = false; break;
                    }

                }
        
                answer_url += ".html";

                chrome.storage.local.set({restrict_test: restrict_test}, function() {                    
                    window.location.href = answer_url;
                });
            });
        });
    }
}

if (document.querySelector(".next-question")) {
    document.querySelector(".next-question").addEventListener("click", function() {
        var next = this.dataset.next;
        var url = "question"+next+".html";
    
        if (next == "finish") {
            url = "quizend.html";

            chrome.storage.local.get(["restrictiveness_test"], function(result) {
                var restrictiveness_test = result.restrictiveness_test;

                chrome.storage.local.set({restrictiveness: restrictiveness_test}, function() {
                    chrome.storage.local.set({restrict: restrict_test}, function() {
                        chrome.runtime.sendMessage({message: "Reload Background"});
    
                        window.location.href = url;
    
                        return false;
                    });
                });
            });
        }

        window.location.href = url;
    });
}