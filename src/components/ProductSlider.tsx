import { getProducts } from "@/helpers/getProducts";
import { useEffect, useState } from "react";
import { ChevronDown, ExternalLink, ShoppingCart } from 'lucide-react';
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/proSlice";

const ProductSlider = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [visibleProducts, setVisibleProducts] = useState<number>(9); // Initial number of visible products
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

    const handleShowMore = () => {
        setVisibleProducts(prevCount => prevCount + 3); // Increase the number of visible products by 3
    };

    return (
        <div className="h-full rounded-lg overflow-hidden w-full bg-gray-100 shadow-lg">
            <div className="px-4 py-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white">
                <h2 className="text-xl font-semibold">Featured Products</h2>
            </div>
            <div className="max-h-[330px] h-full overflow-auto grid grid-cols-3 gap-3 px-5 py-4">
                {products.slice(0, visibleProducts).map(product => (
                    <div key={product.id} className="block overflow-hidden h-20  rounded-lg border border-blue-400 hover:shadow-lg transform transition duration-300">
                        <img src={product.image1} alt={product.title} className="h-full w-full object-cover" />
                        <div className="absolute h-full items-center justify-center flex bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2 opacity-0 transition duration-300 hover:opacity-100">
                            <Link href={{
                                pathname: `/id_${product?.id}`,
                                query: {
                                    id: product?.id,
                                    prefix: (product?.category),
                                },
                            }} className="flex items-center justify-center h-7 w-7 text-white bg-blue-500  rounded-md mr-1 hover:bg-blue-600">
                                <ExternalLink size={16} className="" />
                            </Link>
                            <button onClick={() => {
                                dispatch(addToCart(product));
                            }} className="flex items-center justify-center h-7 w-7 text-white bg-blue-500  rounded-md hover:bg-blue-600">
                                <ShoppingCart size={16} className="" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={handleShowMore} className="flex mt-2 items-center justify-center text-sm text-gray-600 hover:text-gray-900 mx-auto mb-2">
                Show More
                <ChevronDown size={16} className="text-slate-400" />
            </button>
        </div>
    );
}

export default ProductSlider;