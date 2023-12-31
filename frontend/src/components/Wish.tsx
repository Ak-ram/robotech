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

const Wish = () => {
    const { favoriteData } = useSelector((state: StateProps) => state.pro);
    const dispatch = useDispatch();
    return (
        <>
            {favoriteData.length > 0 ? (
                <div className="mt-5 flex flex-col">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-white uppercase bg-zinc-950">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Product Information
                                    </th>
                                    <th scope="col" className="hidden sm:block px-6 py-3">
                                        Unit Price
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            {favoriteData.map((item: ProductType) => (
                                <tbody key={item?.id}>

                                    <tr className="bg-white border-b-[1px] border-b-zinc-300">
                                        <th
                                            scope="row"
                                            className="flex items-center gap-3"
                                        >
                                            <Image
                                                src={item?.attributes?.image?.data?.attributes?.url ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${item?.attributes?.image?.data?.attributes?.url}` : ""}
                                                alt="proudct image"
                                                width={500}
                                                height={500}
                                                className="w-24 object-contain"
                                            />
                                            <p className="text-ellipsis overflow-hidden whitespace-nowrap w-[70%] text-base font-medium text-black">
                                                {item?.attributes?.title}
                                            </p>
                                        </th>
                                        <td className="hidden sm:table-cell ">
                                            <FormattedPrice amount={item?.attributes?.price} />
                                        </td>
                                        <td className="">
                                            <div className=" flex justify-center items-center gap-3">
                                                <Link className="hover:text-designColor" href={{ pathname: `/${item?.id}`, query: { id: item?.id } }}>
                                                    <Link2Icon />
                                                </Link>
                                                <X
                                                    onClick={() => {
                                                        dispatch(deleteFavorite(item)),
                                                            toast.success(
                                                                `${item?.attributes?.title} is removed from Wishlist!`
                                                            );
                                                    }}
                                                    className="w-4 h-4 hover:text-red-600 cursor-pointer duration-200"
                                                />

                                            </div>
                                        </td>

                                    </tr>

                                </tbody>
                            ))}
                        </table>
                    </div>
                </div>
            ) : (
                <div className="py-10 flex flex-col gap-1 items-center justify-center">
                    {/* <img src={AddToCartImg} style={{width: '200px'}}/> */}
                    <p className="text-lg font-bold">Your Favourite List is Empty</p>
                    <Link
                        href={"/"}
                        className="text-sm uppercase font-semibold underline underline-offset-2 hover:text-designColor duration-200 cursor-pointer"
                    >
                        ADD Favourites
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
        </>
    );
};

export default Wish;
