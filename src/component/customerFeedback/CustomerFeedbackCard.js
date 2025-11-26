"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCustomerFeedback } from "../../lib/features/customerFeedback/customerfeedbackSlice";
import styles from "./CustomerFeedbackCard.module.css";

export default function CustomerFeedbackCard() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(
    (state) => state.customerFeedback
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchCustomerFeedback());
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (items.length) {
        setCurrentIndex((prev) => (prev + 2) % items.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [items]);

  const prev = () => {
    setCurrentIndex((prev) => (prev - 2 + items.length) % items.length);
  };

  const next = () => {
    setCurrentIndex((prev) => (prev + 2) % items.length);
  };

  if (loading) return <p className="text-center mt-10">Loading feedback...</p>;
  if (error)
    return (
      <p className="text-center mt-10 text-red-500">Error: {error}</p>
    );
  if (!items.length)
    return <p className="text-center mt-10">No feedback yet.</p>;

  const firstCard = items[currentIndex];
  const secondCard = items[(currentIndex + 1) % items.length];

  const getImageUrl = (feedback) =>
    feedback?.Picture?.formats?.thumbnail?.url
      ? `http://localhost:1337${feedback.Picture.formats.thumbnail.url}`
      : "/default-avatar.jpg";

  return (
    <>
      <div className={styles.headerwrpper}>
        <div className={styles.header}>Testimonial</div>
        <div className={styles.subheader}>What Our Customers Are Saying</div>
      </div>

      <section className={styles.wrapper}>
        <div className={styles.feedbackContainer}>
          <button className={styles.navButton} onClick={prev}>
            &lt;
          </button>

          <div className={styles.cardContainer}>
            {[firstCard, secondCard].map((feedback) => (
              <div key={feedback.id} className={styles.card}>
                
                {/* ⭐ NEW: Top Circular Image */}
                <div className={styles.cardImg}>
                  <img
                    src={getImageUrl(feedback)}
                    alt={feedback.Name}
                  />
                </div>

                {/* CARD TEXT */}
                <div className={styles.cardInfo}>
                  <p className={styles.textBody}>“{feedback.Review}”</p>
                  <p className={styles.textTitle}>{feedback.Name}</p>
                  <p className={styles.stockholder}>{feedback.Stockholde}</p>
                </div>
              </div>
            ))}
          </div>

          <button className={styles.navButton} onClick={next}>
            &gt;
          </button>
        </div>
      </section>
    </>
  );
}
