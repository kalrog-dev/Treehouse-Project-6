// Variables
const qwerty = document.getElementById("qwerty");
const phrase = document.getElementById("phrase");
const btnReset = document.querySelector(".btn__reset");
const images = document.querySelectorAll("#scoreboard img");
let missed = 0;
let phraseArray;
const phrases = [
    "Be the change that you wish to see in the world",
    "A friend is someone who knows all about you and still loves you",
    "It is better to be hated for what you are than to be loved for what you are not",
    "Life is what happens to us while we are making other plans",
    "The man who does not read has no advantage over the man who cannot read",
    "It is never too late to be what you might have been"
];

// Hide overlay
btnReset.addEventListener("click", (e) => {
    const overlay = document.getElementById("overlay");
    overlay.style.display = "none";
    btnReset.textContent = "Reset game";
    phraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArray);
});

// Choose a random phrase and split it
function getRandomPhraseAsArray(arr) {
    const random = Math.floor(Math.random() * arr.length);    // For 6 phrases => number 0-5
    const chars = arr[random].split("");                      // Get an array of characters
    return(chars);
}

// Add characters inside of list items
function addPhraseToDisplay(arr) {
    for (let i = 0; i < arr.length; i++) {
        const li = document.createElement("li");
        li.textContent = arr[i].toUpperCase();
        phrase.firstElementChild.appendChild(li);
        if (li.textContent !== " ") {
            li.className = "letter";
        } else {
            li.className = "space";
        }
    }
}

// Compare characters to player's choice
function checkLetter(button) {
    const li = document.querySelectorAll("li.letter");
    let match = "null";
    for (let i = 0; i < li.length; i++) {
        if (button === li[i].textContent) {
            li[i].classList.add("show");
            match = button;
        }
    }
    return match;
}

// Player's selection
qwerty.addEventListener("click", (e) => {
    let letterFound;
    if (e.target.tagName !== "BUTTON" || e.target.className === "chosen") {
        return;
    } else {
        e.target.classList.add("chosen");
        letterFound = checkLetter(e.target.textContent.toUpperCase());
        if (letterFound === "null") {
            missed++;
            console.log(images);
            if (missed <= 5) {
                images[5 - missed].src = "images/lostHeart.png";
            }        
        }
    }
    checkWin();
});

// Check win and loss conditions
function checkWin() {
    const overlay = document.getElementById("overlay");
    let letter = document.querySelectorAll(".letter");
    let show = document.querySelectorAll(".show");
    if (letter.length === show.length) {
        overlay.classList.add("win");
        overlay.classList.remove("lose");
        overlay.firstElementChild.textContent = "You won!";
        overlay.style.display = "flex";
        reset();
    } else if (missed > 4) {
        overlay.classList.add("lose");
        overlay.classList.remove("win");
        overlay.firstElementChild.textContent = "You lost!";
        overlay.style.display = "flex";
        reset();
    }
}

// Reset the game
function reset() {
    for (let i = 0; i < images.length; i++) {
        images[i].src = "images/liveHeart.png";
    }
    const li = document.querySelectorAll("#phrase li");
    for (let i = 0; i < li.length; i++) {
        li[i].remove();
    }
    const chosen = document.querySelectorAll("#qwerty .chosen");
    for (let i = 0; i < chosen.length; i++) {
        chosen[i].classList.remove("chosen");
    }
    missed = 0;
}