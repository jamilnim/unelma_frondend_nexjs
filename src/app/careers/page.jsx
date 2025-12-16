"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./careers.module.css";
import { StoreProvider } from "../StoreProvider";
import { fetchJobs, selectJobsState } from "../../lib/features/jobs/jobsSlice";
import JobCard from "../../component/JobCard/JobCard";
import LoadingAnimation from "../../component/loading/LoadingAnimation";

function CareersContent() {
  const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector(selectJobsState);
  const [locationFilter, setLocationFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [experienceSort, setExperienceSort] = useState("none");

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const uniqueLocations = useMemo(() => {
    const values = new Set(
      (jobs || [])
        .map((job) => job?.attributes?.location || job?.location)
        .filter(Boolean)
    );
    return ["All", ...Array.from(values)];
  }, [jobs]);

  const uniqueCategories = useMemo(() => {
    const values = new Set(
      (jobs || [])
        .map((job) => job?.attributes?.category || job?.category)
        .filter(Boolean)
    );
    return ["All", ...Array.from(values)];
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    const experienceRank = {
      internship: 0,
      junior: 1,
      mid: 2,
      senior: 3,
    };

    const normalizeLevel = (raw) =>
      (raw || "")
        .toString()
        .toLowerCase()
        .replace(/\s|-/g, "")
        .replace("level", "");

    const rankFor = (job) => {
      const attrs = job?.attributes || job || {};
      const levelKey =
        normalizeLevel(attrs.experienceLevel) ||
        normalizeLevel(attrs.experience);
      return experienceRank[levelKey] ?? Number.MAX_SAFE_INTEGER;
    };

    const base = (jobs || []).filter((job) => {
      const attrs = job?.attributes || job || {};
      const matchesLocation =
        locationFilter === "All" || attrs.location === locationFilter;
      const matchesCategory =
        categoryFilter === "All" || attrs.category === categoryFilter;
      return matchesLocation && matchesCategory;
    });

    if (experienceSort === "none") {
      return [...base].sort((a, b) => rankFor(a) - rankFor(b));
    }

    const targetRank =
      experienceRank[experienceSort] ?? Number.MAX_SAFE_INTEGER;

    return [...base].sort((a, b) => {
      const ra = rankFor(a);
      const rb = rankFor(b);
      const aIsTarget = ra === targetRank;
      const bIsTarget = rb === targetRank;
      if (aIsTarget && !bIsTarget) return -1;
      if (!aIsTarget && bIsTarget) return 1;
      return ra - rb;
    });
  }, [jobs, locationFilter, categoryFilter, experienceSort]);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        {/* Elevated hero with dual-column storytelling and culture highlights */}
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <div className={styles.pretitleRow}>
              <p className={styles.pretitle}>Careers at Unelma</p>
              <span className={styles.pill}>Now hiring</span>
            </div>
            <h1 className={styles.title}>Build the future with us</h1>
            <p className={styles.subtitle}>
              Join a diverse team crafting modern digital platforms. Explore
              roles that fit your skills and ambitions.
            </p>
            <div className={styles.heroCtas}>
              <a className={styles.primaryCta} href="#open-roles">
                View open roles
              </a>
              <a className={styles.ghostCta} href="#filters">
                Refine opportunities
              </a>
            </div>
            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <span className={styles.statValue}>{jobs?.length || 0}</span>
                <span className={styles.statLabel}>Open roles</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>3</span>
                <span className={styles.statLabel}>Continents</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>Hybrid</span>
                <span className={styles.statLabel}>Work anywhere</span>
              </div>
            </div>
          </div>
          <div className={styles.heroPanel}>
            <div className={styles.heroPanelHeader}>
              <span className={styles.panelBadge}>Life at Unelma</span>
              <p className={styles.panelTitle}>
                Human-first culture, bold product thinking.
              </p>
              <p className={styles.panelCopy}>
                We pair ambitious missions with thoughtful craft—mentorship,
                flexible work, and world-class tools so you can do your best
                work.
              </p>
            </div>
            <ul className={styles.panelList}>
              <li>Hybrid-first rhythm with purposeful on-sites</li>
              <li>Dedicated learning budget and mentorship tracks</li>
              <li>Inclusive benefits and wellness-first policies</li>
            </ul>
          </div>
        </div>
      </section>

      <div
        className={`${styles.filtersSection} ${styles.revealBlock} ${styles.revealSlow}`}
        id="filters"
      >
        {/* Premium filter card keeps controls prominent without altering logic */}
        <div className={`${styles.filtersHeader} ${styles.revealBlock}`}>
          <div>
            <p className={styles.sectionEyebrow}>Find your next role</p>
            <h2 className={styles.sectionTitle}>Tailor opportunities to you</h2>
            <p className={styles.sectionSubtitle}>
              Filter by where you want to work and the discipline that energizes
              you.
            </p>
          </div>
          <div className={styles.filterSummary}>
            <span className={styles.summaryValue}>{filteredJobs.length}</span>
            <span className={styles.summaryLabel}>matching roles</span>
          </div>
        </div>
        <section className={`${styles.filters} ${styles.revealBlock}`}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Location</label>
            <select
              className={styles.select}
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              {uniqueLocations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Department</label>
            <select
              className={styles.select}
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {uniqueCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Experience</label>
            <select
              className={styles.select}
              value={experienceSort}
              onChange={(e) => setExperienceSort(e.target.value)}
            >
              <option value="none">Any level</option>
              <option value="junior">Junior first</option>
              <option value="mid">Mid first</option>
              <option value="senior">Senior first</option>
            </select>
          </div>
        </section>
      </div>

      <section
        className={`${styles.listing} ${styles.revealBlock}`}
        id="open-roles"
      >
        {/* Structured listing header frames the job cards for quick scanning */}
        <div className={`${styles.listingHeader} ${styles.revealBlock}`}>
          <div>
            <p className={styles.sectionEyebrow}>Open positions</p>
            <h3 className={styles.sectionTitle}>Roles built for impact</h3>
          </div>
          <p className={styles.sectionSubtitle}>
            Every role collaborates across product, engineering, design, and
            operations to ship experiences that matter.
          </p>
        </div>
        {loading && (
          <div className={styles.loadingWrapper}>
            <LoadingAnimation />
            <p className={styles.loadingText}>Loading open roles...</p>
          </div>
        )}
        {error && !loading && (
          <div className={styles.messageError}>
            <strong>Failed to load roles</strong>
            <p>{error}</p>
            <button
              className={styles.retryBtn}
              onClick={() => dispatch(fetchJobs())}
            >
              Try Again
            </button>
          </div>
        )}
        {!loading && !error && filteredJobs.length === 0 && jobs.length > 0 && (
          <div className={styles.message}>
            <p>No roles match those filters.</p>
            <button
              className={styles.clearBtn}
              onClick={() => {
                setLocationFilter("All");
                setCategoryFilter("All");
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
        {!loading && !error && jobs.length === 0 && (
          <p className={styles.message}>
            No open positions at the moment. Check back soon!
          </p>
        )}
        {!loading && !error && filteredJobs.length > 0 && (
          <div className={styles.grid}>
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default function CareersPage() {
  return (
    <StoreProvider>
      <CareersContent />
    </StoreProvider>
  );
}
