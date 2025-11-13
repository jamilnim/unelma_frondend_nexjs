"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./Footer.module.css";

/**
 * Footer component with a floating subscribe pill that expands on click.
 * Uses single-open accordion behavior for addresses (click one, others close).
 */
export default function Footer() {
  // subscribe state
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | error | sending | success
  const [message, setMessage] = useState("");

  // floating pill state
  const [pillOpen, setPillOpen] = useState(false);
  const pillRef = useRef(null);

  // ref for region container (used to manage accordion behavior)
  const regionsRef = useRef(null);

  useEffect(() => {
    // close any open details on unmount
    return () => {
      const els = regionsRef.current?.querySelectorAll("details");
      els?.forEach((d) => (d.open = false));
    };
  }, []);

  useEffect(() => {
    // click outside to close floating pill
    function handleClickOutside(e) {
      if (pillOpen && pillRef.current && !pillRef.current.contains(e.target)) {
        setPillOpen(false);
      }
    }
    function handleEsc(e) {
      if (e.key === "Escape") setPillOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [pillOpen]);

  const validate = (v) => /\S+@\S+\.\S+/.test(v);

  const submit = (e) => {
    e?.preventDefault?.();
    if (!validate(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }
    setStatus("sending");
    setMessage("");

    // Simulated API call — replace with your endpoint
    setTimeout(() => {
      setStatus("success");
      setMessage("Thanks! Check your inbox to confirm.");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
      // small confetti pulse (CSS class)
      document.body.classList.add(styles.footerConfetti);
      setTimeout(
        () => document.body.classList.remove(styles.footerConfetti),
        1400
      );
    }, 900);
  };

  // Accordion: ensure only one <details> is open
  const handleRegionToggle = (ev, index) => {
    const detailsList = regionsRef.current?.querySelectorAll("details");
    if (!detailsList) return;
    detailsList.forEach((d, i) => {
      d.open = i === index ? !d.open : false;
    });
  };

  // When main subscribe panel opens via the footer, close floating pill
  useEffect(() => {
    if (status === "success") setPillOpen(false);
  }, [status]);

  return (
    <>
      <footer className={styles.footer}>
        {/* Main container */}
        <div className={styles.container}>
          {/* Left: useful links */}
          <nav className={styles.block} aria-label="Useful links">
            <h3 className={styles.blockTitle}>Useful links</h3>
            <ul className={styles.links}>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/feedback">Feedback</a>
              </li>
              <li>
                <a href="/clients">Clients Feedback</a>
              </li>
              <li>
                <a href="/support">Support Ticket</a>
              </li>
              <li>
                <a href="/careers">Career With Us</a>
              </li>
              <li>
                <a href="/internship">Internship</a>
              </li>
              <li>
                <a href="/jobs/ui-ux">UI / UX Designer</a>
              </li>
              <li>
                <a href="/jobs/software-engineer">Software Engineer</a>
              </li>
              <li>
                <a href="/office-management">Office Management</a>
              </li>
            </ul>
          </nav>

          {/* Right: subscribe (standout) using your gradient + pill design */}
          <aside
            className={`${styles.block} ${styles.subscribeWrapperBlock}`}
            aria-label="Subscribe"
          >
            <div className={styles.subscribeWrapper}>
              <div className={styles.subscribeContent}>
                <h3 className={styles.subscribeTitle}>
                  Subscribe to our Newsletter
                </h3>
                <p className={styles.subscribeDesc}>
                  Based on the GDPR rule, we will only contact you if it is
                  essential and all personal data collected is anonymized.
                </p>

                <form
                  className={styles.subscribeForm}
                  onSubmit={submit}
                  noValidate
                >
                  <input
                    className={styles.subscribeInput}
                    placeholder="your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    aria-label="Email address"
                    required
                  />
                  <button
                    className={styles.subscribeBtn}
                    type="submit"
                    disabled={status === "sending"}
                  >
                    {status === "sending" ? "Sending..." : "Subscribe"}
                  </button>
                </form>

                <p className={styles.subscribeNote} role="status">
                  {status === "error" && (
                    <span style={{ color: "#ffd1d1" }}>{message}</span>
                  )}
                  {status === "success" && (
                    <span style={{ color: "#d1fff0" }}>{message}</span>
                  )}
                </p>
              </div>
            </div>
          </aside>

          {/* Middle: regional addresses (accordion) */}
          <section className={styles.block} aria-label="Regional offices">
            <h3 className={styles.blockTitle}>Regional offices</h3>

            <div className={styles.regions} ref={regionsRef}>
              <details className={styles.region} open>
                <summary
                  className={styles.regionTitle}
                  onClick={(e) => {
                    e.preventDefault();
                    handleRegionToggle(e, 0);
                  }}
                  role="button"
                  aria-expanded="true"
                >
                  Northern Europe
                  <span className={styles.regionActions}>EST</span>
                </summary>
                <div className={styles.regionBody}>
                  <address className={styles.address}>
                    <strong>Unelma Platforms OÜ</strong>
                    <br />
                    Tallinn, Estonia — region 10111
                    <br />
                    Company Registry code: 16069962
                  </address>
                  <div className={styles.contactRow}>
                    <a href="tel:+358449889771">+358 (0) 44 9889771</a>
                    <a href="mailto:info@unelmaplatforms.com">
                      info@unelmaplatforms.com
                    </a>
                  </div>
                </div>
              </details>

              <details className={styles.region}>
                <summary
                  className={styles.regionTitle}
                  onClick={(e) => {
                    e.preventDefault();
                    handleRegionToggle(e, 1);
                  }}
                  role="button"
                  aria-expanded="false"
                >
                  North America
                  <span className={styles.regionActions}>CAN</span>
                </summary>
                <div className={styles.regionBody}>
                  <address className={styles.address}>
                    <strong>Unelma Pay Ltd</strong>
                    <br />
                    215 Anne Street N, Barrie, Ontario, Canada
                    <br />
                    Incorporation number: 1000986742
                  </address>
                  <div className={styles.contactRow}>
                    <a href="tel:+17057908047">+1 (705) 790-8047</a>
                    <a href="mailto:unelmapayca@gmail.com">
                      unelmapayca@gmail.com
                    </a>
                  </div>
                </div>
              </details>

              <details className={styles.region}>
                <summary
                  className={styles.regionTitle}
                  onClick={(e) => {
                    e.preventDefault();
                    handleRegionToggle(e, 2);
                  }}
                  role="button"
                  aria-expanded="false"
                >
                  South Asia
                  <span className={styles.regionActions}>NEP</span>
                </summary>
                <div className={styles.regionBody}>
                  <address className={styles.address}>
                    <strong>Unelma Platforms Pvt. Ltd</strong>
                    <br />
                    Ratnanagar, Chitwan 44204, Nepal
                    <br />
                    Business ID / VAT / PAN: 606863094
                  </address>
                  <div className={styles.contactRow}>
                    <a href="tel:+97756562130">+977 56-562130</a>
                    <a href="mailto:hello@unelma.com.np">hello@unelma.com.np</a>
                  </div>
                </div>
              </details>

              <details className={styles.region}>
                <summary
                  className={styles.regionTitle}
                  onClick={(e) => {
                    e.preventDefault();
                    handleRegionToggle(e, 3);
                  }}
                  role="button"
                  aria-expanded="false"
                >
                  United States
                  <span className={styles.regionActions}>USA</span>
                </summary>
                <div className={styles.regionBody}>
                  <address className={styles.address}>
                    <strong>Unelma Platforms Inc.</strong>
                    <br />
                    Incorporation states: Delaware, Illinois, Alabama, Montana
                  </address>
                  <div className={styles.contactRow}>
                    <a href="tel:+13027037343">+1 302 703 7343</a>
                    <a href="mailto:info@unelmaplatforms.com">
                      info@unelmaplatforms.com
                    </a>
                  </div>
                </div>
              </details>
            </div>
          </section>
        </div>

        {/* bottom copyright */}
        <div className={styles.bottom}>
          <div className={styles.bottomInner}>
            <p>© 2025 All rights reserved by Unelma Platforms.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
