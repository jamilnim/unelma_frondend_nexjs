"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAbout, selectAbout } from "../../lib/features/about/aboutSlice";
import { getStrapiImage } from "../../lib/api";
import Link from "next/link";
import styles from "./AboutSummary.module.css";

export default function AboutSummary() {
  const dispatch = useDispatch();
  const about = useSelector(selectAbout);
  const loading = useSelector((state) => state.about.loading);

  useEffect(() => {
    dispatch(fetchAbout());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (!about) return null;

  // Main About Image
  const mainImage = about.aboutImage?.[0];
  const mainImageUrl = getStrapiImage(mainImage);

  // Logo Image
  const logoImage = about.logo?.[0];
  const logoImageUrl = getStrapiImage(logoImage);

  // Story preview (30%)
  const storyText = about.detailStory
    ?.map((block) => block.children?.[0]?.text || "")
    .join(" ");
  const shortStory = storyText.slice(0, Math.floor(storyText.length * 0.3));

  // Highlight points
  const points = about.highlightedpoints
    ?.map((p) => p.children?.[0]?.text)
    .filter((t) => t && t.trim().length > 0);

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.mainTitle}>{about.title}</h2>

      <div className={styles.summaryWrapper}>
        {/* LEFT IMAGE */}
        <div className={styles.left}>
          {mainImageUrl && (
            <div className={styles.imageWrapper}>
              <img src={mainImageUrl} alt="About Image" className={styles.image} />
              
              {/* LOGO OVERLAY */}
              {logoImageUrl && (
                <img src={logoImageUrl} alt="Logo" className={styles.logo} />
              )}
            </div>
          )}
        </div>

        {/* RIGHT TEXT */}
        <div className={styles.right}>
          <p className={styles.snippet}>{shortStory}...</p>

          {/* Highlighted Points */}
          {points?.length > 0 && (
            <ul className={styles.pointList}>
              {points.map((item, index) => (
                <li key={index} className={styles.pointItem}>
                  <span className={styles.tickIcon}>✔</span>
                  {item}
                </li>
              ))}
            </ul>
          )}

          <Link href="/about/about" className={styles.knowMoreBtn}>
            Know More →
          </Link>
        </div>
      </div>
    </section>
  );
}
