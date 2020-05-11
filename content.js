var generalConfig = {
  refreshRate: 300,
  origin: "chrome-extension://"+chrome.runtime.id
  // online DB: 'https://sidewinderk.github.io/gbfTransKor'
  // local DB: 'chrome-extension://ID'
}

var storyText = [];
var cNames = [];
var miscs = [];
var isVerboseMode = false;

// Coversation with popup window

function InitList(){
  chrome.storage.local.get(['oTEXT','nTEXT','mTEXT','verboseMode','origin'], function (result) {
    if(result.oTEXT)
      storyText = result.oTEXT;
    if(result.nTEXT)
      cNames = result.nTEXT;
    if(result.mTEXT)
      miscs = result.mTEXT;
    // Default mode.
    isVerboseMode = result.verboseMode
    if(result.origin){
      // PrintLog("oring: "+result.origin);
      generalConfig.origin = result.origin;
    }
    else
      generalConfig.origin = "chrome-extension://faohjkgnfhlhjmbgkgoebgiomnbcglck"
  });
  // Use custom font
  var styles = `
    @font-face {
  font-family: 'Youth';
  font-style: normal;
  font-weight: 400;
  src: url('//cdn.jsdelivr.net/korean-webfonts/1/orgs/othrs/kywa/Youth/Youth.woff2') format('woff2'), url('//cdn.jsdelivr.net/korean-webfonts/1/orgs/othrs/kywa/Youth/Youth.woff') format('woff');
  unicode-range: U+AC00-D7AF; // Korean unicode range. Youth font doesn't have Chinese characters
  }
  `
  var styleSheet = document.createElement("style")
  styleSheet.type = "text/css"
  styleSheet.innerText = styles
  document.head.appendChild(styleSheet)
  document.body.style.fontFamily = 'Youth';
}
InitList();
var questCsv = generalConfig.origin+'/data/quest.csv';
var nameCsv = generalConfig.origin+'/data/name.csv';
var archiveCsv = generalConfig.origin+'/data/archive.csv';
var imageCsv = generalConfig.origin+'/data/image.csv';

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.data == "update"){
      chrome.storage.local.set({oTEXT: storyText, nTEXT: cNames, mTEXT: miscs});
    }
    if (request.data == "clearText"){
      storyText = [];
      chrome.storage.local.set({oTEXT: storyText});
    }
    if (request.data == "clearName"){
      cNames = [];
      chrome.storage.local.set({nTEXT: cNames});
    }
    if (request.data == "clearMisc"){
      miscs = [];
      chrome.storage.local.set({mTEXT: miscs});
    }
    if (request.data == "refresh"){
      PrintLog(storyText);
      PrintLog(cNames);
      PrintLog(miscs);
      chrome.storage.local.set({oTEXT: storyText, nTEXT: cNames, mTEXT: miscs});
    }
  }
);

var config = {
  attributes: true,
  childList: true,
  subtree: true,
  characterData: true
};
var config_simple = {
  attributes: true
};

// Common modules
function PrintLog(text){
  if(isVerboseMode)
    console.log(text);
}
function walkDownTree(node, command, variable = null) {
  if(node.innerHTML)
    command(node, variable);
  if(!node.className){ // in case of list of nodes
    if(node.length){
      if(node.length > 0){
        for(var i = 0;i < node.length; i++)
        walkDownTree(node[i], command, variable);
      }
    }
  }
  else{
    if(node.hasChildNodes()){
      for(var i = 0;i < node.childElementCount; i++)
      walkDownTree(node.children[i], command, variable);
    }
  } 
}
function walkDownTreeSrc(node, command, variable = null) {
  if(node.className){
    if((!node.length)
    && (!node.className.includes("item"))  // it's too much.
    && (node.currentSrc)){
      command(node, variable);
    }
  }
  if(!node.className){ // in case of list of nodes
    if(node.length){
      if(node.length > 0){
        for(var i = 0;i < node.length; i++)
        walkDownTreeSrc(node[i], command, variable);
      }
    }
  }
  else{
    if(node.hasChildNodes()){
      for(var i = 0;i < node.childElementCount; i++)
      walkDownTreeSrc(node.children[i], command, variable);
    }
  } 
}
function walkDownTreeStyle(node, command, variable = null) {
  if(!node.childElementCount){
    command(node, variable);
  }
  if(!node.length){
    command(node, variable);
  }
  if(!node.className){ // in case of list of nodes
    if(node.length){
      if(node.length > 0){
        for(var i = 0;i < node.length; i++)
          walkDownTreeStyle(node[i], command, variable);
      }
    }
  }
  else{
    if(node.hasChildNodes()){
      for(var i = 0;i < node.childElementCount; i++)
        walkDownTreeStyle(node.children[i], command, variable);
    }
  } 
}
function PushCSV(text, array){
  if(!array.includes(text)){
    if(array.includes(","))
      array.push("'"+text+"'");
    else
      array.push(text);
    chrome.storage.local.set({oTEXT: storyText, nTEXT: cNames, mTEXT: miscs});
  }
}

