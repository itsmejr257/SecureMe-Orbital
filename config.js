//------------------------------------------------------------------

chrome.storage.local.get(["restrict"], function(result) {
    if (!result.restrict) {
        chrome.storage.local.set({restrict: {
            "adblock": false,
            "false_domain": false,
            "main": false,
            "messenger": false
        }});
    }
});
