"use client";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { fetchDashboardHero } from "../../lib/features/dashboardHero/dashboardHeroSlice";
import styles from "./DashboardHero.module.css";

// Use HOST and PORT from env for image URLs
const STRAPI_URL = `http://${process.env.HOST}:${process.env.PORT}`;

export default function Dashboard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);
  const dashboardHeroState = useSelector((state) => state.dashboardHero);
  const hero = dashboardHeroState?.hero;

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      dispatch(fetchDashboardHero());
    }
  }, [user, router, dispatch]);

  if (!user) return null;

  return (
    <div style={{ padding: "2rem" }}>
      {hero && (
        <section
          className={styles.dashboardHero}
          style={{
            backgroundImage: `url(${STRAPI_URL}${hero?.attributes?.backgroundImage?.data?.attributes?.url})`,
          }}
        >
          <div className={styles.dashboardHeroContent}>
            <h1 className={styles.dashboardHeroTitle}>
              {hero?.attributes?.title}
            </h1>
            <p className={styles.dashboardHeroSubtitle}>
              {hero?.attributes?.subtitle}
            </p>
            <a
              href={hero?.attributes?.ctaLink}
              className={styles.dashboardHeroCTA}
            >
              {hero?.attributes?.ctaText}
            </a>
          </div>
        </section>
      )}

      <div>
        <h2>Welcome, {user.username}</h2>
        <p>Explore your dashboard content below.</p>
      </div>
    </div>
  );
}
