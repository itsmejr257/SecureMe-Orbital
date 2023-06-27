const CHICKEN_KEYWORD = TextToLookFor;
const CHICKEN_TEXT_COLOR = 'red';

function checkChatMessages() {
    
    $('.x5yr21d.x1uvtmcs').each((index, element) => {
        if (index === 0) {
            destroyAllPoppers();
        }
        
        const chatMessages = document.querySelectorAll('.x6prxxf.x1fc57z9.x1yc453h.x126k92a.xzsf02u');
        console.log("keyword not found");
        
        for (const message of chatMessages) {
            const text = message.innerText.toLowerCase();
            if (TextToLookFor.concat(['number']).some((stuff) => text.includes(stuff))) {
                console.log("keyword found");
                createSensitivePopper(element, lang['en'].facebook.popover, 'bottom');
                break;
            }
        }
    
    })
}

setInterval(checkChatMessages, 2000);