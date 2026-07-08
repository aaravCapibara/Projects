let board = document.querySelector(".board");
let scoreEl = document.querySelector(".score");
let gameOverMsg = document.querySelector(".game-over");
let resetBtn = document.querySelector(".btn button");

let FoodX;
let FoodY;
let snakeBody = [];
let SnakeX = 3;
let SnakeY = 5;
let velocityX = 0;
let velocityY = 0;
let gameOver = false;
let score = 0;
let setIntervalId;

function randomFoodPositions() {
    FoodX = Math.floor(Math.random() * 14) + 1;
    FoodY = Math.floor(Math.random() * 14) + 1;
}

function randomSnakePosition() {
    SnakeX = Math.floor(Math.random() * 10) + 3;
    SnakeY = Math.floor(Math.random() * 10) + 3;
}

function moveSnake(e) {
    if ((e.key === "ArrowUp" || e.key === "w") && velocityY !== 1) {
        velocityX = 0;
        velocityY = -1;
    } else if ((e.key === "ArrowDown" || e.key === "s") && velocityY !== -1) {
        velocityX = 0;
        velocityY = 1;
    } else if ((e.key === "ArrowLeft" || e.key === "a") && velocityX !== 1) {
        velocityX = -1;
        velocityY = 0;
    } else if ((e.key === "ArrowRight" || e.key === "d") && velocityX !== -1) {
        velocityX = 1;
        velocityY = 0;
    }
    main();
}

function showGameOver() {
    clearInterval(setIntervalId);
    document.removeEventListener("keydown", moveSnake);
    gameOverMsg.textContent = `You Lose! Score: ${score}`;
    gameOverMsg.style.display = "block";
}

function getSnakeColor(index, total) {
    let startLightness = 45;
    let endLightness = 78;
    let percent = total <= 1 ? 0 : index / (total - 1);
    let lightness = startLightness + percent * (endLightness - startLightness);
    let hue = 205 - percent * 15;
    return `hsl(${hue}, 80%, ${lightness}%)`;
}

function main() {
    if (gameOver) {
        return showGameOver();
    }
    if (SnakeX === FoodX && SnakeY === FoodY) {
        randomFoodPositions();
        snakeBody.push([FoodX, FoodY]);
        score++;
        scoreEl.textContent = `Score: ${score}`;
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    SnakeX += velocityX;
    SnakeY += velocityY;

    if (SnakeX < 1 || SnakeX > 14 || SnakeY < 1 || SnakeY > 14) {
        gameOver = true;
        return showGameOver();
    }

    snakeBody[0] = [SnakeX, SnakeY];

    let setHtml = `<div class="food" style="grid-area: ${FoodY}/${FoodX};"></div>`;
    for (let i = 0; i < snakeBody.length; i++) {
        let color = getSnakeColor(i, snakeBody.length);
        setHtml += `<div class="snake-head" style="grid-area: ${snakeBody[i][1]}/${snakeBody[i][0]}; background-color: ${color};"></div>`;
        if (i !== 0 &&
            snakeBody[0][1] === snakeBody[i][1] &&
            snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }

    if (gameOver) {
        return showGameOver();
    }

    board.innerHTML = setHtml;
}

function startGame() {
    // reset all state
    snakeBody = [];
    randomSnakePosition();
    velocityX = 0;
    velocityY = 0;
    gameOver = false;
    score = 0;
    scoreEl.textContent = `Score: ${score}`;
    gameOverMsg.style.display = "none";

    clearInterval(setIntervalId);
    randomFoodPositions();
    main();
    setIntervalId = setInterval(main, 150);

    document.removeEventListener("keydown", moveSnake);
    document.addEventListener("keydown", moveSnake);
}

resetBtn.addEventListener("click", startGame);

startGame();