// Imported modules
var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
    return module = { exports: {} }, fn(module, module.exports), module.exports;
}
const request = async pathname => {
    return new Promise((rev, rej) => {
      let timer = setTimeout(() => {
        rej(`불러오기${pathname}시간초과`);
      }, 30 * 1000);
      fetch(`${pathname}`).then(res => {
        clearTimeout(timer);
        const type = res.headers.get('content-type');

        if (type && type.includes('json')) {
          return res.json();
        }

        return res.text();
      }).then(rev).catch(rej);
    });
};

var papaparse_min = createCommonjsModule(function (module, exports) {
/* @license
Papa Parse
v4.6.3
https://github.com/mholt/PapaParse
License: MIT
*/
Array.isArray||(Array.isArray=function(e){return "[object Array]"===Object.prototype.toString.call(e)}),function(e,t){module.exports=t();}(commonjsGlobal,function(){var s,e,f="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==f?f:{},n=!f.document&&!!f.postMessage,o=n&&/(\?|&)papaworker(=|&|$)/.test(f.location.search),a=!1,h={},u=0,k={parse:function(e,t){var r=(t=t||{}).dynamicTyping||!1;z(r)&&(t.dynamicTypingFunction=r,r={});if(t.dynamicTyping=r,t.transform=!!z(t.transform)&&t.transform,t.worker&&k.WORKERS_SUPPORTED){var i=function(){if(!k.WORKERS_SUPPORTED)return !1;if(!a&&null===k.SCRIPT_PATH)throw new Error("Script path cannot be determined automatically when Papa Parse is loaded asynchronously. You need to set Papa.SCRIPT_PATH manually.");var e=k.SCRIPT_PATH||s;e+=(-1!==e.indexOf("?")?"&":"?")+"papaworker";var t=new f.Worker(e);return t.onmessage=m,t.id=u++,h[t.id]=t}();return i.userStep=t.step,i.userChunk=t.chunk,i.userComplete=t.complete,i.userError=t.error,t.step=z(t.step),t.chunk=z(t.chunk),t.complete=z(t.complete),t.error=z(t.error),delete t.worker,void i.postMessage({input:e,config:t,workerId:i.id})}var n=null;"string"==typeof e?n=t.download?new c(t):new _(t):!0===e.readable&&z(e.read)&&z(e.on)?n=new g(t):(f.File&&e instanceof File||e instanceof Object)&&(n=new p(t));return n.stream(e)},unparse:function(e,t){var i=!1,g=!0,m=",",y="\r\n",n='"',r=!1;!function(){if("object"!=typeof t)return;"string"!=typeof t.delimiter||k.BAD_DELIMITERS.filter(function(e){return -1!==t.delimiter.indexOf(e)}).length||(m=t.delimiter);("boolean"==typeof t.quotes||Array.isArray(t.quotes))&&(i=t.quotes);"boolean"!=typeof t.skipEmptyLines&&"string"!=typeof t.skipEmptyLines||(r=t.skipEmptyLines);"string"==typeof t.newline&&(y=t.newline);"string"==typeof t.quoteChar&&(n=t.quoteChar);"boolean"==typeof t.header&&(g=t.header);}();var s=new RegExp(M(n),"g");"string"==typeof e&&(e=JSON.parse(e));if(Array.isArray(e)){if(!e.length||Array.isArray(e[0]))return o(null,e,r);if("object"==typeof e[0])return o(a(e[0]),e,r)}else if("object"==typeof e)return "string"==typeof e.data&&(e.data=JSON.parse(e.data)),Array.isArray(e.data)&&(e.fields||(e.fields=e.meta&&e.meta.fields),e.fields||(e.fields=Array.isArray(e.data[0])?e.fields:a(e.data[0])),Array.isArray(e.data[0])||"object"==typeof e.data[0]||(e.data=[e.data])),o(e.fields||[],e.data||[],r);throw "exception: Unable to serialize unrecognized input";function a(e){if("object"!=typeof e)return [];var t=[];for(var r in e)t.push(r);return t}function o(e,t,r){var i="";"string"==typeof e&&(e=JSON.parse(e)),"string"==typeof t&&(t=JSON.parse(t));var n=Array.isArray(e)&&0<e.length,s=!Array.isArray(t[0]);if(n&&g){for(var a=0;a<e.length;a++)0<a&&(i+=m),i+=v(e[a],a);0<t.length&&(i+=y);}for(var o=0;o<t.length;o++){var h=n?e.length:t[o].length,u=!1,f=n?0===Object.keys(t[o]).length:0===t[o].length;if(r&&!n&&(u="greedy"===r?""===t[o].join("").trim():1===t[o].length&&0===t[o][0].length),"greedy"===r&&n){for(var d=[],l=0;l<h;l++){var c=s?e[l]:l;d.push(t[o][c]);}u=""===d.join("").trim();}if(!u){for(var p=0;p<h;p++){0<p&&!f&&(i+=m);var _=n&&s?e[p]:p;i+=v(t[o][_],p);}o<t.length-1&&(!r||0<h&&!f)&&(i+=y);}}return i}function v(e,t){if(null==e)return "";if(e.constructor===Date)return JSON.stringify(e).slice(1,25);e=e.toString().replace(s,n+n);var r="boolean"==typeof i&&i||Array.isArray(i)&&i[t]||function(e,t){for(var r=0;r<t.length;r++)if(-1<e.indexOf(t[r]))return !0;return !1}(e,k.BAD_DELIMITERS)||-1<e.indexOf(m)||" "===e.charAt(0)||" "===e.charAt(e.length-1);return r?n+e+n:e}}};if(k.RECORD_SEP=String.fromCharCode(30),k.UNIT_SEP=String.fromCharCode(31),k.BYTE_ORDER_MARK="\ufeff",k.BAD_DELIMITERS=["\r","\n",'"',k.BYTE_ORDER_MARK],k.WORKERS_SUPPORTED=!n&&!!f.Worker,k.SCRIPT_PATH=null,k.NODE_STREAM_INPUT=1,k.LocalChunkSize=10485760,k.RemoteChunkSize=5242880,k.DefaultDelimiter=",",k.Parser=v,k.ParserHandle=r,k.NetworkStreamer=c,k.FileStreamer=p,k.StringStreamer=_,k.ReadableStreamStreamer=g,f.jQuery){var d=f.jQuery;d.fn.parse=function(o){var r=o.config||{},h=[];return this.each(function(e){if(!("INPUT"===d(this).prop("tagName").toUpperCase()&&"file"===d(this).attr("type").toLowerCase()&&f.FileReader)||!this.files||0===this.files.length)return !0;for(var t=0;t<this.files.length;t++)h.push({file:this.files[t],inputElem:this,instanceConfig:d.extend({},r)});}),e(),this;function e(){if(0!==h.length){var e,t,r,i,n=h[0];if(z(o.before)){var s=o.before(n.file,n.inputElem);if("object"==typeof s){if("abort"===s.action)return e="AbortError",t=n.file,r=n.inputElem,i=s.reason,void(z(o.error)&&o.error({name:e},t,r,i));if("skip"===s.action)return void u();"object"==typeof s.config&&(n.instanceConfig=d.extend(n.instanceConfig,s.config));}else if("skip"===s)return void u()}var a=n.instanceConfig.complete;n.instanceConfig.complete=function(e){z(a)&&a(e,n.file,n.inputElem),u();},k.parse(n.file,n.instanceConfig);}else z(o.complete)&&o.complete();}function u(){h.splice(0,1),e();}};}function l(e){this._handle=null,this._finished=!1,this._completed=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},function(e){var t=E(e);t.chunkSize=parseInt(t.chunkSize),e.step||e.chunk||(t.chunkSize=null);this._handle=new r(t),(this._handle.streamer=this)._config=t;}.call(this,e),this.parseChunk=function(e,t){if(this.isFirstChunk&&z(this._config.beforeFirstChunk)){var r=this._config.beforeFirstChunk(e);void 0!==r&&(e=r);}this.isFirstChunk=!1;var i=this._partialLine+e;this._partialLine="";var n=this._handle.parse(i,this._baseIndex,!this._finished);if(!this._handle.paused()&&!this._handle.aborted()){var s=n.meta.cursor;this._finished||(this._partialLine=i.substring(s-this._baseIndex),this._baseIndex=s),n&&n.data&&(this._rowCount+=n.data.length);var a=this._finished||this._config.preview&&this._rowCount>=this._config.preview;if(o)f.postMessage({results:n,workerId:k.WORKER_ID,finished:a});else if(z(this._config.chunk)&&!t){if(this._config.chunk(n,this._handle),this._handle.paused()||this._handle.aborted())return;n=void 0,this._completeResults=void 0;}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(n.data),this._completeResults.errors=this._completeResults.errors.concat(n.errors),this._completeResults.meta=n.meta),this._completed||!a||!z(this._config.complete)||n&&n.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),a||n&&n.meta.paused||this._nextChunk(),n}},this._sendError=function(e){z(this._config.error)?this._config.error(e):o&&this._config.error&&f.postMessage({workerId:k.WORKER_ID,error:e,finished:!1});};}function c(e){var i;(e=e||{}).chunkSize||(e.chunkSize=k.RemoteChunkSize),l.call(this,e),this._nextChunk=n?function(){this._readChunk(),this._chunkLoaded();}:function(){this._readChunk();},this.stream=function(e){this._input=e,this._nextChunk();},this._readChunk=function(){if(this._finished)this._chunkLoaded();else{if(i=new XMLHttpRequest,this._config.withCredentials&&(i.withCredentials=this._config.withCredentials),n||(i.onload=w(this._chunkLoaded,this),i.onerror=w(this._chunkError,this)),i.open("GET",this._input,!n),this._config.downloadRequestHeaders){var e=this._config.downloadRequestHeaders;for(var t in e)i.setRequestHeader(t,e[t]);}if(this._config.chunkSize){var r=this._start+this._config.chunkSize-1;i.setRequestHeader("Range","bytes="+this._start+"-"+r),i.setRequestHeader("If-None-Match","webkit-no-cache");}try{i.send();}catch(e){this._chunkError(e.message);}n&&0===i.status?this._chunkError():this._start+=this._config.chunkSize;}},this._chunkLoaded=function(){4===i.readyState&&(i.status<200||400<=i.status?this._chunkError():(this._finished=!this._config.chunkSize||this._start>function(e){var t=e.getResponseHeader("Content-Range");if(null===t)return -1;return parseInt(t.substr(t.lastIndexOf("/")+1))}(i),this.parseChunk(i.responseText)));},this._chunkError=function(e){var t=i.statusText||e;this._sendError(new Error(t));};}function p(e){var i,n;(e=e||{}).chunkSize||(e.chunkSize=k.LocalChunkSize),l.call(this,e);var s="undefined"!=typeof FileReader;this.stream=function(e){this._input=e,n=e.slice||e.webkitSlice||e.mozSlice,s?((i=new FileReader).onload=w(this._chunkLoaded,this),i.onerror=w(this._chunkError,this)):i=new FileReaderSync,this._nextChunk();},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk();},this._readChunk=function(){var e=this._input;if(this._config.chunkSize){var t=Math.min(this._start+this._config.chunkSize,this._input.size);e=n.call(e,this._start,t);}var r=i.readAsText(e,this._config.encoding);s||this._chunkLoaded({target:{result:r}});},this._chunkLoaded=function(e){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(e.target.result);},this._chunkError=function(){this._sendError(i.error);};}function _(e){var r;l.call(this,e=e||{}),this.stream=function(e){return r=e,this._nextChunk()},this._nextChunk=function(){if(!this._finished){var e=this._config.chunkSize,t=e?r.substr(0,e):r;return r=e?r.substr(e):"",this._finished=!r,this.parseChunk(t)}};}function g(e){l.call(this,e=e||{});var t=[],r=!0,i=!1;this.pause=function(){l.prototype.pause.apply(this,arguments),this._input.pause();},this.resume=function(){l.prototype.resume.apply(this,arguments),this._input.resume();},this.stream=function(e){this._input=e,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError);},this._checkIsFinished=function(){i&&1===t.length&&(this._finished=!0);},this._nextChunk=function(){this._checkIsFinished(),t.length?this.parseChunk(t.shift()):r=!0;},this._streamData=w(function(e){try{t.push("string"==typeof e?e:e.toString(this._config.encoding)),r&&(r=!1,this._checkIsFinished(),this.parseChunk(t.shift()));}catch(e){this._streamError(e);}},this),this._streamError=w(function(e){this._streamCleanUp(),this._sendError(e);},this),this._streamEnd=w(function(){this._streamCleanUp(),i=!0,this._streamData("");},this),this._streamCleanUp=w(function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError);},this);}function r(g){var a,o,h,i=/^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i,n=/(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/,t=this,r=0,s=0,u=!1,e=!1,f=[],d={data:[],errors:[],meta:{}};if(z(g.step)){var l=g.step;g.step=function(e){if(d=e,p())c();else{if(c(),0===d.data.length)return;r+=e.data.length,g.preview&&r>g.preview?o.abort():l(d,t);}};}function m(e){return "greedy"===g.skipEmptyLines?""===e.join("").trim():1===e.length&&0===e[0].length}function c(){if(d&&h&&(y("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+k.DefaultDelimiter+"'"),h=!1),g.skipEmptyLines)for(var e=0;e<d.data.length;e++)m(d.data[e])&&d.data.splice(e--,1);return p()&&function(){if(!d)return;for(var e=0;p()&&e<d.data.length;e++)for(var t=0;t<d.data[e].length;t++){var r=d.data[e][t];g.trimHeaders&&(r=r.trim()),f.push(r);}d.data.splice(0,1);}(),function(){if(!d||!g.header&&!g.dynamicTyping&&!g.transform)return d;for(var e=0;e<d.data.length;e++){var t,r=g.header?{}:[];for(t=0;t<d.data[e].length;t++){var i=t,n=d.data[e][t];g.header&&(i=t>=f.length?"__parsed_extra":f[t]),g.transform&&(n=g.transform(n,i)),n=_(i,n),"__parsed_extra"===i?(r[i]=r[i]||[],r[i].push(n)):r[i]=n;}d.data[e]=r,g.header&&(t>f.length?y("FieldMismatch","TooManyFields","Too many fields: expected "+f.length+" fields but parsed "+t,s+e):t<f.length&&y("FieldMismatch","TooFewFields","Too few fields: expected "+f.length+" fields but parsed "+t,s+e));}g.header&&d.meta&&(d.meta.fields=f);return s+=d.data.length,d}()}function p(){return g.header&&0===f.length}function _(e,t){return r=e,g.dynamicTypingFunction&&void 0===g.dynamicTyping[r]&&(g.dynamicTyping[r]=g.dynamicTypingFunction(r)),!0===(g.dynamicTyping[r]||g.dynamicTyping)?"true"===t||"TRUE"===t||"false"!==t&&"FALSE"!==t&&(i.test(t)?parseFloat(t):n.test(t)?new Date(t):""===t?null:t):t;var r;}function y(e,t,r,i){d.errors.push({type:e,code:t,message:r,row:i});}this.parse=function(e,t,r){var i=g.quoteChar||'"';if(g.newline||(g.newline=function(e,t){e=e.substr(0,1048576);var r=new RegExp(M(t)+"([^]*?)"+M(t),"gm"),i=(e=e.replace(r,"")).split("\r"),n=e.split("\n"),s=1<n.length&&n[0].length<i[0].length;if(1===i.length||s)return "\n";for(var a=0,o=0;o<i.length;o++)"\n"===i[o][0]&&a++;return a>=i.length/2?"\r\n":"\r"}(e,i)),h=!1,g.delimiter)z(g.delimiter)&&(g.delimiter=g.delimiter(e),d.meta.delimiter=g.delimiter);else{var n=function(e,t,r,i){for(var n,s,a,o=[",","\t","|",";",k.RECORD_SEP,k.UNIT_SEP],h=0;h<o.length;h++){var u=o[h],f=0,d=0,l=0;a=void 0;for(var c=new v({comments:i,delimiter:u,newline:t,preview:10}).parse(e),p=0;p<c.data.length;p++)if(r&&m(c.data[p]))l++;else{var _=c.data[p].length;d+=_,void 0!==a?1<_&&(f+=Math.abs(_-a),a=_):a=0;}0<c.data.length&&(d/=c.data.length-l),(void 0===s||s<f)&&1.99<d&&(s=f,n=u);}return {successful:!!(g.delimiter=n),bestDelimiter:n}}(e,g.newline,g.skipEmptyLines,g.comments);n.successful?g.delimiter=n.bestDelimiter:(h=!0,g.delimiter=k.DefaultDelimiter),d.meta.delimiter=g.delimiter;}var s=E(g);return g.preview&&g.header&&s.preview++,a=e,o=new v(s),d=o.parse(a,t,r),c(),u?{meta:{paused:!0}}:d||{meta:{paused:!1}}},this.paused=function(){return u},this.pause=function(){u=!0,o.abort(),a=a.substr(o.getCharIndex());},this.resume=function(){u=!1,t.streamer.parseChunk(a,!0);},this.aborted=function(){return e},this.abort=function(){e=!0,o.abort(),d.meta.aborted=!0,z(g.complete)&&g.complete(d),a="";};}function M(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function v(e){var S,O=(e=e||{}).delimiter,x=e.newline,T=e.comments,I=e.step,A=e.preview,D=e.fastMode,L=S=void 0===e.quoteChar?'"':e.quoteChar;if(void 0!==e.escapeChar&&(L=e.escapeChar),("string"!=typeof O||-1<k.BAD_DELIMITERS.indexOf(O))&&(O=","),T===O)throw "Comment character same as delimiter";!0===T?T="#":("string"!=typeof T||-1<k.BAD_DELIMITERS.indexOf(T))&&(T=!1),"\n"!==x&&"\r"!==x&&"\r\n"!==x&&(x="\n");var P=0,F=!1;this.parse=function(i,t,r){if("string"!=typeof i)throw "Input must be a string";var n=i.length,e=O.length,s=x.length,a=T.length,o=z(I),h=[],u=[],f=[],d=P=0;if(!i)return C();if(D||!1!==D&&-1===i.indexOf(S)){for(var l=i.split(x),c=0;c<l.length;c++){if(f=l[c],P+=f.length,c!==l.length-1)P+=x.length;else if(r)return C();if(!T||f.substr(0,a)!==T){if(o){if(h=[],k(f.split(O)),R(),F)return C()}else k(f.split(O));if(A&&A<=c)return h=h.slice(0,A),C(!0)}}return C()}for(var p,_=i.indexOf(O,P),g=i.indexOf(x,P),m=new RegExp(M(L)+M(S),"g");;)if(i[P]!==S)if(T&&0===f.length&&i.substr(P,a)===T){if(-1===g)return C();P=g+s,g=i.indexOf(x,P),_=i.indexOf(O,P);}else if(-1!==_&&(_<g||-1===g))f.push(i.substring(P,_)),P=_+e,_=i.indexOf(O,P);else{if(-1===g)break;if(f.push(i.substring(P,g)),w(g+s),o&&(R(),F))return C();if(A&&h.length>=A)return C(!0)}else for(p=P,P++;;){if(-1===(p=i.indexOf(S,p+1)))return r||u.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:h.length,index:P}),E();if(p===n-1)return E(i.substring(P,p).replace(m,S));if(S!==L||i[p+1]!==L){if(S===L||0===p||i[p-1]!==L){var y=b(-1===g?_:Math.min(_,g));if(i[p+1+y]===O){f.push(i.substring(P,p).replace(m,S)),P=p+1+y+e,_=i.indexOf(O,P),g=i.indexOf(x,P);break}var v=b(g);if(i.substr(p+1+v,s)===x){if(f.push(i.substring(P,p).replace(m,S)),w(p+1+v+s),_=i.indexOf(O,P),o&&(R(),F))return C();if(A&&h.length>=A)return C(!0);break}u.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:h.length,index:P}),p++;}}else p++;}return E();function k(e){h.push(e),d=P;}function b(e){var t=0;if(-1!==e){var r=i.substring(p+1,e);r&&""===r.trim()&&(t=r.length);}return t}function E(e){return r||(void 0===e&&(e=i.substr(P)),f.push(e),P=n,k(f),o&&R()),C()}function w(e){P=e,k(f),f=[],g=i.indexOf(x,P);}function C(e){return {data:h,errors:u,meta:{delimiter:O,linebreak:x,aborted:F,truncated:!!e,cursor:d+(t||0)}}}function R(){I(C()),h=[],u=[];}},this.abort=function(){F=!0;},this.getCharIndex=function(){return P};}function m(e){var t=e.data,r=h[t.workerId],i=!1;if(t.error)r.userError(t.error,t.file);else if(t.results&&t.results.data){var n={abort:function(){i=!0,y(t.workerId,{data:[],errors:[],meta:{aborted:!0}});},pause:b,resume:b};if(z(r.userStep)){for(var s=0;s<t.results.data.length&&(r.userStep({data:[t.results.data[s]],errors:t.results.errors,meta:t.results.meta},n),!i);s++);delete t.results;}else z(r.userChunk)&&(r.userChunk(t.results,n,t.file),delete t.results);}t.finished&&!i&&y(t.workerId,t.results);}function y(e,t){var r=h[e];z(r.userComplete)&&r.userComplete(t),r.terminate(),delete h[e];}function b(){throw "Not implemented."}function E(e){if("object"!=typeof e||null===e)return e;var t=Array.isArray(e)?[]:{};for(var r in e)t[r]=E(e[r]);return t}function w(e,t){return function(){e.apply(t,arguments);}}function z(e){return "function"==typeof e}return o?f.onmessage=function(e){var t=e.data;void 0===k.WORKER_ID&&t&&(k.WORKER_ID=t.workerId);if("string"==typeof t.input)f.postMessage({workerId:k.WORKER_ID,results:k.parse(t.input,t.config),finished:!0});else if(f.File&&t.input instanceof File||t.input instanceof Object){var r=k.parse(t.input,t.config);r&&f.postMessage({workerId:k.WORKER_ID,results:r,finished:!0});}}:k.WORKERS_SUPPORTED&&(e=document.getElementsByTagName("script"),s=e.length?e[e.length-1].src:"",document.body?document.addEventListener("DOMContentLoaded",function(){a=!0;},!0):a=!0),(c.prototype=Object.create(l.prototype)).constructor=c,(p.prototype=Object.create(l.prototype)).constructor=p,(_.prototype=Object.create(_.prototype)).constructor=_,(g.prototype=Object.create(l.prototype)).constructor=g,k});
});

 const parseCsv = str => {
   try {
     return papaparse_min.parse(str.replace(/^\ufeff/, ''), {
       header: true,
       delimiter: ","
     }).data;
   } catch (err) {
     PrintLog(err);
     return {};
   }
 };
                                         
