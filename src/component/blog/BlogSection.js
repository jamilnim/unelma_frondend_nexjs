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
        <h2 className={styles.title}>Latest from our blog</h2>
        <Link
          href="/blogs"
          className={styles.seeMore}
          aria-label="See all blogs"
        >
          See all blogs →
        </Link>
      </div>

      <div className={styles.grid}>
        {posts.map((post) => {
          const item = post.attributes || post;
          const coverUrl = getStrapiMedia(item.cover);

          const excerpt =
            item.excerpt && item.excerpt.trim().length
              ? item.excerpt
              : (extractPlainText(item.content || "") || "").slice(0, 160) +
                "...";

          return (
            <article key={post.id} className={styles.card}>
              <Link href={`/blogs/${item.slug}`} className={styles.cardLink}>
                {/* Blog Card Image */}
                <div className={styles.mediaWrap}>
                  {coverUrl ? (
                    <Image
                      src={coverUrl}
                      alt={item.title || "cover"}
                      width={800}
                      height={450}
                      className={styles.cover}
                      unoptimized // important for localhost images
                    />
                  ) : (
                    <div className={styles.coverPlaceholder} />
                  )}
                </div>

                {/* Blog Card Content */}
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardExcerpt}>{excerpt}</p>
                  <div className={styles.metaRow}>
                    <time className={styles.time}>
                      {item.publishedAt
                        ? new Date(item.publishedAt).toLocaleDateString()
                        : ""}
                    </time>
                    <span className={styles.readMore}>Read →</span>
                  </div>
                </div>
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
