import { Accessor, createSignal, Setter } from "solid-js";
import { Board } from "../types";
import _ from "lodash";

const INIT_BOARD: Board = Array.from({ length: 9 }).map(() => "");

export default class GamePlay {
  private _board: Accessor<Board>;
  private _setBoard: Setter<Board>;

  get board() {
    return this._board();
  }

  constructor() {
    [this._board, this._setBoard] = createSignal(_.cloneDeep(INIT_BOARD), {
      equals: false,
    });
  }

  protected setBoard(board: Board) {
    this._setBoard(board);
  }
  protected checkLine(x: number, y: number, z: number) {
    const { board } = this;
    return Math.abs(+board[x] + +board[y] + +board[z]) === 3;
  }
  protected checkComplete() {
    const { board } = this;
    return board.every((i) => i !== "");
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
  private getAIPlayerNext() {
    const { board } = this;
    let baseScore = -Infinity;
    let next: number | undefined;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = "1";
        const score = this.getMinIncome(board, false);
        board[i] = "";
        if (score > baseScore) {
          baseScore = score;
          next = i;
        }
      }
    }
    return next;
  }
  private AIPlayer() {
    const next = this.getAIPlayerNext();
    if (next === undefined) return;
    this.board[next] = "1";
    this.setBoard(this.board);
  }

  public checkStatus() {
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
  public handleClick(item: string, index: number) {
    const { board } = this;
    if (item === "") {
      board[index] = "-1";
      this.setBoard(board);
      this.AIPlayer();
    }
  }
  public resetGame() {
    this.setBoard(_.cloneDeep(INIT_BOARD));
  }
}
