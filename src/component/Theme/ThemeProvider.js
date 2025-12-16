"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../lib/features/theme/themeSlice";

export default function ThemeProvider({ children }) {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);

  // Load theme once
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) dispatch(setTheme(saved));
  }, [dispatch]);

  // Apply to <html>
  useEffect(() => {
    document.documentElement.className = mode;
    localStorage.setItem("theme", mode);
  }, [mode]);

  return children;
}
