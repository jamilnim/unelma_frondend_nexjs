"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import styles from "../../services.module.css";

export default function CategoryServicesPage() {
  const { category } = useParams();
  const formattedCategory = category.replace(/-/g, " ");

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(
          `http://localhost:1337/api/service-categories?filters[category][$eq]=${formattedCategory}&populate=*`
        );
        const data = await res.json();
        setServices(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [formattedCategory]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.categoryTitle}>{formattedCategory}</h1>

      {services.map((service) => {
        const imageUrl =
          service.imageIcon?.[0]?.formats?.medium?.url ||
          service.imageIcon?.[0]?.url;

        return (
          <Link
            key={service.id}
            href={`/services/${service.slug}`}
            className={styles.card}
          >
            {imageUrl && (
              <img
                src={`http://localhost:1337${imageUrl}`}
                className={styles.image}
                alt={service.name}
              />
            )}
            <h3>{service.name}</h3>{" "}
          </Link>
        );
      })}
    </div>
  );
}
