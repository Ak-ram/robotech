import React, { useState, useEffect } from "react";
import Slider, { Settings } from "react-slick";
import Link from "next/link";
import supabase from "@/supabase/config";
import FormattedPrice from "./FormattedPrice";

const ProductSliderSM = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [dotActive, setDotActive] = useState<number>(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await supabase.from("products").select("*");
        setProducts(data!);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    if (typeof window !== "undefined") {
      fetchProducts();
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const nextIndex = (currentIndex + 1) % Math.ceil(products.length);
      setCurrentIndex(nextIndex);
    }, 5 * 60 * 1000); // 5 minutes in milliseconds

    return () => clearTimeout(timer);
  }, [currentIndex, products.length]);

  const settings: Settings = {
    dots: false,
    autoplaySpeed: 5000,
    slidesToShow: 3, // Display three products per slide
    slidesToScroll: 1,
    arrows: false,
    draggable: true, // Enable dragging behavior
    swipeToSlide: true, // Enable swiping behavior
    beforeChange: (prev: number, next: number) => {
      setDotActive(next);
    },
    appendDots: (dots: any) => (
      <div style={{}} className="absolute">
        <ul
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 3,
            userSelect: "all",
          }}
          className="justify-center pb-5"
        >
          {dots}
        </ul>
      </div>
    ),
  };

  return (
    <div className="productslidersm lg:hidden relative border h-[97%] border-slate-300">
      <Slider {...settings} initialSlide={currentIndex}>
        {products.map((product, index) => (
          <div className="!flex !w-[250px]  border border-gray-300 px-1 hover:border-orange-400 rounded-lg overflow-hidden" key={index}>
            <Link
              href={{
                pathname: `/id_${product?.id}`,
                query: {
                  id: product?.id,
                  prefix: product?.category,
                },
              }}
              className="w-full flex block rounded-lg overflow-hidden"
            >
              <img
                className="w-full h-20 object-contain mx-auto transition duration-300 transform hover:scale-105"
                src={product.image1}
                alt={product.title}
              />
            </Link>
              <div className="p-3">
                <h3 className="w-[100px] text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis font-bold text-sm">
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
