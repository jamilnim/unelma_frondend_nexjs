"use client";
import Link from "next/link";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./BlogPage.module.css";
import {
  fetchLatestPosts,
  getStrapiMedia,
} from "../../../lib/features/blogs/api";
import LoadingAnimation from "../../../component/loading/LoadingAnimation";

// Hardcoded categories/sort options (Simplified UI structure)
const CATEGORIES = ["All", "Design", "Tech", "AI", "Most Liked"];
// Placeholder for sort logic
const SORT_OPTIONS = ["Most Liked", "Newest", "Oldest"];

// Helper function to simulate data
const simulateCardData = (post) => {
  const item = post.attributes ? post.attributes : post;

  const date = item.publishedAt
    ? new Date(item.publishedAt)
    : new Date("11/1/2024");
  const likes = Math.floor(Math.random() * 10 + 1) * 1000;
  const publishedDate = date.toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });
  const excerpt =
    item.excerpt && item.excerpt.trim().length
      ? item.excerpt
      : (extractPlainText(item.content || "") || "").slice(0, 100) + "...";

  return {
    ...item,
    publishedDate,
    likes: likes > 9999 ? `${Math.round(likes / 1000)}K` : likes,
    coverUrl: getStrapiMedia(item.cover),
    excerpt,
    slug: item.slug,
    id: post.id,
  };
};

