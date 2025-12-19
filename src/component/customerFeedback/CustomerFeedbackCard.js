"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomerFeedback } from "../../lib/features/customerFeedback/customerfeedbackSlice";
import styles from "./CustomerFeedbackCard.module.css";

export default function CustomerFeedbackCard() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(
    (state) => state.customerFeedback
  );

  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchCustomerFeedback());
  }, [dispatch]);

  const pageCount = Math.ceil(items.length / 2);

  // Auto slide every 5 sec (2 cards at a time)
  useEffect(() => {
    if (pageCount <= 1) return;
    const timer = setInterval(() => {
      setPageIndex((prev) => (prev + 1) % pageCount);
    }, 5000);
    return () => clearInterval(timer);
  }, [pageCount]);

  const prev = () =>
    setPageIndex((prev) => (prev - 1 + pageCount) % pageCount);

  const next = () =>
    setPageIndex((prev) => (prev + 1) % pageCount);

  if (loading) return <p>Loading feedback...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!items.length) return <p>No feedback yet.</p>;

  const getImageUrl = (feedback) =>
    feedback?.Picture?.formats?.thumbnail?.url
      ? `http://localhost:1337${feedback.Picture.formats.thumbnail.url}`
      : "/default-avatar.jpg";

  // Split into pages of 2
  const pages = [];
  for (let i = 0; i < items.length; i += 2) {
    pages.push(items.slice(i, i + 2));
  }

  return (
    <>
      {/* Header */}
      <div className={styles.headerwrpper}>
        <div className={styles.header}>Testimonial</div>
        <div className={styles.subheader}>
          What Our Customers Are Saying
        </div>
      </div>

      {/* Carousel */}
      <section className={styles.wrapper}>
        <div className={styles.feedbackContainer}>
          <button className={styles.navButton} onClick={prev}>
            ‹
          </button>

          <div className={styles.viewport}>
            <div
              className={styles.track}
              style={{
                transform: `translateX(-${pageIndex * 100}%)`
              }}
            >
              {pages.map((group, idx) => (
                <div key={idx} className={styles.page}>
                  {group.map((feedback) => (
                    <div key={feedback.id} className={styles.card}>
                      <div className={styles.cardImg}>
                        <img
                          src={getImageUrl(feedback)}
                          alt={feedback.Name}
                        />
                      </div>

                      <img
                        src="/icon/quote_4992676 (1).png"
                        className={styles.quoteIcon}
                        alt="quote"
                      />

                      <p className={styles.textBody}>
                        “{feedback.Review}”
                      </p>
                      <p className={styles.textTitle}>
                        {feedback.Name}
                      </p>
                      <p className={styles.stockholder}>
                        {feedback.Stockholde}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <button className={styles.navButton} onClick={next}>
            ›
          </button>
        </div>
      </section>
    </>
  );
}
