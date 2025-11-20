"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./BlogSection.module.css";
import { fetchLatestPosts, getStrapiMedia } from "../../lib/features/blogs/api";

// Helper to extract plain text from Strapi rich text blocks
function extractPlainText(content) {
  if (!content) return "";
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return "";
  return content
    .map((block) => (block.children || []).map((c) => c.text || "").join(""))
    .join(" ");
}

export default function BlogSection() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Utility to simulate category/tag ---
  const getCategory = (title) => {
    if (title.toLowerCase().includes("design")) return "Design";
    if (title.toLowerCase().includes("tech")) return "Technology";
    if (title.toLowerCase().includes("ai")) return "Artificial Intelligence";
    if (title.toLowerCase().includes("platform")) return "Platform Update";
    return "Development";
  };
  // -----------------------------------------------------------------

  useEffect(() => {
    let mounted = true;

    fetchLatestPosts({ pageSize: 8 })
      .then((data) => {
        if (!mounted) return;
        setPosts(data || []);
      })
      .catch((err) => {
        console.error("Failed to fetch posts:", err);
        setError(err?.message || "Failed to load posts");
      })
      .finally(() => mounted && setLoading(false));

    return () => (mounted = false);
  }, []);

  if (loading) return <p className={styles.message}>Loading posts…</p>;
  if (error) return <p className={styles.messageError}>{error}</p>;
  if (!posts.length) return <p className={styles.message}>No posts yet.</p>;

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Latest Insights & News</h2>
        <Link
          href="/blogs"
          className={styles.seeMore}
          aria-label="See all blogs"
        >
          View All Articles →
        </Link>
      </div>

      <div className={styles.grid}>
        {posts.map((post) => {
          const item = post.attributes || post;
          const coverUrl = getStrapiMedia(item.cover);
          const category = getCategory(item.title || "");

          const excerpt =
            item.excerpt && item.excerpt.trim().length
              ? item.excerpt
              : (extractPlainText(item.content || "") || "").slice(0, 90) +
                "..."; // Shorter for refined layout

          return (
            <article key={post.id} className={styles.card}>
              <Link href={`/blogs/${item.slug}`} className={styles.cardLink}>
                {/* Blog Card Image Area */}
                <div className={styles.mediaWrap}>
                  {coverUrl ? (
                    <Image
                      src={coverUrl}
                      alt={item.title || "cover"}
                      width={800}
                      height={450}
                      className={styles.cover}
                      unoptimized
                    />
                  ) : (
                    <div className={styles.coverPlaceholder} />
                  )}
                  {/* Category Tag directly on the image */}
                  <span className={styles.categoryTag}>{category}</span>
                </div>

                {/* Blog Card Content */}
                <div className={styles.cardBody}>
                  {/* Refined Meta - Date only */}
                  <div className={styles.metaTop}>
                    <time className={styles.time}>
                      {item.publishedAt
                        ? new Date(item.publishedAt).toLocaleDateString(
                            "en-US",
                            { year: "numeric", month: "short", day: "numeric" }
                          )
                        : "TBD"}
                    </time>
                  </div>

                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardExcerpt}>{excerpt}</p>
                </div>

                {/* Animated Read More Button */}
                <div className={styles.readMoreButton}>
                  <span>Read Article</span>
                  <svg
                    className={styles.arrowIcon}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </div>
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
