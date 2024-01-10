"use client";
import { useState } from 'react'
import Link from "next/link";
import { ProductType, StateProps } from "../../type";
import Image from "next/image";
import { Heart,ShoppingBasket, ShoppingCart  } from "lucide-react";
import FormattedPrice from "./FormattedPrice";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToFavorite } from "@/redux/proSlice";
import toast, { Toaster } from "react-hot-toast";

interface Item {
  products: ProductType[];
  prefix: string
  categoryName:string
}

const Product = ({ products, prefix, categoryName}: Item) => {
  const { favoriteData } = useSelector((state: StateProps) => state.pro);
  const isFavorite = (productId: any) => {
    return favoriteData.some((favoriteItem) => favoriteItem.id === productId);
  };
  const dispatch = useDispatch();
  const handleStock = ()=>{

  }
  return (
    <div className="flex-1">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5 mx-auto">
      {products?.map((item) => (
        <div
          key={`${item.id}_${item.title}`}
          className="relative bg-white group border-[1px] border-zinc-200 hover:border-zinc-400 duration-300 hover:shadow-xl overflow-hidden rounded-md"
        >
          <Link href={{ pathname: `/id_${item?.id}`, query: { id: item?.id, prefix: categoryName } }}>
            <div className="block h-[200px] bg-gray-200 aspect-w-2 aspect-h-3">
              <img
                src={item?.image}
                alt="Product image"
                className="object-cover object-center w-full h-full group-hover:scale-105 duration-300"
              />
            </div>
            
          </Link>
          <div className="absolute top-2 right-2 flex items-center space-x-2">
            <Heart
              fill={isFavorite(item.id) ? 'red' : 'black'}
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
              className="text-zinc-500 w-5 h-5 cursor-pointer duration-200 hover:text-black"
            />
          </div>
          <div className="p-4">
            <p className="whitespace-nowrap text-ellipsis overflow-hidden group-hover:text-designColor duration-300 font-bold">
              {item?.title}
            </p>
            <p className="text-designColor font-semibold">
              <FormattedPrice amount={item?.price} />
            </p>
            <div className="flex items-center justify-between mt-2">
             {item?.count > 0?  <button
                onClick={() => {
                  dispatch(addToCart(item));
                  toast.success(`${item?.title} is added to Cart!`);
                  handleStock()
                }}
                className="uppercase text-xs font-semibold text-white bg-designColor py-2 px-2 rounded-sm hover:bg-opacity-80 duration-300"
              >
                Add to Cart
              </button>: <span className='uppercase text-xs font-semibold py-1 px-2 rounded-sm hover:bg-opacity-80 duration-300 text-red-500 bg-red-200'>Out of stock</span>}
              <span className='text-xs flex flex-col items-center justify-center'><b className='text-designColor'>{item?.count}</b> Pieces in stock.</span>
            </div>
          </div>
        </div>
      ))}
    </div>
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: '#000',
          color: '#fff',
        },
      }}
    />
  </div>
  );
};

export default Product;
