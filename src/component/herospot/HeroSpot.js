import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHero } from "../../lib/features/hero/heroSlice";
import styles from "./HeroSpot.module.css";

export default function HeroSpot() {
  const dispatch = useDispatch();
  const { data: hero, loading, error } = useSelector(state => state.hero);

  console.log("Hero state:", hero);

  useEffect(() => {
    if (!hero) dispatch(fetchHero());
  }, [dispatch, hero]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!hero) return <div>No hero data available</div>;

  // Extract slogan text from rich-text blocks
  const sloganText = Array.isArray(hero.slogan)
    ? hero.slogan.map(block =>
        Array.isArray(block.children)
          ? block.children.map(c => c.text).join(" ")
          : ""
      ).join(" ")
    : "";

  // Use the first background media
  const bgUrl = Array.isArray(hero.backgroundMedia) && hero.backgroundMedia[0]?.url
    ? `http://localhost:1337${hero.backgroundMedia[0].url}`
    : "";

  return (
    <section className={styles.hero} style={{ backgroundImage: `url(${bgUrl})` }}>
      <div className={styles.overlay}>
        {/* Logo / Top text */}
        <div className={styles.logo}>🚀 My Company</div>

        {/* Hero title */}
        <h1 className={styles.title}>{hero.title}</h1>

        {/* Hero slogan */}
        <p className={styles.slogan}>{sloganText}</p>
      </div>
    </section>
  );
}
