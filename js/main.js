
var submitBtn=document.getElementById("submit");
var nameInp=document.getElementById("nameInp");
var urlInp=document.getElementById("urlInp");
var markerRow=document.getElementById("markerRow");
var markerArray;

if(localStorage.getItem("Markers")==null)
{
    markerArray=[];
}
else{
    markerArray=JSON.parse(localStorage.getItem("Markers"));
    displayBookmarker();
}


submitBtn.addEventListener("click",function(){
    addBookmarker();
    clearInp();

});

function addBookmarker()
{
    var markerInps ={
        name: nameInp.value,
        url: urlInp.value
    }
    if(!Validate(markerInps.name,markerInps.url))
    {
        return false;
    }
    markerArray.push(markerInps);
    localStorage.setItem("Markers", JSON.stringify(markerArray));
    displayBookmarker();
}

function displayBookmarker()
{
    var markerCols=``;
    for(var i=0;i<markerArray.length;i++)
    {
        markerCols +=`<div class="col-lg-12 my-3">
                    <div class="bookmarker-item d-flex">
                        <div class="item-head w-50">
                            <h3>`+markerArray[i].name+`</h3>
                        </div>
                        <div class="item-event w-50">
                            <a href="`+markerArray[i].url+`" class="btn btn-danger mx-3 text-white px-3" target="_blank" id="ulrRef">Visit</a>
                            <button class="btn btn-danger px-3" onclick="deleteMarker(`+i+`)">Delete</button>
                        </div>
                    </div>
                </div> `
    }
    markerRow.innerHTML=markerCols;
}

function clearInp()
{
    var inputs=document.getElementsByClassName("form-control");
    for(var i=0;i<inputs.length;i++)
    {
        inputs[i].value="";
    }
}
function deleteMarker(id)
{
    markerArray.splice(id,1);
    localStorage.setItem("Markers", JSON.stringify(markerArray));
    displayBookmarker();
}
function Validate(siteName,siteUrl)
{
    if(!siteName || !siteUrl)
    {
        alert("Please Fill The Form");
        return false;
    }
    
    var expression = /^https:\/\/.[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var urlRegex = new RegExp(expression);
    if (!siteUrl.match(urlRegex)) {
      alert("URL Is No Valid");
      return false;
    }
    return true;
}