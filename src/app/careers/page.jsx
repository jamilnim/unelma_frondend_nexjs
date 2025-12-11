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
    return (jobs || []).filter((job) => {
      const attrs = job?.attributes || job || {};
      const matchesLocation =
        locationFilter === "All" || attrs.location === locationFilter;
      const matchesCategory =
        categoryFilter === "All" || attrs.category === categoryFilter;
      return matchesLocation && matchesCategory;
    });
  }, [jobs, locationFilter, categoryFilter]);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.pretitle}>Careers at Unelma</p>
          <h1 className={styles.title}>Build the future with us</h1>
          <p className={styles.subtitle}>
            Join a diverse team crafting modern digital platforms. Explore roles
            that fit your skills and ambitions.
          </p>
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
      </section>

      <section className={styles.filters}>
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
      </section>

      <section className={styles.listing}>
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