///

// Observe the textbox
async function translate(stext, csvFile) {
  // Translation part for story text
  var transText = "";
  let csv = await request(csvFile);
  const list = parseCsv(csv);
   list.some(function(item){
     if(String(stext) == String(item.jp)){
       PrintLog("GET:"+String(item.kr));
       transText = String(item.kr);
       return true;
     }
  });
  if(transText.length > 0){
    PrintLog("Send:"+transText);
    return transText;
  }
  else{
    return "";
  }
}
async function GetTranslatedImageURL(stext, csvFile) {
  var transImg = "";
  let csv = await request(csvFile);
  const list = parseCsv(csv);
   list.some(function(item){
     if((String(stext).includes(String(item.orig))) && String(stext).includes("assets")){
       PrintLog("GET URL:"+String(item.kr));
       transImg = origin+"/images/"+String(item.kr);
       return true;
     }
  });
  if(!transImg.includes("png"))
    return "";
  if(transImg.length > 0){
    PrintLog("Send URL:"+transImg);
    return transImg;
  }
  else{
    return "";
  }
}
async function GetTranslatedImageStyle(stext, csvFile) {
  var transImg = "";
  let csv = await request(csvFile);
  const list = parseCsv(csv);
   list.some(function(item){
     if((String(stext).includes(String(item.orig))) && String(stext).includes("assets")){
       PrintLog("GET URL:"+String(item.kr));
       transImg = "url('"+generalConfig.origin+"/images/"+String(item.kr)+"')";
       PrintLog("Check URL: "+transImg);
       return true;
     }
  });
  if(!transImg.includes("png"))
    return "";
  if(transImg.length > 0){
    PrintLog("Send URL:"+transImg);
    return transImg;
  }
  else{
    return "";
  }
}


