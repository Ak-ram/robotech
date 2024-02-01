"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ProductType, StateProps } from "../../type";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Heart, ShoppingBasket, ShoppingBasketIcon, ShoppingCart } from "lucide-react";
import FormattedPrice from "./FormattedPrice";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToFavorite } from "@/redux/proSlice";
import toast, { Toaster } from "react-hot-toast";
import { calculatePercentage } from "@/helpers";
import Loading from "./Loading";

interface Item {
  products: ProductType[];
  prefix: string;
  categoryName: string;

}

const Product = ({ products, prefix, categoryName }: Item) => {
  const [perPage, setPerPage] = useState({
    start: 0,
    end: 9,
    pageNo: 1,
  });
  const { favoriteData } = useSelector((state: StateProps) => state.pro);
  const isFavorite = (productId: any) => {
    return favoriteData.some((favoriteItem) => favoriteItem.id === productId);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    setPerPage({ start: 0, end: 9, pageNo: 1 });
  }, [categoryName])
  const handlePrev = () => {
    const newStart = Math.max(0, perPage.start - 9);
    const newEnd = newStart + 9;
    setPerPage({ start: newStart, end: newEnd, pageNo: perPage.pageNo - 1 });
  };

  const handleNext = () => {
    const newStart = perPage.start + 9;
    const newEnd = Math.min(products.length, perPage.end + 9);
    setPerPage({ start: newStart, end: newEnd, pageNo: perPage.pageNo + 1 });
  };

  return (
    <div className={`flex-1 pt-5`}>

      <nav aria-label="Page navigation example" className=" flex items-center justify-end">
        <ul className="flex items-center -space-x-px h-8 text-sm">
          <li className="text-xs sm:text-sm  mr-2">
            {perPage.pageNo} / {Math.ceil(products?.length / 9)} 
            {/* <span className="text-xs sm:text-sm text-blue-500 sm:font-semibold mr-1">
              ({perPage?.start} - {perPage?.end})
            </span>
            items out of
            <span className="text-xs sm:text-sm text-blue-500 sm:font-semibold ml-1">
              {products?.length}</span> items */}
          </li>
          <li>
            <button
              className={`${perPage?.start === 0 ? 'opacity-60 cursor-not-allowed' : ''} flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700`}
              onClick={handlePrev}
              disabled={perPage.start === 0}
            >
              <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
              </svg>
              <span className="hidden sm:block  text-xs ml-1">Previous</span>

            </button>
          </li>
          <li>
            <button
              className={`${perPage?.end >= products?.length ? 'opacity-60 cursor-not-allowed' : ''} flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700`}
              onClick={handleNext}
              disabled={perPage?.end >= products?.length}
            >
              <span className="hidden sm:block text-xs mr-1">Next</span>
              <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
              </svg>
            </button>
          </li>
        </ul>
      </nav>


      <div className="m-auto flex flex-wrap items-start justify-start grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-2">

        {products ? products.slice(perPage.start, perPage.end)?.map((item) => (

          <div
            key={`${item.id}_${item.title}`}
            className="flex  sm:block  w-full mx-auto relative bg-white group border-[1px] border-zinc-200 hover:border-zinc-400 duration-300 hover:shadow-xl overflow-hidden rounded-md"
          >

            <Link
              href={{
                pathname: `/id_${item?.id}`,
                query: {
                  id: item?.id,
                  prefix: (prefix === "print" ? prefix : item?.category),
                },
              }}
              className="min-w-[130px] w-full relative sm:mx-3 sm:mt-3 flex h-40 md:h-60 overflow-hidden rounded-xl"
            >
              <img
                className="peer absolute top-0 right-0 h-full w-full object-contain"
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
                item.price < item.previousPrice && calculatePercentage(item?.price, item?.previousPrice) ?
                  <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-xs md:text-sm font-medium text-white">
                    {calculatePercentage(item?.price, item?.previousPrice)}% OFF
                  </span>
                  : null}
            </Link>

            <div className="sm:p-4 mt-5 w-[60%] flex justify-center w-full items-start flex-col px-2">
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
                  className="text-zinc-500 w-5 h-5 cursor-pointer duration-200 hover:text-black"
                />
              </div>
              <p className="pr-2  text-sm whitespace-nowrap text-ellipsis overflow-hidden group-hover:text-designColor duration-300 font-bold">
                {item?.title}
              </p>
              <p className="flex items-center justify-start w-full text-designColor font-semibold">
                <FormattedPrice amount={item?.price} />
              </p>
              <div className="flex flex-col gap-2 sm:flex-row w-full items-start sm:items-center justify-between mt-2">
                {item?.count > 0 || prefix === 'print' ? (
                  <>
                    <button
                      onClick={() => {
                        dispatch(addToCart(item));
                        toast.success(`${item?.title} is added to Cart!`);
                      }}
                      className="sm:w-fit justify-center flex items-center gap-1 md:text-base uppercase font-semibold text-white bg-black py-1 sm:py-2 px-2 rounded-sm hover:bg-opacity-80 duration-300"
                    >
                      <ShoppingBasketIcon
                        onClick={() => {
                          dispatch(addToCart(item));
                          toast.success(`${item?.title} is added to Cart!`);
                        }}
                        className="text-designColor w-4 h-4 cursor-pointer duration-200 hover:text-black"
                      />
                      <span className="hidden sm:inline-block text-sm">Add to Cart</span>
                      <span className="sm:hidden text-xs sm:text-sm ">Buy</span>

                    </button>
                  </>
                ) : (
                  <span className="text-[10px] md:text-base uppercase font-semibold py-1 sm:px-2 rounded-sm hover:bg-opacity-80 duration-300 text-red-500 bg-red-200">
                    Out of stock
                  </span>
                )}
                {
                  item?.count > 0 && prefix !== 'print' ? <span className="text-xs flex-col items-center justify-center">
                    <b className="text-designColor">{item?.count}</b> Pieces in
                    stock.
                  </span> : prefix === 'print' ? <span className="text-xs flex-col items-center justify-center">
                    <b className="text-designColor"><FormattedPrice amount={item.count} /></b> Per Minute.
                  </span> : null
                }

              </div>
            </div>
          </div>

        )) : <Loading />}
      </div>

      <div className={`${products?.length > 9 ? 'flex' : 'hidden'}  justify-between mt-4`}>




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
    </div >
  );
};

export default Product;
