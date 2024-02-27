'use client'

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductType, StateProps } from "../../type";
import Image from "next/image";
import FormattedPrice from "@/components/FormattedPrice";
import { Link2, Link2Icon, X } from "lucide-react";
import Link from 'next/link'
import { deleteFavorite } from "@/redux/proSlice";
import toast, { Toaster } from "react-hot-toast";
import FavImg from "@/assets/fav.png"
import Container from "./Container";
const Wish = () => {
    const { favoriteData } = useSelector((state: StateProps) => state.pro);
    const dispatch = useDispatch();
    return (
        <Container>
            {favoriteData.length > 0 ? (
                <div className="my-5 grid grid-cols-1 gap-4 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {favoriteData.map((item: ProductType) => (
                        <div key={item?.id} className="border border-gray-200 rounded-md overflow-hidden">
                            <div className="flex h-20 items-center justify-between bg-gray-100 px-4 py-2">
                                <p className="text-sm font-semibold text-gray-700">{item?.title}</p>
                                <div className="flex items-center gap-2">
                                    <Link className="hover:text-designColor" href={{
                                        pathname: `/id_${item?.id}`,
                                        query: {
                                            id: item?.id,
                                            prefix: (item?.category),
                                        },
                                    }}>
                                        <Link2Icon />
                                    </Link>
                                    <X
                                        onClick={() => {
                                            dispatch(deleteFavorite(item));
                                            toast.success(`${item?.title} is removed from Wishlist!`);
                                        }}
                                        className="w-5 h-5 hover:text-red-600 cursor-pointer duration-200"
                                    />
                                </div>
                            </div>
                            <div className="py-2">
                                <div className="aspect-w-1 w-full h-48 bg-white aspect-h-1">
                                    <img
                                        src={item?.image1}
                                        alt="product image"
                                        className="object-contain w-full h-44 rounded-md"
                                    />
                                </div>
                            </div>
                            <div className="flex h-20 justify-between items-center px-4 py-2 bg-gray-100">
                                <p className="text-sm text-gray-600 overflow-hidden text-ellipsis w-44 whitespace-nowrap">{item?.description}</p>
                                <FormattedPrice amount={item?.price} />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="py-10 flex flex-col items-center justify-center gap-4">
                    <Image src={FavImg} alt="ShortLogo" width={200} height={200} />
                    <p className="text-lg font-bold">Your Favorites List is Empty</p>
                    <Link href={"/"} className="text-sm uppercase font-semibold underline underline-offset-2 hover:text-designColor duration-200 cursor-pointer">
                        Add Favorites
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

export default Wish;
