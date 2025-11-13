// app/blogs/[slug]/page.jsx

const STRAPI = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

/** Fetch the post using populate=* to avoid validation errors during dev */
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

function renderRichText(content) {
  if (!content) return null;

  return content.map((block, idx) => {
    if (block.type === "paragraph") {
      const text = (block.children || []).map((c) => c.text || "").join("");
      return <p key={idx}>{text}</p>;
    }

    // fallback for unknown blocks
    return (
      <pre key={idx} style={{ whiteSpace: "pre-wrap" }}>
        {JSON.stringify(block)}
      </pre>
    );
  });
}

export default async function Page({ params }) {
  const resolvedParams = await params; // params can be a Promise in some Next setups
  const slug = resolvedParams?.slug;

  if (!slug) {
    return (
      <main style={{ padding: 40, textAlign: "center" }}>
        <h1>Invalid request</h1>
        <p>Missing slug parameter.</p>
      </main>
    );
  }

  const result = await fetchPost(slug);

  if (!result.ok) {
    return (
      <main
        style={{ padding: 24, fontFamily: "Inter, system-ui, -apple-system" }}
      >
        <h1>Server error fetching post</h1>
        <p>
          <strong>Request URL:</strong> {result.url}
        </p>
        <p>
          <strong>Status:</strong> {result.status}
        </p>
        <pre
          style={{
            whiteSpace: "pre-wrap",
            background: "#f6f6f6",
            padding: 12,
            borderRadius: 6,
          }}
        >
          {JSON.stringify(result.json, null, 2)}
        </pre>
        <p>
          <a href="/blogs">Back to posts</a>
        </p>
      </main>
    );
  }

  const dataArr = result.json?.data || [];

  if (!Array.isArray(dataArr) || dataArr.length === 0) {
    return (
      <main style={{ padding: 40, textAlign: "center" }}>
        <h1>Post not found</h1>
        <p>
          No post matched the slug <strong>{slug}</strong>. Check the slug in
          Strapi admin and ensure the post is published.
        </p>
        <p>
          <a href="/blogs">Back to posts</a>
        </p>
      </main>
    );
  }

  const post = dataArr[0];
  const item = post.attributes ? post.attributes : post;

  // Robust cover extraction — supports multiple Strapi shapes
  let coverUrl = null;
  const coverField = item.cover?.data ?? item.cover;
  if (coverField) {
    const first = Array.isArray(coverField) ? coverField[0] : coverField;
    const url = first?.attributes?.url ?? first?.url ?? null;
    if (url) coverUrl = url.startsWith("http") ? url : `${STRAPI}${url}`;
  }

  return (
    <article
      style={{
        maxWidth: 900,
        margin: "3rem auto",
        padding: "0 1rem",
        fontFamily: "Inter, system-ui, -apple-system",
      }}
    >
      <header>
        <h1 style={{ marginBottom: 8 }}>{item.title}</h1>
        <div style={{ color: "#666", marginBottom: 12 }}>
          <time>
            {item.publishedAt
              ? new Date(item.publishedAt).toLocaleDateString()
              : ""}
          </time>
        </div>

        {coverUrl && (
          <div
            style={{
              marginBottom: 16,
              borderRadius: 8,
              overflow: "hidden",
              background: "#f3f3f3",
            }}
          >
            <img
              src={coverUrl}
              alt={item.title}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        )}
      </header>

      <section style={{ marginTop: 12, lineHeight: 1.7 }}>
        {item.excerpt && (
          <p style={{ fontStyle: "italic", color: "#444" }}>{item.excerpt}</p>
        )}
        <div>{renderRichText(item.content)}</div>
      </section>
    </article>
  );
}