var translatedText = "";
async function GetTranslatedText(node, csv){
  if(node){
    var passOrNot = true;
    //Filter node
    if((node.className.includes("txt-message"))
    || (node.className.includes("txt-character-name"))
    )
      passOrNot = false;

    var textInput = node.innerHTML.replace(/(\r\n|\n|\r)/gm,"").trim();
    
    // Filter for avoiding unnecessary computing
    if ( (textInput.includes("div"))
    || (textInput.includes("img class"))
    || (textInput.includes("img src"))
    || (textInput.includes("figure class"))
    || (textInput.includes("li class"))
    || (textInput.includes("a class"))
    || (isNaN(textInput) == false) // Only number
    || (isNaN(textInput.replace("/","")) == false) // number / number
    )
      passOrNot = false;
    
    // Add exception's exception.
    if ((node.className.includes("name"))
    || (node.className.includes("message"))
    || (node.className.includes("comment"))
    || (node.className.includes("effect"))
    || (node.className.includes("time"))
    || (node.className.includes("txt-withdraw-trialbatle"))
    || (node.className.includes("prt-popup-header"))
    )
      passOrNot = true;
    if(passOrNot){
      // If the text contains any number, save the number and replace it to "*"
      var number = textInput.replace(/[^0-9]/g,"");
      if(number.length > 0){ 
        textInput = textInput.replace(/[0-9]/g,"*");
      }
      chrome.storage.local.get(['extractMode'], function (result) {
        if(result.extractMode){
          PushCSV(textInput,miscs);
          // if(!miscs.includes(textInput))
          // miscs.push(textInput);
        }
      });
      PrintLog("Send:"+textInput);
      translatedText = await translate(textInput, csv);
      if(translatedText.length > 0){ // When it founds the translated text
        if(number.length > 0){
          // If it contains number("*"), recover it from the saved number
          for (var i = 0; i < number.length; i++) {
            translatedText = translatedText.slice(0,translatedText.indexOf("*")) +  number[i] + translatedText.slice(translatedText.indexOf("*")+1);
          }
        }
        node.innerHTML = translatedText;
        PrintLog("Take:"+translatedText);
      }
    }
  }
}
async function GetTranslatedImage(node, csv){
  if(node.className){
    var imageInput = node.currentSrc;
    if(!imageInput)
      return;
    if((!imageInput.includes("png"))
      ||(imageInput.includes("/ui/"))
      ||(imageInput.includes("/raid/"))
      ||(imageInput.includes("/number/"))
      )
      return;
    PrintLog("Send URL:"+imageInput);
    translatedText = await GetTranslatedImageURL(imageInput, csv);
    if(translatedText.length > 0){ // When it founds the translated text
      node.setAttribute("src",translatedText);
      PrintLog("Take URL:"+translatedText);
    }
  }
}
async function GetTranslatedImageDIV(node, csv){
  if(node.className){
    var imageStyle = window.getComputedStyle(node).backgroundImage;
    if(!imageStyle)
      return;
    if((!imageStyle.includes("png"))
    ||(imageStyle.includes("/ui/"))
    ||(imageStyle.includes("/raid/"))
    ||(imageStyle.includes("/number/"))
    )
      return;
    PrintLog("Send DIV:"+imageStyle+" Class: "+node.className);
    translatedText = await GetTranslatedImageStyle(imageStyle, csv);
    if(translatedText.length > 0){ // When it founds the translated text
      node.style.backgroundImage = translatedText;
      PrintLog("Take DIV:"+translatedText+" Class: "+node.className);
    }
  }
}

