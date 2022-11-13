import { createEffect, createSignal } from "solid-js";

type Board = Array<string>;
const INIT_BOARD: Board = Array.from({ length: 9 }).map(() => "");

function useGame() {
  const [board, setBoard] = createSignal(INIT_BOARD);
  const [player, setPlayer] = createSignal(true);
  const handelClick = (item: string, index: number) => {
    console.log("click index and item", index, item);

    const newBoard = [...board()];
    if (item === "") {
      newBoard[index] = "-1";

      aiPlayer(newBoard, false).then((res) => {
        const nextBoard = [...board()];
        nextBoard[res] = "1";
        setBoard(nextBoard);
      });
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
  const aiPlayer = (board: Board, isMaximizing: boolean) => {
    return new Promise<number>((resolve, reject) => {
      setTimeout(() => {
        let score: number = -Infinity;
        let nextMove: number = 0;
        for (let i = 0; i < board.length; i++) {
          if (board[i] === "") {
            board[i] = "1";
            let endScore = minimax(board, false);
            console.log(endScore);

            board[i] = "";
            if (endScore > score) {
              score = endScore;
              nextMove = i;
            }
          }
        }
        console.log(nextMove);

        resolve(nextMove);
      });
    });
  };

  createEffect(() => {
    const flag = checkStatus(board());
    if (Math.abs(+flag) === 1) {
      setTimeout(() => {
        alert("You win!");
      });
    } else {
      // if (checkComplete()) {
      //   setTimeout(() => {
      //     alert("游戏结束");
      //   });
      //   return;
      // }
    }
  });
  return { board, handelClick, resetGame };
}

export default useGame;