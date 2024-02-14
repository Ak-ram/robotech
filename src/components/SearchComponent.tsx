"use client";

import Link from "next/link";
import FormattedPrice from "./FormattedPrice";
import { Search } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { ProductType } from "../../type";
import { getProducts } from "@/helpers/getProducts";
import Product from "./Product";

const SearchComponent = (className) => {
  const [res, setRes] = useState<ProductType[]>([]);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isInput, setIsInput] = useState(false);
  const [inputQuery, setInputQuery] = useState<string>("");
  const [totalAmt, setTotalAmt] = useState(0);
  const [rowPrice, setRowPrice] = useState(0);
  const [inputError, setInputError] = useState<string | null>(null);
  const [selectedSuggestion, setSelectedSuggestion] = useState<number>(0);

  const fetchData = async () => {
    let allProducts = await getProducts();
    const searchResults = allProducts.filter((item: ProductType) =>
      item.title.toLowerCase().includes(inputQuery.toLowerCase())
    );

    setProducts(allProducts);
    setRes(searchResults);
  };

  useEffect(() => {
    fetchData();
  }, [inputQuery]);

  const searching = (query: string) => {
    if (query.trim() === "") {
      setRes([]);
    } else {
      if (query.length < 3) {
        setInputError("less than 3 chars.");
      } else {
        setInputError(null);
        setIsInput(true);
        setInputQuery(query);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab" && res.length > 0) {
      e.preventDefault();
      setInputQuery(res[selectedSuggestion]?.title || inputQuery);
    } else if (e.key === "ArrowUp" && selectedSuggestion > 0) {
      setSelectedSuggestion(selectedSuggestion - 1);
    } else if (e.key === "ArrowDown" && selectedSuggestion < res.length - 1) {
      setSelectedSuggestion(selectedSuggestion + 1);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        event.target instanceof Element &&
        event.target.closest(".search-container") === null
      ) {
        setIsInput(false);
        setInputError(null);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="mt-2 w-full border-t md:border-none border-gray-700 md:mt-0 relative flex-1 relative  justify-center items-center">
        <Search className="text-zinc-500 absolute top-7 sm:top-8 left-2 md:w-6 md:h-6" />
        <input
          onInput={(e: ChangeEvent<HTMLInputElement>) => {
            searching(e.target.value);
          }}
          onKeyDown={(e) => handleKeyDown(e)}
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
        {!inputError && (
          <span className="font-semibold text-zinc-500 absolute top-7 sm:top-8 right-4">
            Result: {res?.length !== products?.length ? res?.length : 0}
          </span>
        )}
        {res.length > 0 && <div className="">
          
          <Product products={res} categoryName="" prefix="" />
          </div>}
      </div>
    </>
  );
};

export default SearchComponent;
