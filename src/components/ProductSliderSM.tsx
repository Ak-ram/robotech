import React, { useState, useEffect } from "react";
import Slider, { Settings } from "react-slick";
import Link from "next/link";
import supabase from "@/supabase/config";
import FormattedPrice from "./FormattedPrice";
import { ProductType } from "../../type";
import { getAllProducts } from "@/supabase/getAllProducts";

const ProductSliderSM = () => {
  const [products, setProducts] = useState<any>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const  data = getAllProducts(undefined,6,undefined)
        return data;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    if (typeof window !== "undefined") {
      fetchProducts().then(data=>{
        setProducts(data);
      });
    }
  }, [products]);


  const settings: Settings = {
    dots: false,
    infinite: true,
    // autoplaySpeed: 5000,
    slidesToShow: 2, // Display three products per slide
    slidesToScroll: 2,
    arrows: false,
    draggable: true, // Enable dragging behavior
    // swipeToSlide: true, // Enable swiping behavior
  
  };

  return (
    <div className="productslidersm lg:hidden relative border h-[97%] border-slate-300">
      <Slider {...settings} initialSlide={currentIndex}>
        {products && products.map((product, index) => (
          <div className="!flex !w-[250px]  border border-gray-300 px-1 hover:border-orange-400 rounded-lg overflow-hidden" key={index}>
            <Link
              href={{
                pathname: `/id_${product?.id}`,
                query: {
                  id: product?.id,
                  prefix: product?.category,
                },
              }}
              className="flex block rounded-lg overflow-hidden"
            >
              <img
                className="w-24 h-24 object-contain mx-auto transition duration-300 transform hover:scale-105"
                src={product.image1}
                alt={product.title}
              />
            </Link>
              <div className="py-3 w-full ml-1">
                <h3 className="break-all text-gray-700 max-h-10 overflow-hidden text-ellipsis font-bold text-sm">
                  {product?.title}
                </h3>
                <FormattedPrice
                  className="text-gray-600 font-bold text-sm"
                  amount={product?.price}
                />
              </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductSliderSM;
