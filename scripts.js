var blue = '#00B5E6';
var red = '#e6004a';
var currentPhase = 'setup';
var descAndBar = document.getElementById('descAndBar');
var progressBar = document.getElementById('progressBar');
var intervalId;
var deltaT;
var maxT;

function startTimer(){
	if (currentPhase == 'setup') {
		// save value into variable
		var userInput = document.getElementsByTagName('input')[0].value;
		//validate input errorneous input causes return
		if (isNaN(userInput) || userInput == 0 || userInput < 0){
			descAndBar.innerHTML = '<h3>Input must be positive number above zero</h3>';
			return;
		}
		//variable init
		deltaT = userInput * 60;
		maxT = deltaT;
		//change scene && debug progressbar ID && start ticking
		switchPhase();
		progressBar = document.getElementById('progressBar');
		intervalId = setInterval(tick, 1000);
	} else {
		//cancel countdown
		window.clearInterval(intervalId);
		switchPhase();
	}
}

function tick(){
	deltaT--;
	progressBar.style.width = deltaT / maxT * 100 + '%';

	if(deltaT==0) {
		window.clearInterval(intervalId);
		shutdown();
	} else if (deltaT<60) {
		document.getElementsByTagName('input')[0].value = deltaT;
	} else {
		document.getElementsByTagName('input')[0].value = Math.round(deltaT/60);
	}
}

function shutdown(){
	console.log('PC shutdown');
}

function switchPhase(){
	if (currentPhase == "setup") {
		switchToArmed();
	} else switchToSetup()
}

function switchToSetup() {
	document.querySelector('#right>h2').innerHTML = "Shutdown";
	document.documentElement.style.setProperty('--MainColor', blue);
	document.getElementsByTagName('input')[0].readOnly = false;
	descAndBar.style.border = '1px solid #21252b';
	descAndBar.innerHTML = '<h3>Insert value in minutes, will run internal clock</h3>'
	currentPhase = 'setup';
}

function switchToArmed() {
	document.querySelector('#right>h2').innerHTML = "Cancel";
	document.documentElement.style.setProperty('--MainColor', red);
	document.getElementsByTagName('input')[0].readOnly = true;
	descAndBar.style.border = '1px solid #616568';
	descAndBar.innerHTML = '<div id="progressBar"></div>'
	currentPhase = 'armed';
}

function addTen(){
	deltaT+=10*60;
	if(deltaT>maxT) {
		maxT = deltaT;
	}
}
