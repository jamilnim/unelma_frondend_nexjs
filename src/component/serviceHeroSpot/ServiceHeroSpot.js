"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServiceHeroSpot } from "../../lib/features/serviceHeroSpot/serviceHeroSpotSlice";
import styles from "./serviceHeroSpot.module.css";
import Link from "next/link";

export default function ServiceHeroSpot() {
  const dispatch = useDispatch();
  const { data: hero, loading } = useSelector((state) => state.serviceHeroSpot);

  useEffect(() => {
    if (!hero) dispatch(fetchServiceHeroSpot());
  }, [dispatch, hero]);

  if (loading || !hero) return null;

  const img = hero.backgroundImage?.url
    ? `http://localhost:1337${hero.backgroundImage.url}`
    : "/fallback.jpg";

  return (
    <div
      className={styles.hero}
      style={{
        backgroundImage: `url(${img})`,
      }}
    >
      <div className={styles.overlay}>
        <h1>{hero.title}</h1>
        <p>{hero.subtitle}</p>

        {hero.buttonText && (
          <Link href={hero.buttonLink || "#"} className={styles.btn}>
            {hero.buttonText}
          </Link>
        )}
      </div>
    </div>
  );
}
