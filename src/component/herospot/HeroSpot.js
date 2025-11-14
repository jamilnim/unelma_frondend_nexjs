"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHero } from "../../lib/features/hero/heroSlice";
import { motion } from "framer-motion";
import CountUp from "./CountUp";
import styles from "./HeroSpot.module.css";
import AskQuoteButton from "../inquiry/AskQuoteButton";

const HeroSpot = () => {
  const dispatch = useDispatch();
  const { data: hero, loading, error } = useSelector((state) => state.hero);

  useEffect(() => {
    dispatch(fetchHero());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!hero) return <p>No Hero Data</p>;

  const title = hero.title || "No Title";
  const slogan = hero.slogan?.[0]?.children?.[0]?.text || "No Slogan";
  const bgUrl = hero.backgroundMedia?.[0]?.url
    ? `http://localhost:1337${hero.backgroundMedia[0].url}`
    : null;
  const logoUrl = hero.logo?.[0]?.url
    ? `http://localhost:1337${hero.logo[0].url}`
    : null;

  // FULL numbers for counting animation
  const statsData = [
    {
      value: 1000000,
      label: "Users Engaged through Custom Platform Solutions",
    },
    { value: 3000000, label: "App & Platform Downloads Worldwide" },
    { value: "#1", label: "Rated Digital Wallet Platform in Nepal" },
  ];

  return (
    <section
      className={styles.hero}
      style={{
        backgroundImage: bgUrl ? `url(${bgUrl})` : "none",
      }}
    >
      <div className={styles.gradientOverlay}></div>

      <div className={styles.overlay}>
        {logoUrl && <img src={logoUrl} alt="Logo" className={styles.logo} />}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className={styles.title}
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className={styles.slogan}
        >
          {slogan}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className={styles.buttonGroup}
        >
          <AskQuoteButton subject="Hot Store Inquiry" />
        </motion.div>

        {/* Stats */}
        <div className={styles.stats}>
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              className={styles.statBox}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {stat.value === "#1" ? (
                <h3>#1</h3>
              ) : (
                <h3>
                  <CountUp end={stat.value} />
                  {stat.value >= 1000000 ? "+" : ""}
                </h3>
              )}
              <p>{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className={styles.scrollIndicator}>
          <span></span>
        </div>
      </div>
    </section>
  );
};

export default HeroSpot;
