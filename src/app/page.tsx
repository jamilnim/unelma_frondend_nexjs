"use client";

// import styles from "../styles/Home.module.css";
import CaseCard from "../component/case/CaseCard";
import HeroSpot from "../component/herospot/HeroSpot";
import CaseCardHighlight from "../component/case/CaseCardHighlight";
import ProductCardList from "../component/product/ProductCardList";
import CustomerFeedbackCard from "../component/customerFeedback/CustomerFeedbackCard";
import BlogSection from "../component/blog/BlogSection";
import AboutSummary from "../component/about/AboutSummary";
import FancyServiceCarousel from "../component/services/FancyServiceCarousel";

export default function Home() {
  return (
    <div>
      <HeroSpot />
      <AboutSummary />
      <FancyServiceCarousel />
      <CaseCardHighlight />
      <ProductCardList />
      <CustomerFeedbackCard />
      <BlogSection />
    </div>
  );
}
