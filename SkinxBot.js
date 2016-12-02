var x = "<input type=\"file\" id=\"file-input\" />";
document.getElementById("content-header").innerHTML +=x;
itemList=[];

function readSingleFile(e) {
  var file = e.target.files[0];
  if (!file) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function(e) {
    var contents = e.target.result;
    displayContents(contents);
    itemListGenerate(contents);
  };
  reader.readAsText(file);
}

function getText(){
    // read text from URL location
    var request = new XMLHttpRequest();
    request.open('GET', 'https://gist.githubusercontent.com/Bozzanova/5c64bef3e02f2d7ff723b87c9c1e0723/raw/a70650227e3fded53c38694687fa8e12b690fd72/User%2520License', true);
    request.send(null);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            var type = request.getResponseHeader('Content-Type');
            if (type.indexOf("text") !== 1) {
                return userLicense=request.responseText;
            }
        }
    }
}

function itemListGenerate(contents){
  var lines = contents.split(",");
  console.log(lines);
  for(var i = 0;i < lines.length;i++){
    if(lines[i]!=' ' && lines[i]!='')
    itemList.push(lines[i])
  }
}
function displayContents(contents) {
 
  var element = document.getElementById('content-header');
  element.innerHTML += contents;
}
getText();
document.getElementById('file-input')
  .addEventListener('change', readSingleFile, false);


function checkMatching(){
  if(itemList.length>0){
    $('#shop-refresh').click();
    var itemInPage = document.querySelectorAll(".shop-item");
    for(var i=0;i<itemList.length;i++){ //for each item in CSV
      var j=0;
      while(j<itemInPage.length && document.querySelectorAll(".shop-item-selected").length<10 ){ //check whether there are 10 items
        
        if(itemInPage[j].childNodes[0].innerHTML.includes(itemList[i])){ //Matching 
          // Once click need to update itemInPage again 
          document.getElementById("shop").childNodes[j].click(); //Click
          console.log(itemInPage[j].childNodes[0].innerHTML);
          itemInPage = document.querySelectorAll(".shop-item"); //Recalculate Item in Page
        }
        else 
          j++;
      } 
    }
    //if there is existing item then withdraw
    if(document.querySelectorAll(".shop-item-selected").length<=10 && document.querySelectorAll(".shop-item-selected").length>0){ 
      console.log(true);
      //$('#shop-checkout-withdraw').click();
    }
    else 
      console.log(false);
  }
}


(function($) {
    $(document).ready(function() {
      setInterval(function() {
        if(document.getElementById('content-header').childNodes[9].innerHTML.trim()==userLicense){
        checkMatching();
        }      //setInterval
      }, 1000) 
    });
  })(jQuery);
