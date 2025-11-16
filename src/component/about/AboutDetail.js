"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAbout, selectAbout } from "../../lib/features/about/aboutSlice";
import { getStrapiImage } from "../../lib/api";
import StrengthBarChart from "./StrengthBarChart";
import GrowthLineChart from "./GrowthLineChart";
import styles from "./AboutDetail.module.css";

export default function AboutDetail() {
  const dispatch = useDispatch();
  const about = useSelector(selectAbout);
  const loading = useSelector((state) => state.about.loading);

  useEffect(() => {
    dispatch(fetchAbout());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (!about) return null;

  const img = about.aboutImage?.[0];
  const imageUrl = getStrapiImage(img);

  return (
    <section id="details" className={styles.aboutDetailSection}>
      {/* Image */}
      {imageUrl && (
        <div className={styles.imageWrapper}>
          <img src={imageUrl} alt="About Image" className={styles.aboutImage} />
        </div>
      )}

      {/* Title */}
      <h1 className={styles.title}>{about.title}</h1>

      {/* Story + Mission & Vision side by side */}
      <div className={styles.storyAndCards}>
        {/* LEFT: Detail Text */}
        <div className={styles.story}>
          {about.detailStory?.map((block, i) => (
            <p key={i}>{block.children?.[0]?.text}</p>
          ))}
        </div>

        {/* RIGHT: Mission & Vision */}
        <div className={styles.cardsColumn}>
          <div className={styles.missionCard}>
            <h2>Mission</h2>
            <p>{about.mission}</p>
          </div>
          <div className={styles.visionCard}>
            <h2>Vision</h2>
            <p>{about.vision}</p>
          </div>
        </div>
      </div>

      {/* GRAPHS */}
      <div className={styles.graphsRow}>
        <div className={styles.graphWrapper}>
          <h3>Our Strength</h3>
          <StrengthBarChart data={about.ourStrength} />
        </div>
        <div className={styles.graphWrapper}>
          <h3>Our Growth</h3>
          <GrowthLineChart data={about.users} />
        </div>
      </div>
    </section>
  );
}
