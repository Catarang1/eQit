var blue = '#00B5E6';
var red = '#e6004a';
var currentPhase = 'setup';
var descAndBar = document.getElementById('descAndBar');
var progressBar = document.getElementById('progressBar');
var intervalId;
var deltaT;
var maxT;

function startTimer(){
	var inputField = document.getElementsByTagName('input')[0];
	if (currentPhase == 'setup') {
		// save value into variable
		//validate input errorneous input causes return
		if (isNaN(inputField.value) || inputField.value == 0 || inputField.value < 0){
			descAndBar.innerHTML = '<h3>Input must be positive number above zero</h3>';
			return;
		}
		//variable init
		deltaT = inputField.value * 60;
		maxT = deltaT;
		//change scene && debug progressbar ID && start ticking
		switchPhase();
		progressBar = document.getElementById('progressBar');
		intervalId = setInterval(tick, 1000);
	} else {
		//cancel countdown
		window.clearInterval(intervalId);
		switchPhase();
		inputField.value = Math.floor(maxT/60);
	}
}

function tick(){
	deltaT--;
	progressBar.style.width = deltaT / maxT * 100 + '%';
	var v = document.getElementsByTagName('input')[0].value;
	if(deltaT==0) {
		window.clearInterval(intervalId);
		shutdown();
	} else if (deltaT<60) {
		v = deltaT;
	} else if (deltaT<3600) {
		v = Math.floor(deltaT/60);
	} else {
		v = Math.floor(deltaT/60/60) + 'h';
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

function inputScratch(){
	var inputField = document.getElementsByTagName('input')[0];
	if (inputField.value.length>2) {
		inputField.value = inputField.value.substr(1,2);
	}
}