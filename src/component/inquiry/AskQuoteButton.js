"use client";

import { useRouter } from "next/navigation";
import styles from "./askQuoteButton.module.css";

export default function AskQuoteButton({ subject }) {
  const router = useRouter();

  const handleClick = () => {
    const url = subject
      ? `/inquiry?subject=${encodeURIComponent(subject)}`
      : "/inquiry";
    router.push(url);
  };

  return (
    <button onClick={handleClick} className={styles.cta}>
      <span>Ask for a Quotation&nbsp;</span>
      <svg viewBox="0 0 13 10" height="10px" width="15px">
        <path d="M1,5 L11,5"></path>
        <polyline points="8 1 12 5 8 9"></polyline>
      </svg>
    </button>
  );
}
