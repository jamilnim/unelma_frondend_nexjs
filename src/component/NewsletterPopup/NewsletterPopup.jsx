// components/NewsletterPopup.jsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openPopup, closePopup } from "../../lib/features/popup/popupSlice";
import styles from "./NewsletterPopup.module.css";

// Simple Mail Icon Component (You'd ideally use a library like lucide-react or react-icons)
const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#38bdf8" /* Matches --accent-color */
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ margin: "0 auto 1rem", display: "block" }}
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

export default function NewsletterPopup() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.popup.isOpen);
  const [email, setEmail] = useState("");
  const popupRef = useRef();

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log("Subscribed email:", email);
    // Add real subscription logic here (e.g., API call)
    setEmail("");
    dispatch(closePopup());
  };

  // Open popup after 4-5s
  useEffect(() => {
    const timer = setTimeout(() => {
      // Only open if the user hasn't already subscribed (check local storage)
      // For this example, we just open it:
      dispatch(openPopup());
    }, 4500); // 4.5 seconds
    return () => clearTimeout(timer);
  }, [dispatch]);

  // Close if click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        dispatch(closePopup());
      }
    };

    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, dispatch]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.subscribeWrapper} ref={popupRef}>
        <button
          className={styles.closeBtn}
          onClick={() => dispatch(closePopup())}
          aria-label="Close newsletter popup"
        >
          &times;
        </button>
        <div className={styles.subscribeContent}>
          {/* New: Added a visual icon */}
          <MailIcon />

          <h3 className={styles.subscribeTitle}>Join Our Tech Insights</h3>
          <p className={styles.subscribeDesc}>
            Stay ahead in the tech landscape. Subscribe to receive our curated,
            expert-driven articles, tutorials, and development updates directly
            in your inbox.
          </p>
          <form className={styles.subscribeForm} onSubmit={handleSubscribe}>
            <input
              className={styles.subscribeInput}
              type="email" /* Added type for better validation */
              placeholder="Your professional email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button className={styles.subscribeBtn} type="submit">
              Join Our Community
            </button>
          </form>
          <p className={styles.subscribeNote}>
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  );
}
