import { getCategories } from "@/helpers/getCategories";
import { getCategoryProducts } from "@/helpers/getCategoryProducts";
import { getProducts } from "@/helpers/getProducts";
import { useEffect, useState } from "react";
import { ProductType } from "../../type";
import FormattedPrice from "./FormattedPrice";
import Products from "./Products";
import ApexChartComp from "./ApexChart";
import { BarChart, LineChart, X } from "lucide-react";

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
    const [products, setProducts] = useState<string[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [isShow, setIsShow] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesList = await getCategories();
                setCategories(categoriesList);

                const productsList = await getProducts();
                setProducts(productsList)
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

            <section className='flex'>
                <div className={`${isShow ? "block" : "hidden"} fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center`}>
                    <div className={`bg-white min-w-[40rem] p-8 rounded-lg shadow-md`}>
                        <div className="flex-1"> <X className="cursor-pointer" onClick={() => setIsShow(false)} /> <ApexChartComp categoryStats={categoryStats} /></div>
                    </div></div>
                <div>
                    <div className="flex mx-auto flex-col">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-2 align-middle inline-block lg:px-8">
                                <div className="shadow overflow-hidden sm:rounded-lg">
                                    <div className="bg-gray-800 p-3 border-b  border-gray-700">
                                        <span onClick={() => setIsShow(true)} className="text-slate-400 hover:text-white cursor-pointer py-1 rounded w-10 h-10 flex items-center justify-center  hover:bg-gray-700 block">

                                            <LineChart className="" />
                                        </span>
                                    </div>
                                    <table className="text-sm text-gray-400">
                                        <thead className="bg-gray-800 text-xs uppercase ">
                                            <tr>
                                                <th scope="col" className="text-center text-xs  py-3 text-left tracking-wider">
                                                    Category
                                                </th>
                                                <th scope="col" className="text-center text-xs  py-3 text-left tracking-wider">
                                                    Quantity
                                                </th>
                                                <th scope="col" className="text-center text-xs  py-3 text-left tracking-wider">
                                                    In Stock
                                                </th>
                                                <th scope="col" className="text-center text-xs  py-3 text-left tracking-wider">
                                                    IS Price
                                                </th>
                                                <th scope="col" className="text-center text-xs  py-3 text-left tracking-wider">
                                                    Out Stock
                                                </th>
                                                <th scope="col" className="text-center text-xs  py-3 text-left tracking-wider">
                                                    OS Price
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-gray-800">
                                            {categoryStats.map((categoryInfo, index) => (
                                                <tr key={index} className=" bg-black bg-opacity-20 ">
                                                    <td className="text-center pl-3 text-xs  flex  py-2 whitespace-nowrap">
                                                        <img className="w-6 h-6 mr-2 rounded" src={categoryInfo.inStockProducts[0].image1} alt="" />
                                                        <span className="text-xs font-medium">{categoryInfo.categoryName.slice(0, 1).toUpperCase() + categoryInfo.categoryName.slice(1,)}</span>
                                                    </td>
                                                    <td className="text-center text-xs   py-2 whitespace-nowrap">{categoryInfo.quantity}</td>
                                                    <td className={`${categoryInfo.inStockLength >= 10 ? "text-green-500" :
                                                        categoryInfo.inStockLength > 5 ? 'text-orange-400' :
                                                            'text-yellow-500'
                                                        } text-center text-xs   py-2 whitespace-nowrap`}>{categoryInfo.inStockLength}</td>
                                                    <td className="text-center text-xs   py-2 whitespace-nowrap">
                                                        <FormattedPrice className="text-xs" amount={categoryInfo.inStockTotalPrice} />
                                                    </td>
                                                    <td className={`${categoryInfo.outStockLength ? "text-red-500" : ""} text-center text-xs text-sm  py-2 whitespace-nowrap`}>{categoryInfo.outStockLength}</td>
                                                    <td className="text-center text-xs  py-2 whitespace-nowrap">
                                                        <FormattedPrice className="text-xs" amount={categoryInfo.outStockTotalPrice} /></td>
                                                </tr>
                                            ))}
                                            <tr>

                                                <th scope="col" className="text-xs pl-3 py-2 text-left tracking-wider">
                                                    Total
                                                </th>
                                                <th scope="col" className="text-center text-xs   py-3 text-left tracking-wider">
                                                    {products?.length}
                                                </th>
                                                <th scope="col" className="text-center text-xs   py-3 text-left tracking-wider">
                                                    {
                                                        categoryStats
                                                            .map(item => item.inStockProducts.map((product: ProductType) => +product?.count !== 0))
                                                            .reduce((accumulator, currentValue) => accumulator + currentValue.reduce((a, b) => a + b, 0), 0)
                                                    }                                            </th>
                                                <th scope="col" className="text-center text-xs   py-3 text-left tracking-wider">
                                                    <FormattedPrice className="text-xs" amount=
                                                        {
                                                            categoryStats
                                                                .map(item => item.inStockProducts.map((product: ProductType) => +product?.price))
                                                                .reduce((accumulator, currentValue) => accumulator + currentValue.reduce((a, b) => a + b, 0), 0)
                                                        } />
                                                </th>
                                                <th scope="col" className="text-center text-xs   px-6 py-3 text-left tracking-wider">
                                                    {
                                                        categoryStats
                                                            .map(item => item.outStockProducts.map((product: ProductType) => +product?.count === 0))
                                                            .reduce((accumulator, currentValue) => accumulator + currentValue.reduce((a, b) => a + b, 0), 0)
                                                    }
                                                </th>
                                                <th scope="col" className="text-center text-xs px-6 py-3 text-left tracking-wider">
                                                    <FormattedPrice className="text-xs" amount=
                                                        {
                                                            categoryStats
                                                                .map(item => item.outStockProducts.map((product: ProductType) => +product?.price))
                                                                .reduce((accumulator, currentValue) => accumulator + currentValue.reduce((a, b) => a + b, 0), 0)
                                                        } />
                                                </th>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        </div></div>
                </div>
            </section>

            <div className="flex flex-col items-center min-h-screen py-10">
                <h1 className="text-lg text-gray-950 font-medium">Stats For {

                    new Date().toLocaleDateString('en-US', { dateStyle: 'long' })

                }</h1>



                {/* <ReactApexChart options={this.state.options} series={this.state.series} type="pie" width={380} />  */}



            </div>
        </>
    );
};

export default Stats;
