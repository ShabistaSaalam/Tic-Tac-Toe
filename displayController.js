import Gameboard from "./gameBoard.js";

const DisplayController = (() => {
  const boardElement = document.getElementById("board");
  const statusElement = document.getElementById("status");
  const render = () => {
    boardElement.innerHTML = "";
    const board = Gameboard.getBoard();
    board.forEach(cell => {
      const cellDiv = document.createElement("div");
      cellDiv.classList.add("cell");
      cellDiv.textContent = cell;
      boardElement.appendChild(cellDiv);
    });
  };
   const clear = () => {
    boardElement.innerHTML = "";
  };
  const setStatus = (text) => {
    if (text) {
      statusElement.style.display = "block";
      statusElement.textContent = text;
    } else {
      statusElement.style.display = "none";
    }
  };
  const hideBoard = () => {
    boardElement.style.display = "none";
  };

  const showBoard = () => {
    boardElement.style.display = "grid";
  };

  return { render, setStatus, clear, hideBoard, showBoard };
})();

export default DisplayController;
