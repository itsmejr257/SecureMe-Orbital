function renderPoppersForInputs() {
    const allInputs = $('input');
    if (allInputs.length > 0) {
        let isWatchingSubmission = false;
        $.each(allInputs, (_index, element) => {
            if ($(element).is(':visible') && isSensitiveInputType(element)) {
                const styles = window.getComputedStyle(element);
                if (styles.display !== 'none' && styles.visibility === 'visible') {
                    if (!isWatchingSubmission) {
                        isWatchingSubmission = true;
                        watchForFormSubmission();
                    }
                    createSensitivePopper(element, lang[current_lang].forms.inputs);
                }
            }
        });
    }
}

function isSensitiveInputType(element) {
    return (
        element.type !== 'hidden' &&
        (((element.type === 'text' || !element.type) && isSensitiveTextInput(element)) ||
            element.type === 'email' ||
            element.type === 'password' ||
            element.type === 'tel')
    );
}

function isSensitiveTextInput(element) {
    const lowerCaseHtml = element.outerHTML.toLowerCase();
    return TextToLookFor.some((text) => lowerCaseHtml.includes(text));
}

function observeDomChanges() {
    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    const observer = new MutationObserver(function(mutations) {
        const hasInputChanged = mutations.some(
            (mutation) => mutation.target instanceof HTMLInputElement
        );
        if (hasInputChanged) {
            destroyAllPoppers();
            renderPoppersForInputs();
        }
    });
    observer.observe(document, {
        subtree: true,
        attributes: true,
    });
}

function handleFormSubmission(event) {
    event.preventDefault();

    if (!confirm(lang[current_lang].forms.submit)) {
        return false;
    } else {
        chrome.storage.local.get(["history"], function(result) {
            const history = result.history ? result.history : [];

            const website = window.location.hostname;
            let inputs    = []; 
            const time    = new Date().getTime();

            const allInputs = $('input');
            if (allInputs.length > 0) {
                $.each(allInputs, (_index, element) => {
                    if ($(element).is(':visible') && isSensitiveInputType(element)) {
                        inputs.push(element.type);
                    }
                });
            }

            var uniqueInputs = [];
            $.each(inputs, function(i, el){
                if($.inArray(el, uniqueInputs) === -1) uniqueInputs.push(el);
            });

            const new_history = {
                "website": website,
                "inputs": uniqueInputs,
                "time": time
            }
			
            history.push(new_history);

            chrome.storage.local.set({history: history}, function() {
                event.target.submit();
            });
        });
		
		
		
    }
}

function watchForFormSubmission() {
    $('form').each((_index, form) => {
        if (form.attachEvent) {
            form.attachEvent('submit', handleFormSubmission);
        } else {
            form.addEventListener('submit', handleFormSubmission);
        }
    });
}

function main() {
    observeDomChanges();
    renderPoppersForInputs();
}

chrome.storage.local.get(["restrict"], function(result) {
    if (!result.restrict.main) {
        $(document).ready(() => main());
    }
});