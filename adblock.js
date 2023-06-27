var urls = ["*://*.doubleclick.net/*",
"*://*.lb.usemaxserver.de/*",
"*://*.tracking.klickthru.com/*",
"*://*.zmedia.com/*",
"*://*.zv1.november-lax.com/*",
"*://*.12xlwin3.net/*",
"http://www.facebook.com.https.s1.gvirabi.com/login/?_fb_noscript=1",
];
var type = "";

function callback(details) {
  return {cancel: true};
}

function onBeforeRequest() {
  if (type == "requestBody") {
    chrome.webRequest.onBeforeRequest.removeListener(callback);
    chrome.webRequest.onBeforeRequest.addListener(function(){}, { urls: urls }, [type]);
  } else {
    chrome.webRequest.onBeforeRequest.addListener(callback, { urls: urls }, [type]);
  }
}

function checkRequest() {
  chrome.storage.local.get(["restrict"], function(result) {
    const adblock = result.restrict ? result.restrict.adblock : true;

    if (!adblock) {
      type = "blocking";
    } else {
      type = "requestBody";
    }
  
    onBeforeRequest();
  });
}

checkRequest();

chrome.runtime.onMessage.addListener(function(request, sender){
  if (request.message == "Reload Background"){
    checkRequest();
  }
});