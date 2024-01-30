import { getCategories } from "@/helpers/getCategories";
import { getCategoryProducts } from "@/helpers/getCategoryProducts";
import { getProducts } from "@/helpers/getProducts";
import { useEffect, useState } from "react";
import { ProductType } from "../../type";

interface Product {
    id: string;
    title: string;
    price: string;
    previousPrice: string;
    description: string;
    count: string;
    image1: string;
    image2: string;
    image3: string;
    brand: string;
    isNew: boolean;
    quantity: number;
    category: string;
}

interface CategoryStats {
    categoryName: string;
    quantity: number;
    products: any;
    outStockProducts: any;
    outStockLength: number;
    outStockTotalPrice: number;
    inStockProducts: any;
    inStockLength: number;
    inStockTotalPrice: number;

}

const Stats = () => {
    const [categoryStats, setCategoryStats] = useState<CategoryStats[]>([]);
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesList = await getCategories();
                setCategories(categoriesList);

                const productsList = await getProducts();
                // Assuming getProducts returns all products, not specific to a category
                const uniqueCategories = new Set(categoriesList);

                const uniqueCategoryStats = Array.from(uniqueCategories).map(categoryName => {
                    const categoryProducts = productsList.filter((product: ProductType) => product?.category === categoryName);
                    const outStock = categoryProducts.filter((product: ProductType) => +product?.count === 0);
                    const inStock = categoryProducts.filter((product: ProductType) => +product?.count !== 0);

                    return {
                        categoryName,
                        quantity: categoryProducts.length,
                        products: categoryProducts,
                        outStockProducts: outStock,
                        outStockLength: outStock.length,
                        outStockTotalPrice: outStock.map((product: ProductType) => +product?.price
                        ).reduce((accumulator, currentValue) => accumulator + currentValue, 0),
                        inStockProducts: inStock,
                        inStockLength: inStock.length,
                        inStockTotalPrice: inStock.map((product: ProductType) => +product?.price
                        ).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
                    };
                });

                setCategoryStats(uniqueCategoryStats);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        if (typeof window !== "undefined") {
            fetchData();
        }
    }, []);

    useEffect(() => {
        console.log(categoryStats);
    }, [categoryStats]);

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 py-10">
                <h1 className="text-lg text-gray-400 font-medium">2020-21 Season</h1>
                <div className="flex flex-col mt-6">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden sm:rounded-lg">
                                <table className="min-w-full text-sm text-gray-400">
                                    <thead className="bg-gray-800 text-xs uppercase font-medium">
                                        <tr>
                                            <th></th>
                                            <th scope="col" className="px-6 py-3 text-left tracking-wider">
                                                Category
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left tracking-wider">
                                                Quantity
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left tracking-wider">
                                                In Stock
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left tracking-wider">
                                                IS Price
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left tracking-wider">
                                                Out Stock
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left tracking-wider">
                                                OS Price
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-gray-800">
                    {categoryStats.map((categoryInfo, index) => (
                      <tr key={index} className="bg-black bg-opacity-20">
                        <td className="pl-4">{index + 1}</td>
                        <td className="flex px-6 py-4 whitespace-nowrap">
                          <img className="w-6 h-6" src="https://ssl.gstatic.com/onebox/media/sports/logos/udQ6ns69PctCv143h-GeYw_48x48.png" alt="" />
                          <span className="ml-2 font-medium">{categoryInfo.categoryName}</span>
                        </td>
                         <td className="px-6 py-4 whitespace-nowrap">{categoryInfo.quantity}</td>
                         <td className="px-6 py-4 whitespace-nowrap">{categoryInfo.inStockLength}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{categoryInfo.inStockTotalPrice}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{categoryInfo.outStockLength}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{categoryInfo.outStockTotalPrice}</td>  
                      </tr>
                    ))}
                  </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Stats;
