"use client";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../lib/features/theme/themeSlice";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);

  return (
    <button
      className={styles.toggle}
      onClick={() => dispatch(toggleTheme())}
    >
      {mode === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
