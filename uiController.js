const UIController = (() => {
  const modeRadios = document.querySelectorAll('input[name="mode"]');
  const playerInputs = document.getElementById("playerInputs");
  const player2Input = document.getElementById("player2");
  const player1Input = document.getElementById("player1");
  const startBtn = document.getElementById("startBtn");

  const init = () => {
    playerInputs.style.display = "block"; // show inputs on load

    modeRadios.forEach(radio => {
      radio.addEventListener("change", () => {
        if (radio.value === "ai") {
          player2Input.style.display = "none";
          player2Input.value = "";
        } else {
          player2Input.style.display = "inline-block";
        }
        checkInputs();
      });
    });

    player1Input.addEventListener("input", checkInputs);
    player2Input.addEventListener("input", checkInputs);

    checkInputs();
  };

  const checkInputs = () => {
    const player1Val = player1Input.value.trim();
    const player2Val = player2Input.style.display === "none" ? "AI" : player2Input.value.trim();
    startBtn.disabled = !player1Val || (player2Input.style.display !== "none" && !player2Val);
  };

  const getPlayerNamesAndMode = () => {
    const mode = [...modeRadios].find(radio => radio.checked).value;
    const player1 = player1Input.value.trim();
    const player2 = mode === "ai" ? "Computer" : player2Input.value.trim();
    return { mode, player1, player2 };
  };

  return { init, getPlayerNamesAndMode };
})();

export default UIController; 