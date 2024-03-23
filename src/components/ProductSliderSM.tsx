import React, { useState, useEffect } from "react";
import Slider, { Settings } from "react-slick";
import Link from "next/link";
import { useDispatch } from "react-redux";
import supabase from "@/supabase/config";
import FormattedPrice from "./FormattedPrice";

const ProductSliderSM = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const productsPerPage = 2; // Number of products per slide
    const [dotActive, setDotActive] = useState<number>(0);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const {data} = await supabase.from('products').select("*");
                setProducts(data!);
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
        dots: false,
    //  infinite: true,
    //      autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        beforeChange: (prev: number, next: number) => {
            setDotActive(next);
        },
        appendDots: (dots: any) => (
            <div
                style={{
            
                }}
                className="absolute"
            >
                <ul
                    style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: 3,
                        userSelect: 'all'
                    }}
                    className="justify-center pb-5"
                >
                    {dots}
                </ul>
            </div>
        ),
       
    };

    return (
        <div className="lg:hidden relative border h-[97%] border-slate-300">

            <Slider {...settings} initialSlide={currentIndex}>
                {Array.from({ length: Math.ceil(products.length / productsPerPage) }).map((_, slideIndex) => (
                    <div key={slideIndex}>
                        <div className="flex flex-nowrap overflow-auto gap-3 px-2 py-4 relative">


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
                                        className="min-w-20 w-full flex min-h-20 block border border-gray-300 px-1 hover:border-orange-400 rounded-lg overflow-hidden"
                                    >
                                        <img
                                            className=" w-20 h-20 object-contain mx-auto transition duration-300 transform hover:scale-105"
                                            src={product.image1}
                                            alt={product.title}
                                        />
                                        <div className="flex-1 p-3">
                                            <h3 className="text-gray-700 font-bold text-sm">{product?.title}</h3>
                                            <FormattedPrice className="text-gray-600 font-bold text-sm" amount={product?.price} />
                                        </div>
                                    </Link>
                                ))}
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default ProductSliderSM;
