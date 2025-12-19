"use client";

import { useRouter } from "next/navigation";
import styles from "./knowMoreButton.module.css";

export default function ShareStartupIdeaButton({
  text = "Share your startup idea",
}) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/idea-builder");
  };

  return (
    <button onClick={handleClick} className={styles.ctaKnowMore}>
      <span className={styles.hoverUnderline}>{text}</span>
      <svg
        viewBox="0 0 13 10"
        height="10px"
        width="15px"
        className={styles.arrow}
      >
        <path d="M1,5 L11,5"></path>
        <polyline points="8 1 12 5 8 9"></polyline>
      </svg>
    </button>
  );
}
