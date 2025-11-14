"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchCases } from "../../lib/features/cases/caseSlice";
import styles from "./CaseCardHighlight.module.css";
import NextButton from "../../component/tools/NextButton";

export default function CaseCardHighlight() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.caseStudies);
  const scrollRef = useRef(null);

  useEffect(() => {
    dispatch(fetchCases());
  }, [dispatch]);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (container) {
      const cardWidth = container.offsetWidth / 4.5;
      container.scrollBy({
        left: direction === "left" ? -cardWidth : cardWidth,
        behavior: "smooth",
      });
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <section className={styles.wrapper}>
      <h1 className={styles.heading}>Recent Works</h1>

      <div className={styles.carouselWrapper}>
        <div className={styles.scrollContainer} ref={scrollRef}>
          {Array.isArray(items) && items.length > 0 ? (
            items.map((item) => {
              const title = item.projectName ?? "Untitled";
              const imgUrl =
                Array.isArray(item.topImage) && item.topImage[0]?.url
                  ? `http://localhost:1337${item.topImage[0].url}`
                  : "https://placehold.co/600x400?text=No+Image";

              return (
                <div
                  key={item.id}
                  className={styles.card}
                  onClick={() => router.push(`/case/${item.case_id}`)}
                >
                  <img src={imgUrl} alt={title} className={styles.cardImage} />
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{title}</h3>
                    <p className={styles.cardDesc}>{item.category}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No cases found.</p>
          )}
        </div>

        {/* Buttons below carousel */}
        <div className={styles.buttonsRow}>
          <NextButton onClick={() => scroll("left")} flip>
            
          </NextButton>
          <NextButton onClick={() => scroll("right")}></NextButton>
        </div>
      </div>
    </section>
  );
}
