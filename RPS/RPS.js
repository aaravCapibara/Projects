const choices = document.querySelectorAll(".choice");
const msg = document.querySelector(".msg");
const userScorePara = document.querySelector(".u-score");
const compScorePara = document.querySelector(".c-score");
const resetBtn = document.querySelector(".reset");

let userScore = 0;
let compScore = 0;

const reset = () => {
    userScore = 0;
    userScorePara.innerText = userScore;
    compScore = 0;
    compScorePara.innerText = compScore;
    msg.innerText = "Play your move";
    msg.style.backgroundColor = "#081b31";
    msg.style.color = "aliceblue";
};

const genCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    const randomIdx = Math.floor(Math.random() * 3);
    return options[randomIdx];
};

const drawGame = () => {
    console.log("drawGame");
    msg.innerText = "It's a Draw! Play again!";
    msg.style.backgroundColor = "#e4c308";
    msg.style.color = "#081b31";
};

const showWin = (userWin) => {
    if (userWin) {
        userScore++;
        userScorePara.innerText = userScore;
        console.log("you win!");
        msg.innerText = "you Won!";
        msg.style.backgroundColor = "#09c75f";
        msg.style.color = "#081b31";
    } else {
        compScore++;
        compScorePara.innerText = compScore;
        console.log("comp win");
        msg.innerText = "you lose!";
        msg.style.backgroundColor = "#d10f30";
        msg.style.color = "#081b31";
    };
};

const playGame = (usersChoice) => {
    console.log("usersChoice =", usersChoice);
    const compChoice = genCompChoice();
    console.log("compChoice =", compChoice);

    if (usersChoice === compChoice) {
        drawGame();
    } else {
        let userWin = true;
        if (usersChoice === "rock") {
            userWin = compChoice === "paper" ? false : true;
        } else if (usersChoice === "paper") {
            userWin = compChoice === "scissors" ? false : true;
        } else if (usersChoice === "scissors") {
            userWin = compChoice === "rock" ? false : true;
        };
        showWin(userWin);
    };
};

choices.forEach((choice) => {
    console.log(choice);
    choice.addEventListener("click", () => {
        const usersChoice = choice.getAttribute("id");
        playGame(usersChoice);
    });
});

resetBtn.addEventListener("click",reset);