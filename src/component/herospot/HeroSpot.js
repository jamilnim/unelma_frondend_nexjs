import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHero } from "../../lib/features/hero/heroSlice";
import styles from "./HeroSpot.module.css";

const HeroSpot = () => {
  const dispatch = useDispatch();
  const { data: hero, loading, error } = useSelector((state) => state.hero);
  console.log("🟢 Hero state in component:", hero);

  useEffect(() => {
    dispatch(fetchHero());
  }, [dispatch]);

  console.log("🟢 Hero state in component:", hero);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!hero) return <p>No Hero Data</p>;

  const title = hero.title || "No Title";
  const slogan =
    hero.slogan?.[0]?.children?.[0]?.text || "No Slogan";
  const bgUrl = hero.backgroundMedia?.[0]?.url
    ? `http://localhost:1337${hero.backgroundMedia[0].url}`
    : null;
  const logoUrl = hero.logo?.[0]?.url
    ? `http://localhost:1337${hero.logo[0].url}`
    : null;

  return (
    <section
      className={styles.hero}
      style={{
        backgroundImage: bgUrl ? `url(${bgUrl})` : "none",
      }}
    >
      <div className={styles.overlay}>
        {logoUrl && <img src={logoUrl} alt="Logo" className={styles.logo} />}
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.slogan}>{slogan}</p>
      </div>
    </section>
  );
};

export default HeroSpot;
