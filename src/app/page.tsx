'use client'
import Banner from "@/components/Banner";
import ProductSlider from "@/components/ProductSlider";
import Products from "@/components/Products";
import { useEffect } from "react";

export default function Home() {
  return (
    <main>

      <Banner />
      <Products />
    </main>
  );
}
