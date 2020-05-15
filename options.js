// Saves options to chrome.storage
function save_options() {
  var extractModeCurrent = document.getElementById('isExtractMode').checked;
  var translateModeCurrent = document.getElementById('isTranslateMode').checked;
  var verboseModeCurrent = document.getElementById('isVerbose').checked;
  var OriginCurrent = document.getElementById('origintext').value;
  var ImageSwap = document.getElementById('doImageSwap').checked;
  var BattleTrans = document.getElementById('doBattleTranslation').checked;
  
  chrome.storage.local.set({
    extractMode: extractModeCurrent,
    translateMode: translateModeCurrent,
    verboseMode: verboseModeCurrent,
    origin: OriginCurrent,
    imageswap: ImageSwap,
    battleobserver: BattleTrans
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value extractMode = true.
  chrome.storage.local.get(['extractMode','translateMode','verboseMode','origin', 'imageswap', 'battleobserver'], function(items) {
    document.getElementById('isExtractMode').checked = items.extractMode;
    document.getElementById('isTranslateMode').checked = items.translateMode;
    document.getElementById('isVerbose').checked = items.verboseMode;
    document.getElementById('origintext').value = items.origin;
    document.getElementById('doImageSwap').checked = items.imageswap;
    document.getElementById('doBattleTranslation').checked = items.battleobserver;
  });
}
document.getElementById("useLocalDB").onclick = function(element) {
  document.getElementById('origintext').value = "chrome-extension://"+chrome.runtime.id;
  save_options();
}
document.getElementById("useOnlineDB").onclick = function(element) {
  document.getElementById('origintext').value = "https://sidewinderk.github.io/gbfTransKor";
  save_options();
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);