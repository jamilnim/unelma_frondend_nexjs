import Link from "next/link";

import styles from "../jobDetail.module.css";
import { BASE_URL } from "../../../lib/api";
import ApplicationForm from "../../../component/ApplicationForm/ApplicationForm";

/* ------------------------ FETCH JOB ------------------------ */
async function fetchJob(id) {
  try {
    const res = await fetch(`${BASE_URL}/api/job-postings/${id}?populate=*`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    const json = await res.json();
    return json.data || null; // Strapi v5 returns flat data
  } catch {
    return null;
  }
}

/* ------------------------- FORMAT DATE ---------------------- */
const formatDate = (dateString) => {
  if (!dateString) return "Open until filled";

  try {
    return new Intl.DateTimeFormat("en", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date(dateString));
  } catch {
    return dateString;
  }
};

/* ------------------ RICH TEXT RENDERER ---------------------- */
const renderBlocks = (blocks) => {
  if (!blocks) return null;

  if (typeof blocks === "string") {
    return <div dangerouslySetInnerHTML={{ __html: blocks }} />;
  }

  return blocks.map((block, idx) => {
    if (block.type === "paragraph") {
      return (
        <p key={idx}>
          {block.children?.map((child, i) => {
            if (child.bold) return <strong key={i}>{child.text}</strong>;
            if (child.italic) return <em key={i}>{child.text}</em>;
            if (child.code) return <code key={i}>{child.text}</code>;
            return <span key={i}>{child.text}</span>;
          })}
        </p>
      );
    }

    if (block.type === "heading") {
      const Tag = `h${block.level || 3}`;
      return <Tag key={idx}>{block.children?.map((c) => c.text).join("")}</Tag>;
    }

    if (block.type === "list") {
      const ListTag = block.format === "ordered" ? "ol" : "ul";
      return (
        <ListTag key={idx}>
          {block.children?.map((item, i) => (
            <li key={i}>{item.children?.map((c) => c.text).join("")}</li>
          ))}
        </ListTag>
      );
    }

    return null;
  });
};

/* ---------------------------- PAGE --------------------------- */
export default async function JobDetailPage({ params }) {
  const { id } = await params;

  const job = await fetchJob(id);

  if (!job) notFound();

  // FIXED: Strapi v5 returns flat data, not attributes
  const data = job;

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroInner}>
          <div className={styles.heroTop}>
            <Link href="/careers" className={styles.backLink}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Careers
            </Link>
            <a className={styles.applyLink} href="#apply-now">
              Jump to Apply
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
          </div>

          <p className={styles.pretitle}>Open role</p>
          <h1 className={styles.title}>{data.title}</h1>
          <p className={styles.subtitle}>
            Shape the next wave of digital experiences with a team that prizes
            craft, collaboration, and meaningful impact.
          </p>

          <div className={`${styles.meta} ${styles.revealBlock}`}>
            <span>{data.location || "Remote"}</span>
            <span>{data.category || "General"}</span>
            <span>
              {(data.type || "full-time")
                .replace(/-/g, " ")
                .replace(/\b\w/g, (l) => l.toUpperCase())}
            </span>
            <span>
              {(data.experienceLevel || "junior").replace(/\b\w/g, (l) =>
                l.toUpperCase()
              )}
            </span>
          </div>

          <div className={`${styles.heroBadges} ${styles.revealBlock}`}>
            <div className={styles.badgeCard}>
              <span className={styles.badgeLabel}>Deadline</span>
              <span className={styles.badgeValue}>
                {formatDate(data.deadline)}
              </span>
            </div>
            <div className={styles.badgeCard}>
              <span className={styles.badgeLabel}>Workstyle</span>
              <span className={styles.badgeValue}>
                {(data.type || "full-time")
                  .replace(/-/g, " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
              </span>
            </div>
            <div className={styles.badgeCard}>
              <span className={styles.badgeLabel}>Experience</span>
              <span className={styles.badgeValue}>
                {(data.experienceLevel || "junior").replace(/\b\w/g, (l) =>
                  l.toUpperCase()
                )}
              </span>
            </div>
          </div>
        </div>
      </header>

      <section className={styles.body}>
        <div className={`${styles.infoBand} ${styles.revealBlock}`}>
          <div>
            <p className={styles.bandLabel}>Location</p>
            <p className={styles.bandValue}>{data.location || "Remote"}</p>
          </div>
          <div>
            <p className={styles.bandLabel}>Team</p>
            <p className={styles.bandValue}>{data.category || "General"}</p>
          </div>
          <div>
            <p className={styles.bandLabel}>Role type</p>
            <p className={styles.bandValue}>
              {(data.type || "full-time")
                .replace(/-/g, " ")
                .replace(/\b\w/g, (l) => l.toUpperCase())}
            </p>
          </div>
          <div>
            <p className={styles.bandLabel}>Experience</p>
            <p className={styles.bandValue}>
              {(data.experienceLevel || "junior").replace(/\b\w/g, (l) =>
                l.toUpperCase()
              )}
            </p>
          </div>
        </div>

        <div className={`${styles.bodyGrid} ${styles.revealBlock}`}>
          <article className={`${styles.description} ${styles.revealBlock}`}>
            <div className={styles.sectionHeader}>
              <div>
                <p className={styles.sectionEyebrow}>Role overview</p>
                <h2>What you will do</h2>
              </div>
              <span className={styles.sectionTag}>Impact-first</span>
            </div>

            <div className={styles.richText}>
              {data.description ? (
                renderBlocks(data.description)
              ) : (
                <p>No description provided for this role.</p>
              )}
            </div>
          </article>

          <aside className={`${styles.sidebar} ${styles.revealSlow}`}>
            <div className={`${styles.infoCard} ${styles.revealBlock}`}>
              <h3>Role snapshot</h3>
              <ul>
                <li>
                  <strong>Location:</strong> {data.location || "Remote"}
                </li>
                <li>
                  <strong>Team:</strong> {data.category || "General"}
                </li>
                <li>
                  <strong>Workstyle:</strong>{" "}
                  {(data.type || "full-time")
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </li>
                <li>
                  <strong>Experience:</strong>{" "}
                  {(data.experienceLevel || "junior").replace(/\b\w/g, (l) =>
                    l.toUpperCase()
                  )}
                </li>
                <li>
                  <strong>Deadline:</strong> {formatDate(data.deadline)}
                </li>
              </ul>
            </div>

            <ApplicationForm jobId={job.documentId || job.id} />
          </aside>
        </div>
      </section>
    </main>
  );
}
