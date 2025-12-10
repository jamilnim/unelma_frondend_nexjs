"use client";

import React from "react";
import ContactForm from "../../component/contact/ContactForm";
import ContactMap from "../../component/contact/ContactMap";
import styles from "./contact.module.css";

// React Icons
import { MdEmail, MdPhone, MdAccessTime } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function ContactPageRedesign() {
  return (
    <>
      <div className={styles.header}>
        <h1>We would love to get back from you</h1>
      </div>

      <div className={styles.pageWrapper}>

        {/* LEFT/RIGHT CONTAINER */}
        <div className={styles.container}>

          {/* LEFT DECORATIVE ADDRESS CARD */}
          <div className={styles.leftCard}>
            <h2>Contact Information</h2>

            <div className={styles.infoRow}>
              <MdEmail className={styles.icon} />
              <div>
                <strong>Email</strong>
                <p>info@unelmaplatforms.com</p>
              </div>
            </div>

            <div className={styles.infoRow}>
              <MdPhone className={styles.icon} />
              <div>
                <strong>Phone (EU)</strong>
                <p>+358(0)449889771</p>
              </div>
            </div>

            <div className={styles.infoRow}>
              <MdPhone className={styles.icon} />
              <div>
                <strong>Phone (US)</strong>
                <p>+1 (302) 703-7343</p>
              </div>
            </div>

            <div className={styles.infoRow}>
              <MdPhone className={styles.icon} />
              <div>
                <strong>Phone (NP)</strong>
                <p>+977 56-562130</p>
              </div>
            </div>

            <div className={styles.infoRow}>
              <MdAccessTime className={styles.icon} />
              <div>
                <strong>Open Hours</strong>
                <p>Mon - Fri, 10AM - 5PM</p>
              </div>
            </div>

            <div className={styles.infoRow}>
              <FaMapMarkerAlt className={styles.icon} />
              <div>
                <strong>Locations</strong>
                <p>Tallinn (EE), Espoo (FI), Colorado (US), Chitwan (NP)</p>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className={styles.rightForm1}>
            <ContactForm />
          </div>

        </div>

        {/* MAP SECTION */}
        <div className={styles.mapWrapper}>
          <ContactMap />
        </div>
      </div>
    </>
  );
}
