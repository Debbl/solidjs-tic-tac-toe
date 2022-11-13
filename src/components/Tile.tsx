import styles from "../App.module.css";
import { Match, Switch } from "solid-js";
interface IProps {
  item: string;
  index: number;
  handelClick: (item: string, index: number) => void;
}
const Tile = (props: IProps) => {
  const { item, index, handelClick } = props;
  return (
    <button
      class={styles.Item}
      onClick={(e) => {
        handelClick(item, index);

        console.log(e.target, index, item);
      }}
    >
      <Switch>
        <Match when={item === ""}>
          <span></span>
        </Match>
        <Match when={item === "1"}>
          <span>X</span>
        </Match>
        <Match when={item === "-1"}>
          <span>O</span>
        </Match>
      </Switch>
    </button>
  );
};

export default Tile;