function extractPlainText(content) {
  if (!content) return "";
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return "";
  return content
    .map((block) => (block.children || []).map((c) => c.text || "").join(""))
    .join(" ");
}

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSort, setSelectedSort] = useState("Most Liked");
  // State for the Tilt Effect (mouse position)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let mounted = true;
    fetchLatestPosts({ pageSize: 50 })
      .then((data) => {
        if (!mounted) return;
        setPosts(data.map(simulateCardData) || []);
      })
      .catch((err) => {
        console.error("Failed to fetch posts:", err);
        setError(err?.message || "Failed to load posts");
      })
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Subscribed with ${email}!`);
    setEmail("");
  };

  // Tilt Effect Handler
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const bounds = card.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;

    // Normalize coordinates to -1 to 1 for tilt calculation
    const xNormalized = (x / bounds.width - 0.5) * 2;
    const yNormalized = (y / bounds.height - 0.5) * 2;

    card.style.setProperty("--x-pos", xNormalized.toFixed(2));
    card.style.setProperty("--y-pos", yNormalized.toFixed(2));
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.setProperty("--x-pos", "0");
    card.style.setProperty("--y-pos", "0");
  };

  return (
    <main className={styles.page}>
      {/* Hero / Info Section */}
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <div className={styles.heroPills}>
              <span className={styles.pill}>Insights</span>
              <span className={styles.pillSecondary}>Unelma Platform</span>
            </div>
            <h1 className={styles.title}>Tech Talks by Unelma Platform</h1>
            <p className={styles.lead}>
              Dive into our collection of articles, tutorials, and insights on
              software development, technology trends, and best practices.
            </p>

            <div className={styles.heroMetaRow}>
              <div className={styles.metaChip}>Weekly drops</div>
              <div className={styles.metaChip}>UI/UX · AI · Dev</div>
              <div className={styles.metaChip}>Trusted by builders</div>
            </div>

            {/* Subscribe Section */}
            <div className={styles.subscribeWrapper}>
              <div className={styles.subscribeContent}>
                <h3 className={styles.subscribeTitle}>
                  Join Our Tech Insights
                </h3>
                <p className={styles.subscribeDesc}>
                  Subscribe to receive exclusive articles, tutorials, and
                  updates from Unelma Platforms directly in your inbox.
                </p>
                <form
                  className={styles.subscribeForm}
                  onSubmit={handleSubscribe}
                >
                  <input
                    className={styles.subscribeInput}
                    placeholder="Enter your email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button className={styles.subscribeBtn} type="submit">
                    Subscribe Now
                  </button>
                </form>
                <p className={styles.subscribeNote}>
                  No spam. Just pure insights from our experts.
                </p>
              </div>
            </div>
          </div>

          <div className={styles.heroPanel}>
            <div className={styles.statCard}>
              <span className={styles.statValue}>50+</span>
              <span className={styles.statLabel}>In-depth articles</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statValue}>Weekly</span>
              <span className={styles.statLabel}>Fresh drops</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statValue}>Global</span>
              <span className={styles.statLabel}>Engineering voices</span>
            </div>
          </div>
        </div>
      </header>

      {/* Blog Section */}
      <section className={styles.container}>
        {/* Simplified Header/Filter Area */}
        <div className={styles.filterHeader}>
          <div className={styles.sectionCopy}>
            <p className={styles.kicker}>Latest from the lab</p>
            <h2 className={styles.sectionTitle}>Latest Insights</h2>
            <p className={styles.sectionSubtitle}>
              Curated stories, engineering notes, and thoughtful takes on
              product craft.
            </p>
          </div>

          <div className={styles.toolbar}>
            <div className={styles.categoryTabs}>
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  className={`${styles.categoryTab} ${
                    selectedCategory === category ? styles.activeTab : ""
                  }`}
                  onClick={() => setSelectedCategory(category)}
                  type="button"
                >
                  {category}
                </button>
              ))}
            </div>

            <div className={styles.filterBar}>
              <div className={styles.searchWrap}>
                <input
                  className={styles.searchInput}
                  type="search"
                  placeholder="Search articles (UI only)"
                  aria-label="Search articles"
                />
              </div>
              <div className={styles.sortWrap}>
                <label className={styles.sortLabel} htmlFor="sort-select">
                  Sort
                </label>
                <select
                  id="sort-select"
                  className={styles.sortSelect}
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.badges}>
              <span className={styles.badgeSoft}>Premium reads</span>
              <span className={styles.badgeSoft}>UI/UX + AI + Dev</span>
            </div>
          </div>
        </div>

        {loading ? (
          <div className={styles.loaderWrap}>
            <LoadingAnimation />
          </div>
        ) : error ? (
          <p className={styles.messageError}>{error}</p>
        ) : posts.length === 0 ? (
          <p className={styles.message}>No posts yet.</p>
        ) : (
          <div className={styles.grid}>
            {posts.map((post, index) => (
              <article
                key={post.id}
                className={`${styles.card} ${styles.revealCard}`}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  transform: `perspective(1000px) rotateX(calc(var(--y-pos, 0) * -8deg)) rotateY(calc(var(--x-pos, 0) * 8deg))`,
                  animationDelay: `${index * 80}ms`,
                }}
              >
                <Link href={`/blogs/${post.slug}`} className={styles.cardLink}>
                  {/* Media Wrap - Image at the top for better visual impact */}
                  <div className={styles.mediaWrap}>
                    {post.coverUrl ? (
                      <Image
                        src={post.coverUrl}
                        alt={post.title || "cover"}
                        width={800}
                        height={450}
                        className={styles.cover}
                        unoptimized
                      />
                    ) : (
                      <div className={styles.coverPlaceholder} />
                    )}
                    <div className={styles.mediaOverlay} />
                    <div className={styles.cardBadgeRow}>
                      <span className={styles.cardBadge}>Featured</span>
                      <span className={styles.cardBadgeGhost}>
                        {post.publishedDate}
                      </span>
                    </div>
                  </div>

                  {/* Card Body - Content */}
                  <div className={styles.cardBody}>
                    <div className={styles.metaTop}>
                      <span className={styles.badge}>Editorial</span>
                      <div className={styles.metaTiny}>
                        <span className={styles.time}>
                          {post.publishedDate}
                        </span>
                        <span className={styles.dot} />
                        <span className={styles.likes}>{post.likes} likes</span>
                      </div>
                    </div>
                    <h3 className={styles.cardTitle}>{post.title}</h3>
                    <p className={styles.cardExcerpt}>{post.excerpt}</p>

                    {/* Meta Row (Date & Likes) - At the bottom for professional finish */}
                    <div className={styles.metaRow}>
                      <span className={styles.readMore}>
                        Read article <span aria-hidden>→</span>
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
