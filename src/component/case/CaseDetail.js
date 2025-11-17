"use client";
import styles from "./CaseDetail.module.css";
import AskQuoteButton from "../inquiry/AskQuoteButton";
import CaseCardHighlight from "./CaseCardHighlight";

export default function CaseDetail({ item }) {
  if (!item) return <p>Case details not available.</p>;

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
    Gallery,
  } = item;

  let topImageUrl = null;
  if (Array.isArray(topImage) && topImage.length > 0) {
    topImageUrl = `http://localhost:1337${topImage[0].url}`;
  }

  const overviewText =
    overview
      ?.map((block) => block.children?.map((child) => child.text).join(" "))
      .join("\n") ?? "";

  const resultText =
    result
      ?.map((block) => block.children?.map((child) => child.text).join(" "))
      .join("\n") ?? "";

  const galleryImages = Array.isArray(Gallery) ? Gallery : [];

  const infoData = [
    { icon: "/icon/customer.png", label: "Client", value: client },
    { icon: "/icon/budget.png", label: "Budget", value: `€${budget}` },
    { icon: "/icon/time-management.png", label: "Duration", value: duration },
    { icon: "/icon/calendar.png", label: "Completed", value: completedDate },
  ];

  return (
    <div className={styles.pageWrapper}>
      {/* MAIN DETAIL CARD */}
      <div className={styles.detailCard}>
        {topImageUrl && (
          <img
            src={topImageUrl}
            alt={projectName}
            className={styles.heroImage}
          />
        )}

        <h1 className={styles.title}>{projectName}</h1>
        {category && <p className={styles.category}>{category}</p>}

        <div className={styles.mainContent}>
          {/* LEFT COLUMN - Info Cards */}
          <div className={styles.leftColumn}>
            {infoData.map((info, index) => (
              <div key={index} className={styles.infoCard}>
                <img
                  src={info.icon}
                  alt={`${info.label} icon`}
                  className={styles.infoIcon}
                />
                <div className={styles.infoLabel}>{info.label}</div>
                <div className={styles.infoValue}>{info.value}</div>
              </div>
            ))}
          </div>

          {/* RIGHT COLUMN - Details */}
          <div className={styles.rightColumn}>
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
                <div className={styles.galleryGrid}>
                  {galleryImages.map((img) => (
                    <img
                      key={img.id}
                      src={`http://localhost:1337${img.url}`}
                      alt={img.name || `${projectName} image`}
                      className={styles.galleryImg}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ASK QUOTE BUTTON */}
        <div className={styles.askQuoteButtonWrapper}>
          <AskQuoteButton subject="Hot Store Inquiry" />
        </div>
      </div>

      {/* HIGHLIGHT CARD BELOW MAIN CARD */}
      <div className={styles.highlightCardWrapper}>
        <CaseCardHighlight />
      </div>
    </div>
  );
}
