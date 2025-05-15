// Gameboard Module
const Gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;

  const setCell = (index, marker) => {
    if (board[index] === "") {
      board[index] = marker;
      return true;
    }
    return false;
  };

  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };

  return { getBoard, setCell, resetBoard };
})();

// Player Factory
const Player = (name, marker) => {
  return { name, marker };
};

// Variables for players — filled later from input
let player1, player2;

// Game Controller Module
const GameController = (() => {
  let currentPlayer;
  let gameOver = false;

  const startGame = (name1, name2) => {
    player1 = Player(name1, "X");
    player2 = Player(name2, "O");
    currentPlayer = player1;
    gameOver = false;
    Gameboard.resetBoard();
    DisplayController.render();
    DisplayController.setStatus(`${currentPlayer.name}'s turn`);
  };

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const getCurrentPlayer = () => currentPlayer;

  const playTurn = (index) => {
    if (gameOver) return;
    if (Gameboard.setCell(index, currentPlayer.marker)) {
      DisplayController.render();

      if (checkWin(currentPlayer.marker)) {
        DisplayController.setStatus(`${currentPlayer.name} wins!`);
        gameOver = true;
      } else if (checkTie()) {
        DisplayController.setStatus("It's a tie!");
        gameOver = true;
      } else {
        switchPlayer();
        DisplayController.setStatus(`${currentPlayer.name}'s turn`);
      }
    }
  };

  const checkWin = (marker) => {
    const board = Gameboard.getBoard();
    const winCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winCombos.some(combo =>
      combo.every(index => board[index] === marker)
    );
  };

  const checkTie = () => {
    return Gameboard.getBoard().every(cell => cell !== "");
  };

  const resetGame = () => {
    Gameboard.resetBoard();
    currentPlayer = player1;
    gameOver = false;
    DisplayController.setStatus(`${currentPlayer.name}'s turn`);
    DisplayController.render();
  };

  return { startGame, playTurn, resetGame, getCurrentPlayer };
})();

// Display Controller Module
const DisplayController = (() => {
  const boardElement = document.getElementById("board");
  const statusElement = document.getElementById("status");
  const restartBtn = document.getElementById("restartBtn");

  const render = () => {
    boardElement.innerHTML = "";
    const board = Gameboard.getBoard();
    board.forEach((cell, index) => {
      const cellDiv = document.createElement("div");
      cellDiv.classList.add("cell");
      cellDiv.textContent = cell;
      cellDiv.addEventListener("click", () => GameController.playTurn(index));
      boardElement.appendChild(cellDiv);
    });
  };

  const setStatus = (text) => {
    statusElement.style.display = "block"; // Show the status div
    statusElement.textContent = text;
  };

  restartBtn.addEventListener("click", () => {
    GameController.resetGame();
  });

  return { render, setStatus };
})();

// Handle start button logic
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');

startBtn.addEventListener('click', () => {
  const p1 = document.getElementById('player1').value.trim() || 'Player 1';
  const p2 = document.getElementById('player2').value.trim() || 'Player 2';

  // Hide inputs and start button, show restart
  startBtn.style.display = 'none';
  document.querySelector('.player-inputs').style.display = 'none';
  restartBtn.style.display = 'inline-block';

  // Enable board
  document.getElementById('board').classList.remove('disabled');

  // Start game
  GameController.startGame(p1, p2);
});
