"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../lib/features/auth/authSlice";
import { fetchHero } from "../../lib/features/hero/heroSlice";
import LanguageToggle from "../language/LanguageToggle";

import styles from "./Header.module.css";

export default function Header() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { data: hero } = useSelector((state) => state.hero);

  useEffect(() => {
    if (!hero) dispatch(fetchHero());
  }, [dispatch, hero]);

  const handleLogout = () => dispatch(logoutUser());

  const logoUrl = hero?.logo?.[0]?.url
    ? `http://localhost:1337${hero.logo[0].url}`
    : "http://localhost:1337/uploads/unelma_platforms_88dc9af69c.jpg";

  const heroTitle = hero?.title || "Unelma";

  return (
    <>
      {/* Top Bar */}
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
            <LanguageToggle />
            <Link href="/request-quote" className={styles.quoteBtn}>
              Get A Quote
            </Link>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className={styles.header}>
        <div className={styles.container}>
          {/* Logo */}
          <Link href="/" className={styles.logoContainer}>
            <img src={logoUrl} alt="Logo" className={styles.logo} />
            <span className={styles.logoTitle}>{heroTitle}</span>
          </Link>

          {/* Icons */}
          <div className={styles.icons}>
            <i className="bi bi-search"></i>
            <i className="bi bi-heart"></i>
          </div>

          {/* Nav */}
          <nav className={styles.navContainer}>
            <div className={styles.navItem}>
              <Link href="/" className={styles.btn}>Home</Link>
            </div>

            <div className={styles.navItem}>
              <button className={styles.btn}>About ▾</button>
              <div className={styles.dropdownMenu}>
                <Link href="/about/about">About</Link>
                <Link href="/about/blogs">Blog</Link>
              </div>
            </div>

            <div className={styles.navItem}>
              <button className={styles.btn}>Appointment ▾</button>
              <div className={styles.dropdownMenu}>
                <Link href="/appointment/introduction-meeting">Intro Meeting</Link>
                <Link href="/appointment/job-interview">Job Interview</Link>
              </div>
            </div>

            <div className={styles.navItem}>
              <button className={styles.btn}>Service ▾</button>
              <div className={styles.dropdownMenu}>
                <Link href="/services">All Services</Link>
                <Link href="/services/startup-development">Startup Development</Link>
              </div>
            </div>

            <div className={styles.navItem}>
              <Link href="/casestudy" className={styles.btn}>Case Study</Link>
            </div>

            <div className={styles.navItem}>
              <button className={styles.btn}>Career ▾</button>
              <div className={styles.dropdownMenu}>
                <Link href="/career/jobs">Jobs</Link>
                <Link href="/career/internship">Internship</Link>
              </div>
            </div>

            <div className={styles.navItem}>
              <Link href="/contact" className={styles.btn}>Contact</Link>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
