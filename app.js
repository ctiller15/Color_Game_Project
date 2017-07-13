var red;
var green;
var blue;

var squares = document.querySelectorAll(".square");

// Randomizing the rgb values for every single square.
squares.forEach(function(square){
	red = Math.floor(Math.random() * 256);
	green = Math.floor(Math.random() * 256);
	blue = Math.floor(Math.random() * 256);
	var rgbVal = "rgb(" + red + ", " + green + ", " + blue + ")" 
	square.style.backgroundColor = rgbVal;
	square.addEventListener("click", function(){
		if(square.style.backgroundColor === correctColor){
			console.log("CORRECT!!!");
		} else {
			console.log("BZZ! WRONG! That color was " + square.style.backgroundColor);
		}
	});
});

var pickedSquare = squares[Math.floor(Math.random() * squares.length)];
var correctColor = pickedSquare.style.backgroundColor;
console.log(pickedSquare.style.backgroundColor);