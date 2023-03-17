import type { Component } from "solid-js";
import { Index, createEffect, onCleanup } from "solid-js";

import styles from "./App.module.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Tile from "./components/Tile";
import GamePlay from "./composable/GamePlay";

const App: Component = () => {
  const gamePlay = new GamePlay();

  createEffect(() => {
    let id: number;
    let msg = "";
    const res = gamePlay.checkStatus();
    if (res !== "") {
      switch (res) {
        case "0":
          msg = "平局";
          break;
        case "1":
          msg = "您输了";
          break;
        case "-1":
          msg = "您赢了";
          break;
      }
      id = setTimeout(() => {
        alert(msg);
        clearTimeout(id);
      });
    }
    onCleanup(() => clearTimeout(id));
  });
  return (
    <div class={styles.App}>
      <div class={styles.Container}>

        <Header resetGame={() => gamePlay.resetGame()} />

        <div class={styles.Board}>
          <Index each={gamePlay.board}>
            {(item, index) => (
              <Tile
                item={item()}
                index={index}
                handelClick={(item, index) => gamePlay.handleClick(item, index)}
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
