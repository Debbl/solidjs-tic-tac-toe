import { Setter, useTransition } from "solid-js";
import { Board } from "../types";
import EventBus from "./EventBus";

const INIT_BOARD: Board = Array.from({ length: 9 }).map(() => "");

const [_, start] = useTransition();

type Events = { update: Board };
class Game extends EventBus<Events> {
  board: Board;
  constructor(board: Board) {
    super();
    this.board = board;
  }
  protected setBoard(board: Board) {
    const newBoard = [...board];
    this.board = newBoard;
    this.emit("update", newBoard);
  }
  protected getMinIncome(board: Board, isAI: boolean) {
    const res = this.checkStatus();

    if (res != "") {
      return +res;
    }
    if (isAI) {
      let baseScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
          board[i] = "1";
          const score = this.getMinIncome(board, false);
          board[i] = "";
          baseScore = Math.max(score, baseScore);
        }
      }
      return baseScore;
    } else {
      let baseScore = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
          board[i] = "-1";
          const score = this.getMinIncome(board, true);
          board[i] = "";
          baseScore = Math.min(score, baseScore);
        }
      }
      return baseScore;
    }
  }
  protected checkLine(x: number, y: number, z: number) {
    const { board } = this;
    return Math.abs(+board[x] + +board[y] + +board[z]) === 3;
  }
  protected checkStatus() {
    for (let i = 0; i < 9; i += 3) {
      if (this.checkLine(i, i + 1, i + 2)) return this.board[i];
    }
    for (let i = 0; i < 3; i++) {
      if (this.checkLine(i, i + 3, i + 6)) return this.board[i];
    }
    if (this.checkLine(0, 4, 8)) return this.board[0];
    if (this.checkLine(2, 4, 6)) return this.board[2];

    if (this.checkComplete()) return "0";
    return "";
  }
  protected checkComplete() {
    const { board } = this;
    return board.every((i) => i !== "");
  }
  getAIPlayerNext() {
    const { board } = this;
    let baseScore = -Infinity;
    let next: number = 0;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = "1";
        const score = this.getMinIncome(board, false);
        console.log("score", score);
        board[i] = "";
        if (score > baseScore) {
          baseScore = score;
          next = i;
        }
      }
    }
    return next;
  }
  AIPlayer = () =>
    start(() => {
      const next = this.getAIPlayerNext();
      console.log(next);
      this.board[next] = "1";
      this.setBoard(this.board);
    });
  handleClick = (item: string, index: number) => {
    const { board } = this;
    if (item === "") {
      board[index] = "-1";
      this.AIPlayer();
      this.setBoard(board);
    }
  };
  resetGame = () => {
    this.setBoard(INIT_BOARD);
  };
}

export default Game;
