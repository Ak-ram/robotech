import { getProducts } from "@/helpers/getProducts";
import { useEffect, useState } from "react";
import { ShoppingCart } from 'lucide-react';
import Link from "next/link";

const ProductSlider = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [visibleProducts, setVisibleProducts] = useState<number>(6); // Initial number of visible products

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
        <div className="max-h-[450px] rounded-lg overflow-auto  w-full bg-gray-100 py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Featured Products</h2>
                </div>
                <div className=" grid grid-cols-3 gap-3">
                    {products.slice(0, visibleProducts).map(product => (
                        <Link key={product.id} href={{
                            pathname: `/id_${product?.id}`,
                            query: {
                                id: product?.id,
                                prefix: (product?.category),
                            },
                        }} className="block w-full overflow-hidden rounded-lg border border-blue-400 mb-4">
                            <img src={product.image1} alt={product.title} className="mx-auto h-20 w-20 object-contain" />
                        </Link>
                    ))}
                </div>
                <button onClick={handleShowMore} className="flex items-center text-sm text-gray-600 hover:text-gray-900">
                    Show More
                </button>
            </div>
        </div>
    );
}

export default ProductSlider;