// Observers
var sceneObserver = new MutationObserver(function(mutations) {
  mutations.some(function(mutation){
    // PrintLog(mutation);
    if(mutation.target.className.includes("txt-message")){
        var textmessage = mutation.target.innerHTML.replace(/(\r\n|\n|\r)/gm,"").trim();
        chrome.storage.local.get(['extractMode','translateMode'], function (result) {
            if(result.extractMode){
                PrintLog(textmessage);
                PushCSV(textmessage,storyText);
            }
            if(result.translateMode){
              sceneObserver.disconnect();
              GetTranslatedText(mutation.target, questCsv);
              ObserveSceneText();
            }
        });
        return true;
    }
  });
});

var nameObserver = new MutationObserver(function(mutations) {
  mutations.some(function(mutation){
    // PrintLog(mutation);
    if(mutation.target.className.includes("txt-character-name")){
      chrome.storage.local.get(['extractMode','translateMode'], function (result) {
        var tempName = mutation.target.innerHTML.replace(/(\r\n|\n|\r)/gm,"").trim();
        if(tempName != "<span>&nbsp;</span>"){
          if(result.extractMode){
            PushCSV(tempName,cNames);
            // if(!cNames.includes(tempName))
              // cNames.push(tempName);
          }
          if(result.translateMode){
            nameObserver.disconnect();
            GetTranslatedText(mutation.target, nameCsv);
            ObserveNameText();
          }
        }
      });
    }
  });
});
var archiveObserver_short = new MutationObserver(function(mutations) {
  archiveObserver_short.disconnect();
  ReplaceArchive();
  // mutations.forEach((mutation) => { // This method is very active and *slow*
  //   walkDownTree(mutation.target,GetTranslatedText, archiveCsv);
  // });
  ObserverArchive();
});
var archiveObserver = new MutationObserver(function(mutations) {
  archiveObserver.disconnect();
  // ReplaceArchive();
  mutations.forEach((mutation) => { // This method is very active and *slow*
    walkDownTree(mutation.target,GetTranslatedText, archiveCsv);
  });
  ObserverArchive();
});
var ImageObserver = new MutationObserver(function(mutations) {
  // PrintLog(mutations);
  ImageObserver.disconnect();
  mutations.forEach((mutation) => {
    walkDownTreeSrc(mutation.target,GetTranslatedImage, imageCsv);
  });
  ObserverImage();
});
var ImageObserverDIV = new MutationObserver(function(mutations) {
  // PrintLog(mutations);
  ImageObserverDIV.disconnect();
  mutations.forEach((mutation) => {
    walkDownTreeStyle(mutation.target,GetTranslatedImageDIV, imageCsv);
  });
  ObserverImageDIV();
});
var PopObserver = new MutationObserver(function(mutations) {
  PopObserver.disconnect();
  mutations.forEach((mutation) => {
    walkDownTree(mutation.target,GetTranslatedText, archiveCsv);
    walkDownTreeSrc(mutation.target,GetTranslatedImage, imageCsv);
    walkDownTreeStyle(mutation.target,GetTranslatedImageDIV, imageCsv);
  });
  ObserverPop();
});
var BattleObserver = new MutationObserver(function(mutations) {
  BattleObserver.disconnect();
  mutations.forEach((mutation) => {
    walkDownTree(mutation.target,GetTranslatedText, archiveCsv);
    walkDownTreeSrc(mutation.target,GetTranslatedImage, imageCsv);
    walkDownTreeStyle(mutation.target,GetTranslatedImageDIV, imageCsv);
  });
  ObserverBattle();
});

