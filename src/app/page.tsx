"use client";

import PageTransition from "../component/animation/PageTransition";
import FadeInSection from "../component/animation/FadeInSection";

import HeroSpot from "../component/herospot/HeroSpot";
import AboutSummary from "../component/about/AboutSummary";
import FancyServiceCarousel from "../component/services/FancyServiceCarousel";
import ProcessFlow from "../component/ProcessFlow/ProcessFlow";
import CaseCardHighlight from "../component/case/CaseCardHighlight";
import ProductCardList from "../component/product/ProductCardList";
import CustomerFeedbackCard from "../component/customerFeedback/CustomerFeedbackCard";
import BlogSection from "../component/blog/BlogSection";

export default function Home() {
  return (
    <PageTransition>
      <HeroSpot />

      <FadeInSection>
        <AboutSummary />
      </FadeInSection>

      <FadeInSection>
        <FancyServiceCarousel />
      </FadeInSection>

      <FadeInSection>
        <ProcessFlow />
      </FadeInSection>

      <FadeInSection>
        <CaseCardHighlight />
      </FadeInSection>

      <FadeInSection>
        <ProductCardList />
      </FadeInSection>

      <FadeInSection>
        <CustomerFeedbackCard />
      </FadeInSection>

      <FadeInSection>
        <BlogSection />
      </FadeInSection>
    </PageTransition>
  );
}
