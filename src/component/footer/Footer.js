"use client";
import styles from "./Footer.module.css";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.topSection}>
        <div className={styles.column}>
          <h4>Useful Links</h4>
          <Link href="/">Home</Link>
          <Link href="/feedback">Feedback</Link>
          <Link href="/clients-feedback">Clients Feedback</Link>
          <Link href="/support-ticket">Support Ticket</Link>
          <Link href="/career">Career With Us</Link>
        </div>

        <div className={styles.column}>
          <h4>Come work with us</h4>
          <p>Internship</p>
          <p>UI/UX Designer</p>
          <p>Software Engineer</p>
          <p>Office Management</p>
        </div>

        <div className={styles.column}>
          <h4>Northern Europe office</h4>
          <p>Unelma Platforms OÜ, Tallinn, Estonia</p>
          <p>Company Registry: 16069962</p>
          <p>📞 +358(0) 44 9889771</p>
          <p>📧 info@unelmaplatforms.com</p>
        </div>

        <div className={styles.column}>
          <h4>United States of America (USA)</h4>
          <p>Unelma Platforms Inc., Delaware, Montana</p>
          <p>📞 +13027037343</p>
          <p>📧 info@unelmaplatforms.com</p>
        </div>

        <div className={styles.column}>
          <h4>Subscribe to our Newsletter</h4>
          <p>Based on GDPR rules, we will only contact you if necessary.</p>
          <div className={styles.newsletter}>
            <input type="email" placeholder="Your Email" />
            <button>➤</button>
          </div>
        </div>
      </div>

      <p className={styles.copy}>© 2025 Unelma. All rights reserved.</p>
    </footer>
  );
}
