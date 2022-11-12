import styles from "../App.module.css";
import GitHubIcon from "../assets/images/github.svg";

const Footer = () => {
  return (
    <div class={styles.Footer}>
      <a
        href="https://github.com/Debbl/solidjs-tic-tac-toe"
        target="_blank"
        rel="noreferrer"
      >
        <img src={GitHubIcon} />
      </a>
    </div>
  );
};

export default Footer;
