var sceneCode={};
var sceneObj={};

var GetSceneValue=function(req){
	req.getContent(function(item){
		var obj = JSON.parse(item);
		
		if( Object.keys(obj).length == 1){
			sceneCode = obj.scene_list;
		}else{
			sceneObj = obj.scene_list;
		}
		return true;
	});
};

var requestListener = function(req){
	if(req.request.url.includes('scene_')){
		req.response.headers.some(function(item){
			if( item.value == 'application/json' ){
				GetSceneValue(req);
				return true;
			}
		});
	}	
	
	
	if( Object.keys(sceneCode).length != 0 &&
	  		Object.keys(sceneObj).length != 0){
		console.log('sceneCode:',sceneCode);
		console.log('sceneObj:',sceneObj);
		//chrome.devtools.network.onRequestFinished.removeListener(requestListener);
	}
};


chrome.devtools.network.onRequestFinished.addListener(requestListener);