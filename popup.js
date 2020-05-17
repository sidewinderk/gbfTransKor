//chrome.runtime.onMessage.addListener(
//  function(request, sender, sendResponse) {
//    if( request.message === "log" ) {
//     document.outText = ;
//    }
//  }
//);

document.addEventListener('DOMContentLoaded', function() {
  (function (){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {data: "update", text: ""});
    });
  })()
  let getTextBtn = document.getElementById('getText');
  let copyTextBtn = document.getElementById('copyText');
  let clearTextBtn = document.getElementById('cacheClearText');
  let downTextBtn = document.getElementById('downText');
  let textout = document.getElementById("outputcheck");

  let getNameBtn = document.getElementById('getName');
  let copyNameBtn = document.getElementById('copyName');
  let clearNameBtn = document.getElementById('cacheClearName');
  let downNameBtn = document.getElementById('downName');
  let nameout = document.getElementById("namecheck");

  let getMiscBtn = document.getElementById('getMisc');
  let copyMiscBtn = document.getElementById('copyMisc');
  let clearMiscBtn = document.getElementById('cacheClearMisc');
  let downMiscBtn = document.getElementById('downMisc');
  let othersout = document.getElementById("otherscheck");

  let updateBtn = document.getElementById('update');


  updateBtn.onclick = function(element) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {data: "refresh", text: ""});
    });
  }


  getTextBtn.onclick = function(element) {
    chrome.storage.local.get(['oTEXT'], function (result) {
        var outputtext = "index,url,jp,kr\n"
        result.oTEXT.forEach(function(element){
            outputtext = outputtext + element + ",\n"
        });
        textout.value = outputtext;
    });
  }
  copyTextBtn.onclick = function(element) {
    textout.select();
    textout.setSelectionRange(0, 1e8);
    document.execCommand("copy");
  }
  downTextBtn.onclick = function(element) {
    var result = confirm("Download story text csv file?");
    if(result){
      var a = document.createElement('a');
      with (a) {
        href='data:text/csv;charset=urf-8,'+encodeURIComponent(textout.value);
        download='storyText.csv';
      }
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);   
    }
  }
  clearTextBtn.onclick = function(element) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {data: "clearText", text: ""});
    });
    textout.value = "";
  }

  getNameBtn.onclick = function(element) {
    chrome.storage.local.get(['nTEXT'], function (result) {
        var outputtext = "jp,kr\n"
        result.nTEXT.forEach(function(element){
            outputtext = outputtext + element + ",\n"
        });
        nameout.value = outputtext;
    });
  }
  copyNameBtn.onclick = function(element) {
    nameout.select();
    nameout.setSelectionRange(0, 99999);
    document.execCommand("copy");
  }
  downNameBtn.onclick = function(element) {
    var result = confirm("Download name text csv file?");
    if(result){
      var a = document.createElement('a');
      with (a) {
        href='data:text/csv;charset=urf-8,'+encodeURIComponent(nameout.value);
        download='nameText.csv';
      }
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);   
    }
  }
  clearNameBtn.onclick = function(element) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {data: "clearName", text: ""});
    });
    nameout.value = "";
  }

  getMiscBtn.onclick = function(element) {
    chrome.storage.local.get(['mTEXT'], function (result) {
        var outputtext = "jp,kr\n"
        result.mTEXT.forEach(function(element){
            outputtext = outputtext + element + ",\n"
        });
        othersout.value = outputtext;
    });
  }
  copyMiscBtn.onclick = function(element) {
    othersout.select();
    othersout.setSelectionRange(0, 99999);
    document.execCommand("copy");
  }
  downMiscBtn.onclick = function(element) {
    var result = confirm("Download misc. text csv file?");
    if(result){
      var a = document.createElement('a');
      with (a) {
          href='data:text/csv;charset=urf-8,'+encodeURIComponent(othersout.value);
          download='miscText.csv';
      }
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);   
    }
  }
  clearMiscBtn.onclick = function(element) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {data: "clearMisc", text: ""});
    });
    othersout.value = "";
  }

  document.getElementById('go-to-options').onclick = function(element) {
      if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
      } else {
        window.open(chrome.runtime.getURL('options.html'));
      }
  }
});
