"use client";

import { AnimatePresence } from "framer-motion";

export default function Providers({ children }) {
  return <AnimatePresence mode="wait">{children}</AnimatePresence>;
}
