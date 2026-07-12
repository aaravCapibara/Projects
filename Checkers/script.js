class RetroCheckersGame {
    constructor() {
        this.board = [];
        this.currentPlayer = 'player';
        this.selectedSquare = null;
        this.validMoves = [];
        this.gameHistory = [];
        this.difficulty = 'medium';
        this.isThinking = false;
        this.soundEnabled = true;

        this.initializeBoard();
        this.renderBoard();
        this.updateGameInfo();
        this.setupEventListeners();
    }

    initializeBoard() {
        this.board = Array(8).fill().map(() => Array(8).fill(null));

        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 8; col++) {
                if ((row + col) % 2 === 1) {
                    this.board[row][col] = { 
                        color: 'black', 
                        isKing: false,
                        player: 'bot'
                    };
                }
            }
        }

        for (let row = 5; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                if ((row + col) % 2 === 1) {
                    this.board[row][col] = { 
                        color: 'red', 
                        isKing: false,
                        player: 'player'
                    };
                }
            }
        }
    }

    renderBoard() {
        const gameBoard = document.getElementById('gameBoard');
        gameBoard.innerHTML = '';

        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const square = document.createElement('div');
                square.className = `square ${(row + col) % 2 === 0 ? 'light' : 'dark'}`;
                square.dataset.row = row;
                square.dataset.col = col;

                if (this.validMoves.some(move => move.row === row && move.col === col)) {
                    square.classList.add('valid-move');
                }

                if (this.selectedSquare && 
                    this.selectedSquare.row === row && 
                    this.selectedSquare.col === col) {
                    square.classList.add('selected');
                }

                const piece = this.board[row][col];
                if (piece) {
                    const pieceElement = document.createElement('div');
                    pieceElement.className = `piece ${piece.color} ${piece.isKing ? 'king' : ''}`;
                    square.appendChild(pieceElement);
                }

                square.addEventListener('click', () => this.handleSquareClick(row, col));
                gameBoard.appendChild(square);
            }
        }
    }

    setupEventListeners() {
        document.getElementById('difficultySelect').addEventListener('change', (e) => {
            this.difficulty = e.target.value;
            this.playSound('click');
        });
    }

    handleSquareClick(row, col) {
        if (this.isThinking || this.currentPlayer !== 'player') {
            return;
        }

        const piece = this.board[row][col];
        
        if (this.selectedSquare) {
            const validMove = this.validMoves.find(move => 
                move.row === row && move.col === col
            );
            
            if (validMove) {
                this.makeMove(this.selectedSquare, { row, col }, validMove.captures);
                this.clearSelection();
                this.switchPlayer();
                this.playSound('move');
            } else {
                this.selectPiece(row, col, piece);
            }
        } else {
            this.selectPiece(row, col, piece);
        }

        this.renderBoard();
        this.updateGameInfo();
    }

    selectPiece(row, col, piece) {
        if (piece && piece.player === 'player') {
            this.selectedSquare = { row, col };
            this.validMoves = this.getValidMoves(row, col, piece);
            this.playSound('select');
            
            if (this.validMoves.length === 0) {
                document.getElementById('gameStatus').textContent = 
                    'This piece cannot move';
            } else {
                document.getElementById('gameStatus').textContent = 
                    `${this.validMoves.length} moves available`;
            }
        } else {
            this.clearSelection();
        }
    }

    clearSelection() {
        this.selectedSquare = null;
        this.validMoves = [];
        document.getElementById('gameStatus').textContent = 
            'Select a piece to move';
    }

    getValidMoves(row, col, piece) {
        const moves = [];
        
        const directions = piece.isKing ? 
            [[-1, -1], [-1, 1], [1, -1], [1, 1]] : 
            piece.color === 'red' ? [[-1, -1], [-1, 1]] : [[1, -1], [1, 1]];

        for (const [deltaRow, deltaCol] of directions) {
            const newRow = row + deltaRow;
            const newCol = col + deltaCol;
            
            if (this.isValidPosition(newRow, newCol) && !this.board[newRow][newCol]) {
                moves.push({ row: newRow, col: newCol, captures: [] });
            }

            const captureRow = row + deltaRow * 2;
            const captureCol = col + deltaCol * 2;
            
            if (this.isValidPosition(captureRow, captureCol) && 
                !this.board[captureRow][captureCol] &&
                this.board[newRow][newCol] &&
                this.board[newRow][newCol].player !== piece.player) {
                
                const captures = [{ row: newRow, col: newCol }];
                moves.push({ row: captureRow, col: captureCol, captures });
                
                const multiCaptures = this.getMultipleCaptures(
                    captureRow, captureCol, piece, captures
                );
                moves.push(...multiCaptures);
            }
        }

        return moves;
    }

    getMultipleCaptures(row, col, piece, existingCaptures) {
        const moves = [];
        const directions = piece.isKing ? 
            [[-1, -1], [-1, 1], [1, -1], [1, 1]] :
            piece.color === 'red' ? [[-1, -1], [-1, 1]] : [[1, -1], [1, 1]];

        for (const [deltaRow, deltaCol] of directions) {
            const captureRow = row + deltaRow * 2;
            const captureCol = col + deltaCol * 2;
            const middleRow = row + deltaRow;
            const middleCol = col + deltaCol;
            
            if (this.isValidPosition(captureRow, captureCol) && 
                !this.board[captureRow][captureCol] &&
                this.board[middleRow][middleCol] &&
                this.board[middleRow][middleCol].player !== piece.player &&
                !existingCaptures.some(cap => 
                    cap.row === middleRow && cap.col === middleCol)) {
                
                const newCaptures = [...existingCaptures, { row: middleRow, col: middleCol }];
                moves.push({ row: captureRow, col: captureCol, captures: newCaptures });
                
                const furtherCaptures = this.getMultipleCaptures(
                    captureRow, captureCol, piece, newCaptures
                );
                moves.push(...furtherCaptures);
            }
        }

        return moves;
    }

    isValidPosition(row, col) {
        return row >= 0 && row < 8 && col >= 0 && col < 8;
    }

    makeMove(from, to, captures) {
        this.gameHistory.push(JSON.parse(JSON.stringify(this.board)));

        const piece = this.board[from.row][from.col];
        this.board[to.row][to.col] = piece;
        this.board[from.row][from.col] = null;

        captures.forEach(capture => {
            this.board[capture.row][capture.col] = null;
        });

        if ((piece.color === 'red' && to.row === 0) || 
            (piece.color === 'black' && to.row === 7)) {
            piece.isKing = true;
            this.playSound('king');
        }

        document.getElementById('undoBtn').disabled = false;
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'player' ? 'bot' : 'player';
        
        if (this.currentPlayer === 'bot') {
            setTimeout(() => this.makeBotMove(), 1000 + Math.random() * 1000);
        }
    }

    makeBotMove() {
        this.isThinking = true;
        document.getElementById('gameStatus').innerHTML = 
            '<span class="thinking-indicator"> Bot is thinking...</span>';
        
        setTimeout(() => {
            const move = this.getBestBotMove();
            if (move) {
                this.makeMove(move.from, move.to, move.captures);
                this.switchPlayer();
                this.playSound('move');
            } else {
                this.endGame('YOU WON!', 'Bot has no valid moves left!');
            }
            
            this.isThinking = false;
            this.renderBoard();
            this.updateGameInfo();
            this.checkGameOver();
        }, 800 + Math.random() * 1200);
    }

    getBestBotMove() {
        const allMoves = this.getAllValidMovesForPlayer('bot');
        if (allMoves.length === 0) return null;

        switch (this.difficulty) {
            case 'easy':
                return this.getRandomMove(allMoves);
            
            case 'medium':
                return this.getMediumMove(allMoves);
            
            case 'hard':
                return this.getHardMove(allMoves);
            
            default:
                return this.getRandomMove(allMoves);
        }
    }

    getRandomMove(moves) {
        return moves[Math.floor(Math.random() * moves.length)];
    }

    getMediumMove(moves) {
        const captureMoves = moves.filter(move => move.captures.length > 0);
        if (captureMoves.length > 0) {
            return captureMoves[Math.floor(Math.random() * captureMoves.length)];
        }

        const advanceMoves = moves.filter(move => move.to.row > move.from.row);
        if (advanceMoves.length > 0) {
            return advanceMoves[Math.floor(Math.random() * advanceMoves.length)];
        }

        return this.getRandomMove(moves);
    }

    getHardMove(moves) {
        let bestMove = null;
        let bestScore = -Infinity;

        for (const move of moves) {
            let score = 0;
            
            score += move.captures.length * 50;
            
            if (move.captures.length > 1) {
                score += move.captures.length * 20;
            }
            
            const piece = this.board[move.from.row][move.from.col];
            if (piece.isKing) {
                score += 15;
            }
            
            if (!piece.isKing && move.to.row === 7) {
                score += 30;
            }
            
            const centerDistance = Math.abs(move.to.row - 3.5) + Math.abs(move.to.col - 3.5);
            score += (7 - centerDistance) * 2;
            
            if (move.to.row > move.from.row) {
                score += 10;
            }
            
            if (move.to.col === 0 || move.to.col === 7) {
                score -= 5;
            }

            if (score > bestScore) {
                bestScore = score;
                bestMove = move;
            }
        }

        return bestMove || this.getRandomMove(moves);
    }

    getAllValidMovesForPlayer(player) {
        const moves = [];
        
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = this.board[row][col];
                if (piece && piece.player === player) {
                    const pieceMoves = this.getValidMoves(row, col, piece);
                    pieceMoves.forEach(move => {
                        moves.push({
                            from: { row, col },
                            to: { row: move.row, col: move.col },
                            captures: move.captures
                        });
                    });
                }
            }
        }
        
        return moves;
    }

    updateGameInfo() {
        const playerPieces = this.countPieces('player');
        const botPieces = this.countPieces('bot');
        
        document.getElementById('playerScore').textContent = playerPieces;
        document.getElementById('botScore').textContent = botPieces;
        
        const turnText = this.currentPlayer === 'player' ? 
            '🔴 TURN: PLAYER' : '⚫ TURN: BOT';
        document.getElementById('currentTurn').textContent = turnText;
        
        if (!this.isThinking && this.currentPlayer === 'player') {
            document.getElementById('gameStatus').textContent = 'Select a piece to move';
        }
    }

    countPieces(player) {
        let count = 0;
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                if (this.board[row][col] && this.board[row][col].player === player) {
                    count++;
                }
            }
        }
        return count;
    }

    checkGameOver() {
        const playerPieces = this.countPieces('player');
        const botPieces = this.countPieces('bot');
        const playerMoves = this.getAllValidMovesForPlayer('player');
        const botMoves = this.getAllValidMovesForPlayer('bot');

        if (playerPieces === 0) {
            this.endGame('BOT WON!', 'All your pieces have been captured!');
        } else if (botPieces === 0) {
            this.endGame('YOU WON!', 'All bot pieces have been captured!');
        } else if (this.currentPlayer === 'player' && playerMoves.length === 0) {
            this.endGame('BOT WON!', 'You have no valid moves left!');
        } else if (this.currentPlayer === 'bot' && botMoves.length === 0) {
            this.endGame('YOU WON!', 'Bot has no valid moves left!');
        }
    }

    endGame(title, message) {
        document.getElementById('gameOverTitle').textContent = title;
        document.getElementById('gameOverMessage').textContent = message;
        document.getElementById('gameOverModal').style.display = 'flex';
        
        if (title.includes('YOU WON')) {
            this.playSound('win');
        } else {
            this.playSound('lose');
        }
    }

    playSound(type) {
        if (!this.soundEnabled) return;

        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            let frequency, duration, waveType;
            
            switch (type) {
                case 'move':
                    frequency = 440;
                    duration = 0.1;
                    waveType = 'square';
                    break;
                case 'select':
                    frequency = 660;
                    duration = 0.05;
                    waveType = 'sine';
                    break;
                case 'capture':
                    frequency = 220;
                    duration = 0.2;
                    waveType = 'sawtooth';
                    break;
                case 'king':
                    frequency = 880;
                    duration = 0.3;
                    waveType = 'triangle';
                    break;
                case 'win':
                    this.playMelody(audioContext, [523, 659, 784, 1047], 0.2);
                    return;
                case 'lose':
                    this.playMelody(audioContext, [392, 330, 262, 196], 0.3);
                    return;
                case 'click':
                    frequency = 800;
                    duration = 0.03;
                    waveType = 'square';
                    break;
                default:
                    return;
            }

            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.type = waveType;
            oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration);
        } catch (error) {
            console.log('Audio not supported in this browser');
        }
    }

    playMelody(audioContext, frequencies, noteDuration) {
        frequencies.forEach((freq, index) => {
            setTimeout(() => {
                try {
                    const oscillator = audioContext.createOscillator();
                    const gainNode = audioContext.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(audioContext.destination);
                    
                    oscillator.type = 'square';
                    oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
                    
                    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + noteDuration);
                    
                    oscillator.start(audioContext.currentTime);
                    oscillator.stop(audioContext.currentTime + noteDuration);
                } catch (error) {
                    console.log('Audio not supported in this browser');
                }
            }, index * noteDuration * 1000);
        });
    }
}

