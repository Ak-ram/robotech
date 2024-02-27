'use client'

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductType, StateProps } from "../../type";
import Image from "next/image";
import FormattedPrice from "@/components/FormattedPrice";
import { Check, Heart, Link2, Link2Icon, Trash, X } from "lucide-react";
import Link from 'next/link'
import { addToFavorite, deleteCompare } from "@/redux/proSlice";
import toast, { Toaster } from "react-hot-toast";
import FavImg from "@/assets/fav.png"
import Container from "./Container";
const Compare = () => {
    const { compareData, favoriteData } = useSelector((state: StateProps) => state.pro);
    const dispatch = useDispatch();

    const isFavorite = (productId: any) => {
        return favoriteData.some((favoriteItem) => favoriteItem.id === productId);
    };
    return (
        <Container>



            {compareData.length > 0 ? (
                <div className="w-full max-h-[400px] my-3 overflow-auto">
                    <div className="bg-gray-800 uppercase text-gray-400">
                        <div className="flex">
                            <div className="p-3 flex-1 text-left text-sm tracking-wider text-center">Title</div>
                            <div className="p-3 w-1/6 text-left text-sm tracking-wider text-center">Previous Price</div>
                            <div className="p-3 w-1/6 text-left text-sm tracking-wider text-center">Price</div>
                            {/* Additional Headers */}
                            <div className="p-3 w-1/6 text-left text-sm tracking-wider text-center">Category</div>
                            <div className="p-3 w-1/6 text-left text-sm tracking-wider text-center">Availability</div>
                            <div className="p-3 w-1/6 text-left text-sm tracking-wider text-center">Actions</div>
                        </div>
                    </div>
                    <div className="bg-gray-800 text-white">
                        {compareData.map((product, index) => (
                            <div key={index} className="flex hover:bg-opacity-50 bg-black bg-opacity-20">
                                <div className="p-3  flex items-center justify-start gap-2 flex-1 whitespace-nowrap">
                                    <img src={product.image1!} className="w-8 h-8 rounded-md" alt={product.title} />

                                    <span className="text-sm font-medium">{product.title}</span>
                                </div>
                                <div className="p-3 text-sm w-1/6 whitespace-nowrap  flex items-center justify-center">
                                    {
                                        product.previousPrice > 0 ?  <FormattedPrice className=" text-sm" amount={product.previousPrice} />: "Not Provided"
                                    }
                                   
                                    
                                    </div>
                                <div className="p-3 w-1/6 whitespace-nowrap flex items-center justify-center"><FormattedPrice className=" text-sm" amount={product.price} /></div>

                                {/* Additional Columns */}

                                <div className="p-3 w-1/6 whitespace-nowrap text-sm  flex items-center justify-center">{product.category}</div>
                                <div className="p-3 w-1/6 whitespace-nowrap text-sm flex items-center justify-center">{product?.count > 0 ? <Check className="text-green-500" /> : <X className="text-rose-500" />}</div>
                                <div className="p-3 w-1/6 whitespace-nowrap text-sm gap-1 flex items-center justify-center">
                                    <Link href={`/id_${product.id}`} className="hover:text-designColor">
                                        <Link2Icon size={19} />

                                    </Link>
                                    <Heart

                                        onClick={() => {
                                            dispatch(addToFavorite(product));
                                            if (isFavorite(product?.id)) {
                                                toast.error(`${product?.title} removed from favorites!`);
                                            } else {
                                                toast.success(`${product?.title} added to favorites!`);
                                            }
                                        }}
                                        size={19}
                                        className={`block w-5 xs:w-fit cursor-pointer duration-200 hover:text-rose-400 ${isFavorite(product.id) ? 'text-rose-400':"text-zinc-500 "}`}
                                    />
                                    <Trash className="text-rose-400 cursor-pointer ml-4" size={18} onClick={() => {
                                        dispatch(deleteCompare(product));
                                        toast.success(`${product?.title} is removed from Compare Table!`);
                                    }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="py-10 flex flex-col items-center justify-center gap-4">
                    <p className="text-lg font-bold">Your Compare Page List is Empty</p>
                    <Link href="/" className="text-sm uppercase font-semibold underline underline-offset-2 hover:text-designColor duration-200 cursor-pointer">
                        Compare Products ?
                    </Link>
                </div>
            )}



            <Toaster
                position="bottom-right"
                toastOptions={{
                    style: {
                        background: "#000",
                        color: "#fff",
                    },
                }}
            />
        </Container>
    );



};

export default Compare;
