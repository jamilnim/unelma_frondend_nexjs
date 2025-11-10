"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews } from "../../lib/features/product/reviewSlice";
import styles from "./ReviewList.module.css";

export default function ReviewList({ productId }) {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.reviews);

  useEffect(() => {
    if (productId) dispatch(fetchReviews(productId));
  }, [dispatch, productId]);

  if (loading) return <p className={styles.center}>Loading reviews...</p>;
  if (error) return <p className={styles.center}>Error: {error}</p>;
  if (!items.length) return <p className={styles.center}>No reviews yet.</p>;

  return (
    <div className={styles.reviewList}>
      <h3>Customer Reviews</h3>
      {items.map((rev) => {
        // Use direct properties from API response
        const r = rev.attributes || rev;
        const author = r.author_name || "Anonymous";
        const rating = r.rating || 0;
        const comment = r.comment || "";
        const date = r.createdAt
          ? new Date(r.createdAt).toLocaleDateString()
          : "";

        return (
          <div key={rev.id} className={styles.reviewCard}>
            <div className={styles.header}>
              <strong>{author}</strong>
              <span>{"⭐".repeat(rating)}</span>
            </div>
            {comment && <p className={styles.comment}>{comment}</p>}
            <p className={styles.date}>{date}</p>
          </div>
        );
      })}
    </div>
  );
}
