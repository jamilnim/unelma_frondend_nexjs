"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./services.module.css";

export default function ServicesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "http://localhost:1337/api/service-categories?populate=*"
        );
        const data = await res.json();
        console.log("Fetched categories:", data);
        setCategories(data.data || []); // data array
      } catch (err) {
        console.error("Error fetching categories:", err);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <p className={styles.message}>Loading services...</p>;
  if (!categories.length)
    return <p className={styles.message}>No services found.</p>;

  return (
    <div className={styles.container}>
      {categories.map((category) => {
        const title = category.name || "Unnamed Service";
        const slug = category.slug ? `/services/${category.slug}` : "#";
        const imageUrl =
          category.imageIcon?.[0]?.formats?.medium?.url ||
          category.imageIcon?.[0]?.url ||
          "/placeholder.png";

        return (
          <Link key={category.id} href={slug} className={styles.card}>
            <img
              src={`http://localhost:1337${imageUrl}`}
              alt={title}
              className={styles.image}
            />
            <h3 className={styles.title}>{title}</h3>
          </Link>
        );
      })}
    </div>
  );
}
