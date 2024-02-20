const guessedLettersElement = document.querySelector(".guessed-letters");
const buttonGuess = document.querySelector (".guess");
const textInput = document.querySelector ("#letter");
const currentWord = document.querySelector (".word-in-progress");
const remainingGuessesElement = document.querySelector (".remaining");
const countdown = document.querySelector (".remaining span");
const message = document.querySelector (".message");
const buttonPlayAgain = document.querySelector (".play-again");
let word = "magnolia";
let allGuesses = [];
let remainingGuesses = 8;

// to fetch random new word
const getWord = async function() {
    const res = await fetch (
        "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt" 
    );
    const words = await res.text();
    // console.log(words);
    const wordArray = words.split("\n");
    console.log(wordArray);
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    
    placeholder (word);
};
getWord();

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
        showGuessedLetters();
        guessesLeft(guess);
        updateWordInProgress(allGuesses);
    }
};
// to list out letters the user has guessed
const showGuessedLetters = function(){
    guessedLettersElement.innerHTML = "";
    for (const letter of allGuesses) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append (li);
    }
};

// to reveal correctly guessed letters in word
const updateWordInProgress = function (allGuesses) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray){
        if (allGuesses.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    currentWord.innerText = revealWord.join("");   
    checkForWinner();
};

// to countdown remaining guesses
const guessesLeft = function(guess) {
    const wordUpper = word.toUpperCase();
    if (wordUpper.includes(guess)) {
        message.innerText = "Yes! That's a correct letter!";
    } else {
        message.innerText = "Sorry, that letter is not in the word.";
        remainingGuesses -= 1;
        console.log(remainingGuesses);
    }

    if (remainingGuesses === 0) {
        message.innerText = `Sorry, you've used all your guesses. The word was "${word}".`;
        startOver();
    } else if (remainingGuesses === 1) {
        remainingGuessesElement.innerText = 'You have 1 guess remaining!';
    } else {
        countdown.innerText = ` ${remainingGuesses} `;
    }
};

//  check if player won
const checkForWinner = function () {
    if ( word.toUpperCase() === currentWord.innerText) {
    message.classList.add ("win"); 
    message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    startOver();
    }
};

// add a play again option
const startOver = function() {
    buttonGuess.classList.add ("hide");
    remainingGuessesElement.classList.add ("hide");
    guessedLettersElement.classList.add ("hide");
    buttonPlayAgain.classList.remove ("hide");
};
// reset game when Play Again is clicked
buttonPlayAgain.addEventListener ("click", function() {
    message.classList.remove ("win");
    guessedLettersElement.innerHTML = "";
    message.innerText = "";
    remainingGuesses = 8;
    allGuesses = [];
    guessedLettersElement.classList.remove ("hide");
    remainingGuessesElement.classList.remove ("hide");
    buttonGuess.classList.remove ("hide");
    buttonPlayAgain.classList.add ("hide");
    getWord();
});