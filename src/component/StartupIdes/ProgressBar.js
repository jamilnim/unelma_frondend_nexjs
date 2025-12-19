"use client";

import { useSelector } from "react-redux";
import styles from "./Builder.module.css";

export default function ProgressBar() {
  const mother = useSelector((state) => state.builder.mother);

  const totalFields = Object.keys(mother).length;
  const filled = Object.values(mother).filter(Boolean).length;
  const percent = Math.round((filled / totalFields) * 100);

  return (
    <div className={styles.progressWrap}>
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{
            width: `${percent}%`,
            backgroundColor: percent === 100 ? "#16a34a" : "#2563eb",
          }}
        />
      </div>

      <p className={styles.progressText}>
        Progress: <b>{percent}%</b>
      </p>
    </div>
  );
}
