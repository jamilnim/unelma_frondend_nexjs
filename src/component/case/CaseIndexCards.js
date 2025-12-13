"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchCases } from "../../lib/features/cases/caseSlice";
import styles from "./CaseIndexCards.module.css";

export default function CaseIndexCards() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.caseStudies);

  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    dispatch(fetchCases());
  }, [dispatch]);

  const categories = [
    "all",
    ...new Set(items?.map((item) => item.category?.toLowerCase())),
  ];

  const filteredItems =
    selectedCategory === "all"
      ? items
      : items.filter(
          (item) => item.category?.toLowerCase() === selectedCategory
        );

  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      {/* CATEGORY BAR */}
      <div className={styles.categoryBar}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`${styles.categoryBtn} ${
              selectedCategory === cat ? styles.active : ""
            }`}
          >
            {cat.replace("-", " ")}
          </button>
        ))}
      </div>

      {/* CARD GRID */}
      <div className={styles.grid}>
        {filteredItems?.map((item) => {
          const imgUrl =
            Array.isArray(item.topImage) && item.topImage.length > 0
              ? `http://localhost:1337${item.topImage[0]?.url}`
              : "https://placehold.co/300x300?text=No+Image";

          return (
            <div
              key={item.id}
              className={styles.card}
              onClick={() => router.push(`/case/${item.case_id}`)}
            >
              <img src={imgUrl} alt={item.projectName} />
              <div className={styles.info}>
                <h5>{item.projectName}</h5>
                <p>{item.shortDescription || "View case details"}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
