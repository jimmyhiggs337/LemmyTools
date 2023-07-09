// ==UserScript==
// @name         LemmyTools
// @namespace    https://thesimplecorner.org/c/lemmytools
// @version      0.1.2.7
// @description  A small suite of tools to make Lemmy easier.
// @author       howdy@thesimplecorner.org
// @include      https://*
// @require			 https://code.jquery.com/jquery-3.7.0.slim.min.js
// ==/UserScript==


const ltConfig = `
// ------------ EDIT THIS VARIABLE ---------------------
var homeInstance = '';
// ------------ END EDIT AREA --------------------------
// Fixes remote Instance home link. Example: var homeInstance = 'https://lemmy.world';


//Nothing below needs edited.


// -------------- VERSION -------------------
const ltVer = '0.1.2.7';
const ltTestedVer = '0.18.1';

//--------------------------------------------
`;


const funcs = `
/* Globals */

const mobile = isltMobile();
let remoteCommunityArray = [];	


function isHomeInstanceSet(i2c)
{
var isit = false;
 if (i2c.length > 3)
 {
  isit = true;
 }
 return isit;
}


function isltMobile(){
if (/Android|iPhone/i.test(navigator.userAgent)) {
    console.log("LemmyTools: " + "is mobile!");
    return true;
  }
  else
  {
    console.log("LemmyTools: " + "is desktop!");
    return false;
  }
}


//Remote Instance
function update(comm, page, subString, hI) {
console.log("update function");
var el = document.getElementById("myDiv");
try{
 if (comm)
{
  var browsedComm = "<li><h5>" + comm + "</h5></li>" +
"<li><a href='" + homeInstance + "/c/" + page + "' target='_blank'><button class='ltbutton'>Browse/Sub on Home Instance</button></a><br /><a href='" + subString + "' target='_blank'><button class='ltbutton'>Alternative Subscribe Method</button></a></li><br /><br />Use the Alternative Subscribe if the community doesn't exist on your instance already.";


  remoteCommunityArray.push(browsedComm);
				
 }
}
catch{}

return remoteCommunityArray;
}

//Searches communityArray for results in LemmyTools Sidebar.
function searchComms(id, full, commsdiv) {

console.log("LemmyTools: " + "commsearch evt searchinput" + id + commsdiv);
  var url = window.location.href;
  var query = id.toLowerCase();

if (query == "") {
		var commsCount = localStorage.getItem("commsCount");
if ((commsCount == null) || (full.length < 1))
{
commsdiv.innerHTML = "<hr /><b>Welcome to LemmyTools! Ver " + ltVer + "</b><br /><br />If this is your first time running the script, set your lemmy homeinstance in the option page. [" + ltVer  + "] - Manually enter your home lemmy instance in script for offsite home button functionality. (temporary)]. <br /><br /> If you dont see your subscribed communities here simply login to your lemmy and then click the LemmyTools home button above. ";
}
else
{
    commsdiv.innerHTML = "Communities: " + commsCount + '<hr />';
    commsdiv.innerHTML += full;
}
}
else {

//This searches the pushed communityArray with the query, saves it to a array, removes any duplicate values, sorts and then pushes to the commupdate function.
    commsdiv.innerHTML = full;
    console.log("LemmyTools: " + "Searching for:" + query);
    var children = commsdiv.getElementsByTagName("li");
    console.log("LemmyTools: " + "Children found: " + children.length);
    let data = [""];
    var found;
    for (var i = 0; i < children.length; i++) {
      if (children[i].innerHTML.toLowerCase().indexOf(query) !== -1) {
        found = children[i].innerHTML + '<br />';
        console.log("LemmyTools: " + "Found: " + found);
        data.push(found);
      }
    }
    let dup = [...new Set(data)];
    data = dup;
    data.sort();
    commupdate(commsdiv, url, data);
  }
}


function commupdate(id, page, data) {
console.log("LemmyTools: " + "LTbar Update");
  var count = -1;

      //console.log("LemmyTools: " + "updating " + id + " commsearch with: " + data);

      data.forEach(_ => count++);
			data = data.join('');
      id.innerHTML = "";
      id.innerHTML += "Results: " + count + "<hr /><br />";
      id.innerHTML += data;
}


//Options page, get from localstorage (site data)

function options(open){
var odiv = document.getElementById("ltOptions");
console.log("LemmyTools: " + "Options Functions");
if (open == 1)
{
odiv.style.display = "block";
}
else if (open == 2){
//First run set defaults or pull from localstorage.
const mobile = isltMobile();

commposSide = localStorage.getItem("option_commposSide");
reverseSide = localStorage.getItem("option_reverseSide");
var instance = localStorage.getItem("option_homeInstance");
commposVertical = localStorage.getItem("option_commposVertical");
expandImages = localStorage.getItem("option_expandImages");
expandImagesize = localStorage.getItem("option_expandImagesize");
hoverCheck = localStorage.getItem("option_hoverCheck");
hideSideBar = localStorage.getItem("option_hideSideBar");
unblurNSFW = localStorage.getItem("option_unblurNSFW");
alienSiteOld = localStorage.getItem("option_alienSiteOld");
alienSiteOldReadWidth = localStorage.getItem("option_alienSiteOldReadWidth");
expandImageSpeed = localStorage.getItem("option_expandImageSpeed");
showAllImages = localStorage.getItem("option_showAllImages");


if (localStorage.getItem('option_commposSide') == null)
{
		console.log("LemmyTools: First Run Defaults");
    commposSide = "right";
	  reverseSide = "left";
		if (mobile)
{
    commposSide = "left";
	  reverseSide = "right";
}
else
{
    commposSide = "right";
	  reverseSide = "left";
}
}
if (localStorage.getItem('option_homeInstance') == null)
{
	 if (homeInstance != '')
     {
	    instance = homeInstance;
  	 }
    	else
     {
		// alert('Welcome to LemmyTools' + ltVer + '. LemmyTools has defaulted to this lemmy instance. For all LemmyTools features to work please edit the homeInstance variable in the userscript. Thank you and I hope you enjoy LemmyTools! - @Howdy');
	  instance = window.location.origin;
  
      }
		
}
if (localStorage.getItem('option_commposVertical') == null)
{
		if (mobile)
{
	  commposVertical = "0";
}
else
{
	commposVertical = "0";
}
}
if (localStorage.getItem('option_expandImages') == null)
{
	  expandImages = "true";
}
if (localStorage.getItem('option_hideSideBar') == null)
{
	  hideSideBar = "false";
}
if (localStorage.getItem('option_expandImagesize') == null)
{		if (mobile)
{
	 	  expandImagesize = "100";
}
else
{
		  expandImagesize = "50";
}

}
if (localStorage.getItem('option_hoverCheck') == null)
{
	  hoverCheck = "false";
}
if (localStorage.getItem('option_unblurNSFW') == null)
{
	  unblurNSFW = "false";
}
if (localStorage.getItem('option_alienSiteOld') == null)
{

if (mobile)
{
	 	  alienSiteOld = "false";
			
			
}
else
{
		  alienSiteOld = "true";
}


}
if (localStorage.getItem('option_alienSiteOldReadWidth') == null)
{
alienSiteOldReadWidth = "740";
}
if (localStorage.getItem('option_expandImageSpeed') == null)
{
 expandImageSpeed = "0.50";
}
if (localStorage.getItem('option_showAllImages') == null)
{
	  showAllImages = "false";
}


localStorage.setItem("option_commposSide", commposSide);
localStorage.setItem("option_reverseSide", reverseSide);
localStorage.setItem("option_homeInstance", instance);
localStorage.setItem("option_commposVertical", commposVertical);
localStorage.setItem("option_expandImages", expandImages);
localStorage.setItem("option_expandImagesize", expandImagesize);
localStorage.setItem("option_hideSideBar", hideSideBar);
localStorage.setItem("option_hoverCheck", hoverCheck);
localStorage.setItem("option_unblurNSFW", unblurNSFW);
localStorage.setItem("option_alienSiteOld", alienSiteOld);
localStorage.setItem("option_alienSiteOldReadWidth", alienSiteOldReadWidth);
localStorage.setItem("option_expandImageSpeed", expandImageSpeed);
localStorage.setItem("option_showAllImages", showAllImages);

}
else if (open == 3)
{
//save button
odiv.style.display = "none";



var commposSide = document.getElementsByName("option_commposSide")[0];
var value = commposSide.options[commposSide.selectedIndex].value;
commposSide  = value;

theHomeinstance = document.getElementsByName("option_homeInstance")[0];
value = theHomeinstance.value;
theHomeinstance  = value;

var commposVertical = document.getElementsByName("option_commposVertical")[0];
value = commposVertical.value;
commposVertical  = value;

var expandImages = document.getElementsByName("option_expandImages")[0];
value = expandImages.checked;
expandImages  = value;

var expandImagesize = document.getElementsByName("option_expandImagesize")[0];
value = expandImagesize.value;
expandImagesize  = value;

var expandImageSpeed = document.getElementsByName("option_expandImageSpeed")[0];
value = expandImageSpeed.value;
expandImageSpeed  = value;

var hideSideBar = document.getElementsByName("option_hideSideBar")[0];
value = hideSideBar.checked;
hideSideBar  = value;

var hoverCheck = document.getElementsByName("option_hoverCheck")[0];
value = hoverCheck.checked;
hoverCheck  = value;

var unblurNSFW = document.getElementsByName("option_unblurNSFW")[0];
value = unblurNSFW.checked;
unblurNSFW  = value;

var alienSiteOld = document.getElementsByName("option_alienSiteOld")[0];
value = alienSiteOld.checked;
alienSiteOld = value;

var alienSiteOldReadWidth = document.getElementsByName("option_alienSiteOldReadWidth")[0];
value = alienSiteOldReadWidth.value;
alienSiteOldReadWidth = value;

var showAllImages = document.getElementsByName("option_showAllImages")[0];
value = showAllImages.checked;
showAllImages = value;


if (commposVertical > 85)
{
commposVertical = 85;
}
else if (commposVertical <= -1)
{
commposVertical = 0;
}

if (expandImageSpeed > 1)
{
expandImageSpeed = 1;
}
if (expandImageSpeed < 0)
{
expandImageSpeed = 0;
}


var reverseSide = "";

if (commposSide == "left")
{
reverseSide = "right";
}
else
{
reverseSide = "left";
}

localStorage.setItem("option_commposSide", commposSide);
localStorage.setItem("option_reverseSide", reverseSide);
localStorage.setItem("option_homeInstance", theHomeinstance);
localStorage.setItem("option_commposVertical", commposVertical);
localStorage.setItem("option_hideSideBar", hideSideBar);
localStorage.setItem("option_expandImages", expandImages);
localStorage.setItem("option_expandImagesize", expandImagesize);
localStorage.setItem("option_expandImageSpeed", expandImageSpeed);
localStorage.setItem("option_hoverCheck", hoverCheck);
localStorage.setItem("option_unblurNSFW", unblurNSFW);
localStorage.setItem("option_alienSiteOld", alienSiteOld);
localStorage.setItem("option_alienSiteOldReadWidth", alienSiteOldReadWidth);
localStorage.setItem("option_showAllImages", showAllImages);
location.reload(true);
}

commposSide = localStorage.getItem("option_commposSide");
reverseSide = localStorage.getItem("option_reverseSide");
instance = localStorage.getItem("option_homeInstance");
commposVertical = localStorage.getItem("option_commposVertical");
expandImages = localStorage.getItem("option_expandImages");
expandImagesize = localStorage.getItem("option_expandImagesize");
expandImageSpeed = localStorage.getItem("option_expandImageSpeed");
hideSideBar = localStorage.getItem("option_hideSideBar");
hoverCheck = localStorage.getItem("option_hoverCheck");
unblurNSFW = localStorage.getItem("option_unblurNSFW");
alienSiteOld = localStorage.getItem("option_alienSiteOld");
alienSiteOldReadWidth = localStorage.getItem("option_alienSiteOldReadWidth");
showAllImages = localStorage.getItem("option_showAllImages");

const userOptions = {theInstance: instance, positionSide: commposSide, reverseSide: reverseSide, positionVertical: commposVertical,expandImages: expandImages,expandImagesize: expandImagesize, hideSideBar: hideSideBar, hoverCheck: hoverCheck, unblurNSFW: unblurNSFW, alienSiteOld: alienSiteOld, alienSiteOldReadWidth: alienSiteOldReadWidth, expandImageSpeed: expandImageSpeed, showAllImages: showAllImages};
console.log("LemmyTools: Settings" + userOptions);
return userOptions;


}

function scrollToElement(pageElement) {
    var positionX = 0,
        positionY = -130;

    while(pageElement != null){
        positionX += pageElement.offsetLeft;
        positionY += pageElement.offsetTop;
        pageElement = pageElement.offsetParent;
        window.scrollTo(positionX, positionY, "smooth");
    }
}

//Used for offset removal
function removeClassByWildcard(divClass) {
  // If the class ends with a "*", then it matches all classes that start with the given class name.
  if (divClass.endsWith("*")) {
		divClass = divClass.replace('*', '');
    // Get all elements with the given class name.
    var elements = document.getElementsByTagName("div");
    var re = new RegExp("(^|\\s)" + divClass + "(\\s|$)");
		let result = [];
		let className = "";

		for (var i=0; i<elements.length; i++) {
      if (re.test(elements[i].className)) {
				console.log("Match: " + elements[i]);
				result.push(elements[i]);
				for (var y=0; y<elements[i].classList.length; y++)
				{
					if (elements[i].classList[y].indexOf(divClass) !== -1)
						{
							className = elements[i].classList[y];
							console.log(className);
						}
				}
      }
    }
    // Remove the class from all elements.
    for (var i = 0; i < result.length; i++) {
      result[i].classList.remove(className);
    }
  } else {
    // Otherwise, the class must match exactly.
    var elements = document.querySelectorAll("[class=" + divClass + "]");

    // Remove the class from all elements.
    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.remove(divClass);
    }
  }

}

function alienSiteOldStyle_compact() {
var xhr=new XMLHttpRequest();
xhr.open("GET","https://cdn.jsdelivr.net/gh/soundjester/lemmy_monkey@main/old.reddit.compact.user.js");
xhr.onload=function(){
		const theScript = xhr.responseText;
    document.head.appendChild(document.createElement("script")).innerHTML = theScript;
}
xhr.send();
}


//Expand all images on page
function allImages(h)
{
let clickableImages = [];

clickableImages = document.querySelectorAll('[aria-label="Expand here"]');
console.log(clickableImages.length);
  console.log(clickableImages);
if (h != 1)
{
for (i=0; i<clickableImages.length; i=i+2)
{
try{
clickableImages[i].click();
clickableImages[i].show();
}catch{}
}
}
else
{
//lazy - need to figure out way to handle on dom iter
location.reload(true);
}

clickableImages = "";
} //end of function


`;



