"use client";

// import styles from "../styles/Home.module.css";
import CaseCard from "../component/case/CaseCard";
import HeroSpot from "../component/herospot/HeroSpot";
import CaseCardHighlight from "../component/case/CaseCardHighlight";
import Hightlight from "../component/highlight/Hightlight";
import ProductCardList from "../component/product/ProductCardList";
import NextButton from "../component/tools/NextButton";
import BlogSection from "../component/blog/BlogSection";
import BackToTop from "../component/tools/topButton/BackToTop";
import NewsletterPopup from "../component/NewsletterPopup/NewsletterPopup";

export default function Home() {
  return (
    <div>
      <NewsletterPopup />
      <HeroSpot />
      <Hightlight />
      <CaseCardHighlight />
      <ProductCardList />
      <BlogSection />
      <NextButton onClick={undefined} />
      <BackToTop />
    </div>
  );
}
