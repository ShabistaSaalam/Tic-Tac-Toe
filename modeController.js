import GameController from "./gameController.js";
import AI from "./ai.js";
import Gameboard from "./gameBoard.js";
import DisplayController from "./displayController.js";

const ModeController = (() => {
  let aiMode = false;

  const startGame = (name1, name2, isAI) => {
    aiMode = isAI;
    GameController.startGame(name1, name2);
    DisplayController.render();
    DisplayController.setStatus(`${GameController.getCurrentPlayer().name}'s turn`);
    
    // Enable board in case it was disabled before
    const boardElement = document.getElementById("board");
    if (boardElement.classList.contains("disabled")) {
      boardElement.classList.remove("disabled");
    }
  };

  const playTurn = (index) => {
    if (GameController.isGameOver()) return;

    const movePlayed = GameController.playTurn(index);
    if (!movePlayed) return;

    DisplayController.render();

    if (GameController.isGameOver()) {
      handleGameOver();
      return;
    }

    if (aiMode) {
      // AI plays after slight delay for better UX
      setTimeout(() => {
        const board = Gameboard.getBoard();
        const aiMove = AI.bestMove(board);

        GameController.playTurn(aiMove);
        DisplayController.render();

        if (GameController.isGameOver()) {
          handleGameOver();
        } else {
          DisplayController.setStatus(`${GameController.getCurrentPlayer().name}'s turn`);
        }
      }, 300);
    } else {
      // Human vs Human, just update status
      DisplayController.setStatus(`${GameController.getCurrentPlayer().name}'s turn`);
    }
  };

 const handleGameOver = () => {
  const boardElement = document.getElementById("board");
  boardElement.classList.add("disabled");

  const board = Gameboard.getBoard();
  const winner = GameController.getWinner();

  if (!board.includes("") && !winner) {
    DisplayController.setStatus("It's a tie!");
  } else if (winner) {
    DisplayController.setStatus(`${winner.name} wins!`);
  } else {
    DisplayController.setStatus("Game Over");
  }
};


  return { startGame, playTurn };
})();

export default ModeController;
