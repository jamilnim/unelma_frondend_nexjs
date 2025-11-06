"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styles from "./serviceDetails.module.css";

export default function ServiceDetails() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(
          `http://localhost:1337/api/service-categories?filters[slug][$eq]=${slug}&populate=*`
        );
        const data = await res.json();
        setService(data.data[0]); // first match
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [slug]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:1337/api/service-inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: form }),
      });
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className={styles.message}>Loading...</p>;
  if (!service) return <p className={styles.message}>Service not found.</p>;

  const title = service.name;
  const description = service.description;
  const imageUrl =
    service.imageIcon?.[0]?.formats?.medium?.url || service.imageIcon?.[0]?.url;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      {imageUrl && (
        <img
          src={`http://localhost:1337${imageUrl}`}
          alt={title}
          className={styles.image}
        />
      )}
      <p className={styles.description}>{description}</p>

      <h2>Have Query ?</h2>
      {submitted ? (
        <p>Thank you! We received your inquiry.</p>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Your Phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            required
          />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}
