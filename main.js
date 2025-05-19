import ModeController from "./modeController.js";
import DisplayController from "./displayController.js";

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const boardElement = document.getElementById("board");

const modeRadios = document.querySelectorAll('input[name="mode"]');
const player1Input = document.getElementById("player1");
const player2Input = document.getElementById("player2");
const confirmModeBtn = document.getElementById("confirmModeBtn");
const playerInputsDiv = document.querySelector(".player-inputs");

function togglePlayer2Input() {
  const mode = document.querySelector('input[name="mode"]:checked')?.value;
  if (mode === "ai") {
    player2Input.style.display = "none";
    player2Input.value = "";
  } else {
    player2Input.style.display = "inline-block";
  }
}

function checkStartButton() {
  startBtn.disabled = player1Input.value.trim() === "";
}

playerInputsDiv.style.display = "none";
startBtn.style.display = "none";
restartBtn.style.display = "none";
document.getElementById("mode-selection").style.display = "block";
confirmModeBtn.style.display = "inline-block";

togglePlayer2Input();
checkStartButton();

modeRadios.forEach(radio => {
  radio.addEventListener("change", () => {
    togglePlayer2Input();
    checkStartButton();
  });
});

confirmModeBtn.addEventListener("click", () => {
  const modeSelected = document.querySelector('input[name="mode"]:checked');
  if (!modeSelected) {
    alert("Please select a game mode before continuing.");
    return;
  }

  document.getElementById("mode-selection").style.display = "none";
  confirmModeBtn.style.display = "none";

  playerInputsDiv.style.display = "block";
  startBtn.style.display = "inline-block";

  togglePlayer2Input();
  checkStartButton();
});

player1Input.addEventListener("input", checkStartButton);

startBtn.addEventListener("click", () => {
  const p1 = player1Input.value.trim() || "Player 1";
  const mode = document.querySelector('input[name="mode"]:checked')?.value;
  const p2 = mode === "ai" ? "Computer" : (player2Input.value.trim() || "Player 2");

  startBtn.style.display = "none";
  playerInputsDiv.style.display = "none";
  restartBtn.style.display = "inline-block";
  boardElement.classList.remove("disabled");

  ModeController.startGame(p1, p2, mode === "ai");
  DisplayController.clear();          // Clear any previous board
  DisplayController.render();         // Render new board
  DisplayController.setStatus(`${p1}'s turn`);
  DisplayController.showBoard();      // Show board only now
  boardElement.classList.remove("disabled");
});

boardElement.addEventListener("click", (e) => {
  if (!e.target.classList.contains("cell")) return;
  if (boardElement.classList.contains("disabled")) return;

  const cells = Array.from(boardElement.children);
  const index = cells.indexOf(e.target);
  ModeController.playTurn(index);
});

restartBtn.addEventListener("click", () => {
  startBtn.style.display = "none";
  playerInputsDiv.style.display = "none";
  restartBtn.style.display = "none";
  boardElement.classList.add("disabled");
  DisplayController.setStatus("");
  DisplayController.clear();              // Clear old board
  DisplayController.hideBoard();    

  document.getElementById("mode-selection").style.display = "block";
  confirmModeBtn.style.display = "inline-block";

  player1Input.value = "";
  player2Input.value = "";
  modeRadios.forEach(radio => radio.checked = false);

  togglePlayer2Input();
  checkStartButton();
});
