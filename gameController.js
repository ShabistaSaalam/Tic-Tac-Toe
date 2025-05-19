import Gameboard from './gameBoard.js';
import { checkWinner, checkTie } from './gameUtils.js';

const Player = (name, marker) => ({ name, marker });

const GameController = (() => {
  let currentPlayer;
  let player1, player2;
  let gameOver = false;
  let winner = null;  // <---- Add winner tracking here

  const startGame = (name1, name2) => {
    player1 = Player(name1, "X");
    player2 = Player(name2, "O");
    currentPlayer = player1;
    gameOver = false;
    winner = null;   // Reset winner on new game
    Gameboard.resetBoard();
  };

  const getCurrentPlayer = () => currentPlayer;
  const isGameOver = () => gameOver;

  const getWinner = () => winner;  // <---- New getter method

  const playTurn = (index) => {
    if (gameOver) return false;
    if (Gameboard.setCell(index, currentPlayer.marker)) {
      const board = Gameboard.getBoard();
      const check = checkWinner(board);
      if (check === currentPlayer.marker) {
        gameOver = true;
        winner = currentPlayer;  // <---- Store the winner player object
      } else if (checkTie(board)) {
        gameOver = true;
        winner = null;   // Tie, so no winner
      } else {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
      }
      return true;
    }
    return false;
  };

  const resetGame = () => {
    Gameboard.resetBoard();
    currentPlayer = player1;
    gameOver = false;
    winner = null;
  };

  return { startGame, playTurn, resetGame, getCurrentPlayer, isGameOver, getWinner };
})();

export default GameController;
