"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAbout, selectAbout } from "../../lib/features/about/aboutSlice";
import { getStrapiImage } from "../../lib/api";
import StrengthBarChart from "./StrengthBarChart";
import GrowthLineChart from "./GrowthLineChart";
import AnyQueriesButton from "../tools/AnyQueriesButton";
import Link from "next/link";
import styles from "./AboutDetail.module.css";

import PageTransition from "../../component/animation/PageTransition";
import FadeInSection from "../../component/animation/FadeInSection";

export default function AboutDetail() {
  const dispatch = useDispatch();
  const about = useSelector(selectAbout);
  const loading = useSelector((state) => state.about.loading);

  useEffect(() => {
    dispatch(fetchAbout());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (!about) return null;

  const storyBlocks = about.detailStory || [];
  const first30 = Math.floor(storyBlocks.length * 0.3);
  const second30 = Math.floor(storyBlocks.length * 0.6);

  const firstPart = storyBlocks.slice(0, first30);
  const secondPart = storyBlocks.slice(first30, second30);
  const restPart = storyBlocks.slice(second30);

  const missionImage = getStrapiImage(about.missionImage);
  const visionImage = getStrapiImage(about.vissionImage);

  return (
    <PageTransition>
      <section className={styles.aboutDetailSection}>

        {/* HERO IMAGE */}
        {about.aboutImage?.[0] && (
          <FadeInSection>
            <div className={styles.waveClip}>
              <img
                src={getStrapiImage(about.aboutImage[0])}
                alt="About"
                className={styles.aboutImage}
              />
            </div>
          </FadeInSection>
        )}

        {/* FLOATING BUTTON */}
        <div className={styles.anyQueriesWrapper}>
          <Link href="/contact">
            <AnyQueriesButton />
          </Link>
        </div>

        {/* TITLE */}
        <FadeInSection>
          <h1 className={styles.title}>{about.title}</h1>
        </FadeInSection>

        {/* STORY */}
        <FadeInSection>
          <div className={styles.storyColumn}>
            {firstPart.map((block, i) => (
              <p key={i}>{block.children?.[0]?.text}</p>
            ))}
          </div>
        </FadeInSection>

        {/* MISSION */}
        <FadeInSection>
          <div className={styles.splitCard}>
            <div className={styles.splitText}>
              <h2>Mission</h2>
              <p>{about.mission}</p>
            </div>
            {missionImage && (
              <div className={styles.splitImage}>
                <img src={missionImage} alt="Mission" />
              </div>
            )}
          </div>
        </FadeInSection>

        {/* SECOND STORY */}
        <FadeInSection>
          <div className={styles.storyColumn}>
            {secondPart.map((block, i) => (
              <p key={i + first30}>{block.children?.[0]?.text}</p>
            ))}
          </div>
        </FadeInSection>

        {/* VISION */}
        <FadeInSection>
          <div className={`${styles.splitCard} ${styles.visionSplit}`}>
            {visionImage && (
              <div className={styles.splitImage}>
                <img src={visionImage} alt="Vision" />
              </div>
            )}
            <div className={styles.splitText}>
              <h2>Vision</h2>
              <p>{about.vision}</p>
            </div>
          </div>
        </FadeInSection>

        {/* FINAL STORY */}
        <FadeInSection>
          <div className={styles.storyColumn}>
            {restPart.map((block, i) => (
              <p key={i + second30}>{block.children?.[0]?.text}</p>
            ))}
          </div>
        </FadeInSection>

        {/* GRAPHS */}
        <FadeInSection>
          <div className={styles.graphsRow}>
            <div className={styles.graphWrapperSplit}>
              <div className={styles.graphText}>
                <p>{about.strengthtext}</p>
              </div>
              <div className={styles.graphComponent}>
                <h3>Our Strength</h3>
                <StrengthBarChart data={about.ourStrength} />
              </div>
            </div>

            <div className={styles.graphWrapperSplit}>
              <div className={styles.graphComponent}>
                <h3>Our Growth</h3>
                <GrowthLineChart data={about.users} />
              </div>
              <div className={styles.graphText}>
                <p>{about.grothText}</p>
              </div>
            </div>
          </div>
        </FadeInSection>

      </section>
    </PageTransition>
  );
}
