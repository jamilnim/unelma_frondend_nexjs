"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContactHero } from "../../lib/features/contactHero/contactHeroSlice";
import styles from "./contactHerospot.module.css";

export default function ContactHeroSpot() {
  const dispatch = useDispatch();
  const { data: hero, loading } = useSelector((state) => state.contactHero);

  useEffect(() => {
    if (!hero) dispatch(fetchContactHero());
  }, [hero, dispatch]);

  if (loading || !hero) return null;

  // Pick best available format
  const img =
    hero.image?.formats?.large?.url ||
    hero.image?.formats?.medium?.url ||
    hero.image?.url ||
    null;

  const imgURL = img ? `http://localhost:1337${img}` : "/fallback.jpg";

  return (
    <div className={styles.hero} style={{ backgroundImage: `url(${imgURL})` }}>
      <div className={styles.overlay}>
        <h1>{hero.title}</h1>
        <p>{hero.subtitle}</p>
      </div>
    </div>
  );
}
