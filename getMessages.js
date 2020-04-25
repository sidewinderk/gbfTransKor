document.addEventListener('DOMContentLoaded', function() {
let getTextBtn = document.getElementById('getText');
function getTextMessageArray(){
    var elements = document.querySelectorAll("span.txt-message");
    var messageArray = [];
    for(var iText of elements){
       messageArray.push(iText.innerText);
       console.log(iText.innerText)
    }
    return messageArray
}

getTextBtn.onclick = function(element) {
  var textout = document.querySelector("span#outText");
  var textele = getTextMessageArray();
  textout.innerHTML = textele[0];
}
});
