import styles from "../App.module.css";

interface IProps {
  resetGame: () => void;
}
const Header = (props: IProps) => {
  const { resetGame } = props;
  return (
    <div class={styles.Header}>
      <div class={styles.Title}>井字棋</div>
      <button onClick={resetGame}>新游戏</button>
    </div>
  );
};

export default Header;
