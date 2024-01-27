'use client'
import Container from "./Container";
import FilterableProducts from "./FilterableProducts";
import { getCategories } from "@/helpers/getCategories";
import { useState, useEffect } from "react";

const Products = () => {
  const [categories, setCategories] = useState<string[]>([])
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesList = await getCategories();
        setCategories(categoriesList);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (typeof window !== "undefined") {
      fetchCategories();
    }
  }, []);



  return (
    <div className="mt-10">
      <Container>
        <div className="mt-5 flex flex-col gap-2 items-center">
          <h2 className="text-3xl font-semibold">Choose a category</h2>
          <p className="text-lg text-center">
            Explore custom layouts designed for seamless electronic shopping.
          </p>
        </div>
        <FilterableProducts categories={categories} />
      </Container>
    </div>
  );
};

export default Products;
