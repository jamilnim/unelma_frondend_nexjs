"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./fancy-card.module.css";
import KnowMoreButton from "../tools/KnowMoreButton";

export default function FancyServiceCarousel() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);

  const itemsPerPage = 6; // show 6 per slide

  // FETCH
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(
          "http://localhost:1337/api/service-categories?populate=*",
          { cache: "no-store" }
        );
        const json = await res.json();

        const arr = json.data.map((item) =>
          item.attributes ? item.attributes : item
        );

        setServices(arr);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) return <p>Loading services...</p>;
  if (!services.length) return <p>No services found.</p>;

  const currentServices = services.slice(index, index + itemsPerPage);

  // FIXED CORNER PATTERN
  const cornerPattern = [
    styles.cornerTL, // 1
    "",              // 2
    styles.cornerTR, // 3
    styles.cornerBL, // 4
    "",              // 5
    styles.cornerBR  // 6
  ];

  return (
    <>
      <div className={styles.carouselWrapper}>
        <div className={styles.header}>Our service</div>
        <div className={styles.subheader}>What we can offer today</div>

        <div className={styles.cardsContainer}>
          {currentServices.map((service, i) => {
            const cornerClass = cornerPattern[i] || "";

            const img =
              service?.imageIcon?.data?.attributes?.url ||
              service?.imageIcon?.[0]?.url ||
              null;
            const mainImageUrl = img ? `http://localhost:1337${img}` : null;

            const logo =
              service?.serviceicon?.data?.attributes?.url ||
              service?.serviceicon?.url ||
              null;
            const logoUrl = logo ? `http://localhost:1337${logo}` : null;

            return (
              <Link
                key={i}
                href={`/services/${service.slug}`}
                className={`${styles.card} ${cornerClass}`}
              >
                {/* IMAGE */}
                <div className={styles.cardImage}>
                  {mainImageUrl ? (
                    <img src={mainImageUrl} className={styles.cardImgTag} />
                  ) : (
                    <div className={styles.noImg}>No Image</div>
                  )}
                </div>

                {/* LOGO */}
                <div className={styles.logoPlaceholder}>
                  {logoUrl && <img src={logoUrl} className={styles.logoImg} />}
                </div>

                {/* TEXT */}
                <div className={styles.cardInfo}>
                  <p className={styles.cardTitle}>{service.name}</p>
                  <p className={styles.cardBody}>
                    {service.description || "No description available."}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
        <div className={styles.buttons}>
         {/* UPDATED KNOW MORE BUTTON */}
         <Link href="/services" >
          <KnowMoreButton/>
          </Link>
          </div>
      </div>
    </>
  );
}