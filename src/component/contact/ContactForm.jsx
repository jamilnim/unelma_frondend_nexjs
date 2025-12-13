"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitContactForm } from "../../lib/features/contact/contactFormSlice";
import styles from "./contact.module.css";
import AnyQueriesButton from "../tools/AnyQueriesButton";

export default function ContactForm() {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.contact);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitContactForm(formData));
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <>
   
  
      <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.anyQueriesWrapper}>
    <AnyQueriesButton />
  </div>
       
        <input name="name" placeholder="Name" required value={formData.name} onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" required value={formData.email} onChange={handleChange} />
        <input name="phone" placeholder="Phone" required value={formData.phone} onChange={handleChange} />
        <textarea name="message" placeholder="Message" required value={formData.message} onChange={handleChange} />
        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Submit"}
        </button>
        {success && (
        <p style={{ color: "green", textAlign: "center" }}>
          Message sent successfully!
        </p>
      )}
      {error && (
        <p style={{ color: "red", textAlign: "center" }}>{error}</p>
      )}
       
      </form>
  
    </>
  );
}
