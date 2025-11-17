"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCustomerFeedback } from "../../lib/features/customerFeedback/customerfeedbackSlice";
import styles from "./CustomerFeedbackCard.module.css";

export default function CustomerFeedbackCard() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.customerFeedback);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchCustomerFeedback());
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (items.length) setCurrentIndex((prev) => (prev + 2) % items.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [items]);

  const prev = () => setCurrentIndex((prev) => (prev - 2 + items.length) % items.length);
  const next = () => setCurrentIndex((prev) => (prev + 2) % items.length);

  if (loading) return <p className="text-center mt-10">Loading feedback...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error: {error}</p>;
  if (!items.length) return <p className="text-center mt-10">No feedback yet.</p>;

  const firstCard = items[currentIndex];
  const secondCard = items[(currentIndex + 1) % items.length];

  const getImageUrl = (feedback) =>
    feedback?.Picture?.formats?.thumbnail?.url
      ? `http://localhost:1337${feedback.Picture.formats.thumbnail.url}`
      : "/default-avatar.jpg";

  return (
    <section className={styles.wrapper}>
      {/* Background Logo */}
      <div className={styles.backgroundLogo}>
        <img src="/unelma-logi.png" alt="Background Logo" />
      </div>

      <h2 className={styles.heading}>What Our Customers Think</h2>

      <div className={styles.feedbackContainer}>
        <button className={styles.navButton} onClick={prev}>
          &lt;
        </button>

        <div className={styles.cardContainer}>
          {[firstCard, secondCard].map((feedback) => (
            <div key={feedback.id} className={styles.card}>
              <div className={styles.left}>
                <img src={getImageUrl(feedback)} alt={feedback.Name} className={styles.image} />
                <h3 className={styles.name}>{feedback.Name}</h3>
                <p className={styles.stockholder}>{feedback.Stockholde}</p>
              </div>
              <div className={styles.right}>
                <p className={styles.review}>“{feedback.Review}”</p>
              </div>
            </div>
          ))}
        </div>

        <button className={styles.navButton} onClick={next}>
          &gt;
        </button>
      </div>
    </section>
  );
}
