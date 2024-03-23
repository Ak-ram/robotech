"use client";
import  supabase from "../supabase/config";
import React, { useState, useEffect, ChangeEvent } from "react";
import Categories from "./Categories";
import Product from "./Product";
import { getCategoryProducts } from "@/helpers/getCategoryProducts";
import { getProducts } from "@/helpers/getProducts";
import { AlignJustify, LibraryBig, Search, X } from "lucide-react";
import FormattedPrice from "./FormattedPrice";
import { ProductType, StateProps } from "../../type";
import { useSelector } from "react-redux";
import Link from "next/link";
import SearchComponent from "./SearchComponent";
// import { AlignJustify } from 'lucide-react';

function FilterableProducts({ categories }) {
  const [categoryName, setCategoryName] = useState("");
  const [products, setProducts] = useState<any>([]);
  const [totalAmt, setTotalAmt] = useState(0);
  const [rowPrice, setRowPrice] = useState(0);
  const [openSidebar, setOpenSidebar] = useState(false);

  // Function to toggle the slide-bottom class on click

  const { productData, favoriteData } = useSelector(
    (state: StateProps) => state.pro
  );
  useEffect(() => {
    let amt = 0;
    let rowAmt = 0;
    productData.map((item: ProductType) => {
      amt += item.price * item.quantity;
      return;
    });
    productData.map((item: ProductType) => {
      rowAmt += item?.previousPrice * item?.quantity;
    });
    setTotalAmt(amt);
    setRowPrice(rowAmt);
  }, [productData]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = categoryName
          ? await supabase.from('products').select("").eq("category",categoryName.toLowerCase())
          : await supabase.from("products").select("*");
        console.log(categoryName);
        setProducts(data!);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (typeof window !== "undefined") {
      // Run the effect only in the browser environment
      fetchProducts();
    }
  }, [categoryName]);



  return (
    <div className="mt-3 md:mt-0">
      <div
        className={`relative flex ${
          openSidebar ? "gap-2" : "gap-0"
        } overflow-auto m-auto `}
      >
        <Categories
          products={products}
          setOpenSidebar={setOpenSidebar}
          openSidebar={openSidebar}
          setCategoryName={setCategoryName}
          categories={categories}
        />
        <div className="flex-1 bg-white pt-5 md:rounded-xl">
          {openSidebar ? null : (
            <AlignJustify
              className="cursor-pointer bg-white p-1 rounded w-8 h-8 text-blue-500  ml-3 mr-auto"
              onClick={() => setOpenSidebar(true)}
            />
          )}
          <div className="hidden lg:flex flex-col gap-2 items-center">
            <h2 className="text-2xl text-designColor font-bold lg:text-3xl ">
              Choose a Category
            </h2>
            <p className="text-sm lg:text-lg text-slate-400 text-center">
              Explore custom layouts designed for seamless electronic shopping.
            </p>
          </div>
          {/* <div className={`${openSidebar ? "blur-md hidden md:flex" : "blur-none"} mx-2`}>

            <SearchComponent />
          </div> */}
          <div
            className={`${
              openSidebar ? "blur-md flex" : "blur-none"
            } `}
          >
            <Product
              categoryName={categoryName}
              prefix={"pr"}
              products={products}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterableProducts;
