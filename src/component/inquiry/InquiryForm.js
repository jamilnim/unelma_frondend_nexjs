"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import {
  createInquiry,
  resetInquiry,
} from "../../lib/features/inquiry/inquirySlice";
import styles from "./inquiryForm.module.css";

export default function InquiryForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { user, jwt } = useSelector((state) => state.auth);
  const { loading, success, error } = useSelector((state) => state.inquiry);

  const defaultSubject = searchParams.get("subject") || "";

  const [form, setForm] = useState({
    name: "",
    subject: defaultSubject,
    email: "",
    message: "",
    file: null,
  });

  useEffect(() => {
    if (!user) {
      router.push("/register"); // Redirect if not logged in
    } else {
      setForm((prev) => ({
        ...prev,
        name: user.username || "",
        email: user.email || "",
      }));
    }
  }, [user, router]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && ["application/pdf", "text/plain"].includes(file.type)) {
      setForm({ ...form, file });
    } else {
      alert("Only PDF or TXT files are allowed");
      e.target.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!jwt) {
      router.push("/register");
      return;
    }

    const data = {
      name: form.name,
      subject: form.subject,
      email: form.email,
      message: form.message,
      file: form.file,
      user: user.id,
    };

    await dispatch(createInquiry({ data, jwt }));
  };

  useEffect(() => {
    if (success) {
      alert("Your inquiry was submitted successfully!");
      dispatch(resetInquiry());
      setForm({
        name: user.username,
        subject: defaultSubject,
        email: user.email,
        message: "",
        file: null,
      });
    }
  }, [success, dispatch, user, defaultSubject]);

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Request A Quote</h2>

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Your Name"
        required
      />
      <input
        name="subject"
        value={form.subject}
        onChange={handleChange}
        placeholder="Your Subject"
        required
      />
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Your Email"
        required
      />
      <input
        type="file"
        name="file"
        accept=".pdf,.txt"
        onChange={handleFileChange}
      />
      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="Your Message"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Sending..." : "Send Quote"}
      </button>

      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}
