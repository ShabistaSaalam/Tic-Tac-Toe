import { checkWinner } from "./gameUtils.js";

const AI = (() => {
  const scores = { O: 10, X: -10, tie: 0 };

  // Check for immediate win/block moves
  const findImmediateMove = (board, marker) => {
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = marker;
        if (checkWinner(board) === marker) {
          board[i] = "";
          return i;
        }
        board[i] = "";
      }
    }
    return -1;
  };

  const bestMove = (board) => {
    // Try to win immediately
    let move = findImmediateMove(board, "O");
    if (move !== -1) return move;

    // Block opponent's immediate win
    move = findImmediateMove(board, "X");
    if (move !== -1) return move;

    // Otherwise use minimax
    let bestScore = -Infinity;
    let bestMove = -1;

    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = "O";
        let score = minimax(board, 0, false);
        board[i] = "";
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    return bestMove;
  };

  const minimax = (board, depth, isMaximizing) => {
    const winner = checkWinner(board);
    if (winner !== null) {
      if (winner === "tie") return 0;
      // Score adjusted by depth to prioritize quicker wins and delayed losses
      return (scores[winner] || 0) - depth * (winner === "O" ? 1 : -1);
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
          board[i] = "O";
          let score = minimax(board, depth + 1, false);
          board[i] = "";
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
          board[i] = "X";
          let score = minimax(board, depth + 1, true);
          board[i] = "";
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  return { bestMove };
})();

export default AI;
