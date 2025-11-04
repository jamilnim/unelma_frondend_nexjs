'use client';
import styles from './CaseDetail.module.css';

export default function CaseDetail({ item }) {
  if (!item || !item.attributes) {
    return <p>Case details not available.</p>;
  }

  const {
    projectName,
    overview,
    result,
    client,
    budget,
    duration,
    gallery,
    completedDate,
    category,
  } = item.attributes;

  const galleryImages = gallery?.data || [];

  return (
    <div className={styles.detail}>
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
        <div
          className={styles.richText}
          dangerouslySetInnerHTML={{ __html: overview }}
        />
      </div>

      <div className={styles.section}>
        <h2>Result</h2>
        <div
          className={styles.richText}
          dangerouslySetInnerHTML={{ __html: result }}
        />
      </div>

      {galleryImages.length > 0 && (
        <div className={styles.gallerySection}>
          <h2>Gallery</h2>
          <div className={styles.gallery}>
            {galleryImages.map((img) => (
              <img
                key={img.id}
                src={`http://localhost:1337${img.attributes.url}`}
                alt={`${projectName} gallery image`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
