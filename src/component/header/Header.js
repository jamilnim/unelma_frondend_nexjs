"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../lib/features/auth/authSlice";
import styles from "./Header.module.css";

export default function Header() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false); // Added scroll state

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  // Listen for scroll to update header style
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // Change after 50px scroll
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.leftSection}>
          <img
            src="/uploads/unelma-logi.png"
            alt="Unelma Logo"
            className={styles.logoImage}
          />
          <Link href="/" className={styles.logoText}>
            Unelma
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className={styles.menuToggle}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={menuOpen ? styles.barActive : styles.bar}></span>
          <span className={menuOpen ? styles.barActive : styles.bar}></span>
          <span className={menuOpen ? styles.barActive : styles.bar}></span>
        </button>

        {/* Navigation */}
        <nav
          className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}
          onMouseLeave={() => setServicesOpen(false)}
        >
          <Link href="/">Home</Link>
          <Link href="/why-us">Why us</Link>
          <Link href="/about">About us</Link>

          <div
            className={styles.dropdown}
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button className={styles.dropdownBtn}>Services ▾</button>
            {servicesOpen && (
              <div className={styles.dropdownContent}>
                <Link href="/services/web">Web Development</Link>
                <Link href="/services/app">App Development</Link>
                <Link href="/services/marketing">Digital Marketing</Link>
              </div>
            )}
          </div>

          <Link href="/casestudy">Cases</Link>
          <Link href="/blogs">Blog</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        {/* Auth */}
        <div className={styles.auth}>
          {user ? (
            <>
              <span className={styles.welcome}>Hi, {user.username}</span>
              <button className={styles.logoutBtn} onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className={styles.loginBtn}>
                Login
              </Link>
              <Link href="/register" className={styles.registerBtn}>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
