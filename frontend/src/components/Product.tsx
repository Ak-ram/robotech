"use client";
import { useState } from 'react'
import Link from "next/link";
import { ProductType, StateProps } from "../../type";
import Image from "next/image";
import { Heart } from "lucide-react";
import FormattedPrice from "./FormattedPrice";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToFavorite } from "@/redux/proSlice";
import toast, { Toaster } from "react-hot-toast";

interface Item {
  products: ProductType[];
  prefix: string
}

const Product = ({ products, prefix }: Item) => {
  const { favoriteData } = useSelector((state: StateProps) => state.pro);
  const isFavorite = (productId: any) => {
    return favoriteData.some((favoriteItem) => favoriteItem.id === productId);
  };
  const dispatch = useDispatch();
  return (
    <div className=' max-h-[800px] flex-1 overflow-y-auto'>
      <div className="flex flex-wrap gap-6 mt-5 mx-auto">
        {products?.map((item) => (
          <div
            key={item.id}
            className="w-[45%] max-w-[250px] lg:w-[31%] rounded-[.5rem] p-3 relative bg-white group border-[1px] border-zinc-200 hover:border-zinc-400 duration-300 hover:shadow-xl overflow-hidden"
          >
            <Link href={{ pathname: `/id_${item?.id}`, query: { id: item?.id, prefix: prefix } }}>
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${item?.attributes?.image?.data?.attributes?.url}`}
                alt="Product image"
                width={200}
                height={300}
                className="m-auto object-contain lg:object-contain group-hover:scale-105 duration-300"
              />
            </Link>
            <Heart
              fill={isFavorite(item.id) ? "red" : "black"}
              onClick={() => {
                dispatch(addToFavorite(item));
                if (isFavorite(item?.id)) {
                  toast.error(`${item?.attributes?.title} removed from favorites!`);
                } else {
                  toast.success(`${item?.attributes?.title} added to favorites!`);
                }
              }}
              className="absolute top-4 right-4 text-zinc-500 w-5 h-5 hover:text-black cursor-pointer duration-200"
            />
            <div className="hidden sm:block p-4 bg-zinc-100 group-hover:bg-zinc-50 group-hover:shadow-xl duration-300">
              <p className="whitespace-nowrap text-ellipsis overflow-hidden group-hover:text-designColor duration-300">
                {item?.attributes?.title}
              </p>
              <p className="font-semibold">
                <FormattedPrice amount={item?.attributes?.price} />
              </p>
              <div className="flex items-center justify-between text-sm mt-2">
                <button
                  onClick={() => {
                    dispatch(addToCart(item)),
                      toast.success(`${item?.attributes?.title} is added to Cart!`);
                  }}
                  className="uppercase font-semibold hover:text-designColor duration-300"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
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


    </div>
  );
};

export default Product;
