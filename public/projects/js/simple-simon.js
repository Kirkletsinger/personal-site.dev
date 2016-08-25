
var userSequence = [];
var challengeSequence = [];
var roundsCompleted = 1;
var instructions = document.getElementsByTagName('h2');
var boxes = document.getElementsByClassName('box');
//start button
var button = document.getElementsByTagName('button');
button[0].addEventListener('click', gameStart, false);

function gameStart(){
	button[0].style.display = "none";
	userSequence = [];
	challengeSequence = [];
	challengeGenerator();
}
// Player interaction 
function userTurn() {
	for (i = 0; i < boxes.length; i++){
		boxes[i].addEventListener('mousedown', press, false);
		boxes[i].addEventListener('mouseup', release, false );
		boxes[i].addEventListener('click', userChoices, false);
	}
	setTimeout(function(){
		instructions[0].innerHTML = "Your turn!";
	}, 800);
}
//highlights color
function press(event){
	this.style.opacity = "1";
}

//un highlight color
function release(event){
	this.style.opacity = "0.5";
}

//adds user selections to user array
function userChoices(event){
	var selected = this.attributes['data-value'].value;
	userSequence.push(selected);
	//console.log(userSequence);
	compare();
}
///Preview
//gets ride of event listeners so player cant click during preview
function preView() {
	for (i = 0; i < boxes.length; i++){
		boxes[i].removeEventListener('mousedown', press, false);
		boxes[i].removeEventListener('mouseup', release, false );
		boxes[i].removeEventListener('click', userChoices, false);
	}
}
//At the beginning of each round randomly selects a square and is added to the challange array
//and repeats
function challengeGenerator() {
			document.getElementById('round').innerHTML = "Round: " +roundsCompleted;
			var a = Math.floor(Math.random() * 4);//a = index of boxes
			challengeSequence.push(a);
			challengeAnimator(challengeSequence);
				// console.log(challengeSequence);
}
//loop the challenge array and unhighlight each box
function challengeAnimator(sequence){ 				
	preView();
	setTimeout(function(){
		instructions[0].innerHTML = "Watch";
	}, 200);

		var b = 0;
		var interval = setInterval(function() {				
			var currentBox = boxes[sequence[b]];
			currentBox.style.opacity = "1";
			b++;

			setTimeout(function(){
				currentBox.style.opacity = "0.5";
			}, 200);

			if (b >= sequence.length){
				clearInterval(interval);
				userTurn();
			}
		}, 800);
}
//campare players array to the challange array after each selection.
// if they dont match then stop game. if player selects right array roundsCompleted then round the counter and make a new element 
//for challage array
function compare() {
	for (var i = 0; i < userSequence.length; i++) {
		if(userSequence[i] != challengeSequence[i]){
			preView();
			instructions[0].innerHTML = "LOSER!!!!!!!!!";
			button[0].style.display = "inline-block";
			round = 1;
			return
		}
	}
	if (userSequence.length == challengeSequence.length){
	userSequence = [];
	roundsCompleted++;
	challengeGenerator();
	}
}


