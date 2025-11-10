"use client";
import React, { useEffect, useState } from "react";
import styles from "./ProductDetail.module.css";
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";

export default function ProductDetail({ slug }) {
  const [product, setProduct] = useState(null);
  const [openSection, setOpenSection] = useState(null); // for collapsible blocks

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(
          `http://localhost:1337/api/products?filters[slug][$eq]=${slug}&populate=*`
        );
        const data = await res.json();

        if (data.data && data.data.length > 0) {
          const p = data.data[0];
          setProduct({
            id: p.id,
            name: p.name,
            description: p.description,
            price: p.price,
            sku: p.sku,
            category: p.category,
            quantity_in_stock: p.quantity_in_stock,
            detail: p.detail,
            additional: p.additional,
            images: p.images || [],
            slug: p.slug,
          });
        } else {
          setProduct(null);
        }
      } catch (err) {
        console.error(err);
        setProduct(null);
      }
    }

    fetchProduct();
  }, [slug]);

  if (!product) return <p className={styles.center}>Product not found.</p>;

  const imgObj = product.images[0];
  const imgUrl =
    imgObj?.formats?.medium?.url ||
    imgObj?.formats?.small?.url ||
    imgObj?.url ||
    "/placeholder.png";

  const renderBlocks = (blocks) => {
    if (!blocks) return null;
    return blocks.map((block, idx) => (
      <p key={idx}>{block.children.map((child) => child.text).join(" ")}</p>
    ));
  };

  const toggleSection = (section) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  return (
    <div className={styles.wrapper}>
      {/* Top Section */}
      <div className={styles.topSection}>
        <div className={styles.imageWrapper}>
          <img
            src={`http://localhost:1337${imgUrl}`}
            alt={product.name}
            className={styles.image}
          />
        </div>

        <div className={styles.info}>
          <h1 className={styles.title}>{product.name}</h1>

          <p className={styles.meta}>
            <strong>SKU:</strong> {product.sku || "-"}
          </p>
          <p className={styles.meta}>
            <strong>Category:</strong> {product.category || "N/A"}
          </p>
          <p className={styles.meta}>
            <strong>In Stock:</strong> {product.quantity_in_stock || 0}
          </p>

          <p className={styles.price}>€{Number(product.price).toFixed(2)}</p>
          <p className={styles.desc}>{product.description}</p>

          {/* Collapsible Sections */}
          {product.detail && (
            <div className={styles.dropdown}>
              <div
                className={styles.dropdownHeader}
                onClick={() => toggleSection("detail")}
              >
                <h3>Details</h3>
                <span className={styles.icon}>
                  {openSection === "detail" ? "−" : "+"}
                </span>
              </div>
              <div
                className={`${styles.dropdownContent} ${
                  openSection === "detail" ? styles.open : ""
                }`}
              >
                {renderBlocks(product.detail)}
              </div>
            </div>
          )}

          {product.additional && (
            <div className={styles.dropdown}>
              <div
                className={styles.dropdownHeader}
                onClick={() => toggleSection("additional")}
              >
                <h3>Additional Info</h3>
                <span className={styles.icon}>
                  {openSection === "additional" ? "−" : "+"}
                </span>
              </div>
              <div
                className={`${styles.dropdownContent} ${
                  openSection === "additional" ? styles.open : ""
                }`}
              >
                {renderBlocks(product.additional)}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <div className={styles.reviewSection}>
        <h2 className={styles.reviewTitle}>Customer Reviews</h2>
        <ReviewList productId={product.id} />
        <div className={styles.reviewFormWrapper}>
          <ReviewForm productId={product.id} />
        </div>
      </div>
    </div>
  );
}
