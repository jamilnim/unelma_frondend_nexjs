"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServiceHeroSpot } from "../../lib/features/serviceHeroSpot/serviceHeroSpotSlice";
import styles from "./appointmentHerospot.module.css";

export default function AppointmentHeroSpot({ title, subtitle }) {
  const dispatch = useDispatch();
  const {
    data: hero,
    loading,
    error,
  } = useSelector((state) => state.serviceHeroSpot);

  useEffect(() => {
    if (!hero) dispatch(fetchServiceHeroSpot());
  }, [dispatch, hero]);

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (error) return <p className={styles.error}>Error: {error}</p>;
  if (!hero) return null;

  const imgUrl = hero.backgroundImage?.url
    ? `http://localhost:1337${hero.backgroundImage.url}`
    : "/fallback.jpg";

  return (
    <div className={styles.hero} style={{ backgroundImage: `url(${imgUrl})` }}>
      <div className={styles.overlay}>
        <h1>{title || hero.title}</h1>
        <p>{subtitle || hero.subtitle}</p>
      </div>
    </div>
  );
}
