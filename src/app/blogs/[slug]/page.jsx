// app/blogs/[slug]/page.jsx
import Image from "next/image";
import Link from "next/link";
import styles from "../BlogDetail.module.css";

const STRAPI = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

/** Fetch the post using populate=* */
async function fetchPost(slug) {
  const url = `${STRAPI}/api/blogs?filters[slug][$eq]=${encodeURIComponent(
    slug
  )}&populate=*`;
  const res = await fetch(url, { cache: "no-store" });
  const text = await res.text();

  let json = null;
  try {
    json = JSON.parse(text);
  } catch (e) {
    json = { raw: text };
  }

  return { ok: res.ok, status: res.status, url, json };
}

/** Render Rich Text (simplified for paragraphs) */
function renderRichText(content) {
  if (!content) return null;
  return content.map((block, idx) => {
    if (block.type === "paragraph") {
      const text = (block.children || []).map((c) => c.text || "").join("");
      return (
        <p key={idx} className={styles.fadeInUp}>
          {text}
        </p>
      );
    }

    return (
      <pre key={idx} className={`${styles.fallbackBlock} ${styles.fadeInUp}`}>
        {JSON.stringify(block)}
      </pre>
    );
  });
}

export default async function Page({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) {
    return (
      <main className={styles.errorContainer}>
        <h1>Invalid request</h1>
        <p>Missing slug parameter.</p>
        <Link href="/blogs" className={styles.backToBlog}>
          ← Back to Blog Posts
        </Link>
      </main>
    );
  }

  const result = await fetchPost(slug);

  if (!result.ok) {
    return (
      <main className={styles.errorContainer}>
        <h1>Server error fetching post</h1>
        <pre>{JSON.stringify(result.json, null, 2)}</pre>
        <Link href="/blogs" className={styles.backToBlog}>
          ← Back to Blog Posts
        </Link>
      </main>
    );
  }

  const dataArr = result.json?.data || [];
  if (!Array.isArray(dataArr) || dataArr.length === 0) {
    return (
      <main className={styles.errorContainer}>
        <h1>Post not found</h1>
        <p>
          No post matched the slug <strong>{slug}</strong>.
        </p>
        <Link href="/blogs" className={styles.backToBlog}>
          ← Back to Blog Posts
        </Link>
      </main>
    );
  }

  const post = dataArr[0];
  const item = post.attributes ?? post;

  const coverField = item.cover?.data ?? item.cover;
  let coverUrl = null;
  if (coverField) {
    const first = Array.isArray(coverField) ? coverField[0] : coverField;
    const url = first?.attributes?.url ?? first?.url ?? null;
    if (url) coverUrl = url.startsWith("http") ? url : `${STRAPI}${url}`;
  }

  const publishedDate = item.publishedAt
    ? new Date(item.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const content = item.content ?? [];
  const tags = item.tags ?? [];

  return (
    <article className={styles.detailPage}>
      <header className={`${styles.header} ${styles.fadeInUp}`}>
        <h1 className={styles.title}>{item.title}</h1>
        <div className={styles.meta}>
          <time>{publishedDate}</time>
        </div>
        {coverUrl && (
          <div className={`${styles.coverWrapper} ${styles.fadeInUp}`}>
            <Image
              src={coverUrl}
              alt={item.title}
              width={1200}
              height={600}
              className={styles.cover}
              unoptimized
            />
          </div>
        )}
      </header>

      <section className={styles.content}>
        {item.excerpt && (
          <p className={`${styles.excerpt} ${styles.fadeInUp}`}>
            {item.excerpt}
          </p>
        )}
        <div className={styles.richText}>{renderRichText(content)}</div>

        {Array.isArray(tags) && tags.length > 0 && (
          <div className={`${styles.tags} ${styles.fadeInUp}`}>
            {tags.map((t, i) => (
              <span key={i} className={styles.tag}>
                {typeof t === "string" ? t : JSON.stringify(t)}
              </span>
            ))}
          </div>
        )}
      </section>

      <footer className={`${styles.footer} ${styles.fadeInUp}`}>
        <Link href="/blogs" className={styles.backToBlog}>
          ← Back to All Blog Posts
        </Link>
      </footer>
    </article>
  );
}
