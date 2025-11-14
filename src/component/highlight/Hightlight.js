import React from "react";
import styles from "./Highlight.module.css";

function Highlight() {
  const stats = [
    { value: "1M+", label: "Users Engaged through Custom Platform Solutions" },
    { value: "3M+", label: "App & Platform Downloads Worldwide" },
    { value: "#1", label: "Rated Digital Wallet Platform in Nepal" },
    {
      value: "Full-Spectrum Tech Expertise",
      label: "Cybersecurity • Data Science • AI • Cloud • Web & Mobile",
    },
    {
      value: "Global Footprint",
      label: "Presence in Asia, EU & North America",
    },
  ];

  return (
    <section className={styles.expSection}>
      <h2 className={styles.expTitle}>Our Impact Highlights</h2>

      <div className={styles.expGrid}>
        {/* Row 1: cells 1, 3, 5 */}
        <div className={styles.cell}>
          <div className={styles.expBox}>
            <div className={styles.expValue}>{stats[0].value}</div>
            <div className={styles.expLabel}>{stats[0].label}</div>
          </div>
        </div>
        <div className={styles.cell}></div>
        <div className={styles.cell}>
          <div className={styles.expBox}>
            <div className={styles.expValue}>{stats[1].value}</div>
            <div className={styles.expLabel}>{stats[1].label}</div>
          </div>
        </div>
        <div className={styles.cell}></div>
        <div className={styles.cell}>
          <div className={styles.expBox}>
            <div className={styles.expValue}>{stats[2].value}</div>
            <div className={styles.expLabel}>{stats[2].label}</div>
          </div>
        </div>

        {/* Row 2: cells 2, 4 */}
        <div className={styles.cell}></div>
        <div className={styles.cell}>
          <div className={styles.expBox}>
            <div className={styles.expValue}>{stats[3].value}</div>
            <div className={styles.expLabel}>{stats[3].label}</div>
          </div>
        </div>
        <div className={styles.cell}></div>
        <div className={styles.cell}>
          <div className={styles.expBox}>
            <div className={styles.expValue}>{stats[4].value}</div>
            <div className={styles.expLabel}>{stats[4].label}</div>
          </div>
        </div>
        <div className={styles.cell}></div>
      </div>
    </section>
  );
}

export default Highlight;
