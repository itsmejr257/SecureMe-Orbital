Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

const domain = window.location.hostname;

function falseDomains() {
    for (let i = 0; i < blacklist.length; i++) {
        const length = blacklist[i].fake_domains.length;
    
        for (let j = 0; j < length; j++) {
            blacklist[i].fake_domains.push("www."+blacklist[i].fake_domains);
        }
    }
    
    for (let i = 0; i < blacklist.length; i++) {
        let original_domain = blacklist[i].original_domain;
        let domain_string   = (original_domain.match(/([^.]+)\.\w{2,3}(?:\.\w{2})?$/) || [])[1];

        
    
        if (blacklist[i].fake_domains.indexOf(domain) !== -1 || (domain.indexOf(domain_string) !== -1 && (domain !== original_domain && domain !== original_domain.replace("www.", "")))) {
            const content = lang[current_lang].false_domain.content.replace(/{original_domain}/g, original_domain);
    
            const html = `<div id="fake_alert" class="popper" x-placement="bottom">
                            ${content}
                            <div class="popper__arrow" x-arrow=""></div>
                          </div>`;
        
            document.body.insertAdjacentHTML("beforeend", html);
        } else {
            if (domain === original_domain || domain === original_domain.replace("www.", "")) {
                if (document.querySelector("#fake_alert")) {
                    document.querySelectorAll("#fake_alert").remove();
                }
                
                break;
            }
        }
    }
}

chrome.storage.local.get(["restrict"], function(result) {
    if (!result.restrict.false_domain) {
        $(document).ready(() => falseDomains());
    }
});