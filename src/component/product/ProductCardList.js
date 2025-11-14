"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../lib/features/product/productSlice";
import { fetchHero } from "../../lib/features/hero/heroSlice";
import styles from "./ProductCardList.module.css";
import AskQuoteButton from "../inquiry/AskQuoteButton";

export default function ProductCardList() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.product);
  const { data: heroData, loading: heroLoading } = useSelector(
    (state) => state.hero
  );

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchHero());
  }, [dispatch]);

  if (loading || heroLoading)
    return <p className={styles.center}>Loading products...</p>;
  if (error) return <p className={styles.center}>Error: {error}</p>;
  if (!items.length) return <p className={styles.center}>No products found</p>;

  const duplicatedItems = [...items, ...items];

  return (
    <div className={styles.container}>

      <h2 className={styles.heading}>Our Products</h2>

      <div className={styles.contentWrapper}>

        {/* LEFT SIDE – HERO TEXT */}
        <div className={styles.heroText}>
          {heroData?.ourProduct ? (
            <p>{heroData.ourProduct}</p>
          ) : (
            <p>No hero text available</p>
          )}
          <AskQuoteButton subject="Hot Store Inquiry" />
        </div>

        {/* RIGHT – PRODUCT SLIDER */}
        <div className={styles.slider}>
          <div className={styles.list}>
            {duplicatedItems.map((product, index) => {
              const imgObj = product.images?.[0];
              const imgUrl =
                imgObj?.formats?.medium?.url ||
                imgObj?.formats?.small?.url ||
                imgObj?.url ||
                "/placeholder.png";

              return (
                <div className={styles.item} key={index}>
                  <div className={styles.card}>
                    <img
                      src={`http://localhost:1337${imgUrl}`}
                      alt={product.name}
                      className={styles.image}
                    />
                    <div className={styles.cardInfo}>
                      <h3>{product.name}</h3>
                      <p className={styles.price}>
                        €{Number(product.price).toFixed(2)}
                      </p>
                      <p className={styles.desc}>
                        {product.description?.slice(0, 60) ||
                          "No description available..."}
                      </p>

                      {product.slug ? (
                        <Link href={`/productPage/${product.slug}`}>
                          <button className={styles.detailBtn}>
                            View Details
                          </button>
                        </Link>
                      ) : (
                        <button className={styles.detailBtn} disabled>
                          No Details
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
