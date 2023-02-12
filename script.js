// board representation
// 0 1 2
// 3 4 5
// 6 7 8

const resetBtn = document.getElementById('resetGame');
const clickSpots = document.querySelectorAll('.click_spot');
const nextPlayer = document.getElementById('playerTurn');
const PLAYERS = ['O', 'X']

let gameEnded = false;
let gameBoard = generateEmptyBoard();
let currentPlayer = PLAYERS[getRandomIntInclusive(0, 1)]

startNewGame();
resetBtn.addEventListener('click', resetGame);

function startNewGame() {
    nextPlayer.innerHTML = `Player ${currentPlayer} turn`;

    clickSpots.forEach((clickedSpot, positionPlayed) => {
        clickedSpot.addEventListener('click', () => {
            if (gameEnded) {
                alert("Press the reset button to restart the game");
                return
            }

            if (!isValidMove(gameBoard, positionPlayed, gameEnded)) return;

            makeMove(currentPlayer, positionPlayed, gameBoard, gameEnded);

            if (checkForWin(gameBoard, currentPlayer)) {
                alert(`Player '${currentPlayer}' wins!`);
                gameEnded = true;
            } else if (checkForDraw(gameBoard)) {
                alert("It's a draw");
                gameEnded = true;
            }

            currentPlayer = switchPlayerTurn(currentPlayer);
            nextPlayer.innerHTML = `Player ${currentPlayer} turn`;
        })
    })

}

function resetGame() {
    gameEnded = false;
    gameBoard = generateEmptyBoard();

    clickSpots.forEach(clickedSpot => {
        clickedSpot.innerHTML = '';
    });
}

function isValidMove(gameBoard, position, gameEnded) {
    if (gameBoard[position] == 0 && !gameEnded) return true;
    return false;
}

function makeMove(currentPlayer, position, gameBoard) {
    gameBoard[position] = currentPlayer;
    clickSpots[position].innerHTML = currentPlayer;
}

function checkForWin(gameBoard, player) {
    // Check for horizontal win
    if ((gameBoard[0] === player) && (gameBoard[1] === player) && (gameBoard[2] === player))  return true;
    else if ((gameBoard[3] === player) && (gameBoard[4] === player) && (gameBoard[5] === player)) return true;
    else if ((gameBoard[6] === player) && (gameBoard[7] === player) && (gameBoard[8] === player)) return true;

    // Check for vertical win
    if ((gameBoard[0] === player) && (gameBoard[3] === player) && (gameBoard[6] === player))  return true;
    else if ((gameBoard[1] === player) && (gameBoard[4] === player) && (gameBoard[7] === player)) return true;
    else if ((gameBoard[2] === player) && (gameBoard[5] === player) && (gameBoard[8] === player)) return true;

    // check for cross-axis win
    if ((gameBoard[0] === player) && (gameBoard[4] === player) && (gameBoard[8] === player)) return true
    if ((gameBoard[2] === player) && (gameBoard[4] === player) && (gameBoard[6] === player)) return true

    return false
}

function checkForDraw(gameBoard) {
    return !gameBoard.includes(0);
}

function generateEmptyBoard(size=9) {
    return Array.from({length: size}, (v, i) => 0);
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inc
}

function switchPlayerTurn(currentPlayer) {
    if (currentPlayer == PLAYERS[0]) return PLAYERS[1]
    else if (currentPlayer == PLAYERS[1]) return PLAYERS[0]
}