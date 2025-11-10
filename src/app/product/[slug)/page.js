"use client"
import React from "react";
import ProductDetail from "../../../component/product/ProductDetail";


export default function ProductPage({ params: rawParams }) {
  const params = React.use(rawParams); // unwrap params
  const { slug } = params;

  return <ProductDetail slug={slug} />;
}
