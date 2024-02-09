import { Ban, Search} from "lucide-react"
import { useEffect, useState } from "react";
import { ProductType } from "../../type";
import { getProducts } from "@/helpers/getProducts";

const CustomerStatsOutStocks = () => {


    const [searchQuery, setSearchQuery] = useState('');

    // Function to handle changes in the search query
    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };




    const [products, setProducts] = useState<ProductType[]>([])


    useEffect(() => {
        const fetchData = async () => {
            try {
                const allProducts = await getProducts();
                setProducts(allProducts)

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        if (typeof window !== "undefined") {
            fetchData();
        }
    }, []);




    return (
        <div className="flex gap-2 ">

            <div className="flex-1 bg-white my-5 px-3 py-6 rounded-lg shadow-md animate-fade-in">


                {/* Out-Stocks Heading */}
                <h2 className="text-2xl font-semibold mb-6 flex items-center justify-center text-red-500 bg-red-100 py-2 px-4 rounded-md">
                    <Ban className="mr-2 text-red-500" size={24} /> Out-Stocks

                    <span className="mx-4 relative">
                        <Search className="w-5 h-5 text-gray-500 absolute top-2 right-3" />
                        <input
                            type="text"
                            placeholder="Product Name..."
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                            className="pl-2 pr-10  placeholder-red-300 py-1 text-sm border border-red-200 rounded focus:outline-none focus:border-red-500"
                        />

                    </span>

                    <span className="ml-auto text-sm">

                        {products &&
                            products.filter((product) => +product?.count === 0).length}{' '}
                        Product(s)
                    </span>
                </h2>

                {/* Out-Stocks Product List */}
                <div className="mb-3 h-[380px] overflow-auto py-3 px-2 rounded-md">
                    {products &&
                        products
                            .filter((product) => +product?.count === 0)
                            .filter((product) =>
                                product.title.toLowerCase().includes(searchQuery.toLowerCase())
                            )
                            .map((product) => (
                                <div
                                    className="flex items-center justify-start gap-1 border-b border-gray-300 py-2"
                                    key={product.id}
                                >
                                    <img
                                        className="w-8 h-8 rounded"
                                        src={product?.image1}
                                        alt={product.title}
                                    />{' '}
                                    <div className="pl-3">{product.title}</div>
                                </div>
                            ))}
                </div>
            </div>


            <div className="flex-1 bg-white my-5 px-3 py-6 rounded-lg shadow-md animate-fade-in">


                {/* Out-Stocks Heading */}
                <h2 className="text-2xl font-semibold mb-6 flex items-center justify-center text-red-500 bg-red-100 py-2 px-4 rounded-md">
                    <Ban className="mr-2 text-red-500" size={24} /> Out-Stocks

                    <span className="mx-4 relative">
                        <Search className="w-5 h-5 text-gray-500 absolute top-2 right-3" />
                        <input
                            type="text"
                            placeholder="Product Name..."
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                            className="pl-2 pr-10  placeholder-red-300 py-1 text-sm border border-red-200 rounded focus:outline-none focus:border-red-500"
                        />

                    </span>

                    <span className="ml-auto text-sm">

                        {products &&
                            products.filter((product) => +product?.count === 0).length}{' '}
                        Product(s)
                    </span>
                </h2>

                {/* Out-Stocks Product List */}
                <div className="mb-3 h-[380px] overflow-auto py-3 px-2 rounded-md">
                    {products &&
                        products
                            .filter((product) => +product?.count === 0)
                            .filter((product) =>
                                product.title.toLowerCase().includes(searchQuery.toLowerCase())
                            )
                            .map((product) => (
                                <div
                                    className="flex items-center justify-start gap-1 border-b border-gray-300 py-2"
                                    key={product.id}
                                >
                                    <img
                                        className="w-8 h-8 rounded"
                                        src={product?.image1}
                                        alt={product.title}
                                    />{' '}
                                    <div className="pl-3">{product.title}</div>
                                </div>
                            ))}
                </div>
            </div>

        </div>
    )
}


export default CustomerStatsOutStocks