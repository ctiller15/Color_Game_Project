// initializing color variables.

var red;
var green;
var blue;
var correctColor;
var difficulty = 1;
var numSquares = 3;
var score = 0;

// selecting the important elements
var infoText = document.querySelector("p");
var colorHead = document.querySelector("h2");
var resetButton = document.querySelector("button");
var gameArea = document.querySelector("#gameArea");
var scoreArea = document.querySelector(".score");

var numInput = document.querySelector("input[type=number]");
var diffInput = document.querySelector("input[type=range]");

// starting with a set number of squares.
numInput.value = 3;
// and a set difficulty.
diffInput.value = 1;

// creating all of the square divs.
function createSquares(num){
	gameArea.innerHTML = "";
	for(var i = 0; i < numSquares; i++){
		var sqDiv = document.createElement("div");
		sqDiv.classList.add("square");
		gameArea.appendChild(sqDiv);
	}
}

function randomizeColors(sqList, diff){
	// Creating initial values to base the randomization off of.
	startRed = limitColor();
	startGreen = limitColor();
	startBlue = limitColor();
	if(diff === 1){	
		populateSquares(sqList);
	} else if(diff === 2){
		populateSquares(sqList, startRed, startGreen, startBlue, 75);
	}
}

// Picks a single color out of the existing colors, and makes that value the correct answer.
function pickSquare(sqList){
	var pickedSquare = sqList[Math.floor(Math.random() * sqList.length)];
	var sqColor = pickedSquare.style.backgroundColor;
	colorHead.textContent = pickedSquare.style.backgroundColor;
	return sqColor;	
}

function resetColors(){
	randomizeColors(squares, difficulty);
	correctColor = pickSquare(squares);
}

function resetGame(){
	createSquares(numSquares);
	squares = document.querySelectorAll(".square");
	resetColors();
	infoText.textContent = "click a color";
}

function limitColor(initColor, rng){
	var start = initColor || 128;
	var range = rng || 128;
	var newColor = Math.floor(Math.random() * ((start + range) - (start - range)) + start - range);
	if(newColor < 0){
		newColor = 0;
	} else if(newColor > 255){
		newColor = 255;
	}
	return newColor;	
}

function populateSquares(sqList, sr, sg, sb, rng){
	// Randomizing the rgb values for every single square.
	sqList.forEach(function(square){
		red = limitColor(sr, rng);
		green = limitColor(sg, rng);
		blue = limitColor(sb, rng);
		var rgbVal = "rgb(" + red + ", " + green + ", " + blue + ")";
		square.style.backgroundColor = rgbVal;
		square.addEventListener("click", function(){
			if(square.style.backgroundColor === correctColor){
				infoText.textContent = "CORRECT!!!";
				score += 1;
				scoreArea.textContent = "Current Score: " + score + " points!"
			} else {
				infoText.textContent = "BZZ! WRONG! That color was " + square.style.backgroundColor;
			}
		});
	});		
}

resetGame();

resetButton.addEventListener("click", resetGame);

numInput.addEventListener("change", function(e){
	numSquares = Number(this.value);
});

diffInput.addEventListener("change", function(e){
	difficulty = Number(this.value);
});