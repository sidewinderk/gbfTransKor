var sceneCode = '';
var sceneObj = {};

var port = chrome.extension.connect({
	name: 'Sample Communication' //Given a Name
});
//Posting message to background page
//Hanlde response when recieved from background page
port.onMessage.addListener(function(msg) {
	console.log('Tab Data recieved is  ' + msg);
});

var requestListener = function(req) {
	if (req.request.url.includes('scene_')) {
		req.response.headers.some(function(item) {
			if (item.value == 'application/json') {
				sceneCode = req.request.url.slice(req.request.url.indexOf('scene_'));

				if (sceneCode.includes('/')) {
					//case 1 : scene_arcarum_tutorial_01/null?_=1590417179096&t=1590417710649&uid=25963971
					sceneCode = sceneCode.split('/')[0];
				} else if (sceneCode.includes('?')) {
					//case 2 : scene_chr486_ep1_s10?_=1590417179118&t=1590417760611&uid=25963971
					sceneCode = sceneCode.split('?')[0];
				}

				req.getContent(function(item) {
					var obj = JSON.parse(item);
					sceneObj = obj.scene_list;
					return true;
				});
				return true;
			}
		});
	}

	if (Object.keys(sceneObj).length != 0) {
		if (Object.keys(sceneCode).length == 0) {
			sceneCode;
		}
	}

	if (Object.keys(sceneCode).length != 0 && Object.keys(sceneObj).length != 0) {
		console.log(sceneCode);
		console.log(sceneObj);
		port.postMessage({ data: 'scenes', scenes: [sceneCode, sceneObj] });
	}
};

chrome.devtools.network.onRequestFinished.addListener(requestListener);