"use client";
import styles from "./CaseDetail.module.css";

export default function CaseDetail({ item }) {
  if (!item) return <p>Case details not available.</p>;

  // 🧠 Destructure fields directly (no item.attributes in Strapi v5)
  const {
    projectName,
    overview,
    result,
    client,
    budget,
    duration,
    completedDate,
    category,
    topImage,
    gallery,
  } = item;

  // 🖼️ Handle top image
  let topImageUrl = null;
  if (Array.isArray(topImage) && topImage.length > 0) {
    const img = topImage[0];
    topImageUrl = img?.url
      ? `http://localhost:1337${img.url}`
      : `http://localhost:1337${img?.formats?.small?.url}`;
  }

  // 🧾 Convert overview/result arrays into text safely
  const overviewText =
    overview?.map((block) =>
      block.children?.map((child) => child.text).join(" ")
    ).join("\n") ?? "";

  const resultText =
    result?.map((block) =>
      block.children?.map((child) => child.text).join(" ")
    ).join("\n") ?? "";

  // 🖼️ Gallery images
  const galleryImages = Array.isArray(gallery)
    ? gallery
    : gallery?.data || [];

  return (
    <div className={styles.detail}>
      {topImageUrl && (
        <img
          src={topImageUrl}
          alt={projectName}
          className={styles.heroImage}
        />
      )}

      <h1 className={styles.title}>{projectName}</h1>

      {category && (
        <p className={styles.category}>
          <strong>Category:</strong> {category}
        </p>
      )}

      <div className={styles.infoGrid}>
        <p><strong>Client:</strong> {client}</p>
        <p><strong>Budget:</strong> €{budget}</p>
        <p><strong>Duration:</strong> {duration}</p>
        <p><strong>Completed:</strong> {completedDate}</p>
      </div>

      <div className={styles.section}>
        <h2>Overview</h2>
        <p>{overviewText}</p>
      </div>

      <div className={styles.section}>
        <h2>Result</h2>
        <p>{resultText}</p>
      </div>

      {galleryImages.length > 0 && (
        <div className={styles.gallerySection}>
          <h2>Gallery</h2>
          <div className={styles.gallery}>
            {galleryImages.map((img) => (
              <img
                key={img.id}
                src={`http://localhost:1337${img.url || img?.attributes?.url}`}
                alt={`${projectName} image`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
