"use client";

// import styles from "../styles/Home.module.css";
import CaseCard from "../component/case/CaseCard";
import HeroSpot from "../component/herospot/HeroSpot"
import CaseCardHighlight from "../component/case/CaseCardHighlight";
import Hightlight from "../component/highlight/Hightlight"
import ProductCardList from "../component/product/ProductCardList"
import NextButton from "../component/tools/NextButton"


export default function Home() {
  return (
    <div>

      <HeroSpot/>
      <Hightlight/>
      <CaseCardHighlight/>
      <ProductCardList/>
      <NextButton onClick={undefined}/>
    </div>
  );
}
