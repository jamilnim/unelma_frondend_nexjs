"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import styles from "./serviceDetails.module.css";

export default function ServiceDetails() {
  const { slug } = useParams();

  const [service, setService] = useState(null);
  const [allServices, setAllServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:1337/api/service-categories?filters[slug][$eq]=${slug}&populate=*`
        );
        const data = await res.json();
        setService(data.data[0]);

        const res2 = await fetch(
          "http://localhost:1337/api/service-categories?populate=*"
        );
        const data2 = await res2.json();
        setAllServices(data2.data);
      } catch (err) {
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        data: {
          name: form.name,
          email: form.email,
          phone: parseInt(form.phone, 10),
          message: [
            {
              type: "paragraph",
              children: [{ text: form.message }],
            },
          ],
        },
      };

      const res = await fetch("http://localhost:1337/api/queries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error("❌ Strapi error:", data);
        alert("Failed to send query. Please check your data or permissions.");
        return;
      }

      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error("Network error:", err);
      alert("Something went wrong while sending your query.");
    }
  };

  if (loading) return <p className={styles.message}>Loading...</p>;
  if (!service) return <p className={styles.message}>Service not found.</p>;

  const title = service.name;
  const category = service.category;
  const description = service.description;

  const imageUrl =
    service.imageIcon?.[0]?.formats?.medium?.url || service.imageIcon?.[0]?.url;

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        {imageUrl && (
          <img
            src={`http://localhost:1337${imageUrl}`}
            alt={title}
            className={styles.mainImage}
          />
        )}

        <h1 className={styles.mainTitle}>{title}</h1>
        <span className={styles.categoryTag}>{category}</span>

        <p className={styles.description}>{description}</p>
      </div>

      <div className={styles.right}>
        {/* Sidebar Services */}
        <div className={styles.servicesBox}>
          {[
            ...new Map(
              allServices.map((item) => [item.category, item])
            ).values(),
          ].map((s) => (
            <Link
              key={s.id}
              href={`/services/category/${s.category
                .replace(/\s+/g, "-")
                .toLowerCase()}`}
              className={`${styles.serviceItem} ${
                s.category === service.category ? styles.active : ""
              }`}
            >
              {s.category}
            </Link>
          ))}
        </div>

        {/* ✅ FIXED QUERY FORM */}
        <div className={styles.queryBox}>
          <h2>Have a Query?</h2>

          {submitted ? (
            <p>Thank you! We received your message.</p>
          ) : (
            <form onSubmit={handleSubmit}>
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
              ></textarea>

              <button type="submit">Send</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}