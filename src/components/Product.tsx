"use client";
import { useState } from "react";
import Link from "next/link";
import { ProductType, StateProps } from "../../type";
import Image from "next/image";
import { Heart, ShoppingBasket, ShoppingBasketIcon, ShoppingCart } from "lucide-react";
import FormattedPrice from "./FormattedPrice";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToFavorite } from "@/redux/proSlice";
import toast, { Toaster } from "react-hot-toast";
import { calculatePercentage } from "@/helpers";

interface Item {
  products: ProductType[];
  prefix: string;
  categoryName: string;
}

const Product = ({ products, prefix, categoryName }: Item) => {
  const { favoriteData } = useSelector((state: StateProps) => state.pro);
  const isFavorite = (productId: any) => {
    return favoriteData.some((favoriteItem) => favoriteItem.id === productId);
  };
  const dispatch = useDispatch();
  const handleStock = () => { };
  return (
    <div className="flex-1">
      <div className="container max-w-4xl m-auto flex flex-wrap items-start justify-start grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-5 mx-auto">
        {products?.map((item) => (
          <div
            key={`${item.id}_${item.title}`}
            className="relative bg-white group border-[1px] border-zinc-200 hover:border-zinc-400 duration-300 hover:shadow-xl overflow-hidden rounded-md"
          >

            <Link
              href={{
                pathname: `/id_${item?.id}`,
                query: {
                  id: item?.id,
                  prefix: (prefix === "print" ? prefix : item?.category),
                },
              }}
              className="relative mx-3 mt-3 flex h-20 md:h-60 overflow-hidden rounded-xl"
            >
              <img
                className="peer  absolute top-0 right-0 h-full w-full object-contain"
                src={item.image1}
                alt="product image"
              />
              {item.image2 ? (
                <img
                  className="peer  bg-white absolute top-0 -right-96 h-full w-full object-contain transition-all delay-100 duration-1000 hover:right-0 peer-hover:right-0"
                  src={item.image2}
                  alt="product image"
                />
              ) : null}

              <svg
                className="hidden sm:block pointer-events-none absolute inset-x-0 bottom-1 md:bottom-5 mx-auto md:text-3xl text-zinc-600  transition-opacity group-hover:animate-ping group-hover:opacity-30 "
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                width="1em"
                height="1em"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 32 32"
              >
                <path
                  fill="currentColor"
                  d="M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a4 4 0 0 1-2.328 3.635a2.996 2.996 0 0 0-.55-.756l-8-8A3 3 0 0 0 14 17v7H6a4 4 0 0 1-4-4V10Zm14 19a1 1 0 0 0 1.8.6l2.7-3.6H25a1 1 0 0 0 .707-1.707l-8-8A1 1 0 0 0 16 17v12Z"
                />
              </svg>
              {
                item.price > item.previousPrice && calculatePercentage(item?.price, item?.previousPrice)?
                  <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-xs md:text-sm font-medium text-white">
                    {calculatePercentage(item?.price, item?.previousPrice)}% OFF
                  </span>
                  : null}
            </Link>
            <div className="absolute top-2 right-2 flex items-center space-x-2">
              <Heart
                fill={isFavorite(item.id) ? "red" : "black"}
                onClick={() => {
                  dispatch(addToFavorite(item));
                  if (isFavorite(item?.id)) {
                    toast.error(`${item?.title} removed from favorites!`);
                  } else {
                    toast.success(`${item?.title} added to favorites!`);
                  }
                }}
                className="text-zinc-500 w-5 h-5 cursor-pointer duration-200 hover:text-black"
              />
              <ShoppingCart
                onClick={() => {
                  dispatch(addToCart(item));
                  toast.success(`${item?.title} is added to Cart!`);
                }}
                className="hidden sm:inline-block text-zinc-500 w-5 h-5 cursor-pointer duration-200 hover:text-black"
              />
            </div>
            <div className="p-4">
              <p className="text-xs md:text-base whitespace-nowrap text-ellipsis overflow-hidden group-hover:text-designColor duration-300 font-bold">
                {item?.title}
              </p>
              <p className="text-xs md:text-base text-designColor font-semibold">
                <FormattedPrice amount={item?.price} />
              </p>
              <div className="text-xs md:text-base flex items-center justify-between mt-2">
                {item?.count > 0 ? (
                  <>
                    <button
                      onClick={() => {
                        dispatch(addToCart(item));
                        toast.success(`${item?.title} is added to Cart!`);
                        handleStock();
                      }}
                      className="w-full sm:w-fit justify-center flex items-center gap-1 md:text-base uppercase font-semibold text-white bg-designColor py-1 sm:py-2 px-2 rounded-sm hover:bg-opacity-80 duration-300"
                    >
                      <ShoppingBasketIcon
                        onClick={() => {
                          dispatch(addToCart(item));
                          toast.success(`${item?.title} is added to Cart!`);
                        }}
                        className="text-zinc-500 w-5 h-5 cursor-pointer duration-200 hover:text-black"
                      />
                      <span className="hidden sm:inline-block text-sm">Add to Cart</span>
                      <span className="text-xs inline-block sm:hidden">Buy</span>

                    </button>

                  </>
                ) : (
                  <span className="text-[10px] md:text-base uppercase font-semibold py-1 sm:px-2 rounded-sm hover:bg-opacity-80 duration-300 text-red-500 bg-red-200">
                    Out of stock
                  </span>
                )}
                <span className="hidden sm:flex text-xs flex-col items-center justify-center">
                  <b className="text-designColor">{item?.count}</b> Pieces in
                  stock.
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#000",
            color: "#fff",
          },
        }}
      />
    </div>
  );
};

export default Product;
