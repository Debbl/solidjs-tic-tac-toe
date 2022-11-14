import { createEffect, createSignal, useTransition } from "solid-js";
import { Board } from "../types";

const INIT_BOARD: Board = Array.from({ length: 9 }).map(() => "");

function useGame() {
  const [board, setBoard] = createSignal(INIT_BOARD);
  const [player, setPlayer] = createSignal(true);
  const [_, start] = useTransition();
  const minimax = (board: Board, isMaximizing: boolean) => {
    let res = checkStatus(board);
    if (res != "") {
      return +res;
    }
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] == "") {
          board[i] = "1";
          let score = minimax(board, false);
          board[i] = "";
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] == "") {
          board[i] = "-1";
          let score = minimax(board, true);
          board[i] = "";
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };
  const aiPlayer = (board: Board) => {
    let score: number = -Infinity;
    let nextMove: number = 0;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = "1";
        let endScore = minimax(board, false);

        board[i] = "";
        if (endScore > score) {
          score = endScore;
          nextMove = i;
        }
      }
    }
    return nextMove;
  };
  const nextAI = (board: Board) =>
    start(() => {
      const res = aiPlayer(board);
      const nextBoard = [...board];
      nextBoard[res] = "1";
      setBoard(nextBoard);
    });
  const handelClick = (item: string, index: number) => {
    const newBoard = [...board()];
    if (item === "") {
      newBoard[index] = "-1";
      nextAI(newBoard);
      setBoard(newBoard);
      setPlayer(!player());
    }
  };
  const checkLine = (board: Board, x: number, y: number, z: number) => {
    return Math.abs(+board[x] + +board[y] + +board[z]) === 3;
  };
  const checkStatus = (board: Board) => {
    for (let i = 0; i < 9; i += 3) {
      if (checkLine(board, i, i + 1, i + 2)) return board[i];
    }
    for (let i = 0; i < 3; i++) {
      if (checkLine(board, i, i + 3, i + 6)) return board[i];
    }
    if (checkLine(board, 0, 4, 8)) return board[0];
    if (checkLine(board, 2, 4, 6)) return board[2];
    if (checkComplete(board)) return "0";

    return "";
  };
  const checkComplete = (board: Board) => {
    return board.every((i) => i !== "");
  };

  const resetGame = () => {
    setBoard(INIT_BOARD);
    setPlayer(true);
  };

  createEffect(() => {
    const flag = checkStatus(board());
    if (Math.abs(+flag) === 1) {
      setTimeout(() => {
        alert("You win!");
      });
    } else {
      if (checkComplete(board())) {
        setTimeout(() => {
          alert("游戏结束");
        });
        return;
      }
    }
  });
  return { board, handelClick, resetGame };
}

export default useGame;
