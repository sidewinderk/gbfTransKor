//chrome.runtime.onMessage.addListener(
//  function(request, sender, sendResponse) {
//    if( request.message === "log" ) {
//     document.outText = ;
//    }
//  }
//);

document.addEventListener('DOMContentLoaded', function() {
let getTextBtn = document.getElementById('getText');
let copyTextBtn = document.getElementById('copyText');

getTextBtn.onclick = function(element) {
  var textout = document.getElementById("outputcheck");
  chrome.storage.local.get('oTEXT', function (result) {
      var outputtext = ""
      result.oTEXT.forEach(function(element){
          outputtext = outputtext + element + "\n"
      });
      textout.value = outputtext;
  });
}
copyTextBtn.onclick = function(element) {
    var copyText = document.getElementById("outputcheck");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
}
document.getElementById('go-to-options').onclick = function(element) {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open(chrome.runtime.getURL('options.html'));
    }
}
document.getElementById('cacheClear').onclick = function(element) {
  chrome.storage.sync.set({oTEXT: ""});
}
});
