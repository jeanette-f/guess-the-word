const guessedLetters = document.querySelector(".guested-letters");
const buttonGuess = document.querySelector (".guess");
const textInput = document.querySelector ("#letter");
const currentWord = document.querySelector (".word-in-progress");
const remainingGuesses = document.querySelector (".remaining");
const countdown = document.querySelector (".remaining span");
const message = document.querySelector (".message");
const buttonPlayAgain = document.querySelector (".play-again");
const word = "magnolia";

const placeholder = function (word) {
    const placeholderLetters = [];
    for ( let letters of word) {
        console.log(letters);
    placeholderLetters.push ("●");
    }
    currentWord.innerText = placeholderLetters.join("");
};

buttonGuess.addEventListener ("click", function(e) {
    e.preventDefault();
    const guess = textInput.value ;
    console.log(guess);
    textInput.value = "";
});