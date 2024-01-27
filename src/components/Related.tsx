import { useEffect, useState } from "react";
import Product from "./Product";
import { ProductType } from "../../type";

const Related = ({ prefix, products, product }) => {
    const [filteration, setFilteration] = useState([]);

    useEffect(() => {
        // Use filter to create a new array of products excluding the current product
        const filteredProducts = products.filter((item:ProductType) => item?.id !== product?.id);
        setFilteration(filteredProducts);
    }, [product, products]);

    console.log(filteration);

    return (
        <div className="bg-white p-5">
        <h3 className="text-2xl font-bold">Related Products</h3>
            <Product categoryName={prefix!} prefix={'pr'} products={filteration} />
        </div>
    );
};

export default Related;
