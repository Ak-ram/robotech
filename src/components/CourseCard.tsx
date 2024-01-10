"use client";
import { useState } from 'react'
import Link from "next/link";
import { ProductType, StateProps } from "../../type";
import Image from "next/image";
import { Heart, ShoppingBasket, ShoppingCart } from "lucide-react";
import FormattedPrice from "./FormattedPrice";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToFavorite } from "@/redux/proSlice";
import toast, { Toaster } from "react-hot-toast";

interface Item {
    products: ProductType[];
    prefix: string
    categoryName: string
}

const CourseCard = ({ products, prefix, categoryName }: Item) => {
    const { favoriteData } = useSelector((state: StateProps) => state.pro);
    const isFavorite = (productId: any) => {
        return favoriteData.some((favoriteItem) => favoriteItem.id === productId);
    };
    const dispatch = useDispatch();
    const handleStock = () => {

    }
    return (
        <div className="flex-1">
            <div className="mx-auto">
                <div className="gap-8 group gap-x-0 mt-10 grid grid-cols-1 overflow-hidden text-gray-700 transition sm:mx-auto sm:grid-cols-5">

                    {products?.map((item) => (
                        //   <div
                        //     key={`${item.id}_${item.title}`}
                        //     className="relative bg-white group border-[1px] border-zinc-200 hover:border-zinc-400 duration-300 hover:shadow-xl overflow-hidden rounded-md"
                        //   >
                        //     {/* <Link href={{ pathname: `/id_${item?.id}`, query: { id: item?.id, prefix: categoryName } }}>
                        //     <div className="block h-[200px] bg-gray-200 aspect-w-2 aspect-h-3">
                        //       <img
                        //         src={item?.image1}
                        //         alt="Product image"
                        //         className="object-cover object-center w-full h-full group-hover:scale-105 duration-300"
                        //       />
                        //     </div>
                        //     <div className="block h-[200px] bg-gray-200 aspect-w-2 aspect-h-3">
                        //       <img
                        //         src={item?.image2}
                        //         alt="Product image"
                        //         className="object-cover object-center w-full h-full group-hover:scale-105 duration-300"
                        //       />
                        //     </div>
                        //     <div className="block h-[200px] bg-gray-200 aspect-w-2 aspect-h-3">
                        //       <img
                        //         src={item?.image}
                        //         alt="Product image"
                        //         className="object-cover object-center w-full h-full group-hover:scale-105 duration-300"
                        //       />
                        //     </div>
                        //   </Link> */}
                        //     <Link href={{ pathname: `/id_${item?.id}`, query: { id: item?.id, prefix: categoryName } }} className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
                        //       <img className="peer  absolute top-0 right-0 h-full w-full object-contain" src={item.image1} alt="product image" />
                        //       <img className="peer  bg-white absolute top-0 -right-96 h-full w-full object-contain transition-all delay-100 duration-1000 hover:right-0 peer-hover:right-0" src={item.image2} alt="product image" />

                        //       <svg className="pointer-events-none absolute inset-x-0 bottom-5 mx-auto text-3xl text-white  transition-opacity group-hover:animate-ping group-hover:opacity-30 peer-hover:opacity-0" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="M2 10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v10a4 4 0 0 1-2.328 3.635a2.996 2.996 0 0 0-.55-.756l-8-8A3 3 0 0 0 14 17v7H6a4 4 0 0 1-4-4V10Zm14 19a1 1 0 0 0 1.8.6l2.7-3.6H25a1 1 0 0 0 .707-1.707l-8-8A1 1 0 0 0 16 17v12Z" /></svg>
                        //       <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">39% OFF</span>
                        //     </Link>
                        //     <div className="absolute top-2 right-2 flex items-center space-x-2">
                        //       <Heart
                        //         fill={isFavorite(item.id) ? 'red' : 'black'}
                        //         onClick={() => {
                        //           dispatch(addToFavorite(item));
                        //           if (isFavorite(item?.id)) {
                        //             toast.error(`${item?.title} removed from favorites!`);
                        //           } else {
                        //             toast.success(`${item?.title} added to favorites!`);
                        //           }
                        //         }}
                        //         className="text-zinc-500 w-5 h-5 cursor-pointer duration-200 hover:text-black"
                        //       />
                        //       <ShoppingCart
                        //         onClick={() => {
                        //           dispatch(addToCart(item));
                        //           toast.success(`${item?.title} is added to Cart!`);
                        //         }}
                        //         className="text-zinc-500 w-5 h-5 cursor-pointer duration-200 hover:text-black"
                        //       />
                        //     </div>
                        //     <div className="p-4">
                        //       <p className="whitespace-nowrap text-ellipsis overflow-hidden group-hover:text-designColor duration-300 font-bold">
                        //         {item?.title}
                        //       </p>
                        //       <p className="text-designColor font-semibold">
                        //         <FormattedPrice amount={item?.price} />
                        //       </p>
                        //       <div className="flex items-center justify-between mt-2">
                        //         {item?.count > 0 ? <button
                        //           onClick={() => {
                        //             dispatch(addToCart(item));
                        //             toast.success(`${item?.title} is added to Cart!`);
                        //             handleStock()
                        //           }}
                        //           className="uppercase text-xs font-semibold text-white bg-designColor py-2 px-2 rounded-sm hover:bg-opacity-80 duration-300"
                        //         >
                        //           Add to Cart
                        //         </button> : <span className='uppercase text-xs font-semibold py-1 px-2 rounded-sm hover:bg-opacity-80 duration-300 text-red-500 bg-red-200'>Out of stock</span>}
                        //         <span className='text-xs flex flex-col items-center justify-center'><b className='text-designColor'>{item?.count}</b> Pieces in stock.</span>
                        //       </div>
                        //     </div>
                        //   </div>
                        <>

                            <Link href={{ pathname: `/id_${item?.id}`, query: { id: item?.id, prefix: categoryName } }}
                                className="border shadow hover:shadow-sm col-span-2 text-left text-gray-600 hover:text-gray-700">
                                <div className="group relative h-full w-full overflow-hidden">
                                    <img src={item?.image1} alt="" className="h-full w-full border-none object-cover text-gray-700 transition group-hover:scale-125" />
                                    <span className="absolute top-2 left-2 rounded-full bg-yellow-200 px-2 text-xs font-semibold text-yellow-600">{item?.category}</span>
                                    <img src={item?.image2} className="absolute inset-1/2 w-10 max-w-full -translate-x-1/2 -translate-y-1/2 transition group-hover:scale-125" alt="" />
                                </div>
                            </Link>
                            <div className="pl-5 bg-white rounded-tr-lg rounded-br-lg border-b col-span-3 flex flex-col space-y-3 pr-8 text-left">
                                <a href="#" className="mt-3 overflow-hidden text-2xl font-semibold">{item?.title} </a>
                                <p className="overflow-hidden text-sm">{item?.description}</p>
                                <a href="#" className="text-sm font-semibold text-gray-500 hover:text-gray-700">{item?.instructor}</a>

                                <div className="flex flex-col text-gray-700 sm:flex-row">
                                    <div className="flex h-fit space-x-2 text-sm font-medium">
                                        <div className="rounded-full bg-green-100 px-2 py-0.5 text-green-700">{item?.level} level</div>
                                        <div className="rounded-full bg-zinc-100 px-2 py-0.5 text-zinc-700">{item?.duration} weeks</div>
                                        <div className="rounded-full bg-orange-100 px-2 py-0.5 text-orange-700">{item?.studentsEnrolled} students</div>
                                        <div className="rounded-full bg-blue-100 px-2 py-0.5 text-blue-700"><FormattedPrice amount={item.price} /></div>
                                    </div>
                                    {/* {item.enrollmentOpen ?  */}
                                    <a href="#" className={`${item.enrollmentOpen ? "bg-orange-600 text-white" : "bg-red-200 text-red-500 font-bold"} my-5 rounded-md px-5 py-2 text-center transition hover:scale-105 sm:ml-auto`}>
                                        {!item.enrollmentOpen ? 'Enrolment closed' : 'Enroll Now'}
                                    </a>
                                </div>
                            </div>
                        </>
                    ))}
                </div>
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

export default CourseCard;
