import styles from "../App.module.css";
import { Match, Switch } from "solid-js";
interface IProps {
  item: number;
  index: number;
  handelClick: (item: number, index: number) => void;
}
const Tile = (props: IProps) => {
  const { item, index, handelClick } = props;
  return (
    <button class={styles.Item} onClick={() => handelClick(item, index)}>
      <Switch>
        <Match when={item === 0}>
          <span></span>
        </Match>
        <Match when={item === 1}>
          <span>X</span>
        </Match>
        <Match when={item === -1}>
          <span>O</span>
        </Match>
      </Switch>
    </button>
  );
};

export default Tile;
