//Handle request from devtools

var protocolVersion = '1.0';
var targetTabId = 'null';
/*
chrome.tabs.query(
	{
		title: 'Granblue Fantasy'
	},
	function(tabs) {
		if (tabs.length == 0) {
			chrome.tabs.query(
				{
					title: 'グランブルーファンタジー'
				},
				function(tabs) {
					if (tabs.length != 0) {
						targetTabId = tabs[0].id;
						chrome.debugger.attach(
							{
								tabId: targetTabId
							},
							protocolVersion,
							function() {
								if (chrome.runtime.lastError) {
									console.log(chrome.runtime.lastError.message);
									return;
								}

								chrome.debugger.sendCommand(
									{
										//first enable the Network
										tabId: targetTabId
									},
									'Network.enable'
								);
								chrome.debugger.onEvent.addListener(allEventHandler);
							}
						);
					}
				}
			);
		} else {
			targetTabId = tabs[0].id;
			chrome.debugger.attach(
				{
					tabId: targetTabId
				},
				protocolVersion,
				function() {
					if (chrome.runtime.lastError) {
						console.log(chrome.runtime.lastError.message);
						return;
					}
					
					chrome.debugger.sendCommand(
						{
							//first enable the Network
							tabId: targetTabId
						},
						'Network.enable'
					);
					chrome.debugger.onEvent.addListener(allEventHandler);
				}
			);
		}
	}
);

function allEventHandler(debuggeeId, message, params) {
	
	if (targetTabId != debuggeeId.tabId) {
		return;
	}
	
	console.log(message);
	console.log(params);
	/*
	if (message == 'Network.responseReceived') {
		//response return
		chrome.debugger.sendCommand(
			{
				tabId: debuggeeId.tabId
			},
			'Network.getResponseBody',
			{
				requestId: params.requestId
			},
			function(response) {
				console.log(response);
				if(response.body.includes('scene_list')){
					chrome.debugger.detach(debuggeeId);	
				}
				
				
			}
		);
	}
}
*/
/*
chrome.runtime.onInstalled.addListener(function() {
	var tabId='null';
	
});
*/


chrome.extension.onConnect.addListener(function(port) {
	port.onMessage.addListener(function(message) {
		//Request a tab for sending needed information
		console.log(document.URL);
		chrome.tabs.query(
			{
				
                "active": true, 
                "lastFocusedWindow": true

			},
			function(tabs) {
				
					chrome.tabs.sendMessage(tabs[0].id, message);
				
			}
		);
	});
	//Posting back to Devtools
	chrome.extension.onMessage.addListener(function(message, sender) {
		port.postMessage(message);
	});
});