import React, { useState, useEffect } from "react";
import Slider, { Settings } from "react-slick";
import { getProducts } from "@/helpers/getProducts";
import { ChevronDown, Hand, HandMetal } from 'lucide-react';
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/proSlice";

const ProductSlider = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const productsPerPage = 12; // Number of products per slide
    const [dotActive, setDotActive] = useState<number>(0);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const p = await getProducts();
                setProducts(p);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        if (typeof window !== 'undefined') {
            fetchProducts();
        }
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            const nextIndex = (currentIndex + 1) % Math.ceil(products.length / productsPerPage);
            setCurrentIndex(nextIndex);
        }, 5 * 60 * 1000); // 5 minutes in milliseconds

        return () => clearTimeout(timer);
    }, [currentIndex, products.length]);

    const settings: Settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        beforeChange: (prev: number, next: number) => {
            setDotActive(next);
        },
        appendDots: (dots: any) => (
            <div
                style={{
                    top: "80%",
                    left: "67%",
                    userSelect: 'none'
                }}
                className="absolute translate-x[-50%] translate-y[-50%]"
            >
                <ul
                    style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: 3,
                        userSelect: 'all'
                    }}
                    className="justify-center"
                >
                    {dots}
                </ul>
            </div>
        ),
        customPaging: (i: number) => (
            <div
                className={`${i === dotActive ? 'bg-slate-800 w-3 h-1 lg:w-5 lg:h-2 ' : "h-1 w-1 lg:w-2 lg:h-2 border border-zinc-400"} rounded-full cursor-pointer`}
            >
                <span className="hidden md:flex items-center gap-1">

                </span>
            </div>
        ),
    };

    return (
        <div className="relative border rounded-xl h-[97%] border-slate-300">

            <Slider {...settings} initialSlide={currentIndex}>
                {Array.from({ length: Math.ceil(products.length / productsPerPage) }).map((_, slideIndex) => (
                    <div key={slideIndex}>
                        <div className="grid grid-cols-3 gap-3 p-4 relative">


                            {products
                                .slice(slideIndex * productsPerPage, (slideIndex + 1) * productsPerPage)
                                .map((product, index) => (
                                    <Link
                                        href={{
                                            pathname: `/id_${product?.id}`,
                                            query: {
                                                id: product?.id,
                                                prefix: (product?.category),
                                            },
                                        }}
                                        key={index}
                                        className="block border border-gray-300 px-1 hover:border-orange-400 rounded-lg overflow-hidden"
                                    >
                                        <img
                                            className="w-18 h-18 lg:w-20 lg:h-20 object-contain mx-auto transition duration-300 transform hover:scale-105"
                                            src={product.image1}
                                            alt={product.title}
                                        />
                                    </Link>
                                ))}
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default ProductSlider;
