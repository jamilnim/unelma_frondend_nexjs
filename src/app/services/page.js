"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./services.module.css";

import ServiceHeroSpot from "../../component/serviceHeroSpot/ServiceHeroSpot";

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
        setCategories(data.data || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <ServiceHeroSpot />

      <div className={styles.container}>
        {loading ? (
          <p className={styles.loading}>Loading services...</p>
        ) : (
          categories.map((category) => {
            const title = category.name || "Unnamed Service";
            const slug = category.slug
              ? `/services/${category.slug}`
              : "/services";

            const imageUrl =
              category.imageIcon?.[0]?.formats?.medium?.url ||
              category.imageIcon?.[0]?.url ||
              "/placeholder.png";

            const description =
              category.description?.slice(0, 120) || "No description available";

            return (
              <div key={category.id} className={styles.cardWrapper}>
                <Link href={slug} className={styles.card}>
                  <img
                    src={`http://localhost:1337${imageUrl}`}
                    alt={title}
                    className={styles.image}
                  />
                  <h3 className={styles.title}>{title}</h3>
                  <p className={styles.description}>{description}...</p>
                </Link>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
