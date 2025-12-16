"use client";

import React from "react";
import ContactForm from "./ContactForm";
import ContactMap from "./ContactMap";
import {
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineClockCircle,
} from "react-icons/ai";
import { FaMapMarkerAlt } from "react-icons/fa";
import styles from "./contact.module.css";

export default function ContactPageRedesign() {
  return (
    <>
      <div className={styles.header}>
        <h1>We would love to hear from you</h1>
      </div>

      <div className={styles.pageWrapper}>
        {/* TOP SECTION: LEFT CARD + RIGHT FORM */}
        <div className={styles.container}>
          {/* LEFT ADDRESS CARD */}
          <div className={styles.leftCard}>
            <h2>Contact Information</h2>

            <div className={styles.infoRow}>
              <AiOutlineMail className={styles.infoIcon} />
              <p>info@unelmaplatforms.com</p>
            </div>

            <div className={styles.infoRow}>
              <AiOutlinePhone className={styles.infoIcon} />
              <p>EU: +358 (0) 44 988 9771</p>
            </div>

            <div className={styles.infoRow}>
              <AiOutlinePhone className={styles.infoIcon} />
              <p>US: +1 (302) 703-7343</p>
            </div>

            <div className={styles.infoRow}>
              <AiOutlinePhone className={styles.infoIcon} />
              <p>NP: +977 56-562130</p>
            </div>

            <div className={styles.infoRow}>
              <AiOutlineClockCircle className={styles.infoIcon} />
              <p>Mon - Fri, 10AM - 5PM</p>
            </div>

            <div className={styles.infoRow}>
              <FaMapMarkerAlt className={styles.infoIcon} />
              <p>Tallinn (EE), Espoo (FI), Colorado (US), Chitwan (NP)</p>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className={styles.rightForm}>
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
