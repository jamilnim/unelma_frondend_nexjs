"use client";

import { useRouter } from "next/navigation";
import styles from "./knowMoreButton.module.css";

export default function KnowMoreButton({ detailPage }) {
  const router = useRouter();

  const handleClick = () => {
    const url = detailPage ? `/details/${detailPage}` : "/details";
    router.push(url);
  };

  return (
    <button onClick={handleClick} className={styles.ctaKnowMore}>
      <span className={styles.hoverUnderline}>Know More</span>
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
