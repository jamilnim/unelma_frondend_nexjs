import React from "react";
import styles from "./contact.module.css";

export default function ContactCard({ title, items }) {
  return (
    <div className={styles.card}>
      <h2>{title}</h2>
      {items.map((i, index) => (
        <p key={index}>{i}</p>
      ))}
    </div>
  );
}
