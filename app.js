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
		console.log("I've been clicked!");
		console.log(square.style.backgroundColor);
	});
});