document.querySelector("#clear_history").addEventListener("click", function() {
    chrome.storage.local.set({history: []}, function() {
        window.location.reload();
    });
});

chrome.storage.local.get(["history"], function(result) {
    const history = result.history ? result.history : [];

    for (const data of history) {
        const website = data.website;
        const inputs  = data.inputs.join(", ");
        const username = data.namer;

        const date    = new Date(data.time);
        const day     = date.getDate().toString().padStart(2, "0");
        const month   = (date.getMonth() + 1).toString().padStart(2, "0");
        const year    = date.getFullYear().toString();
        const hours   = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");

        const time = `${day}/${month}/${year} - ${hours}:${minutes}`;

        const html = `
            <tr>
                <td>${website}</td>
                <td>${inputs}</td>
                <td>${time}</td>
                <td>${username}</td>
            </tr>
        `;
        
        document.querySelector("#history").insertAdjacentHTML("beforeend", html);
    }
});