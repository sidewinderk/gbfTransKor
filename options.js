// Saves options to chrome.storage
function save_options() {
    var verboseModeCurrent = document.getElementById('isVerbose').checked;
    var OriginCurrent = document.getElementById('origintext').value;
    var ImageSwap = document.getElementById('doImageSwap').checked;
    var BattleTrans = document.getElementById('doBattleTranslation').checked;
    var fontCurrent = document.getElementById('fontaddr').value;
    var nonTransTextCurrent = document.getElementById('ignoreTranslatedText').checked;
    chrome.storage.local.set({
        verboseMode: verboseModeCurrent,
        origin: OriginCurrent,
        imageswap: ImageSwap,
        battleobserver: BattleTrans,
        userFont: fontCurrent,
        nonTransText: nonTransTextCurrent
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.style.display = 'block';
        setTimeout(function() {
            status.style.display = 'none';
        }, 1000);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value extractMode = true.
    chrome.storage.local.get(['verboseMode', 'origin', 'imageswap', 'battleobserver', 'userFont', 'nonTransText'], function(items) {
        document.getElementById('isVerbose').checked = items.verboseMode;
        if(items.origin){
            document.getElementById('origintext').value = items.origin;
        }
        document.getElementById('doImageSwap').checked = items.imageswap;
        document.getElementById('doBattleTranslation').checked = items.battleobserver;
        document.getElementById('fontaddr').value = items.userFont;
        document.getElementById('ignoreTranslatedText').checked = items.nonTransText;
    });
}
document.getElementById("useLocalDB").onclick = function(element) {
    document.getElementById('origintext').value = "chrome-extension://" + chrome.runtime.id;
    save_options();
}
document.getElementById("useOnlineDB").onclick = function(element) {
    document.getElementById('origintext').value = "https://sidewinderk.github.io/gbfTransKor";
    save_options();
}
document.getElementById('isVerbose').onclick = function(element) {
    save_options();
}
document.getElementById('origintext').onclick = function(element) {
    save_options();
}
document.getElementById('doImageSwap').onclick = function(element) {
    save_options();
}
document.getElementById('doBattleTranslation').onclick = function(element) {
    save_options();
}
document.getElementById('nanumFont').onclick = function(element) {
    document.getElementById('fontaddr').value = "font-style: normal;src:url('//cdn.jsdelivr.net/gh/moonspam/NanumSquare@1.0/NanumSquareB.woff') format('woff')";
    save_options();
}
document.getElementById('additionalFont1').onclick = function(element) {
    document.getElementById('fontaddr').value = "src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/InfinitySans-RegularA1.woff') format('woff'); font-weight: normal; font-style: normal;";
    save_options();
}
document.getElementById('customFont').onclick = function(element) {
    save_options();
}
document.addEventListener('DOMContentLoaded', restore_options);