import { Match, Switch } from "solid-js";
import styles from "../App.module.css";

interface IProps {
  item: string;
  index: number;
  handelClick: (item: string, index: number) => void;
}
const Tile = (props: IProps) => {
  const item = () => props.item;

  return (
    <button class={styles.Item} onClick={() => props.handelClick(item(), props.index)}>
      <Switch>
        <Match when={item() === ""}>
          <span />
        </Match>
        <Match when={item() === "1"}>
          <span>X</span>
        </Match>
        <Match when={item() === "-1"}>
          <span>O</span>
        </Match>
      </Switch>
    </button>
  );
};

export default Tile;
