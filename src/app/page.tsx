"use client";

// import styles from "../styles/Home.module.css";
import CaseCard from "../component/case/CaseCard";
import HeroSpot from "../component/herospot/HeroSpot";
import CaseCardHighlight from "../component/case/CaseCardHighlight";
import ProductCardList from "../component/product/ProductCardList";
import CustomerFeedbackCard from "../component/customerFeedback/CustomerFeedbackCard";
import BlogSection from "../component/blog/BlogSection";

export default function Home() {
  return (
    <div>
      <HeroSpot />

      <CaseCardHighlight />
      <ProductCardList />
      <CustomerFeedbackCard />
      <BlogSection />
    </div>
  );
}
