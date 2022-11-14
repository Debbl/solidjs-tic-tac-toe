import styles from "../App.module.css";
import { Match, Switch } from "solid-js";
interface IProps {
  item: string;
  index: number;
  handelClick: (item: string, index: number) => void;
}
const Tile = (props: IProps) => {
  const { handelClick, index } = props;
  const item = () => props.item;
  return (
    <button class={styles.Item} onClick={() => handelClick(item(), index)}>
      <Switch>
        <Match when={item() === ""}>
          <span></span>
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
