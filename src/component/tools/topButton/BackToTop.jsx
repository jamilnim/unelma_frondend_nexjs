"use client";

import React, { useEffect, useState, useCallback } from "react";
import styles from "./BackToTop.module.css";

export default function BackToTop({ showAfter = 300 }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > showAfter);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [showAfter]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      scrollToTop();
    }
  };

  return (
    <button
      type="button"
      className={`${styles.scrollToTop} ${visible ? styles.active : ""}`}
      onClick={scrollToTop}
      onKeyDown={onKeyDown}
      aria-label="Scroll to top"
      title="Back to top"
    >
      {/* Your SVG (kept intact, accessible via aria-hidden) */}
      <svg
        className={styles.svg}
        aria-hidden="true"
        width="56"
        height="56"
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        focusable="false"
      >
        <rect
          x="0.5"
          y="0.5"
          width="55"
          height="55"
          rx="28"
          fill="currentColor"
          opacity="0.06"
        />
        <path
          d="M28 18.5L36.5 27"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M28 18.5L19.5 27"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M28 37V18.5"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.9"
        />
      </svg>
    </button>
  );
}
