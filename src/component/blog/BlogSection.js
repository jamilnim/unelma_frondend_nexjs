"use client";

import { useEffect, useState } from "react";
import styles from "./BlogSection.module.css";
import { getStrapiMedia, fetchLatestPosts } from "../../lib/features/blogs/api";
import Link from "next/link";
import Image from "next/image";

export default function BlogSection() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestPosts()
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch posts:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading posts...</p>;

  if (posts.length === 0) return <p>No blog posts found.</p>;

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
          const attr = post || {};
          const cover = getStrapiMedia(attr.cover);
          return (
            <article key={post.id} className={styles.card}>
              <Link href={`/blogs/${attr.slug}`} className={styles.cardLink}>
                <div className={styles.mediaWrap}>
                  {cover ? (
                    <Image
                      src={cover}
                      alt={attr.title || "Post cover"}
                      width={800}
                      height={450}
                      className={styles.cover}
                      priority={false}
                    />
                  ) : (
                    <div className={styles.coverPlaceholder} />
                  )}
                </div>

                <div className={styles.content}>
                  <h3 className={styles.postTitle}>{attr.title}</h3>
                  <p className={styles.excerpt}>
                    {attr.excerpt || (attr.content || "").slice(0, 140) + "..."}
                  </p>
                  <time className={styles.time}>
                    {attr.publishedAt
                      ? new Date(attr.publishedAt).toLocaleDateString()
                      : ""}
                  </time>
                </div>
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
