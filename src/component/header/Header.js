"use client";

import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../lib/features/auth/authSlice";
import styles from "./Header.module.css";

export default function Header() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      <div className={styles.topBar}>
        <div className={styles.topContent}>
          <div className={styles.socials}>
            <i className="bi bi-twitter"></i>
            <i className="bi bi-facebook"></i>
            <i className="bi bi-linkedin"></i>
          </div>

          <div className={styles.topRight}>
            {user ? (
              <>
                <span>Hi, {user.username}</span>
                <button onClick={handleLogout} className={styles.logoutBtn}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login">Login</Link> /{" "}
                <Link href="/register">Register</Link>
              </>
            )}

            <select className={styles.language}>
              <option>English</option>
              <option>Nepali</option>
              <option>Soumi</option>
              <option>Eesti</option>
            </select>

            <Link href="/request-quote" className={styles.quoteBtn}>
              Get A Quote
            </Link>
          </div>
        </div>
      </div>

      <header className={styles.header}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>
            <img
              src="http://localhost:1337/uploads/unelma_platforms_88dc9af69c.jpg"
              alt="Logo"
            />
          </Link>

          <nav className={styles.nav}>
            <Link href="/">Home</Link>

            <div className={styles.dropdown}>
              <button>About ▾</button>
              <div className={styles.dropdownMenu}>
                <Link href="/about/about">About</Link>
                <Link href="/about/blog">Blog</Link>
              </div>
            </div>

            <div className={styles.dropdown}>
              <button>Appointment ▾</button>
              <div className={styles.dropdownMenu}>
                <Link href="/appointment/introduction-meeting">
                  Introduction Meeting
                </Link>
                <Link href="/appointment/job-interview">Job Interview</Link>
              </div>
            </div>

            <div className={styles.dropdown}>
              <button>Service ▾</button>
              <div className={styles.dropdownMenu}>
                <Link href="/services">All Services</Link>
                <Link href="/services/startup-development">
                  Startup Development Service
                </Link>
              </div>
            </div>

            <Link href="/case-study">Case Study</Link>

            <div className={styles.dropdown}>
              <button>Career With Us ▾</button>
            </div>

            <Link href="/contact">Contact</Link>
          </nav>

          <div className={styles.icons}>
            <i className="bi bi-search"></i>
            <i className="bi bi-heart"></i>
            <div className={styles.cartIcon}>
              <i className="bi bi-cart"></i>
              <span className={styles.cartBadge}>0</span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
