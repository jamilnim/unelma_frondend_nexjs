"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServiceHeroSpot } from "../../lib/features/serviceHeroSpot/serviceHeroSpotSlice";
import styles from "./appointmentHerospot.module.css";
import Link from "next/link";

export default function AppointmentHeroSpot({ type }) {
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

  // Dynamic title based on type
  const pageTitle =
    type === "job-interview"
      ? "Job Interview"
      : type === "introduction-meeting"
      ? "Introduction Meeting"
      : hero.title;

  const pageSubtitle =
    type === "job-interview"
      ? "Schedule your job interview at a convenient time."
      : type === "introduction-meeting"
      ? "Book your introduction meeting with us."
      : hero.subtitle;

  // Background image from Strapi
  const imgUrl = hero.backgroundImage?.url
    ? `http://localhost:1337${hero.backgroundImage.url}`
    : "/fallback.jpg";

  return (
    <div className={styles.hero} style={{ backgroundImage: `url(${imgUrl})` }}>
      <div className={styles.overlay}>
        {/* Breadcrumb */}
        {/* <div className={styles.breadcrumb}>
          <Link href="/">Home</Link> /
          <Link href="/appointment"> Appointment</Link> /
          <span> {pageTitle}</span>
        </div> */}

        {/* Page Title + Subtitle */}
        <h1>{pageTitle}</h1>
        <p>{pageSubtitle}</p>
      </div>
    </div>
  );
}
