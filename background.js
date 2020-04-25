var fullTextoutput = [];
chrome.runtime.onMessage.addListener(
function(request, sender, sendResponse) {
  console.log(sender.tab ?
              "from a content script:" + sender.tab.url :
              "from the extension");
    if (request.data == "log"){
        fullTextoutput.push(request.text);
        chrome.storage.sync.set({oTEXT: fullTextoutput});
    }
});
