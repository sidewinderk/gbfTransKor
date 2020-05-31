document.addEventListener('DOMContentLoaded', function() {
	(function() {
		chrome.tabs.query(
			{
				active: true,
				lastFocusedWindow: true
			},
			function(tabs) {
				chrome.tabs.sendMessage(tabs[0].id, { data: 'update', text: '' });
			}
		);
	})();

	let getNameBtn = document.getElementById('getName');
	let copyNameBtn = document.getElementById('copyName');
	let clearNameBtn = document.getElementById('cacheClearName');
	let downNameBtn = document.getElementById('downName');
	let nameout = document.getElementById('namecheck');

	let getMiscBtn = document.getElementById('getMisc');
	let copyMiscBtn = document.getElementById('copyMisc');
	let clearMiscBtn = document.getElementById('cacheClearMisc');
	let downMiscBtn = document.getElementById('downMisc');
	let othersout = document.getElementById('otherscheck');

	let updateBtn = document.getElementById('update');

	let getScenesBtn = document.getElementById('getScenes');
	let ScenesOut = document.getElementById('Scenes');
	let clearScenes = document.getElementById('clearScenes');
	let downScenes = document.getElementById('downScenes');
	let copyScenes = document.getElementById('copyScenes');

	copyScenes.onclick = function(element) {
		ScenesOut.select();
		ScenesOut.setSelectionRange(0, 1e8);
		document.execCommand('copy');
	};
	downScenes.onclick = function(element) {
		var result = confirm('Download story text csv file?');
		if (result) {
			var a = document.createElement('a');
			with (a) {
				href = 'data:text/csv;charset=urf-8,' + encodeURIComponent(ScenesOut.value);
				download = 'quest.csv';
			}
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		}
	};

	getScenesBtn.onclick = function(element) {
		chrome.storage.local.get(['sceneFullInfo'], function(result) {
			if (typeof result.sceneFullInfo == 'undefined') return;
			//console.log(result.sceneFullInfo);
			var text = 'Language,SceneCode,Type,Name,Origin,Korean\n';

			result.sceneFullInfo.forEach(function(scene) {
				console.log(scene);
				text = text + scene.Language + ',';
				text = text + scene.SceneCode + ',';
				text = text + scene.Type + ',';
				text = text + scene.Name + ',';
				text = text + scene.Origin + ',\n';
			});

			ScenesOut.value = text;
		});
	};

	clearScenes.onclick = function(element) {
		chrome.tabs.query(
			{
				active: true,
				lastFocusedWindow: true
			},
			function(tabs) {
				chrome.tabs.sendMessage(tabs[0].id, { data: 'clearScenes', text: '' });
			}
		);
		ScenesOut.value = '';
	};

	updateBtn.onclick = function(element) {
		chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, { data: 'refresh', text: '' });
		});
	};

	document.getElementById('go-to-options').onclick = function(element) {
		if (chrome.runtime.openOptionsPage) {
			chrome.runtime.openOptionsPage();
		} else {
			window.open(chrome.runtime.getURL('options.html'));
		}
	};

	// Translate mode
	document.getElementById('translateModeChecker').onclick = function() {
		var transModeCurrent = document.getElementById('translateModeChecker').checked;
		chrome.storage.local.set(
			{
				translateMode: transModeCurrent
			},
			function() {}
		);
	};

	// DIV
	document.getElementById('extractModeChecker').onclick = function() {
		var extractModeCurrent = document.getElementById('extractModeChecker').checked;
		chrome.storage.local.set(
			{
				extractMode: extractModeCurrent
			},
			function() {}
		);
		if (document.getElementById('extractModeChecker').checked) {
			document.getElementById('extractModeWindow').style.display = 'block';
		} else {
			document.getElementById('extractModeWindow').style.display = 'none';
		}
	};
});