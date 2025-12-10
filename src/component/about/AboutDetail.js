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

      {/* IMAGE WITH CURVED TOP */}
      {imageUrl && (
        <div className={`${styles.imageWrapper} ${styles.curveTop} ${styles.animateItem} ${styles.delay1}`}>
          <img src={imageUrl} alt="About Image" className={styles.aboutImage} />
        </div>
      )}

      {/* TITLE */}
      <h1 className={`${styles.title} ${styles.animateItem} ${styles.delay2}`}>
        {about.title}
      </h1>

      {/* STORY + CARDS */}
      <div className={styles.storyAndCards}>
        
        {/* STORY */}
        <div className={`${styles.story} ${styles.animateItem} ${styles.delay3}`}>
          {about.detailStory?.map((block, i) => (
            <p
              key={i}
              className={`${styles.animateItem} ${styles[`delay${4 + i}`]}`}
            >
              {block.children?.[0]?.text}
            </p>
          ))}
        </div>

        {/* CARDS */}
        <div className={styles.cardsColumn}>
          <div
            className={`${styles.missionCard} ${styles.animateItem} ${styles.delay4} ${styles.fadeOutOnHover}`}
          >
            <h2>Mission</h2>
            <p>{about.mission}</p>
          </div>

          <div
            className={`${styles.visionCard} ${styles.animateItem} ${styles.delay5} ${styles.fadeOutOnHover}`}
          >
            <h2>Vision</h2>
            <p>{about.vision}</p>
          </div>
        </div>

      </div>

      {/* GRAPHS */}
      <div className={styles.graphsRow}>
        <div
          className={`${styles.graphWrapper} ${styles.animateItem} ${styles.delay6} ${styles.fadeOutOnHover}`}
        >
          <h3>Our Strength</h3>
          <StrengthBarChart data={about.ourStrength} />
        </div>

        <div
          className={`${styles.graphWrapper} ${styles.animateItem} ${styles.delay7} ${styles.fadeOutOnHover}`}
        >
          <h3>Our Growth</h3>
          <GrowthLineChart data={about.users} />
        </div>
      </div>
    </section>
  );
}
