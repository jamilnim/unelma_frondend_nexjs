"use client";

import { useRouter } from "next/navigation";
import styles from "./knowMoreButton.module.css";

export default function SeeallBlogs({ detailPage }) {
  const router = useRouter();



  return (
    <button  className={styles.ctaKnowMore}>
      <span>See All&nbsp;</span>
      <svg viewBox="0 0 13 10" height="10px" width="15px" className={styles.arrow}>
        <path d="M1,5 L11,5"></path>
        <polyline points="8 1 12 5 8 9"></polyline>
      </svg>
    </button>
  );
}
