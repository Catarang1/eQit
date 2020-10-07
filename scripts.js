var blue = '#00B5E6';
var red = '#e6004a';
var currentPhase = 'blue';
var descAndBar = document.getElementById('descAndBar');

function switchPhase(){
	if (currentPhase == "blue") {
		switchToRed();
	} else switchToBlue()
}

function switchToBlue() {
	document.querySelector('#right>h2').innerHTML = "Shutdown";
	document.documentElement.style.setProperty('--MainColor', blue);
	document.getElementsByTagName('input')[0].readOnly = false;
	descAndBar.style.border = '1px solid #21252b';
	descAndBar.innerHTML = '<h3>Insert value in minutes, will run internal clock</h3>'
	currentPhase = 'blue';
}

function switchToRed() {
	document.querySelector('#right>h2').innerHTML = "Cancel";
	document.documentElement.style.setProperty('--MainColor', red);
	document.getElementsByTagName('input')[0].readOnly = true;
	descAndBar.style.border = '1px solid #616568';
	descAndBar.innerHTML = '<div id="progressBar"></div>'
	currentPhase = 'red';
}

/*
Red Phase:
triggering quit CMD at the end of animation
animate width of #content
each minute update input value in red phase
*/