// Queue for each observers
async function ObserveSceneText() {
    var oText = document.getElementsByClassName('prt-message-area')[0];
    if(!oText) {
        //The node we need does not exist yet.
        //Wait 500ms and try again
        window.setTimeout(ObserveSceneText,generalConfig.refreshRate);
        return;
    }
    if((document.URL.includes("archive"))
    || (document.URL.includes("scene"))
    || (document.URL.includes("story"))
    )
      sceneObserver.observe(oText,config);
}
async function ObserveNameText() {
  var oTextName = document.getElementsByClassName('txt-character-name')[0];
  if(!oTextName) {
      //The node we need does not exist yet.
      //Wait 500ms and try again
      window.setTimeout(ObserveNameText,generalConfig.refreshRate);
      return;
  }
  if((document.URL.includes("archive"))
    || (document.URL.includes("scene"))
    || (document.URL.includes("story"))
    )
    nameObserver.observe(oTextName,config);
}
async function ObserverArchive() {
  // var oText = document.getElementById('loading');
  var oText = document.getElementById('wrapper');
  if(!oText) {
      //The node we need does not exist yet.
      //Wait 500ms and try again
      window.setTimeout(ObserverArchive,generalConfig.refreshRate);
      return;
  }
  if(document.URL.includes("raid")) // Do we need this?
    return;
  else 
    archiveObserver.observe(oText, config);
}
async function ObserverPop() {
  // var oText = document.querySelector(".prt-scroll-title");
  var oText = document.getElementById('loading');
  if(!oText) {
      //The node we need does not exist yet.
      //Wait 500ms and try again
      window.setTimeout(ObserverPop,generalConfig.refreshRate);
      return;
  }
  var popDIV = document.getElementById('pop');
  if(popDIV){
    PopObserver.observe(popDIV, config);
  }
  var popDIV2 = document.querySelectorAll('[class^="pop-usual"]');
  if(popDIV2){
   popDIV2.forEach((pop) => { 
    PopObserver.observe(pop, config_simple);
   });
  }
}
async function ObserverBattle() {
  // var oText = document.querySelector(".prt-scroll-title");
  var oText =  document.querySelectorAll('[class^="prt-command-chara"]')[0];
  if(!oText) {
      //The node we need does not exist yet.
      //Wait 500ms and try again
      window.setTimeout(ObserverBattle,generalConfig.refreshRate);
      return;
  }
  if((document.URL.includes("raid"))
    // || (document.URL.includes("scene"))
    // || (document.URL.includes("story"))
    ){
    var battleInfo1 = document.querySelectorAll('[class^="prt-command-chara"]');
    if(battleInfo1){
      battleInfo1.forEach((bInfo) => { 
        BattleObserver.observe(bInfo, config_simple);
    });
    }
    var battleInfo2 = document.querySelectorAll('[class^="pop-condition"]');
    if(battleInfo2){
      battleInfo2.forEach((bInfo) => { 
        BattleObserver.observe(bInfo, config_simple);
    });
    }
    var battleInfo3 = document.querySelectorAll('[class^="prt-cutin"]');
    if(battleInfo3){
      battleInfo3.forEach((bInfo) => { 
        BattleObserver.observe(bInfo, config_simple);
    });
    }  
  }
}
async function ObserverImage() {
  var allElements = document.querySelectorAll('[class^="contents"]')[0];
  // var allElements = document.getElementById('wrapper');
  if(!allElements) {
      //The node we need does not exist yet.
      //Wait 500ms and try again
      window.setTimeout(ObserverImage,generalConfig.refreshRate);
      return;
  }
  ImageObserver.observe(allElements, config);
}
async function ObserverImageDIV() {
  var allElements = document.querySelectorAll('[class^="contents"]')[0];
  // var allElements = document.getElementById('wrapper');
  if(!allElements) {
      //The node we need does not exist yet.
      //Wait 500ms and try again
      window.setTimeout(ObserverImageDIV,generalConfig.refreshRate);
      return;
  }
  ImageObserverDIV.observe(allElements, config);
  ImageObserverDIV.observe(document.querySelectorAll('[class^="pop-global-menu"]')[0], config); // Upper menu
}
async function ReplaceArchive() {
  var header = document.getElementsByClassName('prt-head-current')[0];
  if(!header.innerHTML) {
    //The node we need does not exist yet.
    //Wait 500ms and try again
    window.setTimeout(ReplaceArchive,300);
    return;
  }
  var allElements = document.getElementById('wrapper');
  walkDownTree(allElements,GetTranslatedText, archiveCsv);
}
const main = async () => {
  InitList();
  PrintLog("ORIGIN: "+generalConfig.origin);
  try {
    await Promise.all([ObserverImageDIV(),ObserverImage(), ObserveNameText(), ObserveSceneText(),ObserverArchive(), ObserverPop(), ObserverBattle()]); //
  } catch (e) {
    PrintLog(e);
  }
};
main();
