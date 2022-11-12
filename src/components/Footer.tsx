import styles from "../App.module.css";
import GitHubIcon from "../assets/images/github.svg";

const Footer = () => {
  return (
    <div class={styles.Footer}>
      <a href="">
        <img src={GitHubIcon} />
      </a>
    </div>
  );
};

export default Footer;
