import React from "react";
import styles from "./AnyQueriesButton.module.css";

export default function AnyQueriesButton() {
  const text = "ANY QUERIES • ANY QUERIES • "; // repeated to form full circle

  return (
    <button className={styles.button}>
      {/* Rotating circular text */}
      <p className={styles.text}>
        {text.split("").map((char, i) => (
          <span key={i} style={{ "--index": i }}>
            {char}
          </span>
        ))}
      </p>

      {/* Center circle with arrow */}
      <div className={styles.circle}>
        <svg
          className={styles.icon}
          width="25"
          height="25"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Paper plane / arrow */}
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>

        <svg
          className={`${styles.icon} ${styles.copy}`}
          width="25"
          height="25"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Copy / second icon for hover animation */}
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      </div>
    </button>
  );
}
