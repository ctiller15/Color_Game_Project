// initializing color variables.

var red;
var green;
var blue;
var correctColor;

// selecting the important elements
var infoText = document.querySelector("p");
var colorHead = document.querySelector("h2");
var resetButton = document.querySelector("button");
var gameArea = document.querySelector("#gameArea");

var numInput = document.querySelector("input");

// starting with a set number of squares.
var numSquares;
numSquares = Number(numInput.value);

// creating all of the square divs.
function createSquares(num){
	gameArea.innerHTML = "";
	for(var i = 0; i < numSquares; i++){
		var sqDiv = document.createElement("div");
		sqDiv.classList.add("square");
		gameArea.appendChild(sqDiv);
	}
}

function randomizeColors(sqList){
	// Randomizing the rgb values for every single square.
	sqList.forEach(function(square){
		red = Math.floor(Math.random() * 256);
		green = Math.floor(Math.random() * 256);
		blue = Math.floor(Math.random() * 256);
		var rgbVal = "rgb(" + red + ", " + green + ", " + blue + ")" 
		square.style.backgroundColor = rgbVal;
		square.addEventListener("click", function(){
			if(square.style.backgroundColor === correctColor){
				infoText.textContent = "CORRECT!!!";
			} else {
				infoText.textContent = "BZZ! WRONG! That color was " + square.style.backgroundColor;
			}
		});
	});	
}

// Picks a single color out of the existing colors, and makes that value the correct answer.
function pickSquare(sqList){
	var pickedSquare = sqList[Math.floor(Math.random() * sqList.length)];
	var sqColor = pickedSquare.style.backgroundColor;
	colorHead.textContent = pickedSquare.style.backgroundColor;
	return sqColor;	
}

function resetColors(){
	randomizeColors(squares);
	correctColor = pickSquare(squares);
}

function resetGame(){
	createSquares(numSquares);
	squares = document.querySelectorAll(".square");
	resetColors();
	infoText.textContent = "click a color";
}

resetGame();

resetButton.addEventListener("click", resetGame);

numInput.addEventListener("change", function(e){
	numSquares = Number(this.value);
});