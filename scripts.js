var blue = '#00B5E6';
var red = '#e6004a';
var currentPhase = 'setup';
var descAndBar = document.getElementById('descAndBar');
var inputField = document.getElementById('inputField');
var progressBar;
var intervalId;
var deltaT;
var maxT;


function startTimer(){
	if (currentPhase == 'setup') {
		if (inputField.value.match(/\dh/)) {
			if (inputField.value=='0h'){
				descAndBar.innerHTML = "<h3>'0h' is nonsensical input</h3>";
				return;
			}
			deltaT = inputField.value.substr(0,1) * 60 * 60;
		} else if (isNaN(inputField.value) || inputField.value <= 0){
			descAndBar.innerHTML = '<h3>Input must be positive number above zero</h3>';
			return;
		} else {
			deltaT = inputField.value * 60;
		}
		maxT = deltaT;
		switchPhase();
		intervalId = setInterval(tick, 1000);
	} else {
		//cancel countdown
		window.clearInterval(intervalId);
		switchPhase();
		if (inputField.value.match(/\dh/)) {
			inputField.value = Math.round(maxT/60/60) + 'h';
		} else {
			inputField.value = Math.round(maxT/60);
		}
	}
}

function tick(){
	deltaT--;
	progressBar.style.width = deltaT / maxT * 100 + '%';
	if(deltaT==0) {
		window.clearInterval(intervalId);
		shutdown();
	} else if (deltaT<60) {
		inputField.value = deltaT;
	} else if (deltaT<3540) {
		inputField.value = Math.round(deltaT/60);
	} else {
		inputField.value = Math.round(deltaT/60/60) + 'h';
	}
}

function shutdown(){
	console.log('PC shutdown');
	var sd = require('shutdown-computer');
	sd.shutDownComputer();
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
	progressBar = document.getElementById('progressBar');
	currentPhase = 'armed';
}

function addTen(){
	deltaT+=10*60;
	maxT = deltaT;
	progressBar.style.width = '100%';
}

function inputScratch(){
	var inputField = document.getElementsByTagName('input')[0];
	if (inputField.value.length>2) {
		inputField.value = inputField.value.substr(1,2);
	}
}

function initFXs(){
	var inputField = document.getElementsByTagName('input')[0];

	inputField.focus();

	//handle ENTER on press over inputField
	inputField.addEventListener("keydown", function (event) {
		if (event.defaultPrevented) return;
		var handled = false;
		if (event.key !== undefined) {
			if (event.key == "Enter") startTimer();
		} else if (event.keyCode !== undefined) {
			if (event.keyCode == 13) startTimer();
		}
		if (handled) {
		  event.preventDefault();
		}
	  }, true);
}