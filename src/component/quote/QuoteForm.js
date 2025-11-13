"use client";

import { useState } from "react";
import styles from "./quoteForm.module.css";

export default function QuoteForm() {
  const [form, setForm] = useState({
    name: "",
    subject: "",
    email: "",
    message: "",
  });

  const [file, setFile] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFile = (e) => {
    const selected = e.target.files[0];

    if (
      selected &&
      !["text/plain", "application/pdf"].includes(selected.type)
    ) {
      alert("Only .txt and .pdf files are allowed!");
      return;
    }

    setFile(selected);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Quote request sent!");
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Request A Quote</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          name="name"
          placeholder="Your Name"
          onChange={handleChange}
          required
        />

        <input
          name="subject"
          placeholder="Your Subject"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          onChange={handleChange}
          required
        />

        <div>
          <label className={styles.fileLabel}>Your File</label>
          <input
            type="file"
            accept=".txt,.pdf"
            onChange={handleFile}
            className={styles.fileInput}
          />
          <p className={styles.fileInfo}>
            Accept File Type: <strong>txt, pdf</strong>
          </p>
        </div>

        <textarea
          name="message"
          placeholder="Your Message"
          rows="5"
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit" className={styles.submitBtn}>
          Send Quote
        </button>
      </form>
    </div>
  );
}
