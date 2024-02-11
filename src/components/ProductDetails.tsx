import React from "react";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { FacebookIcon, TwitterIcon } from "react-share";
import { PhoneCall, Check, Gift, Wallet2, Link2, BookCopy, Link2Icon, Paintbrush } from "lucide-react";
import FormattedPrice from "./FormattedPrice";
import toast from "react-hot-toast";
import { ProductType } from "../../type";
import Link from "next/link";

const ProductDetails = ({ product, prefix, dispatch, addToCart, products }) => {
    return (
        <div className="bg-white p-6 rounded lg:col-span-2 lg:row-span-2 lg:row-end-2">
            <h1 className="text-3xl font-bold text-gray-900">{product?.title}</h1>

            <div className="mt-5 border-t border-b py-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="">
                            {product?.price > 0 && prefix !== "print" ? (
                                <>
                                    <FormattedPrice className="text-xl font-bold" amount={product?.price!} />
                                    <span className="text-xl font-bold"> / Piece</span>
                                </>
                            ) : (
                                <>
                                    <FormattedPrice className="text-xl font-bold" amount={product?.count!} />
                                    <span className="text-xl font-bold"> / Minute</span>
                                </>
                            )}
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            dispatch(addToCart(product));
                            toast.success(`${product?.title} successfully added to the basket`);
                        }}
                        type="button"
                        className="inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-white bg-gray-900 border border-transparent rounded-md shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 mr-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5 10H2a1 1 0 00-1 1v2a1 1 0 001 1h3v3a1 1 0 001 1h2a1 1 0 001-1v-3h3a1 1 0 001-1v-2a1 1 0 00-1-1h-3V7a1 1 0 00-1-1H7a1 1 0 00-1 1v2zm3-8a1 1 0 00-1 1v-.001L7.707 6.293A1 1 0 008 7h2v1H8a3 3 0 01-3-3V2H2a1 1 0 00-1 1v2a1 1 0 001 1h1v6H2a1 1 0 00-1 1v2a1 1 0 001 1h1v1a3 3 0 003 3h4v2a1 1 0 001 1h2a1 1 0 001-1v-2h4a3 3 0 003-3v-1h1a1 1 0 001-1v-2a1 1 0 00-1-1h-1V9h1a1 1 0 001-1V6a1 1 0 00-1-1h-1V4a3 3 0 00-3-3H8z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Add to cart
                    </button>
                </div>

                <div className="mt-5 space-y-2">
                    {product?.previousPrice! > product?.price! && <>
                        <div className="flex items-center text-sm font-medium text-gray-600">
                            <Wallet2 className="w-4 h-4 mr-2" />
                            Previous Price:{" "}
                            <FormattedPrice className="mx-1"
                                amount={product?.previousPrice!} /> from this product.
                        </div>

                        <div className="flex items-center text-sm font-medium text-gray-600">
                            <Check className="w-4 h-4 mr-2" />
                            You saved:{" "}
                            <FormattedPrice
                                className="mx-1"
                                amount={product?.previousPrice! - product?.price!}
                            />{" "}
                            from this product.
                        </div>
                    </>
                    }
                    {
                        product?.category && <div className="flex items-center text-sm font-medium text-gray-600">
                            <BookCopy className="w-4 h-4 mr-2" />
                            Categroy:
                            <span className="ml-1 text-sm text-indigo-600">{product?.category?.toUpperCase()}</span>
                        </div>
                    }

                    <div className="flex items-center text-sm font-medium text-gray-600">
                        <Gift className="w-4 h-4 mr-2" />
                        Newly added
                    </div>

                    {
                        product?.colors && <div className="flex items-center text-sm font-medium text-gray-600">
                            <Paintbrush className="w-4 h-4 mr-2" />
                            Colors:
                            {product?.colors?.split("|").map((color, i) => <>
                                <span>{i}</span>
                                <span>{color}</span>

                            </>)}
                        </div>
                    }

                </div>
            </div>

            <div className="mt-5 pb-5 border-b space-y-2">
                <div className="flex items-center">
                    <PhoneCall className="w-4 h-4 text-green-600 mr-2" />
                    <span className="font-semibold">Phone: 01102071544</span>
                </div>

                <FacebookShareButton className="flex items-center" url={"productUrl"}>
                    <FacebookIcon className="w-4 h-4 text-blue-500 mr-2" />
                    <span className="font-semibold">Share on Facebook</span>
                </FacebookShareButton>


                <TwitterShareButton className="flex items-center" url={"productUrl"}>
                    <TwitterIcon className="w-4 h-4 text-sky-500 mr-2" />
                    <span className="font-semibold">Share on Twitter</span>
                </TwitterShareButton>

                {product?.externalLink && product.externalLink.length && (
                    <div className="flex items-center">
                        <Link2 className="w-4 h-4 text-blue-500 mr-2" />
                        <span className="font-semibold">
                            More Details:
                            <a href={product?.externalLink} className="ml-2 text-blue-500 hover:underline">
                                Follow
                            </a>
                        </span>
                    </div>
                )}

            </div>

            {products?.filter((item: ProductType) => item?.id !== product?.id).length &&
                <>
                    <div className="mt-5 pb-5 border-b space-y-2">
                        <h3 className="text-gray-600">You May also love:</h3>
                        {
                            products?.filter((item: ProductType) => item?.id !== product?.id).map((item =>
                                <Link href={{
                                    pathname: `/id_${item?.id}`,
                                    query: {
                                        id: item?.id,
                                        prefix: (prefix === "print" ? prefix : item?.category),
                                    },
                                }} key={`${item?.id}_${item?.title}`} className="overflow-hidden  pl-2 flex items-center text-sm font-medium text-blue-500">
                                    <Link2Icon className="w-4 h-4 mr-2" />
                                    <span className="whitespace-nowrap text-ellipsis min-w-[250px] overflow-hidden">{item?.title}</span>
                                </Link>

                            ))
                        }
                    </div>
                </>
            }

        </div>
    );
};

export default ProductDetails;