let game;

function startNewGame() {
    game = new RetroCheckersGame();
    document.getElementById('undoBtn').disabled = true;
    closeGameOverModal();
    if (game.soundEnabled) {
        game.playSound('click');
    }
}

function undoLastMove() {
    if (game && game.gameHistory.length > 0) {
        game.board = game.gameHistory.pop();
        game.currentPlayer = 'player';
        game.clearSelection();
        game.renderBoard();
        game.updateGameInfo();
        game.playSound('click');
        
        if (game.gameHistory.length === 0) {
            document.getElementById('undoBtn').disabled = true;
        }
    }
}

function toggleSound() {
    if (game) {
        game.soundEnabled = !game.soundEnabled;
        const soundBtn = document.getElementById('soundBtn');
        soundBtn.textContent = game.soundEnabled ? '🔊 SOUND: ON' : '🔇 SOUND: OFF';
        if (game.soundEnabled) {
            game.playSound('click');
        }
    }
}

function closeGameOverModal() {
    document.getElementById('gameOverModal').style.display = 'none';
}

window.addEventListener('load', () => {
    startNewGame();
});

document.addEventListener('keydown', (e) => {
    switch(e.key.toLowerCase()) {
        case 'n':
            startNewGame();
            break;
        case 'u':
            undoLastMove();
            break;
        case 's':
            toggleSound();
            break;
        case 'escape':
            closeGameOverModal();
            break;
        case 'h':
            console.log('Keyboard Shortcuts:\nN - New Game\nU - Undo\nS - Sound Toggle\nESC - Close Modal');
            break;
    }
});

