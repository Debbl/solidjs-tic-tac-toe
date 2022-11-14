import { Component, createEffect, createSignal, Index } from "solid-js";

import styles from "./App.module.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Tile from "./components/Tile";
import { INIT_BOARD } from "./constants";
import Game from "./utils/Game";
import useGame from "./utils/useGame";

const App: Component = () => {
  // const { board, handelClick, resetGame } = useGame();
  const [board, setBoard] = createSignal(INIT_BOARD, { equals: false });
  const game = new Game(board());
  game.on("update", setBoard);
  createEffect(() => {
    console.log(board());
    const res = game.checkStatus();
    if (res != "") {
      alert("游戏结束！");
    }
  });
  return (
    <div class={styles.App}>
      <div class={styles.Container}>
        <Header resetGame={game.resetGame} />
        <div class={styles.Board}>
          {/* {board().map((item, index) => (
            <Tile item={item} index={index} handelClick={handelClick} />
          ))} */}
          <Index each={board()}>
            {(item, index) => (
              <Tile
                item={item()}
                index={index}
                handelClick={game.handleClick}
              />
            )}
          </Index>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
