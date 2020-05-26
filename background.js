//Handle request from devtools
chrome.extension.onConnect.addListener(function(port) {
	port.onMessage.addListener(function(message) {
		//Request a tab for sending needed information
		console.log(document.URL);
		chrome.tabs.query(
			{
				title: 'Granblue Fantasy'
			},
			function(tabs) {
				console.log(tabs);
				if (tabs.length == 0) {
					chrome.tabs.query(
						{
							title: 'グランブルーファンタジー'
						},
						function(tabs) {
							console.log(tabs);
							chrome.tabs.sendMessage(tabs[0].id, message);
						}
					);
				} else {
					chrome.tabs.sendMessage(tabs[0].id, message);
				}
			}
		);
	});
	//Posting back to Devtools
	chrome.extension.onMessage.addListener(function(message, sender) {
		port.postMessage(message);
	});
});