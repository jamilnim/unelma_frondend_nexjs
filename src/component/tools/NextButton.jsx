import React from "react";
import styles from "./NextButton.module.css";

const NextButton = ({ text = ">>", onClick }) => {
  return (
    <button className={styles.nextBtn} onClick={onClick}>
      {text} <span className={styles.arrow}></span>
    </button>
  );
};

export default NextButton;
