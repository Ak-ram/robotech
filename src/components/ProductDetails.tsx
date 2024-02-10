import React from "react";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { FacebookIcon, TwitterIcon } from "react-share";
import { PhoneCall, Check, Gift, Wallet2, Link2 } from "lucide-react"; // Import necessary Lucide icons
import FormattedPrice from "./FormattedPrice";
import toast from "react-hot-toast";

const ProductDetails = ({ product, prefix, dispatch, addToCart }) => {
    return (
        <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
            <h1 className="sm:text-2xl font-bold text-gray-900 sm:text-3xl">{product?.title}</h1>

            <div className="mt-5 flex flex-col items-stretch w-52 gap-2">
                {/* Phone number */}
                <span className="hidden sm:flex bg-white rounded py-1 px-2 items-center">
                    <PhoneCall size={18} className="text-green-600 mr-2" />
                    <span className="font-semibold ml-1">Phone: 01102071544</span>
                </span>

                {/* Social sharing buttons */}
                <span className="hidden sm:flex bg-white rounded py-1 px-2 items-center">
                    <FacebookShareButton className="flex items-center" url={"productUrl"}>
                        <FacebookIcon className="text-blue-500" size={18} />
                        <span className="font-semibold ml-1">Share on Facebook</span>
                    </FacebookShareButton>
                </span>
                <span className="hidden sm:flex bg-white rounded py-1 px-2 items-center">
                    <TwitterShareButton className="flex items-center" url={"productUrl"}>
                        <TwitterIcon className="text-sky-500" size={18} />
                        <span className="font-semibold ml-1">Share on Twitter</span>
                    </TwitterShareButton>
                </span>

                {/* External link */}
                {product?.externalLink && product.externalLink.length &&
                    <span className="hidden sm:flex bg-white rounded py-1 px-2 items-center">
                        <Link2 size={18} className="mr-2" />
                        <span className="font-semibold">
                            <a href={product?.externalLink} className="text-blue-500 hover:underline">Visit</a>
                        </span>
                    </span>
                }

                {/* Product availability and status */}
                {product?.count > 0 && prefix !== 'print' && (
                    <>
                        <span className="hidden sm:flex bg-white rounded py-1 px-2 items-center">
                            <span className="font-semibold mr-1">Availability:</span>
                            <span className="flex items-center text-green-600">
                                Available <Check className="ml-2" size={18} />
                            </span>
                        </span>
                        <span className="hidden sm:flex bg-white rounded py-1 px-2 items-center">
                            <span className="flex items-center text-blue-400">
                                <Gift className="mr-2" size={20} />
                            </span>
                            <span className="font-semibold mr-1">Newly added</span>
                        </span>
                    </>
                )}
            </div>

            {/* Product price and add to cart button */}
            <div className="mt-10 flex lg:flex-col lg:items-start gap-4 items-center justify-between border-t border-b py-4 sm:flex-row sm:space-y-0">
                <div className="flex items-end">
                    <h1 className="sm:text-lg md:text-3xl font-bold">
                        {product?.price > 0 && prefix !== 'print' ?
                            <>
                                <FormattedPrice amount={product?.price!} />
                                <span className="text-base"> / Piece</span>
                            </>
                            :
                            <>
                                <FormattedPrice amount={product?.count!} />
                                <span className="text-base"> / Minute</span>
                            </>
                        }
                    </h1>
                </div>
                <button onClick={() => {
                    dispatch(addToCart(product));
                    toast.success(`${product?.title} successfully added to the basket`)
                }} type="button" className="mt-0 inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-3 py-2 md:px-12 md:py-3 text-center text-sm sm:text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Add to cart
                </button>
            </div>

            {/* Additional product information */}
            <ul className="mt-8 space-y-2">
                {product?.price < product?.previousPrice &&
                    <>
                        <li className="flex items-center text-left text-sm font-medium text-gray-600">
                            <Wallet2 size={18} className="mr-1" />
                            Previous Price:<span className="mr-1"></span> <FormattedPrice amount={product?.previousPrice!} /> <span className="ml-1"></span> from this product.
                        </li>
                        <li className="flex items-center text-left text-sm font-medium text-gray-600">
                            <svg className="mr-2 block h-5 w-5 align-middle text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" className=""></path>
                            </svg>
                            You saved:<span className="mr-1"></span> <FormattedPrice amount={product?.previousPrice! - product?.price!} /> <span className="ml-1"></span> from this product.
                        </li>
                    </>
                }
            </ul>
        </div>
    );
};

export default ProductDetails;
