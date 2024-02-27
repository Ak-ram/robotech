import { useEffect, useState } from "react";
import Product from "./Product";
import { ProductType } from "../../type";

const Related = ({ prefix, products, product }) => {
    const [filteration, setFilteration] = useState([]);

    useEffect(() => {
        // Use filter to create a new array of products excluding the current product
        const filteredProducts = products && products?.filter((item:ProductType) => item?.id !== product?.id);
        setFilteration(filteredProducts);
    }, [product, products]);

    return (
        <div className="bg-white ">
        <h3 className="text-2xl font-bold p-5">Related Products</h3>
            <Product categoryName={prefix!} prefix={'pr'} products={filteration} />
        </div>
    );
};

export default Related;
