const guessedLetters = document.querySelector(".guested-letters");
const buttonGuess = document.querySelector (".guess");
const textInput = document.querySelector ("#letter");
const currentWord = document.querySelector (".word-in-progress");
const remainingGuesses = document.querySelector (".remaining");
const countdown = document.querySelector (".remaining span");
const message = document.querySelector (".message");
const buttonPlayAgain = document.querySelector (".play-again");
const word = "magnolia";
const allGuesses = [];

// placeholder for mystery word
const placeholder = function (word) {
    const placeholderLetters = [];
    for ( let letters of word) {
        console.log(letters);
    placeholderLetters.push ("●");
    }
    currentWord.innerText = placeholderLetters.join("");
};
// event listener to clear the guess box after each guess
buttonGuess.addEventListener ("click", function(e) {
    e.preventDefault();
    message.innerText = "";
    const guess = textInput.value ;
    // to validate guess input
    const goodGuess = playerInput(guess);
    console.log(guess);
    if (goodGuess) {
        makeGuess(guess);
    }
    
    textInput.value = "";
   
});
// messages for incorrect input
const playerInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = "Please guess a letter"
    } else if (input.length > 1) {
        message.innerText = "Only guess one letter at a time"
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please guess a letter A - Z"
    } else {
        return input ;
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (allGuesses.includes(guess)){
        // if letter was already guessed
        message.innerText = "You've already guessed that letter"
    } else {
        // if letter hasn't been guessed yet
        allGuesses.push(guess);
        console.log(allGuesses);
    }
};