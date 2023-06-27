const domain = window.location.hostname;

function falseDomains() {
  for (let i = 0; i < blacklist.length; i++) {
    let original_domain = blacklist[i].original_domain;
    let domain_string = (original_domain.match(/([^.]+)\.\w{2,3}(?:\.\w{2})?$/) || [])[1];

    if (
      blacklist[i].fake_domains.indexOf(domain) !== -1 ||
      (domain.indexOf(domain_string) !== -1 &&
        (domain !== original_domain && domain !== original_domain.replace("www.", "")))
    ) {


        if(original_domain == "www.badsite.com")
        {
            console.log("Badsite");

            const content = lang["en"].false_domain.blacklisted;

            const html = `<div id="fake_alert" class="popper" x-placement="bottom">
                          ${content}
                          <div class="popper__arrow" x-arrow=""></div>
                        </div>`;
      
            document.body.insertAdjacentHTML("beforeend", html);
            break;

        } else {

      const content = lang["en"].false_domain.content.replace(/{original_domain}/g, original_domain);

      const html = `<div id="fake_alert" class="popper" x-placement="bottom">
                    ${content}
                    <div class="popper__arrow" x-arrow=""></div>
                  </div>`;

      document.body.insertAdjacentHTML("beforeend", html);
      break;
        }
    } else {
      if (domain === original_domain || domain === original_domain.replace("www.", "")) {
        const fakeAlert = document.querySelector("#fake_alert");
        if (fakeAlert) {
          fakeAlert.remove();
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