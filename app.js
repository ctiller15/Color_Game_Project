// initializing color variables.

var red;
var green;
var blue;
var correctColor;

// Initializing game variables
var difficulty = 1;
var numSquares = 3;
var score = 0;

// selecting the important elements
var infoText = document.querySelector("p");
var colorHead = document.querySelector("h2");
var resetButton = document.querySelector("button");
var gameArea = document.querySelector("#gameArea");
var scoreArea = document.querySelector(".scoreVal");

// Selecting the inputs for the number of squares and the difficulty.
var numInput = document.querySelector("input[type=number]");
var diffInput = document.querySelector("input[type=range]");

// starting with a set number of squares.
numInput.value = numSquares;
// and a set difficulty.
diffInput.value = difficulty;

// creating all of the square divs.
function createSquares(num){
	gameArea.innerHTML = "";
	// Creating a div for each square, adding a class, and then adding it back into the div.
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
	// Checking the difficulty level, and setting up the game based on that.
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
	// Resets all of the colors for the game.
	randomizeColors(squares, difficulty);
	correctColor = pickSquare(squares);
}

function resetGame(){
	// Completely resets the entire game from scratch.
	createSquares(numSquares);
	squares = document.querySelectorAll(".square");
	resetColors();
	infoText.textContent = "click a color";
}

// This function generates a random number between 0 and 256 if no arguments are given.
// If initColor and rng are given, it finds a number within the range of the initial
// number.
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

// populates the game area with all of the squares.
// Adds all initial color values and all event listeners.
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
				scoreArea.textContent = score
			} else {
				infoText.textContent = "BZZ! WRONG! That color was " + square.style.backgroundColor;
			}
		}, false);
	});		
}

function endGame(sqList){
	
}

resetGame();

resetButton.addEventListener("click", resetGame);

numInput.addEventListener("change", function(e){
	numSquares = Number(this.value);
});

diffInput.addEventListener("change", function(e){
	difficulty = Number(this.value);
});