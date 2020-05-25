//Handle request from devtools   
chrome.extension.onConnect.addListener(function (port) {
    port.onMessage.addListener(function (message) {
        //Request a tab for sending needed information
        chrome.tabs.query({
            active:true,
            currentWindow: true,
        }, function (tabs) {
			console.log(message);
			chrome.tabs.sendMessage(tabs[0].id,message);
        });

    });
    //Posting back to Devtools
    chrome.extension.onMessage.addListener(function (message, sender) {
        port.postMessage(message);
    });
});