document.addEventListener('contextmenu', (e) => {
    if (e.target.closest('.game-board')) {
        e.preventDefault();
    }
});

window.addEventListener('resize', () => {
    if (game) {
        setTimeout(() => {
            game.renderBoard();
        }, 100);
    }
});

function debugGame() {
    if (game) {
        console.log('=== GAME DEBUG INFO ===');
        console.log('Current Player:', game.currentPlayer);
        console.log('Selected Square:', game.selectedSquare);
        console.log('Valid Moves:', game.validMoves);
        console.log('Player Pieces:', game.countPieces('player'));
        console.log('Bot Pieces:', game.countPieces('bot'));
        console.log('Difficulty:', game.difficulty);
        console.log('Sound Enabled:', game.soundEnabled);
        console.log('Board State:', game.board);
    }
}

function exportGameState() {
    if (game) {
        const gameState = {
            board: game.board,
            currentPlayer: game.currentPlayer,
            difficulty: game.difficulty,
            gameHistory: game.gameHistory
        };
        return JSON.stringify(gameState);
    }
    return null;
}

function importGameState(gameStateString) {
    try {
        const gameState = JSON.parse(gameStateString);
        if (game) {
            game.board = gameState.board;
            game.currentPlayer = gameState.currentPlayer;
            game.difficulty = gameState.difficulty;
            game.gameHistory = gameState.gameHistory;
            game.clearSelection();
            game.renderBoard();
            game.updateGameInfo();
            document.getElementById('difficultySelect').value = game.difficulty;
        }
    } catch (error) {
        console.error('Invalid game state format');
    }
}

window.debugGame = debugGame;
window.exportGameState = exportGameState;
window.importGameState = importGameState;