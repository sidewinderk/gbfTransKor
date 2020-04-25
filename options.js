// Saves options to chrome.storage
function save_options() {
  var extractModeCurrent = document.getElementById('isExtractMode').checked;
  var translateModeCurrent = document.getElementById('isTranslateMode').checked;
  var verboseModeCurrent = document.getElementById('isVerbose').checked;
  
  chrome.storage.sync.set({
    extractMode: extractModeCurrent,
    translateMode: translateModeCurrent,
    verboseMode: verboseModeCurrent
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
  chrome.storage.sync.get(['extractMode','translateMode','verboseMode'], function(items) {
    document.getElementById('isExtractMode').checked = items.extractMode;
    document.getElementById('isTranslateMode').checked = items.translateMode;
    document.getElementById('isVerbose').checked = items.verboseMode;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);