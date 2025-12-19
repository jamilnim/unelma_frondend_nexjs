"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "./ScrollToTop.module.css";

const SCROLL_TRIGGER = 240;

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = useCallback(() => {
    setIsVisible(window.scrollY > SCROLL_TRIGGER);
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      className={`${styles.button} ${isVisible ? styles.visible : ""}`}
      onClick={scrollToTop}
    >
      <span className={styles.ring} aria-hidden="true" />
      <span className={styles.glow} aria-hidden="true" />
      <svg
        aria-hidden="true"
        className={styles.icon}
        viewBox="0 0 24 24"
        role="img"
      >
        <path
          d="M12 5.5a1 1 0 0 1 .8.4l5 6a1 1 0 1 1-1.6 1.2L12 8.14 7.8 13.1a1 1 0 1 1-1.6-1.2l5-6a1 1 0 0 1 .8-.4Z"
          fill="currentColor"
        />
        <path
          d="M12 5.5a1 1 0 0 1 1 1v11a1 1 0 1 1-2 0v-11a1 1 0 0 1 1-1Z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
}

