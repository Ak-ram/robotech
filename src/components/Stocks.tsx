import { useEffect, useState } from "react";
import CustomerStatsInStocks from "./CustomerStatsInStocks";
import CustomerStatsOutStocks from "./CustomerStatsOutStocks";
import { getProducts } from "@/helpers/getProducts";
import { ProductType } from "../../type";

const Stocks = () => {

    const [instock, setInstock] = useState<ProductType[]>([]);
    const [outstock, setOutstock] = useState<ProductType[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const allProducts = await getProducts();
                let instock = allProducts.filter((product: ProductType) => +product?.count > 0)
                let outstock = allProducts.filter((product: ProductType) => +product?.count === 0)
                setInstock(instock);
                setOutstock(outstock);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        if (typeof window !== "undefined") {
            fetchData();
        }
    }, [instock,outstock]);

    return (<>
        <div className="flex gap-2">
            <div className="flex-1">
                <CustomerStatsInStocks setInstock={setInstock} instock={instock}/>
            </div>
            <div className="flex-1">
                <CustomerStatsOutStocks setOutstock={setOutstock} outstock={outstock}/>
            </div>
        </div>
    </>)
}
export default Stocks;