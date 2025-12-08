"use client";

import React from "react";
import ContactCard from "../../component/contact/ContactCard";
import ContactForm from "../../component/contact/ContactForm";
import ContactMap from "../../component/contact/ContactMap";
import ContactHeroSpot from "../../component/contactHerospot/contactHerospot";
import styles from "../../component/contact/contact.module.css";

export default function ContactPage() {
  return (
    <>
      {/* HERO - full width */}
      <ContactHeroSpot />

      {/* WRAPPER FOR LEFT/RIGHT MARGINS */}
      <div className={styles.contentWrapper}>
        {/* INFO + FORM */}
        <section className={styles.contactSection}>
          <div className={styles.cards}>
            <ContactCard title="Email Address" items={["info@unelmaplatforms.com"]} />
            <ContactCard
              title="Phone"
              items={[
                "+358(0)449889771 (EU)",
                "+1 (302) 703-7343 (US)",
                "+977 56-562130 (NP)",
              ]}
            />
            <ContactCard title="Open Hours" items={["Mon - Fri", "10AM - 5PM"]} />
            <ContactCard
              title="Locations"
              items={["Tallinn, EE", "Espoo, FI", "CO, US", "Chitwan, NP"]}
            />
          </div>

          <div className={styles.formSection}>
            <h2>Send a Message</h2>
            <ContactForm />
          </div>
        </section>

        {/* MAP */}
        <section className={styles.mapSection}>
          <h2>Our Locations</h2>
          <ContactMap />
        </section>
      </div>
    </>
  );
}
