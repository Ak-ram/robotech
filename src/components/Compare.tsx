'use client'

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductType, StateProps } from "../../type";
import Image from "next/image";
import FormattedPrice from "@/components/FormattedPrice";
import { Check, Link2, Link2Icon, X } from "lucide-react";
import Link from 'next/link'
import { deleteCompare } from "@/redux/proSlice";
import toast, { Toaster } from "react-hot-toast";
import FavImg from "@/assets/fav.png"
import Container from "./Container";
const Compare = () => {
    const { compareData } = useSelector((state: StateProps) => state.pro);
    const dispatch = useDispatch();
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
                            <div className="p-3 w-1/6 text-left text-sm tracking-wider text-center">Link</div>
                        </div>
                    </div>
                    <div className="bg-gray-800 text-white">
                        {compareData.map((product, index) => (
                            <div key={index} className="flex hover:bg-opacity-50 bg-black bg-opacity-20">
                                <div className="p-3  flex items-center justify-start gap-2 flex-1 whitespace-nowrap">
                                    <img src={product.image1!} className="w-8 h-8 rounded-md" alt={product.title} />

                                    <span className="text-sm font-medium">{product.title}</span>
                                </div>
                                <div className="p-3 w-1/6 whitespace-nowrap  flex items-center justify-center"><FormattedPrice amount={product.previousPrice} /></div>
                                <div className="p-3 w-1/6 whitespace-nowrap  flex items-center justify-center"><FormattedPrice amount={product.price} /></div>

                                {/* Additional Columns */}

                                <div className="p-3 w-1/6 whitespace-nowrap  flex items-center justify-center">{product.category}</div>
                                <div className="p-3 w-1/6 whitespace-nowrap flex items-center justify-center">{product?.count > 0 ? <Check className="text-green-500" /> : <X className="text-rose-500" />}</div>
                                <div className="p-3 w-1/6 whitespace-nowrap  flex items-center justify-center">
                                    <Link href={`/id_${product.id}`} className="hover:text-designColor">
                                        <Link2Icon />

                                    </Link>
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
