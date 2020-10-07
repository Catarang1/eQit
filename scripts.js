var blue = '#00B5E6';
var red = '#e6004a';
var currentPhase = 'blue';

function switchPhase(){
	if (currentPhase == "blue") {
		switchToRed();
	} else switchToBlue()
}

function switchToBlue() {
	document.querySelector('#right>h2').innerHTML = "Shutdown";
	document.documentElement.style.setProperty('--MainColor', blue);
	document.getElementsByTagName('input')[0].readOnly = false;
	currentPhase = 'blue';
}

function switchToRed() {
	document.querySelector('#right>h2').innerHTML = "Cancel";
	document.documentElement.style.setProperty('--MainColor', red);
	document.getElementsByTagName('input')[0].readOnly = true;
	currentPhase = 'red';
}

/*
Red Phase:
innerhtml progress bar
==

Blue Phase:	
innerHTML grey text

triggering quit CMD at the end of animation
grey text already in invisible div to simplify transition
animate width of content
each minute update input value in red phase
*/
