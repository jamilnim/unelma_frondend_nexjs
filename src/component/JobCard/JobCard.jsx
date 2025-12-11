import Link from "next/link";
import styles from "./JobCard.module.css";

const formatDate = (dateString) => {
  if (!dateString) return "Open until filled";
  try {
    return new Intl.DateTimeFormat("en", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(dateString));
  } catch (e) {
    return dateString;
  }
};

export default function JobCard({ job }) {
  const data = job?.attributes || job || {};
  const title = data.title || "Untitled role";
  const location = data.location || "Remote / Flexible";
  const category = data.category || "General";
  const type = data.type || "full-time";
  const experience = data.experienceLevel || "junior";
  const deadline = data.deadline;
  const id = job?.documentId;

  // Format type and experience for display
  const formatLabel = (str) =>
    str.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <article className={styles.card} aria-label={`Job posting: ${title}`}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <div
          className={styles.badges}
          aria-label="Job type and experience level"
        >
          <span
            className={`${styles.badge} ${styles[type] || ""}`}
            aria-label={`Job type: ${formatLabel(type)}`}
          >
            {formatLabel(type)}
          </span>
          <span
            className={styles.badge}
            aria-label={`Experience: ${formatLabel(experience)}`}
          >
            {formatLabel(experience)}
          </span>
        </div>
      </div>

      <div className={styles.meta} aria-label="Job location and category">
        <span className={styles.metaItem}>
          <svg
            width="14"
            height="14"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          {location}
        </span>
        <span className={styles.metaItem}>
          <svg
            width="14"
            height="14"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          {category}
        </span>
      </div>

      <div className={styles.footer}>
        <div className={styles.deadline}>
          <span className={styles.deadlineLabel}>Apply by</span>
          <span className={styles.deadlineDate}>{formatDate(deadline)}</span>
        </div>
        <Link
          href={`/careers/${id}`}
          className={styles.cta}
          aria-label={`View details for ${title}`}
        >
          View Details
          <svg
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </article>
  );
}
