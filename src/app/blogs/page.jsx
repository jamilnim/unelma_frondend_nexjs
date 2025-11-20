"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./BlogPage.module.css";
import { fetchLatestPosts, getStrapiMedia } from "../../lib/features/blogs/api";
import LoadingAnimation from "../../component/loading/LoadingAnimation";

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
          <h1 className={styles.title}>Tech Talks by Unelma Platform</h1>
          <p className={styles.lead}>
            Dive into our collection of articles, tutorials, and insights on
            software development, technology trends, and best practices.
          </p>

          {/* Subscribe Section */}
          <div className={styles.subscribeWrapper}>
            <div className={styles.subscribeContent}>
              <h3 className={styles.subscribeTitle}>Join Our Tech Insights</h3>
              <p className={styles.subscribeDesc}>
                Subscribe to receive exclusive articles, tutorials, and updates
                from Unelma Platforms directly in your inbox.
              </p>
              <form className={styles.subscribeForm} onSubmit={handleSubscribe}>
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
      </header>

      {/* Blog Section */}
      <section className={styles.container}>
        {/* Simplified Header/Filter Area */}
        <div className={styles.filterHeader}>
          <h2 className={styles.sectionTitle}>Latest Insights</h2>
          <div className={styles.categoryTabs}>
            {CATEGORIES.map((category) => (
              <button
                key={category}
                className={`${styles.categoryTab} ${
                  selectedCategory === category ? styles.activeTab : ""
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "4rem",
            }}
          >
            <LoadingAnimation />
          </div>
        ) : error ? (
          <p className={styles.messageError}>{error}</p>
        ) : posts.length === 0 ? (
          <p className={styles.message}>No posts yet.</p>
        ) : (
          <div className={styles.grid}>
            {posts.map((post) => (
              <article
                key={post.id}
                className={styles.card}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  transform: `perspective(1000px) rotateX(calc(var(--y-pos, 0) * -8deg)) rotateY(calc(var(--x-pos, 0) * 8deg))`,
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
                  </div>

                  {/* Card Body - Content */}
                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{post.title}</h3>
                    <p className={styles.cardExcerpt}>{post.excerpt}</p>

                    {/* Meta Row (Date & Likes) - At the bottom for professional finish */}
                    <div className={styles.metaRow}>
                      <div className={styles.metaItem}>
                        <svg
                          className={styles.metaIcon}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <span className={styles.time}>
                          {post.publishedDate}
                        </span>
                      </div>
                      <div className={styles.metaItem}>
                        <svg
                          className={styles.metaIcon}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <span className={styles.likes}>{post.likes}</span>
                      </div>
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
