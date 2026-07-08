let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset");
let newGameBtn = document.querySelector(".new");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");
let botBtn = document.querySelector(".BOTbtn");


let turn0 = true;//decides the turn
let gameOver = false;//decide that game is over or not
let moveCount = 0;//counts every move
let nextFirst = false;//makes chance toggle on every play
let botTimeout = null;//set Timeout
let botMode = false;//switches mode between bot-human
let playerSymbol = "O";//playerturn
let botSymbol = "X";//bot turn


//every winning pattern
const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//toggles the bot-human 
let toggleBot = () => {
    botMode = !botMode;
    botBtn.innerText = "Human";
    botBtn.innerText = botMode ? "Bot" : "Human";
    turn0 = true;
    nextFirst = false;
    gameOver = false;
    moveCount = 0;
    updateSymbols();
    enableBoxes();
    msgContainer.classList.add("hide");
}

//genrate bot choices
let genBotChoice = () => {
    let emptyIndexes = [];
    boxes.forEach((box, i) => {
        if (box.innerText === "") {
            emptyIndexes.push(i);
        };
    });
    let randomIdx = Math.floor(Math.random() * emptyIndexes.length);
    return emptyIndexes[randomIdx];
};

//reset function only activates when the game is ongoing
let resetGame = () => {
    if(gameOver) {
        return;
    }; 
    
    turn0 = nextFirst;
    nextFirst = !nextFirst;
    gameOver = false;
    moveCount = 0;
    updateSymbols();
    enableBoxes();
    msgContainer.classList.remove("show");
    msgContainer.classList.add("hide");

    if (botMode && !turn0) {
        botTimeout = setTimeout(botMove, 350);
    };

};

//newgame function only activates when game is complete
let newGame = () => {
    if (!gameOver) {
        return;
    };

    clearTimeout(botTimeout);
    turn0 = nextFirst;
    nextFirst = !nextFirst;
    gameOver = false;
    moveCount = 0;
    updateSymbols();
    enableBoxes();
    msgContainer.classList.remove("show");
    msgContainer.classList.add("hide");

    if (botMode && !turn0) {
        botTimeout = setTimeout(botMove, 350);
    };
};

//makes X and O apper in the boxes
boxes.forEach((box) => {
    box.addEventListener("click",() => {
        if (botMode && !turn0) { return; };

        if (turn0) {
            box.innerText = playerSymbol;
            // box.style.color = "green";  <-- it makes o green
            turn0 = false;
        } else {
            box.innerText = botSymbol;
            // box.style.color = "red";  <-- it makes x red
            turn0 = true;
        };

        box.disabled = true;
        moveCount++;
        checkDraw();
        checkWinner();

        if (!gameOver && botMode && !turn0) {
            botTimeout = setTimeout(() => {
                if (!gameOver) {
                botMove();
                };
            },
            350);
        };
    });
});

//updates the turn
const updateSymbols = () => {
    if (turn0) {
        playerSymbol = "O";
    } else {
        playerSymbol = "X";
    };

    if (turn0) {
        botSymbol = "X";
    } else {
        botSymbol = "O";
    };
};

//shows the bot choice
const botMove = () => {
    if (gameOver) { return; };
    let idx = genBotChoice();

    if (!turn0) {
        boxes[idx].innerText = botSymbol;
        turn0 = true;
    } else {
        boxes[idx].innerText = playerSymbol;
        turn0 = false;
    };

    boxes[idx].disabled = true;
    moveCount++;
    checkDraw();
    checkWinner();
};

//it disables the boxes
const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    };
};

//enables the boxes
const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    };
};

//it show the game is draw
let showDraw = () => {
    clearTimeout(botTimeout);
    msg.innerText = "It's a Draw!";
    msgContainer.classList.remove("hide");
    msg.classList.remove("hide");
    setTimeout(() => {
        msgContainer.classList.add("show");
    }, 10);
    
    disableBoxes();
    gameOver = true; 
};

//it shows the winner
let showWinner = (winner) => {
    clearTimeout(botTimeout);
    msg.innerText = `Winner is ${winner}!`;
    msgContainer.classList.remove("hide");
    msg.classList.remove("hide");
    setTimeout(() => {
        msgContainer.classList.add("show");
    }, 10);
    
    disableBoxes();
    gameOver = true;
};

//it checks draw
const checkDraw = () => {
    if (moveCount === 9 && !gameOver) {
        showDraw();
    };
};

//it check the winner
const checkWinner = () => {
    for(let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val != "" && pos2val != "" && pos3val != "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                showWinner(pos1val);
            };
        };
    };
};

//make the newgame button work
newGameBtn.addEventListener("click", newGame);

//make the resetgame button work
resetBtn.addEventListener("click", resetGame);

//make the bot-human button work
botBtn.addEventListener("click", toggleBot);


//:)