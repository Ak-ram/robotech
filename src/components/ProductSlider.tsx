import { getProducts } from "@/helpers/getProducts";
import { useEffect, useState } from "react";
import { ChevronDown, ShoppingCart } from 'lucide-react';
import Link from "next/link";

const ProductSlider = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [visibleProducts, setVisibleProducts] = useState<number>(9); // Initial number of visible products

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

    const handleShowMore = () => {
        setVisibleProducts(prevCount => prevCount + 3); // Increase the number of visible products by 3
    };

    return (
        <div className="max-h-[450px] h-full rounded-lg overflow-auto  w-full bg-gray-100 ">
            <div className="">
                <div className="bg-gray-800 text-white mb-3 px-4 py-3">
                    <h2 className="text-xl font-semibold">Featured Products</h2>
                </div>
                <div className=" grid grid-cols-3 gap-3 px-5">
                    {products.slice(0, visibleProducts).map(product => (
                        <Link key={product.id} href={{
                            pathname: `/id_${product?.id}`,
                            query: {
                                id: product?.id,
                                prefix: (product?.category),
                            },
                        }} className="block overflow-hidden h-20 w-20 rounded-lg border border-blue-400 mb-2">
                            <img src={product.image1} alt={product.title} className="h-full w-full object-contain" />
                        </Link>
                    ))}
                </div>
                <button onClick={handleShowMore} className="flex items-center text-sm text-gray-600 hover:text-gray-900 mx-auto mt-4 mb-2">
                    Show More
                    <ChevronDown size={16} className="text-slate-400" />
                </button>

            </div>
        </div>
    );
}

export default ProductSlider;
