"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchScrollingTexts } from "../../lib/features/scrollingText/scrollingTextSlice";
import styles from "./ScrollingBanner.module.css";

export default function ScrollingBanner() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.scrollingText);

  useEffect(() => {
    dispatch(fetchScrollingTexts());
  }, [dispatch]);

  if (loading) return null;

  if (!items.length) return <div>No scrolling texts available.</div>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.scroller}>
        {items.map((text, i) => (
          <span className={styles.item} key={i}>
            {text}
          </span>
        ))}
        {/* Duplicate for seamless infinite scroll */}
        {items.map((text, i) => (
          <span className={styles.item} key={`dup-${i}`}>
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
