var blue = '#00B5E6';
var red = '#e6004a';
var currentPhase = 'blue';
var descAndBar = document.getElementById('descAndBar');
var progressBar = document.getElementById('progressBar');
var intervalId;
var deltaT;
var maxT;

function startTimer(){
	if (currentPhase == 'blue') {
		var userInput = document.getElementsByTagName('input')[0].value;
		if (isNaN(userInput) || userInput == 0 || userInput < 0){
			descAndBar.innerHTML = '<h3>Input must be number that is bigger zero</h3>';
			return;
		}
		deltaT = userInput * 60;
		maxT = deltaT;
		console.log(deltaT);
		switchPhase();
		progressBar = document.getElementById('progressBar');
		intervalId = setInterval(updateTimer, 1000);
	} else {
		window.clearInterval(intervalId);
		switchPhase();
	}

}

function updateTimer(){
	deltaT--;
	progressBar.style.width = deltaT / maxT * 100 + "%";
	if (deltaT < 60) {
		document.getElementsByTagName('input')[0].value = deltaT;
	}
	if(deltaT==0){
		window.clearInterval(intervalId);
		shutdown();
	}
}

function shutdown(){
	console.log('PC shutdown');
}

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
each minute update input value in red phase (modulo, careful with float)
double click on bar adds 10 minutes (carefull with extending over maxT)
different ECHO for wrong inputs in blue phase
refractor blue phase and red phase to armed and setup
*/
