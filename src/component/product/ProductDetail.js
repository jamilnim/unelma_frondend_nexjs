"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../lib/features/cart/cartSlice";
import styles from "./ProductDetail.module.css";
import { useRouter } from "next/navigation";
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";
import { FaShoppingCart } from "react-icons/fa";   // <-- ADDED

export default function ProductDetail({ slug }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [openSection, setOpenSection] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(
          `http://localhost:1337/api/products?filters[slug][$eq]=${slug}&populate=*`
        );
        const data = await res.json();
        if (data?.data?.length > 0) {
          const p = data.data[0];
          setProduct({
            id: p.id,
            name: p.name || "No Name",
            description: p.description || "",
            price: p.price || 0,
            sku: p.sku || "-",
            category: p.category || "N/A",
            quantity_in_stock: p.quantity_in_stock || 0,
            detail: p.detail || null,
            additional: p.additional || null,
            images: p.images || [],
            slug: p.slug || "",
          });
        } else setProduct(null);
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

  const handleAddToCart = () => {
    if (!user) {
      sessionStorage.setItem("loginForCart", "true");
      sessionStorage.setItem("cartRedirectSlug", product.slug);
      router.push("/register");
      return;
    }

    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: Number(product.price) || 0,
        slug: product.slug,
        image: imgUrl ? `http://localhost:1337${imgUrl}` : null,
        quantity: Number(qty),
      })
    );
  };

  const toggleSection = (section) =>
    setOpenSection((prev) => (prev === section ? null : section));

  const renderBlocks = (blocks) =>
    blocks?.map((b, idx) => <p key={idx}>{b.children?.map((c) => c.text).join(" ")}</p>);

  return (
    <div className={styles.wrapper}>
  
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
          <p className={styles.meta}><strong>SKU:</strong> {product.sku}</p>
          <p className={styles.meta}><strong>Category:</strong> {product.category}</p>
          <p className={styles.meta}><strong>In Stock:</strong> {product.quantity_in_stock}</p>
          <p className={styles.price}>€{Number(product.price).toFixed(2)}</p>
          <p className={styles.desc}>{product.description}</p>

          <div className={styles.buyRow}>
            <label>
              Qty:
              <input
                type="number"
                min="1"
                value={qty}
                onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
                style={{ width: 64, marginLeft: 8 }}
              />
            </label>

            {/* ================= ADD CART BUTTON WITH ICON ================= */}
            <button className={styles.addBtn} onClick={handleAddToCart}>
              <FaShoppingCart className={styles.cartIcon} />
              Add to Cart
            </button>
          </div>

          {product.detail && (
            <div className={styles.dropdown}>
              <div className={styles.dropdownHeader} onClick={() => toggleSection("detail")}>
                <h3>Details</h3>
                <span>{openSection === "detail" ? "−" : "+"}</span>
              </div>
              <div className={`${styles.dropdownContent} ${openSection === "detail" ? styles.open : ""}`}>
                {renderBlocks(product.detail)}
              </div>
            </div>
          )}

          {product.additional && (
            <div className={styles.dropdown}>
              <div className={styles.dropdownHeader} onClick={() => toggleSection("additional")}>
                <h3>Additional Info</h3>
                <span>{openSection === "additional" ? "−" : "+"}</span>
              </div>
              <div className={`${styles.dropdownContent} ${openSection === "additional" ? styles.open : ""}`}>
                {renderBlocks(product.additional)}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.reviewSection}>
      <div className={styles.reviewHeading}>Review</div>
        <ReviewList productId={product.id} />
        <ReviewForm productId={product.id} />
      </div>
    </div>
  );
}