const main = `
// LemmyTools

//check if first run or load saved settings
let settings = options("2");


/* The provided restyling was graciously used with permission from the developer(s) of Compact Lemmy to old.Reddit Re-format (Lemmy v0.18)

// @name         Compact Lemmy to old.Reddit Re-format (Lemmy v0.18)
// @namespace    https://github.com/soundjester/lemmy_monkey
// @description  Reformat widescreen desktop to look more like Reddit
// @author       mershed_perderders, DarkwingDuck, dx1@lemmy.world, Djones4822, Jakylla

Thank you.
*/

//Add Compact AlienSiteOld Theme
if (settings.alienSiteOld == "true")
{
console.log('LemmyTools: Adding alienSiteOld');
alienSiteOldStyle_compact();
}


/* Script */
url = window.location.href;
console.log("LemmyTools: " + "url is " + url)
var count = 0;


//Keep Updated
setInterval(function (){
url = window.location.href;
}, 1000);


//Option Divs
if (settings.expandImages == "true")
{
 eIcheck = 'checked';
}
else
{
 eIcheck = '';
}
if (settings.hideSideBar == "true")
{
 hSBcheck = 'checked';
}
else
{
 hSBcheck = '';
}
if (settings.hoverCheck == "true")
{
 hoverCheck = 'checked';
}
else
{
 hoverCheck = '';
}
if (settings.unblurNSFW == "true")
{
 unblurCheck = 'checked';
}
else
{
unblurCheck = '';
}
if (settings.alienSiteOld == "true")
{
 aSOcheck = 'checked';
}
else
{
aSOcheck = '';
}
if (settings.showAllImages == "true")
{
 showAllImagesCheck = 'checked';
}
else
{
 showAllImagesCheck = '';
}

var hIAlertString = '';
//Is HomeInstance Manually Set For WorkAround
if (isHomeInstanceSet(homeInstance) == false)
{
hIAlertString = "<b style='color: red;'>Your Home Instance has not been manually set in the UserScript.</b><br />";
}
else 
{
hIAlertString = "";
}


//Create Lemmy Tools Elements ----------------------------------------

var odiv = document.createElement("div");
odiv.setAttribute("id", "ltOptions");
odiv.classList.add("ltoptions", "border-secondary", "card");
odiv.innerHTML = "<h4>LemmyTools " + ltVer + " Options</h4></hr>" +
"<div class='table-responsive'><table class='table'>" +
"<thead class='pointer'>" +
"<tr><th>Option:</th>" +
"<th>Value:</th>" +
"</thead></tr>" +
"<tbody>" +
"<tr><td><b>LemmyTools Settings:</b></td><td></td></tr>" +
"<tr><td><b>HomeInstance URL</b><br /> Make sure to edit the homeInstance variable of<br /> the UserScript for the remote instance Home button fix. (Temporary workaround).<br />(Ex: https://yourinstance.lemmy)<br />" + hIAlertString + "</td><td><textarea name='option_homeInstance'>" + settings.theInstance + "</textarea></td></tr>" +
"<tr><td><b>LemmyTools bar window side</b><br /> - default: right</td><td><select name='option_commposSide'><option value='" + settings.positionSide + "'>" + settings.positionSide + "</option><option value='right'>right</option><option value='left'>left</option></select></td></tr>" +
"<tr><td><b>LemmyTools bar vertical position </b><br />% from top [0-85] - default: 0</td><td><textarea name='option_commposVertical'>" + settings.positionVertical + "</textarea></td></tr>" +
"<tr><td><b>Keep LemmyTools Bar Open</b><br />Works best for widescreen desktops.</td><td><input type='checkbox'  name='option_hoverCheck'" + hoverCheck + "/></td></tr>" +
"<tr><td><br /><br /></td><td></td></tr>" +
"<tr><td><b>Site Style and Behaviors:</b></td><td></td></tr>" +
"<tr><td><b>Compact Lemmy to old.Reddit Re-format (Lemmy v0.18) style</b><br />Like the old alien.site but lemmy! <br />Defaults - Desktop: On / Mobile: Off <br /><br /> Post width / comment width setting in pixels. Increase or Decrease to your reading preference while viewing posts. (Default 740) </td><td><input type='checkbox'  name='option_alienSiteOld'" + aSOcheck + "/><br /><br /><br /><textarea name='option_alienSiteOldReadWidth'>" + settings.alienSiteOldReadWidth + "</textarea></td></tr>" +
"<tr><td><b>Hide Lemmy Sidebars</b><br /> (Trending, ServerInfo, Communities)<br /> More room for images on feed.</td><td><input type='checkbox'  name='option_hideSideBar'" + hSBcheck + "/></td></tr>" +
"<tr><td><b>Expandable Images</b><br />Acts as an auto-expander and adds the ability to manually<br /> expand images by clicking and dragging.<br />Doubleclick to open full image.</td><td><input type='checkbox'  name='option_expandImages' " + eIcheck + "/></td></tr>" +
"<tr><td><b>Auto Expand Size</b><br />Size of post image after opening a image post.<br /> Desktop Default: 50 / Mobile: 100</td><td><textarea name='option_expandImagesize'>" + settings.expandImagesize + "</textarea></td></tr>" +
"<tr><td><b>Expand Image Speed</b><br />Speed multiplier for click&drag expanding images. If your images seem to expand<br /> too fast or slow, increase or decrease this value. [Values 0 to 1.0]<br /> Default: 0.50 </td><td><textarea name='option_expandImageSpeed'>" + settings.expandImageSpeed + "</textarea></td></tr>" +
"<tr><td><b>Automatically open image posts</b><br /></td><td><input type='checkbox'  name='option_showAllImages'" + showAllImagesCheck + "/></td></tr>" +
"<tr><td><b>Auto unblur NSFW images</b><br /></td><td><input type='checkbox'  name='option_unblurNSFW'" + unblurCheck + "/></td></tr>" +
"<tr><td></td><td><button id='LTsaveoptions' onclick='options(3)'>Save /  Close</button></td></tr></tbody></table></div>" +
"<p> Tested on Lemmy Version: " + ltTestedVer  + " on firefox. " +
"<br /><h5>LemmyTools Links</h5><hr /><a href='https://thesimplecorner.org/c/lemmytools'>!lemmytools@thesimplecorner.org</a><br />Get it here: <a href='https://github.com/howdy-tsc/LemmyTools'>Github</a> or <a href='https://greasyfork.org/en/scripts/469169-lemmytools'>GreasyFork</a>" +
"<br />Please submit issues to the github for feature requests and problems: <a href='https://github.com/howdy-tsc/LemmyTools/issues'>Github LemmyTools Issues</a><br /></p>" +
"<br /><a href='https://ko-fi.com/lemmytools'><img src='https://storage.ko-fi.com/cdn/nav-logo-stroke.png' width='32' /><br />Enjoy LemmyTools?<br />Tip with coffee!</a>" +
"<br /><br /><b>Attributes/Credit: </b><br /><li>The provided style pack option of 'Compact Lemmy to old.Reddit Re-format (Lemmy v0.18)' was graciously used with permission from the developer(s). <br />Please support their project here:" +
"<a href='https://github.com/soundjester/lemmy_monkey'> Compact Lemmy to old.Reddit Re-format (Lemmy v0.18)</a></li>";


//Adjust clickable area for mobile (add brandingString if desktop)
var brandingString = "";
if (mobile !== true)
{
brandingString = "<span style='vertical-align: super !important; writing-mode: vertical-lr; text-orientation: mixed;'>LemmyTools</span>";
}

//Comm divs
var touchdiv = document.createElement("div");
touchdiv.setAttribute("id", "touchdiv");
var idiv = document.createElement("div");
idiv.setAttribute("id", "searchdiv");
idiv.classList.add("ltmenu", "border-secondary", "card");
idiv.innerHTML = "<div id='ltActiveSearchDiv' class='ltActiveSearchDiv'><header id='ltBarHeader' class='card-header'><h6><a href=" + settings.theInstance + ">Home</a> - <a href='https://lemmyverse.net/communities' target='_new'>Find Subs</a> - <img width=22 height=22 class='targetImg' src='data:image/webp;base64,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' /></h6>" +
"</header><input type='text' id='commsearch' name='commsearchinput' oninput='searchComms(commsearch.value, communityArray, div)' placeholder='Search your subscriptions (or visted subs)' /> " +
"<div id='ltBarSubHeader' class='clickAble'>LemmyTools " + ltVer + " - <a href='#' id='LToptions' onclick='options(" + 1 + ")'>Options</a></div><div style='clear:both;'></div>" +
"</div>" +
"<div id='ltPassiveSearchDiv' class='ltPassiveSearchDiv'><img width=30 height=30  class='targetImg' src='data:image/webp;base64,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' />" +
brandingString +
"</div><br />" +
" ";

var div = document.createElement("div");
div.setAttribute("id", "myDiv");
div.classList.add("ltcommsbar");

var styleString = ".ltmenu {position: fixed; top: " + settings.positionVertical +"%;" + settings.positionSide + ": 0; font-size: .75rem; display: block; height: 100%; min-height: auto;" +
"z-index:999; overflow:scroll; border: thick double; border-right:none !important; outline: 1px solid grey !important; }" +
".ltActiveSearchDiv {font-size: 0.9rem; width: 100%;}" +
".ltmenu input { width: 100%;}" +
".ltPassiveSearchDiv {display:none; width: 100%;}" +
".post-listings .img-fluid {width: " + settings.expandImagesize + "%}" +
"#myDiv li { list-style-type: none;}" +
"#myDiv hr {display:block; }" +
"#searchdiv {" + settings.positionSide +": 0; position: fixed; height:100%; min-height: auto; width: 240px; display:block;  z-index:999; overflow: scroll; display: block; transition-timing-function: ease;  transition: " + settings.positionSide + " .25s; transition-delay: 0, 0.25s; overflow: auto;}" +
".ltbutton {background-color: #ccffe5;}" +
".ltPassiveSearchDiv {display:none;}" +
".ltoptions {position: fixed; min-width: auto; min-height: auto; width: auto; height:100%; top:0;" + "display:none; left: 0; overflow:scroll; z-index:1000; padding:0.5%; border: thick double;}" +
"#myDiv::-webkit-scrollbar {display: none;} #myDiv{-ms-overflow-style: none; scrollbar-width: none;}" +
"#searchdiv::-webkit-scrollbar {display: none;} #searchdiv{-ms-overflow-style: none; scrollbar-width: none;}";

if (settings.unblurNSFW == "true")
{
styleString += " .img-blur {filter: none !important; -webkit-filter: none !important; -moz-filter: none !important; -o-filter: none !important; -ms-filter: none !important;} ";
}
else
{
styleString += " .img-blur {filter: blur !important; -webkit-filter: blur !important; -moz-filter: blur !important; -o-filter: blur !important; -ms-filter: blur !important;} ";
}

if (settings.hideSideBar == "true")
{
styleString += ".container, .container-lg, .container-md, .container-sm, .container-xl { }" +
".col-md-8 {flex: 0 0 80% !important;max-width: 80%;}";
}
else
{
styleString += ".container, .container-lg, .container-md, .container-sm, .container-xl {}";
}
if (settings.hoverCheck !== "true"){
styleString += " " +
"#myDiv:not(:hover) {animation: showNavOut 500ms ease-in-out both; display:none; height:0; transition-timing-function: ease;  transition: height;  transition-duration: 1.0; transition-delay: 0.5s;}" +
".ltPassiveSearchDiv {display:block; float: " + settings.reverseSide + "; padding-" + settings.positionSide + ": 200px;}" +
"#ltActiveSearchDiv {display:none; animation: showNav 500ms ease-in-out both;}" +
"#sidebarSubscribed {display:none;}" + 
"#searchdiv { " + settings.positionSide +": -200px; position: fixed; height:110px; min-height: auto; width: 240px; display:block;  z-index:999; overflow: auto; display: block; transition-timing-function: ease;  transition: " + settings.positionSide + ", height; transition-duration: 0.25s, 0.25s; transition-delay: 0.25s, 0.25s; animation: showNavOut 250ms ease-in-out both;}" +
"#searchdiv:hover .ltActiveSearchDiv {display:block;}" +
"#searchdiv:hover .ltPassiveSearchDiv {display:none;}" +
"#searchdiv:hover {" + settings.positionSide +": 0; position: fixed; height: 100%; min-height: auto; width: 240px; display:block;  z-index:999; display: block; overflow: auto;}" +
"#searchdiv:hover > #myDiv{" + settings.positionSide +": 0; word-wrap: break-word; overflow:auto; display:block; height:100%; width:240px;  animation: showNav 500ms ease-in-out both;  }" +
"@keyframes showNav {  from {opacity: 0;}  to {opacity: 1;}}"
"@keyframes showNavOut {  from {opacity: 1;}  to {opacity: 0;}}"
"";
}
else
{
styleString += "" +
"myDiv {visibility: visible; height: auto; width: auto; overflow:scroll !important;}" +
"";
}

//Adjust clickable area for mobile (remove brandingString)
if (mobile == true)
{
styleString += "" +
"#searchdiv {height: 35px;}" +
"";
}

//Adjust Comment/Post width (for reading with compact old style)
if (settings.alienSiteOld == "true")
{
styleString += "" +
"#postContent, .md-div, .alert-warning  {max-width: 740px !important; }" +
".mb-3.row { max-width: " + settings.alienSiteOldReadWidth + "px !important; }" +
".comment { max-width: " + settings.alienSiteOldReadWidth + "px !important; }" +
"";
}



// ADD MAIN CSS
const addCSS = css => document.head.appendChild(document.createElement("style")).innerHTML = css;
addCSS(styleString);



//add lemmytools elements to page
document.body.appendChild(odiv);
document.body.appendChild(idiv);
idiv.appendChild(div);


//Easier Subscribe Buttons ---------------------------

var currentPage = '';
setInterval(function (){
let rCommunityArray = [];
//Browsing remote instance
var broken = url.split('/c/');
var site = broken[0];
site = site.replace('https://', '');
var community = broken[1];
try{
broken2 = community.split('?'); community = broken2[0];
var communityName = community.indexOf('@') > -1 ? community : community + "@" + site;
}catch{}
var subString = settings.theInstance + "/search?q=!" + communityName + "&type=All&listingType=All&page=1";
subString = subString.replace('#', '');
var count = 0;


  if (currentPage != location.href) {
  currentPage = location.href;
    console.log("LemmyTools: " + "Easy Sub Running...");
    if (document.querySelector('meta[name="Description"]').content.includes("Lemmy")) {
 		if ((url.includes(settings.theInstance) == false) && ((url.includes("/c/") || url.includes("/post/") || url.includes("/comment/") || url.includes("/communities")))) {
        console.log("LemmyTools: " + "On remote instance community" + "Button to: " + subString);
      console.log("LemmyTools: " + "On remote lemmy");
        console.log("LemmyTools: " + "On remote instance community" + "Button to: " + subString);
     rCommunityArray =  update(community, communityName, subString, settings.theInstance);
  let rDup = [...new Set(rCommunityArray)];
  rCommunityArray = rCommunityArray.reverse();
	div.innerHTML = '';
	div.innerHTML += rCommunityArray;
	communityArray = rCommunityArray;

    
}
}
}
}, 1000);



// Update homeInstance Comms for bar to use

let communityArray = new Array();
if (url.includes(settings.theInstance)) {
  console.log("LemmyTools: " + "home instance do bar");
  document.querySelectorAll('[class="list-inline-item d-inline-block"]').forEach(function(el) {
    communityArray.push("<li>" + el.innerHTML + "</li>");
  });
  let dup = [...new Set(communityArray)];
  communityArray = dup;
  if ((count == 0) || (count == null)) {
    count = 0;
    communityArray.forEach(_ => count++);
  }

communityArray = communityArray.join('');

  div.innerHTML += communityArray;
  if (div.innerHTML.length >= 20) {
console.log("LemmyTools: Got Results >20");

      console.log("LemmyTools: " + "setting localcomms localstore");
      localStorage.setItem("localComms", communityArray);
			localStorage.setItem("commsCount", count);
    //force update the page
    searchComms("", communityArray, div);

  } else {
    console.log("LemmyTools: " + "get localcomms from localstore");
    communityArray = localStorage.getItem("localComms");

    div.innerHTML += communityArray;
    //force update the page
    searchComms("", communityArray, div);
  }


}
  else {
  console.log("LemmyTools: On Remote Instance - Bar");
  //div.innerHTML = localStorage.getItem("remoteComms");
	//Toggle(0);

}



//Expand Images----------------------------------------------

setInterval(function() {	
if (settings.expandImages == "true")
{
		let theImages = [];
		theImages = document.getElementsByClassName('img-expanded');
   for (i=0; i < theImages.length; i++)
   {
   	 theImages[i].addEventListener('mousedown', startDrag);

   }
	
      let posX;
      let node;
      function startDrag(e){
      	e.preventDefault();
        
        node = e.currentTarget;
        node.style.cursor = 'nwse-resize';
        try {
        node.closest("a").setAttribute('onclick', 'return false;');
        node.srcElement.closest("a").setAttribute('overflow', 'auto;');
        node.preventDefault();
        }catch{}
	
        posX = e.clientX;
        document.addEventListener('mousemove', resize);
        document.addEventListener('mouseup', stopDrag);
       
      }
      function resize(e){
      	e.preventDefault();
        const nextPosX = e.pageX;
        node.style.width = (node.offsetWidth) + (nextPosX - posX) * settings.expandImageSpeed + "px";
        posX = nextPosX;
      }
      function stopDrag(e){
      	e.preventDefault();
        node.style.cursor = 'default';
        document.removeEventListener('mousemove', resize);
        document.removeEventListener('mouseup', stopDrag);
      }
       


}		// if expand images

//Removes the offset from images.
try{removeClassByWildcard("offset-*");}catch{}

			//sidebar settings do
   		if (settings.hideSideBar == "true"){
          try{
            var sidebarSubscribed = document.getElementById("sidebarContainer");
            sidebarSubscribed.style.display = 'none';
					  removeClassByWildcard("site-sideba*");

            var serverInfo = document.getElementById("sidebarInfo");
            var serverInfoString = serverInfo.innerHtml;
            serverInfo.style.display = 'none';
          }
            catch {}
          }


//Show All Images Functionality on button toggle.
try{
addImageButtonArea = document.getElementsByClassName('row align-items-center mb-3 g-3');
if ((addImageButtonArea[0].innerHTML.indexOf('showAllImages') == -1) && (settings.showAllImages != "true"))
{
addImageButtonArea[0].appendChild(document.createElement("div")).innerHTML = "<div class='col-auto'><input type='button' id='showAllImages' class='pointer btn btn-secondary text-bg-primary' value='Show All Images' /> </div>";
showImagesButton = document.getElementById("showAllImages");
showImagesButton.addEventListener("click", function (e) { 

if (showImagesButton.value == 'Show All Images')
{
	showImagesButton.value = 'Hide All Images';
	allImages();
}
else
{
	showImagesButton.value = 'Show All Images';
	allImages(1);
}
});
}
}catch {}


}, 500);


//Open Images Always
var pUrl = "";

openimages = setInterval(function(){
if (settings.showAllImages == "true")
{
console.log("url: " + url);
if ((pUrl.length <= 3) || (pUrl != url))
{
allImages();
}
pUrl = url; 
console.log("P: " + pUrl );

}
}, 2000);



`;



//If lemmy do
(function() {
    'use strict';

    let isLemmy;
    try {
        isLemmy = true;
        isLemmy = document.head.querySelector("[name~=Description][content]").content === "Lemmy";
    } catch (_er) {
        isLemmy = false;
    }

    if (isLemmy) {

        document.body.appendChild(document.createElement("script")).innerHTML = ltConfig;
        document.head.appendChild(document.createElement("script")).innerHTML = funcs;
        document.body.appendChild(document.createElement("script")).innerHTML = main;
    }

})();
