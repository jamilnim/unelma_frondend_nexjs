"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./ProcessFlow.module.css";
import { ArrowBigRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProcessSteps } from "../../lib/features/process/processSlice";
import { getStrapiImage } from "../../lib/api";

export default function ProcessFlow() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.processSteps);

  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(true); // always visible

  useEffect(() => {
    dispatch(fetchProcessSteps());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (!items || items.length === 0) return <p>No steps found.</p>;

  // 🔥 SORT by processno ascending
  const sortedItems = [...items].sort((a, b) => a.processno - b.processno);

  return (
    <div className={styles.processFlowBackground}>
      <div className={styles.animateBase} ref={sectionRef}>
        <div className={styles.header}>Journey</div>
        <div className={styles.subheader}>Path to Success</div>

        <div className={styles.container}>
          {sortedItems.map((step, index) => {
            const staticUrl =
              getStrapiImage(step.sraticicon) || "/default-static.png";
            const iconUrl =
              getStrapiImage(step.icon) || "/default-icon.png";

            const stepName = step.processName || "Unnamed Step";

            return (
              <div key={step.id} className={styles.stepWrapper}>
                <div className={styles.stepBox}>
                  <div className={styles.iconWrap}>
                    <img
                      src={staticUrl}
                      alt="static"
                      className={styles.staticIcon}
                    />
                    <img
                      src={iconUrl}
                      alt={stepName}
                      className={styles.hoverIcon}
                    />
                  </div>

                  <div className={styles.textWrap}>{stepName}</div>
                </div>

                {index !== sortedItems.length - 1 && (
                  <div className={styles.arrowWrap}>
                    <ArrowBigRight className={styles.arrow} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
