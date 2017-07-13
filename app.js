// initializing color variables.

var red;
var green;
var blue;
var correctColor;
var infoText = document.querySelector("p");
var colorHead = document.querySelector("h2");
var resetButton = document.querySelector("button");

// Selecting all squares.
var squares = document.querySelectorAll(".square");

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

resetColors();

resetButton.addEventListener("click", resetColors);