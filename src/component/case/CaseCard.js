'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchCases } from "../../lib/features/cases/caseSlice";
import styles from "./CaseCard.module.css";

export default function CaseCard() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.caseStudies);

  useEffect(() => {
    dispatch(fetchCases());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.grid}>
      {Array.isArray(items) && items.length > 0 ? (
        items.map((item, idx) => {
          const attributes = item?.attributes ?? item ?? {};
          const title =
            attributes.projectName ??
            attributes.project_name ??
            "Untitled";

          const top = attributes.topImage;
          let imgUrl = null;
          const topData = top?.data ?? top;

          if (Array.isArray(topData) && topData.length > 0) {
            const first = topData[0];
            imgUrl =
              first?.attributes?.url ??
              first?.url ??
              first?.attributes?.formats?.small?.url ??
              null;
          } else if (topData && typeof topData === "object") {
            imgUrl =
              topData?.attributes?.url ??
              topData?.url ??
              topData?.attributes?.formats?.small?.url ??
              null;
          }

          const finalImg = imgUrl
            ? `http://localhost:1337${imgUrl}`
            : "https://via.placeholder.com/600x400?text=No+Image";

          return (
            <div
              key={item?.id ?? idx}
              className={styles.card}
              onClick={() => router.push(`/case/${item.id}`)}
            >
              <img src={finalImg} alt={title} />
              <h3>{title}</h3>
            </div>
          );
        })
      ) : (
        <p>No cases yet.</p>
      )}
    </div>
  );
}
