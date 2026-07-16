const typingText = document.querySelector(".typing-text p");
const inputField = document.querySelector(".wrapper .input-field");
const mistakeTag = document.querySelector(".mistake span b");
const timeTag = document.querySelector(".time span b");
const wpmTag = document.querySelector(".wpm span b");
const cpmTag = document.querySelector(".cpm span b");
const tryAgainBtn = document.querySelector("button");

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = mistakes = isTyping = 0;

function randomParagraph () {
    let randIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[randIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag;
    })
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown",() => inputField.focus());
    typingText.addEventListener("click",() => inputField.focus());
}

function initTyping () {
    const charecters = typingText.querySelectorAll("span");
    let typedChar = inputField.value.split("")[charIndex];
    if (charIndex < charecters.length -1 && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if (typedChar == null) {
            charIndex--;
            if (charecters[charIndex].classList.contains("incorrect")) {
                mistakes--;
            }
            charecters[charIndex].classList.remove("correct","incorrect");
            } else {
                if (charecters[charIndex].innerText === typedChar) {
                    charecters[charIndex].classList.add("correct");
                } else {
            mistakes++;
            charecters[charIndex].classList.add("incorrect");
        }
        charIndex++;
    }
        charecters.forEach(span => span.classList.remove("active"));
        charecters[charIndex].classList.add("active");

        let wpm = Math.round((((charIndex - mistakes) / 5) / (maxTime - timeLeft)) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        mistakeTag.innerText = mistakes;
        cpmTag.innerText = charIndex - mistakes;
        wpmTag.innerText = wpm;
    } else {
        inputField.value = "";
        clearInterval(timer);
    }
}

function initTimer () {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft
    } else {
        clearInterval(timer);
    }
}

function resetGame () {
    randomParagraph();
    inputField.value = "";
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    timeTag.innerText = timeLeft;
    mistakeTag.innerText = mistakes;
    cpmTag.innerText = 0;
    wpmTag.innerText = 0;
}

randomParagraph();
inputField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame)