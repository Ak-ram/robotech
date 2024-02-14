"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Dot, HelpCircle, Loader, Loader2, Search, SquareDot } from "lucide-react";
import { getProducts } from "@/helpers/getProducts";
import Product from "./Product";
import { ProductType } from "../../type";

const SearchComponent = () => {
  const [res, setRes] = useState<ProductType[]>([]);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [inputQuery, setInputQuery] = useState<string>("");
  const [inputError, setInputError] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // New state for loading indicator

  const fetchData = async () => {
    setLoading(true); // Set loading to true before fetching data
    let allProducts = await getProducts();
    const searchResults = allProducts.filter((item: ProductType) =>
      item.title.toLowerCase().includes(inputQuery.toLowerCase())
    );

    // Apply additional filters
    let filteredResults = searchResults.filter((item: ProductType) => {
      const isInPriceRange =
        item.price >= priceRange[0] && item.price <= priceRange[1];
      const isMatchingCategory =
        !selectedCategory || item.category === selectedCategory;
      return isInPriceRange && isMatchingCategory;
    });

    setProducts(allProducts);
    setRes(filteredResults);
   setLoading(false); // Set loading back to false after fetching data
  };

  useEffect(() => {
    fetchData();
  }, [inputQuery, priceRange, selectedCategory]);

  const handlePriceRangeChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newValue = parseInt(e.target.value);
    setPriceRange((prevRange) =>
      index === 0 ? [newValue, prevRange[1]] : [prevRange[0], newValue]
    );
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const searching = (query: string) => {
    // if (query.trim() === "") {
    //   setInputError(null);
    // } else {
    //   if (query.length < 3) {
    //     setInputError("less than 3 chars.");
    //   } else {
    //     setInputError(null);
    //     setInputQuery(query);
    //   }
    // }
    setInputQuery(query);
  };

  return (
    <>
      {/* {loading && (
        <div className="flex items-center justify-center h-full absolute top-0 left-0 w-full bg-white opacity-75">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )} */}
      <div className="mt-2  w-full border-t md:border-none border-gray-700 md:mt-0 relative flex-1 relative  justify-center items-center">
        <Search className="text-zinc-500 absolute top-7 sm:top-8 left-2 md:w-6 md:h-6" />
        <input
          onInput={(e: ChangeEvent<HTMLInputElement>) => {
            searching(e.target.value);
          }}
          className={`shadow-lg text-lg !text-black outline-none sm:h-14 pl-10 border rounded-md pr-20 py-2 md:py-3 mr-auto mt-4 w-full ${
            inputError ? "border-red-500" : ""
          }`}
          type="text"
          placeholder="Search..."
        />
        {inputError && (
          <span className="font-semibold text-red-500 absolute top-8 right-4">
            {inputError}
          </span>
        )}
        <div className="bg-white p-4 mt-5 rounded-[.5rem] shadow-lg">
          <h3 className="text-blue-500 font-bold">Filters</h3>
          <div className="flex justify-between">
            <div className="flex mt-2 px-4">
              <label className="mr-2">Price Range:</label>
              <input
                type="number"
                min="0"
                max="2000"
                value={priceRange[0]}
                onChange={(e) => handlePriceRangeChange(e, 0)}
                className="border rounded-md px-2 py-1 mr-2"
              />
              -
              <input
                type="number"
                min="0"
                max="1000"
                value={priceRange[1]}
                onChange={(e) => handlePriceRangeChange(e, 1)}
                className="border rounded-md px-2 py-1 ml-2 mr-2"
              />
            </div>
            <div className="flex mt-2">
              <label className="mr-2">Category:</label>
              <select
                value={selectedCategory || ""}
                onChange={handleCategoryChange}
                className="border rounded-md px-2 py-1"
              >
                <option value="">All</option>
                {/* Add category options dynamically */}
                {Array.from(new Set(products.map((p) => p.category))).map(
                  (category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>
        </div>
        {loading ? (
         <div className="min-h-[400px] mt-2 flex items-center justify-center rounded-lg p-6">
         <div className="flex items-center space-x-2">
           <Loader2 className="animate-spin text-blue-500" size={30} />
           <span className="text-gray-600 font-semibold text-lg">Loading...</span>
         </div>
       </div>
        ) : res.length > 0 ? (
          <div className="min-h-[400px] ">
            <Product products={res} categoryName="" prefix="" />
          </div>
        ) : (
          <div className="flex min-h-[400px] items-center justify-center">
          <HelpCircle className="text-rose-600" size={30}/>
          <p className="text-lg text-rose-600 font-bold ml-2">No results found</p>
        </div>
        )}
      </div>
    </>
  );
};

export default SearchComponent;
