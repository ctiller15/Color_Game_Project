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
var infoText = $(".info");
var colorHead = $("h2");
var resetButton = $(".reset");
var gameArea = $("#gameArea");
var scoreArea = $(".scoreVal");

// Selecting the inputs for the number of squares and the difficulty.
var diffInput = $("input[type=range]");

// starting with a set number of squares.
// numInput.val(numSquares);
// and a set difficulty.
diffInput.val(difficulty);

// creating all of the square divs.
function createSquares(num){
	gameArea.html("");
	// Creating a div for each square, adding a class, and then adding it back into the div.
	for(var i = 0; i < numSquares; i++){
		var sqDiv = $("<div class='square'></div>");
		gameArea.append(sqDiv);
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
	else if(diff === 3){
		populateSquares(sqList, startRed, startGreen, startBlue, 30);	
	}
	setAnswer();
}

// Picks a single color out of the existing colors, and makes that value the correct answer.
function pickSquare(sqList){
	var pickedSquare = $(sqList[Math.floor(Math.random() * sqList.length)]);
	var sqColor = pickedSquare.css("background-color");
	colorHead.text("Find: " + pickedSquare.css("background-color"));
	return sqColor;	
}

// Something weird going on here. Check it later!
function resetColors(){
	// Resets all of the colors for the game.
	randomizeColors(squares, difficulty);
	correctColor = pickSquare(squares);
}

// Something weird going on here. Check it later!
function resetGame(){
	// Completely resets the entire game from scratch.
	createSquares(numSquares);
	// ensuring that squares is defined before calling resetColors.
	squares = document.querySelectorAll(".square");
	resetColors();
	infoText.text("");
	// Resetting the reset button.
	resetButton.text("reset");
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
		var divwidth = $(".square").width();
		$(".square").css("height", divwidth + "px");
	});		
}

// Handles what happens if the answer to the current puzzle is clicked, or if it is missed.
function setAnswer(){
	$(".square").on("click", function(){
		var sqCol = $(this).css("background-color");
		sqColText = "<span class='sqColText'>rgb</span>" + "<br>" + sqCol.slice(3, -1) + ")";
		if(sqCol === correctColor){
			// If they get the correct color, the round ends.
			// At this point if they want to do another they would have to click reset.
			infoText.text("CORRECT!!!");
			score += 1;
			scoreArea.text(score);
			$(".square").off();
			$(".square").css("background-color", correctColor);
			$(".incorrectText").css("display", "none");
			resetButton.text("Another?");
		} else {
			infoText.text("incorrect");
			$(this).html("<p class='incorrectText'>" + sqColText + "</p>");
			$(this).css("color", sqCol);
			$(this).css("background-color", "rgba(0, 0, 0, 0.0)");
			$(this).off();
		}
	});
}

function endGame(sqList){

}

resetGame();

resetButton.on("click", resetGame);

$(".lower").on("click", function(){
	if(numSquares > 3){
		numSquares -= 3;
		$(".num").text(numSquares);
	}
});

$(".higher").on("click", function(){
	if(numSquares < 15){
		numSquares += 3;
		$(".num").text(numSquares);
	}
});

diffInput.on("change", function(e){
	difficulty = Number(this.value);
});

