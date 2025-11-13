"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./HeroSpot.module.css";

const HeroSpot = () => {
  // Stats counters
  const [projects, setProjects] = useState(0);
  const [clients, setClients] = useState(0);
  const [awards, setAwards] = useState(0);

  useEffect(() => {
    const targetProjects = 120;
    const targetClients = 85;
    const targetAwards = 15;

    const duration = 2000; // 2 seconds
    let start = null;

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const progressPercent = Math.min(progress / duration, 1);

      setProjects(Math.floor(progressPercent * targetProjects));
      setClients(Math.floor(progressPercent * targetClients));
      setAwards(Math.floor(progressPercent * targetAwards));

      if (progress < duration) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <section className={styles.heroSection}>
      {/* Background Shapes */}
      <div className={styles.floatingShapes}>
        <div className={styles.shape1}></div>
        <div className={styles.shape2}></div>
        <div className={styles.shape3}></div>
      </div>

      {/* Tagline */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className={styles.tagline}
      >
        🌍 Featured Global Software Innovator
      </motion.div>

      {/* Main Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className={styles.heroTitle}
      >
        Innovate. Automate.{" "}
        <span className={styles.gradientText}>Elevate Your Business.</span>
      </motion.h1>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className={styles.heroSubtitle}
      >
        We are <strong>Unelma Platforms</strong> — a global software platform
        development company across Asia, the EU, and North America. Our mission
        is to create next-generation, business-specific solutions and offer
        expert IT consulting that drives innovation and efficiency.
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className={styles.buttonGroup}
      >
        <button className={styles.primaryBtn}>Explore Our Platforms</button>
        <button className={styles.secondaryBtn}>Request A Quote</button>
      </motion.div>

      {/* Stats Counters */}
      <div className={styles.stats}>
        <div className={styles.statBox}>
          <h3>{projects}+</h3>
          <p>Projects Completed</p>
        </div>
        <div className={styles.statBox}>
          <h3>{clients}+</h3>
          <p>Clients Served</p>
        </div>
        <div className={styles.statBox}>
          <h3>{awards}+</h3>
          <p>Awards Won</p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={styles.scrollIndicator}>
        <span></span>
      </div>
    </section>
  );
};

export default HeroSpot;
