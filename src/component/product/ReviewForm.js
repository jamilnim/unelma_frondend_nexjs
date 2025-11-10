// src/component/product/ReviewForm.js
"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postReview, fetchReviews } from "../../lib/features/product/reviewSlice";
import styles from "./ReviewForm.module.css";

export default function ReviewForm({ productId }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ name: "", rating: 0, comment: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleRating = (value) => setForm({ ...form, rating: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      await dispatch(
        postReview({
          product: productId,
          author_name: form.name || "Anonymous",
          rating: Number(form.rating),
          comment: form.comment,
        })
      ).unwrap();

      // Refresh the reviews list
      dispatch(fetchReviews(productId));

      setSuccess(true);
      setForm({ name: "", rating: 0, comment: "" });
    } catch (err) {
      console.error("Submit failed:", err);
      alert("Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h3>Write a Review</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          className={styles.input}
        />
        <div className={styles.ratingBox}>
          <span>Rating:</span>
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              type="button"
              key={n}
              className={`${styles.star} ${n <= form.rating ? styles.active : ""}`}
              onClick={() => handleRating(n)}
            >
              ★
            </button>
          ))}
        </div>
        <textarea
          name="comment"
          placeholder="Write your comment..."
          value={form.comment}
          onChange={handleChange}
          className={styles.textarea}
        />
        <button type="submit" className={styles.btn} disabled={loading}>
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
      {success && <p className={styles.success}>Thank you for your review!</p>}
    </div>
  );
}
