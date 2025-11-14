"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./BlogPage.module.css";
import { fetchLatestPosts, getStrapiMedia } from "../../../lib/features/blogs/api";

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

  useEffect(() => {
    let mounted = true;
    fetchLatestPosts({ pageSize: 50 })
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

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Subscribed with ${email}!`); // Replace with API call
    setEmail("");
  };

  return (
    <main className={styles.page}>
      {/* Hero / Info Section */}
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.title}>Tech Talks by Unelma Platform</h1>
          <p className={styles.lead}></p>
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
        <div className={styles.headerRow}>
          <h2 className={styles.sectionTitle}>Latest Insights</h2>
          <p className={styles.sectionMeta}>{posts.length} posts</p>
        </div>

        {loading ? (
          <p className={styles.message}>Loading posts…</p>
        ) : error ? (
          <p className={styles.messageError}>{error}</p>
        ) : posts.length === 0 ? (
          <p className={styles.message}>No posts yet.</p>
        ) : (
          <div className={styles.grid}>
            {posts.map((post) => {
              const item = post.attributes ? post.attributes : post;
              const coverUrl = getStrapiMedia(item.cover);
              const excerpt =
                item.excerpt && item.excerpt.trim().length
                  ? item.excerpt
                  : (extractPlainText(item.content || "") || "").slice(0, 160) +
                    "...";

              return (
                <article key={post.id} className={styles.card}>
                  <Link
                    href={`/blogs/${item.slug}`}
                    className={styles.cardLink}
                  >
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
                    </div>

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
        )}
      </section>
    </main>
  );
}
