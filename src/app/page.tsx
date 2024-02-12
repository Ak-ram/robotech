'use client'
import Banner from "@/components/Banner";
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
