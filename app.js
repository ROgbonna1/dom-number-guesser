/*
GAME FUNCTION:
- player must guess a number between min and max
- player gets a certain number of guesses
- notify player of guesses remaining
- notify player of correct answer if they lose
- let player choose to play again
*/

// Game values
let min = 1;
let max = 10;
let winningNum = getRandomNum(min, max);
let guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game');
const minNum = document.querySelector('span.min-num');
const maxNum = document.querySelector('span.max-num');
const guessBtn = document.querySelector('#guess-btn');
const guessInput = document.querySelector('#guess-input');
const message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function(e) {
  if (e.target.classList.contains('play-again')) {
    window.location.reload();
  }
});
// Listen for guess
guessBtn.addEventListener('click', function(e) {
  let guess = parseInt(guessInput.value);

  // Validate Input
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  // Check if won
  if (guess === winningNum) {
    gameOver(true, `${winningNum} is correct! You win!`);
  } else {
    // Wrong Number
    guessesLeft -= 1;
    if (guessesLeft === 0) {
      // Game over - lost
      gameOver(false, `${guess} is not correct! You lose.`);
    } else {
      // Change border color
      guessInput.style.borderColor = 'red';
      
      // Clear Input
      guessInput.value = '';

      // Tell user its the wrong number
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
      
    }
  }
  e.stopPropagation(); // This stops this event from bubbling up to the `game` event listener
});

// Set Message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

// Game over
function gameOver(won, msg) {
  let color;
  won === true ? color = 'green' : color = 'red';
  // Disable Input and Button
  guessInput.disabled = true;
  // Change border color
  guessInput.style.borderColor = color;
  // Set message
  setMessage(msg, color);

  guessBtn.value = 'Play Again?';
  guessBtn.className += ' play-again';
}

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}