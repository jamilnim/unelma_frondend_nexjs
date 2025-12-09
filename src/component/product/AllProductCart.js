"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../lib/features/product/productSlice";
import Link from "next/link";
import styles from "./AllProductCart.module.css";

export default function AllProductCart({ excludeSlug }) {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // 10% description shortener
  const shortDescription = (text) => {
    if (!text) return "";
    const limit = Math.ceil(text.length * 0.1);
    return text.slice(0, limit) + (text.length > limit ? "..." : "");
  };

  if (loading) {
    return (
      <div className={styles.skeletonWrapper}>
        {[1, 2, 3].map((i) => (
          <div key={i} className={styles.skeletonCard}>
            <div className="card">
              <div className="card-1"></div>

              <div className="right">
                <div className="card-2"></div>
                <div className="card-3"></div>
                <div className="card-3"></div>
                <div className="card-3"></div>

                <div className="bottom">
                  <div className="card-4"></div>
                  <div className="card-4"></div>
                  <div className="card-4"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) return <p className={styles.center}>Error: {error}</p>;

  const filteredItems = excludeSlug
    ? items.filter((p) => p.slug !== excludeSlug)
    : items;

  if (!filteredItems.length)
    return <p className={styles.center}>No other products found</p>;

  return (
    <div className={styles.wrapper}>
      {filteredItems.map((product) => {
        const imgObj = product.images?.[0];
        const imgUrl =
          imgObj?.formats?.thumbnail?.url ||
          imgObj?.formats?.small?.url ||
          imgObj?.url ||
          "/placeholder.png";

        return (
          <Link
            key={product.id}
            href={`/productPage/${product.slug}`}
            className={styles.card}
          >
            {/* LEFT IMAGE */}
            <div className={styles.left}>
              <img
                src={`http://localhost:1337${imgUrl}`}
                alt={product.name}
                className={styles.image}
              />
            </div>

            {/* RIGHT CONTENT */}
            <div className={styles.rightContent}>
              <p className={styles.name}>{product.name}</p>

              <p className={styles.description}>
                {shortDescription(product.description)}
              </p>

              <p className={styles.price}>€{product.price}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
