import React from "react";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { FacebookIcon, TwitterIcon } from "react-share";
import { PhoneCall, Check, Gift, Wallet2, Link2, BookCopy, Link2Icon, Paintbrush, ShoppingBag } from "lucide-react";
import FormattedPrice from "./FormattedPrice";
import toast from "react-hot-toast";
import { ProductType } from "../../type";
import Link from "next/link";
import ShareProductOnFacebook from "./ShareProductOnFacebook";
import ShareProductOnTwitter from "./ShareProductOnTwitter";

const ProductDetails = ({ product, prefix, dispatch, addToCart, products }) => {
    const openWhatsApp = () => {
        const phoneNumber = "201102071544";
        const message = "Hi Robotech, I need some help.";
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappLink, '_blank');
    };
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
                        className="inline-flex items-center justify-center px-3 py-2 text-sm font-bold text-white bg-gray-900 border border-transparent rounded-md shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        <ShoppingBag size={18} className="mr-2 text-bold" />
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

                    {product?.colors && (
                        <div className="text-sm font-medium text-gray-600">
                            <div className="flex items-center">
                                <Paintbrush className="w-4 h-4 mr-2" />
                                Print Colors:
                            </div>
                            <div className="pl-3 mt-3 flex items-center w-full gap-6">
                                {product.colors.split("|").map((color, index) => (
                                    <div key={index} className={`flex justify-center gap-1 items-center`}>
                                        <span
                                            style={{ backgroundColor: color.toLowerCase().trim() }}
                                            className={`block w-[14px] h-[14px] rounded`}
                                        ></span>
                                        <span className={`capitalize`}
                                            style={{ color: color.toLowerCase().trim() }}
                                        >
                                            {color}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}


                </div>
            </div>

            <div className="mt-5 pb-5 border-b space-y-2">
                <div onClick={openWhatsApp} className="flex cursor-pointer items-center">
                    <PhoneCall className="w-4 h-4 text-green-600 mr-2" />
                    <span className="font-semibold">Whatsapp: 01102071544</span>
                </div>

                {/* <FacebookShareButton className="flex items-center" url={'robotechspace.com' + product.id}>
                    <FacebookIcon className="w-4 h-4 text-blue-500 mr-2" />
                    <span className="font-semibold">Share on Facebook</span>
                </FacebookShareButton> */}
                <ShareProductOnFacebook product={product} className="flex items-center" />
                <ShareProductOnTwitter product={product} className="flex items-center" />

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
