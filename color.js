/* ----- VARIABLE INITIALIZATION ----- */
var numSquares = 6;
var colors = [];
var pickedColor;

var squares = document.querySelectorAll(".square");
var pickedColorDisplay = document.getElementById("chosenColor");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
var numberOfSquares = 6;

init();

/* ----- INITIALIZE COLOR GAME ----- */
function init() {

	/* ----- EASY MODE OR HARD MODE ----- */
	setupModeButtons();
	
	/* ----- INITIALIZE SQUARES AND WINNING LOGIC ----- */
	setupSquares();

	/* ----- RESET ----- */
	reset();
}

/* ----- EASY MODE OR HARD MODE ----- */
function setupModeButtons() {
	for(var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function() {
			// Add selected class to Mode Clicked
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");

			// Change numSquares
			this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;

			// Reset Squares
			reset();
		});
	}
}

/* ----- INITIALIZE SQUARES AND WINNING LOGIC ----- */
function setupSquares() {
	for(var i = 0; i < squares.length; i++) {
		squares[i].addEventListener("click", function() {
			var clickedColor = this.style.backgroundColor;

			/* ----- USER GUESSED CORRECTLY ??? ----- */ 
			if(clickedColor === pickedColor) {
				messageDisplay.textContent = "Correct!";
				changeSquaresToPickedColor(clickedColor);
				h1.style.backgroundColor = clickedColor;
				resetButton.textContent = "Play Again?";
			} else {
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again";
			}
		});
	}
}

/* ----- RESET SQUARES AND LOGIC ----- */
function reset() {
	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	pickedColorDisplay.textContent = pickedColor;
	for(var i = 0; i < squares.length; i++) {
		if(colors[i]) {
			squares[i].style.backgroundColor = colors[i];
			squares[i].style.display = "block";
		} else {
			squares[i].style.display = "none"
		}
	}
	h1.style.backgroundColor = "steelblue";
	messageDisplay.textContent = "";
	resetButton.textContent = "New Colors";
}

/* ----- RESET / PLAY AGAIN CLICKED ----- */
resetButton.addEventListener("click", function() {
	reset();
});


/* ----- HELPER FUNCTIONS ----- */

/* Change Squares if Guess Correctly */
function changeSquaresToPickedColor (color) {
	for(var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
	}
}

/* Get the picked color from colors array */
function pickColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

/* Generate Initial Random Colors for Squares */
function generateRandomColors(num) {
	var arr = [];

	// Get random colors and push into arr
	for(var i = 0; i < num; i++) {
		arr.push(randomColor());
	}

	return arr;
}

/* Get each random RGB value */
function randomColor() {
	// pick red, green, and blue from 0 - 255
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);

	return "rgb(" + r + ", " + g + ", " + b + ")";
}