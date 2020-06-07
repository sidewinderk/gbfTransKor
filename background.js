chrome.extension.onConnect.addListener(function (port) {
    port.onMessage.addListener(function (message) {
        //Request a tab for sending needed information
        console.log(document.URL);
        chrome.tabs.query({
                "active": true,
                "lastFocusedWindow": true
            },
            function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, message);
            }
        );
    });

    //Posting back to Devtools
    chrome.extension.onMessage.addListener(function (message, sender) {
        port.postMessage(message);
    });
});