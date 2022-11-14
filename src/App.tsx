import { Component, Index } from "solid-js";

import styles from "./App.module.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Tile from "./components/Tile";
import useGame from "./utils/useGame";

const App: Component = () => {
  const { board, handelClick, resetGame } = useGame();
  return (
    <div class={styles.App}>
      <div class={styles.Container}>
        <Header resetGame={resetGame} />
        <div class={styles.Board}>
          {/* {board().map((item, index) => (
            <Tile item={item} index={index} handelClick={handelClick} />
          ))} */}
          <Index each={board()}>
            {(item, index) => (
              <Tile item={item()} index={index} handelClick={handelClick} />
            )}
          </Index>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
