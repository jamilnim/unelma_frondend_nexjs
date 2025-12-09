"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchCases } from "../../lib/features/cases/caseSlice";
import styles from "./CaseCard.module.css";
import AskQuoteButton from "../inquiry/AskQuoteButton";

export default function CaseCard() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.caseStudies);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [animateCards, setAnimateCards] = useState(false);

  useEffect(() => {
    dispatch(fetchCases());
  }, [dispatch]);

  // Normalize categories
  const categories = [
    "all",
    ...new Set(items?.map((item) => item.category?.toLowerCase())),
  ];

  const categoryDetails = {
    all: {
      title: "All Projects",
      desc: "Browse all digital solutions including websites, mobile apps, security platforms, and web applications.",
    },
    "website-design": {
      title: "Website Design",
      desc: "At Unelma Platforms, our Website Design services go beyond mere visuals — we craft intuitive, engaging websites built around user-experience, accessibility, and conversion. Whether you need a fresh brand-new site or a redesign for better performance, we leverage UX/UI best practices to deliver modern, responsive, and secure websites that help your brand stand out and convert visitors into customers.",
    },
    "mobile-development": {
      title: "Mobile Development",
      desc: "Our Mobile Development services bring your ideas to life on smartphones and tablets. From intuitive mobile apps to cross-platform solutions, we build robust, performant applications that meet your audience wherever they are. Whether it’s a simple utility app or a complex AI-powered solution, Unelma Platforms delivers high-quality mobile experiences tailored to your needs.",
    },
    "web-development": {
      title: "Web Development",
      desc: "With Web Development, Unelma Platforms builds full-stack, scalable web applications and platforms — from custom web apps and e-commerce systems to cloud-enabled platforms. Our development ensures reliability, maintainability, and scalability so your web presence can grow with your business. Whether you’re launching a new web service or migrating from a legacy system, we handle the hard technical work so you can focus on your vision.",
    },
  };

  // Filter items by category
  const filteredItems =
    selectedCategory === "all"
      ? items
      : items.filter(
          (item) => item.category?.toLowerCase() === selectedCategory
        );

  const currentDetails = categoryDetails[selectedCategory];

  if (loading) return <p>Loading...</p>;

  const handleCategoryClick = (cat) => {
    setAnimateCards(true); // start fade out animation
    setTimeout(() => {
      setSelectedCategory(cat);
      setAnimateCards(false); // fade in new cards
    }, 300); // duration must match CSS animation
  };

  return (
    <div className={styles.wrapper}>
      {/* LEFT PANEL */}
      
      <div className={styles.leftPanel}>
      <div className={styles.AskQuoteButtonr}>
      <AskQuoteButton subject="Quary" />
      </div>
        <h2 className={animateCards ? styles.fadeOut : styles.fadeIn}>
          {currentDetails?.title}
        </h2>
        <p className={animateCards ? styles.fadeOut : styles.fadeIn}>
          {currentDetails?.desc}
        </p>
        
        
     
      </div>

      {/* RIGHT PANEL */}
      <div className={styles.rightPanel}>
        {/* CATEGORY FILTER */}
        <div className={styles.categoryBar}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`${styles.categoryBtn} ${
                selectedCategory === cat ? styles.active : ""
              }`}
            >
              {cat.replace("-", " ")}
            </button>
          ))}
        </div>

        {/* CARDS GRID */}
        <div className={styles.grid}>
          {filteredItems?.length > 0 ? (
            filteredItems.map((item) => {
              const title = item.projectName ?? "Untitled";
              const imgUrl =
                Array.isArray(item.topImage) && item.topImage.length > 0
                  ? `http://localhost:1337${item.topImage[0]?.url}`
                  : "https://placehold.co/600x400?text=No+Image";

              return (
                <div
                  key={item.id}
                  className={`${styles.card} ${
                    animateCards ? styles.fadeOut : styles.fadeIn
                  }`}
                  onClick={() => router.push(`/case/${item.case_id}`)}
                >
                  <img src={imgUrl} alt={title} />
                  <h3>{title}</h3>
                </div>
              );
            })
          ) : (
            <p>No cases found.</p>
          )}
        </div>
      
      </div>
   
    </div>
  );
}
