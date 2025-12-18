"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../lib/features/auth/authSlice";
import { fetchHero } from "../../lib/features/hero/heroSlice";
import styles from "./Header.module.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import ThemeToggle from "../../component/Theme/ThemeToggle";

export default function Header() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { data: hero } = useSelector((state) => state.hero);
  const cartItems = useSelector((state) => state.cart.items || []);

  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState({});

  useEffect(() => {
    setMounted(true);
    if (!hero) dispatch(fetchHero());
  }, [dispatch, hero]);

  const handleLogout = () => dispatch(logoutUser());
  const toggleSubmenu = (menu) =>
    setMobileSubmenu((prev) => ({ ...prev, [menu]: !prev[menu] }));

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
            <i className="bi bi-twitter" />
            <i className="bi bi-facebook" />
            <i className="bi bi-linkedin" />
          </div>

          <div className={styles.themeToggleWrapper}>
            <ThemeToggle />
          </div>

          <div className={styles.topRight}>
            {mounted && user ? (
              <>
                <span>Hi, {user.name || user.username}</span>

                <Link href="/dashboard" className={styles.profileIcon}>
                  <i className="bi bi-person-circle"></i>
                </Link>

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

      {/* Main Header */}
      <header className={styles.header}>
        <div className={styles.container}>
          <Link href="/" className={styles.logoContainer}>
            <img src={logoUrl} alt="Logo" className={styles.logo} />
            <span className={styles.logoTitle}>{heroTitle}</span>
          </Link>

          <button
            className={styles.hamburger}
            onClick={() => setMobileOpen(true)}
          >
            <i className="bi bi-list"></i>
          </button>

          {/* Desktop Nav */}
          <nav className={styles.navContainer}>
            <div className={styles.navItem}>
              <Link href="/" className={styles.btn}>
                Home
              </Link>
            </div>
            <div className={styles.navItem}>
              <button className={styles.btn}>About ▾</button>
              <div className={styles.dropdownMenu}>
                <Link href="/about/about">About</Link>
                <Link href="/blogs">Blog</Link>
              </div>
            </div>
            <div className={styles.navItem}>
              <button className={styles.btn}>Appointment ▾</button>
              <div className={styles.dropdownMenu}>
                <Link href="/appointment/introduction-meeting">
                  Intro Meeting
                </Link>
                <Link href="/appointment/job-interview">Job Interview</Link>
              </div>
            </div>
            <div className={styles.navItem}>
              <button className={styles.btn}>Service ▾</button>
              <div className={styles.dropdownMenu}>
                <Link href="/services">All Services</Link>
                <Link href="/services/startup-development">
                  Startup Development
                </Link>
              </div>
            </div>
            <div className={styles.navItem}>
              <Link href="/casestudy" className={styles.btn}>
                Case Study
              </Link>
            </div>
            <div className={styles.navItem}>
              <button className={styles.btn}>Career ▾</button>
              <div className={styles.dropdownMenu}>
                <Link href="/careers">Jobs</Link>
              </div>
            </div>
            <div className={styles.navItem}>
              <Link href="/contact" className={styles.btn}>
                Contact
              </Link>
            </div>
          </nav>

          {/* Desktop Cart Icon */}
          <div className={styles.cartWrapper}>
            <Link href="/cart" className={styles.cartIcon}>
              <i className="bi bi-cart3"></i>
              {mounted && cartItems.length > 0 && (
                <span className={styles.cartCount}>{cartItems.length}</span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.open : ""}`}>
        <button
          className={styles.closeBtn}
          onClick={() => setMobileOpen(false)}
        >
          ✕
        </button>

        <Link href="/" onClick={() => setMobileOpen(false)}>
          Home
        </Link>

        <Link
          href="/cart"
          onClick={() => setMobileOpen(false)}
          className={styles.mobileCart}
        >
          <i className="bi bi-cart3"></i>
          {mounted && `Cart (${cartItems.length})`}
        </Link>

        {/* Mobile submenus */}
        <div className={styles.mobileItem}>
          <button onClick={() => toggleSubmenu("about")}>
            About {mobileSubmenu["about"] ? "−" : "+"}
          </button>
          {mobileSubmenu["about"] && (
            <div className={styles.mobileSubmenu}>
              <Link href="/about/about" onClick={() => setMobileOpen(false)}>
                About
              </Link>
              <Link href="/blogs" onClick={() => setMobileOpen(false)}>
                Blog
              </Link>
            </div>
          )}
        </div>

        <div className={styles.mobileItem}>
          <button onClick={() => toggleSubmenu("appointment")}>
            Appointment {mobileSubmenu["appointment"] ? "−" : "+"}
          </button>
          {mobileSubmenu["appointment"] && (
            <div className={styles.mobileSubmenu}>
              <Link
                href="/appointment/introduction-meeting"
                onClick={() => setMobileOpen(false)}
              >
                Intro Meeting
              </Link>
              <Link
                href="/appointment/job-interview"
                onClick={() => setMobileOpen(false)}
              >
                Job Interview
              </Link>
            </div>
          )}
        </div>

        <div className={styles.mobileItem}>
          <button onClick={() => toggleSubmenu("service")}>
            Service {mobileSubmenu["service"] ? "−" : "+"}
          </button>
          {mobileSubmenu["service"] && (
            <div className={styles.mobileSubmenu}>
              <Link href="/services" onClick={() => setMobileOpen(false)}>
                All Services
              </Link>
              <Link
                href="/services/startup-development"
                onClick={() => setMobileOpen(false)}
              >
                Startup Dev
              </Link>
            </div>
          )}
        </div>

        <Link href="/casestudy" onClick={() => setMobileOpen(false)}>
          Case Study
        </Link>

        <div className={styles.mobileItem}>
          <button onClick={() => toggleSubmenu("career")}>
            Career {mobileSubmenu["career"] ? "−" : "+"}
          </button>
          {mobileSubmenu["career"] && (
            <div className={styles.mobileSubmenu}>
              <Link href="/careers" onClick={() => setMobileOpen(false)}>
                Jobs
              </Link>
              <Link
                href="/career/internship"
                onClick={() => setMobileOpen(false)}
              >
                Internship
              </Link>
            </div>
          )}
        </div>

        <Link href="/contact" onClick={() => setMobileOpen(false)}>
          Contact
        </Link>
      </div>
    </>
  );
}
