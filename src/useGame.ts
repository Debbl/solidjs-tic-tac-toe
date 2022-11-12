import { createEffect, createSignal } from "solid-js";

const INIT_BOARD = Array.from({ length: 9 }).map(() => 0);

function useGame() {
  const [board, setBoard] = createSignal(INIT_BOARD);
  const [player, setPlayer] = createSignal(true);
  const handelClick = (item: number, index: number) => {
    const newBoard = [...board()];
    if (item === 0) {
      const _item = player() ? 1 : -1;
      newBoard[index] = _item;
      setBoard(newBoard);
      setPlayer(!player());
    }
  };
  const checkLine = (x: number, y: number, z: number) => {
    const boardValue = board();
    return Math.abs(boardValue[x] + boardValue[y] + boardValue[z]) === 3;
  };
  const checkStatus = (board: number[]) => {
    for (let i = 0; i < 9; i += 3) {
      if (checkLine(i, i + 1, i + 2)) return board[i];
    }
    for (let i = 0; i < 3; i++) {
      if (checkLine(i, i + 3, i + 6)) return board[i];
    }
    if (checkLine(0, 4, 8)) return board[0];
    if (checkLine(2, 4, 6)) return board[2];

    if (checkComplete()) {
      setTimeout(() => {
        alert("游戏结束");
      });
    }
    return 0;
  };
  const checkComplete = () => {
    return board().every((i) => i !== 0);
  };

  const resetGame = () => {
    setBoard(INIT_BOARD);
    setPlayer(true);
  };

  createEffect(() => {
    const flag = checkStatus(board());
    if (Math.abs(flag) === 1) {
      setTimeout(() => {
        alert("You win!");
      });
    }
  });
  return { board, handelClick, resetGame };
}

export default useGame;
