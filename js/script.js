const wordText = document.querySelector(".word");
const hintText = document.querySelector(".hint span");
const refreshBtn = document.querySelector(".refresh-word");
const checkBtn = document.querySelector(".check-word");
const inputField = document.querySelector("input");
const timeText = document.querySelector(".time b");
const highscoreText = document.querySelector(".status .highscore b");
const correctText = document.querySelector(".status .correct b");
const wrongText = document.querySelector(".status .wrong b");

highscoreText.innerHTML = (localStorage.getItem("wordscramble-highscore") || 0);
correctText.innerHTML = (localStorage.getItem("wordscramble-correct") || 0);
wrongText.innerHTML = (localStorage.getItem("wordscramble-wrong") || 0);

let correctWord, timer;

const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if (maxTime > 0) {
            maxTime--;
            return timeText.innerHTML = maxTime;
        }
        clearInterval(timer);
        initGame();
    }, 1000);
}

const initGame = () => {
    initTimer(30);
    let randomWord = words[Math.floor(Math.random() * words.length)];
    correctWord = randomWord.word.toLocaleLowerCase();
    let letters = randomWord.word.split("");
    for (let i = letters.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * i);
        [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
    wordText.innerHTML = letters.join("");
    hintText.innerHTML = randomWord.hint;
}

initGame();

const checkWord = () => {
    let userInput = inputField.value.toLocaleLowerCase();

    let highscore = Number.parseInt(localStorage.getItem("wordscramble-highscore") || "0");
    let correct = Number.parseInt(localStorage.getItem("wordscramble-correct") || "0");
    let wrong = Number.parseInt(localStorage.getItem("wordscramble-wrong") || "0");
    let timeTaken = Number.parseInt(timeText.innerHTML);

    if (userInput === correctWord) {
        correct = correct + 1;
        localStorage.setItem("wordscramble-correct", correct);
        correctText.innerHTML = localStorage.getItem("wordscramble-correct");

        localStorage.setItem("wordscramble-highscore", Math.round(((highscore + (30 - timeTaken)) / (correct)) * 10) / 10)
        highscoreText.innerHTML = localStorage.getItem("wordscramble-highscore");

        initGame();
    } else {
        wrong = wrong + 1;
        localStorage.setItem("wordscramble-wrong", wrong);
        wrongText.innerHTML = localStorage.getItem("wordscramble-wrong");
    }
}

inputField.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        checkWord();
    }
});
refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);