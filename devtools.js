var sceneCode = '';
var sceneObj = [];

var port = chrome.extension.connect({
	name: 'Sample Communication' //Given a Name
});

//Posting message to background page
//Hanlde response when recieved from background page
port.onMessage.addListener(function (msg) {
	console.log('Tab Data recieved is  ' + msg);
});


var requestListener = async function (req) {
	chrome.storage.local.get(['extractMode'], function (items) {
		if (items.extractMode) {
			if (req.request.url.includes('scene_') && !req.request.url.includes('scene_list')) {
				req.response.headers.some(function (item) {
					if (item.value == 'application/json') {
						sceneCode = req.request.url.slice(req.request.url.indexOf('scene_'));

						if (sceneCode.includes('/')) {
							//case 1 : scene_arcarum_tutorial_01/null?_=1590417179096&t=1590417710649&uid=25963971
							//special dialog URL : scene_cp86_q3_s10/3030122000,3040109000?_=1590656977131&t=1590657521578&uid=25963971
							sceneCode = sceneCode.split('/')[0];

						} else if (sceneCode.includes('?')) {
							//case 2 : scene_chr486_ep1_s10?_=1590417179118&t=1590417760611&uid=25963971
							sceneCode = sceneCode.split('?')[0];
						}

						req.getContent(function (item) {
							var obj = JSON.parse(item);
							sceneObj = obj.scene_list;

							if (typeof sceneCode != 'undefined' && typeof sceneObj != 'undefined') {
								if (sceneCode != '' && sceneObj.length > 0) {
									var data = {
										data: 'scenes',
										scenes: [sceneCode, sceneObj]
									};
									port.postMessage(data);
								}
							}
							return true;
						});
					}
				});
			} else if (req.request.url.includes('start.json') ||
				req.request.url.includes('normal_attack_result.json') ||
				req.request.url.includes('ability_result.json')) {
					
				req.response.headers.some(function (item) {
					if (item.value == 'application/json') {
						req.getContent(function (item) {
							var obj = JSON.parse(item);
							var data = {
								data: 'battle',
								battleText: obj
							};
							port.postMessage(data);
						});
					}
				});
			}
		}
	});
};
chrome.devtools.network.onRequestFinished.addListener(requestListener);