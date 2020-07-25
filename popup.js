document.addEventListener('DOMContentLoaded', function () {
    (function () {
        chrome.tabs.query({
                active: true,
                lastFocusedWindow: true
            },
            function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    data: 'update',
                    text: ''
                });
            }
        );
    })();
    chrome.storage.local.get(['sceneCodeFull', 'extractMode', 'translateMode'], function (items) {
        document.getElementById('translateModeChecker').checked = items.translateMode;
        document.getElementById('extractModeChecker').checked = items.extractMode;
        if (items.extractMode)
            document.getElementById('extractModeWindow').style.display = 'block';
    });
    chrome.storage.local.get(['sceneCodeFull', 'sceneCodeStatus'], function (items) {
        if (!items.sceneCodeFull) {
            document.getElementById('scCodeSection').style.display = 'none';
        } else {
            document.getElementById('scCode').innerText = items.sceneCodeFull;
            if (items.sceneCodeStatus == 0 | items.sceneCodeStatus) {
                switch (items.sceneCodeStatus) {
                    case 0:
                        document.getElementById('scCodestatus').innerText = "원문 없음";
                        document.getElementById('noOrig').style.display = "block";
                        break;
                    case 1:
                        document.getElementById('scCodestatus').innerText = "원문 있음, 번역 없음";
                        document.getElementById('noTrans').style.display = "block";
                        break;
                    case 2:
                        document.getElementById('scCodestatus').innerText = "번역 있음";
                        document.getElementById('okTrans').style.display = "block";
                        break;
                }
                document.getElementById('Scenes').rows = 4;
                document.getElementById('namecheck').rows = 3;
                document.getElementById('otherscheck').rows = 4;
            }
        }
    });
    var getNameBtn = document.getElementById('getName');
    var copyNameBtn = document.getElementById('copyName');
    var clearNameBtn = document.getElementById('cacheClearName');
    var downNameBtn = document.getElementById('downName');
    var nameout = document.getElementById('namecheck');

    var getBattleBtn = document.getElementById('getBattle');
    var copyBattleBtn = document.getElementById('copyBattle');
    var clearBattleBtn = document.getElementById('clearBattle');
    var downBattleBtn = document.getElementById('downBattle');
    var BattleOut = document.getElementById('battleText');

    var getMiscBtn = document.getElementById('getMisc');
    var copyMiscBtn = document.getElementById('copyMisc');
    var clearMiscBtn = document.getElementById('cacheClearMisc');
    var downMiscBtn = document.getElementById('downMisc');
    var othersout = document.getElementById('otherscheck');

    var updateBtn = document.getElementById('update');

    var getScenesBtn = document.getElementById('getScenes');
    var ScenesOut = document.getElementById('Scenes');
    var clearScenes = document.getElementById('clearScenes');
    var downScenes = document.getElementById('downScenes');
    var copyScenes = document.getElementById('copyScenes');

    getBattleBtn.onclick = function(element) {
        chrome.storage.local.get(['battleFullInfo'], function (result) {
            if(!result.battleFullInfo) return;

            var text = 'Type,Name,Origin,Korean\n';
            result.battleFullInfo.forEach(function (battle) {
                text = text + battle.Type + ',';
                text = text + battle.Name + ',';
                text = text + battle.Origin + ',\n';
            });

            BattleOut.value = text;
        });
    }

    clearBattleBtn.onclick = function (element) {
        chrome.tabs.query({
                active: true,
                lastFocusedWindow: true
            },
            function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    data: 'clearBattle',
                    text: ''
                });
            }
        );
        BattleOut.value = '';
    };

    copyBattleBtn.onclick = function (element) {
        BattleOut.select();
        BattleOut.setSelectionRange(0, 1e8);
        document.execCommand('copy');
    };

    downBattleBtn.onclick = function (element) {
        var result = confirm('Download battle text csv file?');
        if (result) {
            var a = document.createElement('a');
            with(a) {
                href = 'data:text/csv;charset=urf-8,' + encodeURIComponent(BattleOut.value);
                download = 'battle.csv';
            }
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };


    copyScenes.onclick = function (element) {
        ScenesOut.select();
        ScenesOut.setSelectionRange(0, 1e8);
        document.execCommand('copy');
    };
    downScenes.onclick = function (element) {
        var result = confirm('Download story text csv file?');
        if (result) {
            var a = document.createElement('a');
            with(a) {
                href = 'data:text/csv;charset=urf-8,' + encodeURIComponent(ScenesOut.value);
                download = 'quest.csv';
            }
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };

    getScenesBtn.onclick = function (element) {
        chrome.storage.local.get(['sceneFullInfo'], function (result) {
            if (typeof result.sceneFullInfo == 'undefined') return;
            //console.log(result.sceneFullInfo);
            var text = 'Language,SceneCode,Type,Name,Origin,Korean\n';

            result.sceneFullInfo.forEach(function (scene) {
                text = text + scene.Language + ',';
                text = text + scene.SceneCode + ',';
                text = text + scene.Type + ',';
                text = text + scene.Name + ',';
                text = text + scene.Origin + ',\n';
            });

            ScenesOut.value = text;
        });
    };

    clearScenes.onclick = function (element) {
        chrome.tabs.query({
                active: true,
                lastFocusedWindow: true
            },
            function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    data: 'clearScenes',
                    text: ''
                });
            }
        );
        ScenesOut.value = '';
    };

    updateBtn.onclick = function (element) {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                data: 'refresh',
                text: ''
            });
            ScenesOut.value = "";
            nameout.value = "";
            othersout.value = "";
        });
    };

    getNameBtn.onclick = function (element) {
        chrome.storage.local.get(['nTEXT'], function (result) {
            var outputtext = "orig,kr\n"
            result.nTEXT.forEach(function (element) {
                outputtext = outputtext + element + ",\n"
            });
            nameout.value = outputtext;
        });
    }
    copyNameBtn.onclick = function (element) {
        nameout.select();
        nameout.setSelectionRange(0, 99999);
        document.execCommand("copy");
    }
    downNameBtn.onclick = function (element) {
        var result = confirm("Download name text csv file?");
        if (result) {
            var a = document.createElement('a');
            with(a) {
                href = 'data:text/csv;charset=urf-8,' + encodeURIComponent(nameout.value);
                download = 'nameText.csv';
            }
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }
    clearNameBtn.onclick = function (element) {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                data: "clearName",
                text: ""
            });
        });
        nameout.value = "";
    }

    getMiscBtn.onclick = function (element) {
        chrome.storage.local.get(['mTEXT'], function (result) {
            var outputtext = "orig,kr\n"
            result.mTEXT.forEach(function (element) {
                outputtext = outputtext + element + ",\n"
            });
            othersout.value = outputtext;
        });
    }
    copyMiscBtn.onclick = function (element) {
        othersout.select();
        othersout.setSelectionRange(0, 99999);
        document.execCommand("copy");
    }
    downMiscBtn.onclick = function (element) {
        var result = confirm("Download misc. text csv file?");
        if (result) {
            var a = document.createElement('a');
            with(a) {
                href = 'data:text/csv;charset=urf-8,' + encodeURIComponent(othersout.value);
                download = 'miscText.csv';
            }
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }
    clearMiscBtn.onclick = function (element) {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                data: "clearMisc",
                text: ""
            });
        });
        othersout.value = "";
    }

    document.getElementById('go-to-options').onclick = function (element) {
        if (chrome.runtime.openOptionsPage) {
            chrome.runtime.openOptionsPage();
        } else {
            window.open(chrome.runtime.getURL('options.html'));
        }
    };

    // Translate mode
    document.getElementById('translateModeChecker').onclick = function () {
        var transModeCurrent = document.getElementById('translateModeChecker').checked;
        chrome.storage.local.set({
                translateMode: transModeCurrent
            },
            function () {}
        );
    };

    // DIV
    document.getElementById('extractModeChecker').onclick = function () {
        var extractModeCurrent = document.getElementById('extractModeChecker').checked;
        chrome.storage.local.set({
                extractMode: extractModeCurrent
            },
            function () {}
        );
        if (document.getElementById('extractModeChecker').checked) {
            document.getElementById('extractModeWindow').style.display = 'block';
        } else {
            document.getElementById('extractModeWindow').style.display = 'none';
        }
    };
});