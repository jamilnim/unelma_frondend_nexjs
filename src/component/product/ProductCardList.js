"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../lib/features/product/productSlice";
import { fetchHero } from "../../lib/features/hero/heroSlice";
import styles from "./ProductCardList.module.css";

export default function ProductCardList() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.product);
  const { data: heroData, loading: heroLoading } = useSelector(
    (state) => state.hero
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchHero());
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [items.length]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % items.length);
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));

  if (loading || heroLoading)
    return <p className={styles.center}>Loading products...</p>;
  if (error) return <p className={styles.center}>Error: {error}</p>;
  if (!items.length) return <p className={styles.center}>No products found</p>;

  const product = items[currentIndex];
  const imgObj = product.images?.[0];
  const imgUrl =
    imgObj?.formats?.medium?.url ||
    imgObj?.formats?.small?.url ||
    imgObj?.url ||
    "/placeholder.png";

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Our Products</h2>

      <div className={styles.wrapper}>
        {/* Left side text */}
        <div className={styles.heroText}>
          {heroData?.ourProduct ? (
            <p>{heroData.ourProduct}</p>
          ) : (
            <p>No hero text available</p>
          )}
        </div>

        {/* Right side carousel */}
        <div className={styles.carousel}>
          <div className={styles.card}>
            <img
              src={`http://localhost:1337${imgUrl}`}
              alt={product.name}
              className={styles.image}
            />
            <div className={styles.info}>
              <h3 className={styles.title}>{product.name}</h3>
              <p className={styles.price}>€{Number(product.price).toFixed(2)}</p>
              <p className={styles.desc}>
                {product.description?.slice(0, 120) ||
                  "No description available..."}
              </p>
              {product.slug ? (
                <Link href={`/productPage/${product.slug}`}>
                  <button className={styles.detailBtn}>View Details</button>
                </Link>
              ) : (
                <button className={styles.detailBtn} disabled>
                  No Details
                </button>
              )}
            </div>
          </div>

          <div className={styles.controls}>
            <button onClick={prevSlide} className={styles.navBtn}>
              ‹
            </button>
            <button onClick={nextSlide} className={styles.navBtn}>
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
