import { useEffect, useState } from "react";
import Product from "./Product";
import { ProductType } from "../../type";

const Related = ({ prefix, products, product }) => {
    const [filteration, setFilteration] = useState([]);

    useEffect(() => {
        // Use filter to create a new array of products excluding the current product
        const filteredProducts = products.filter((item) => item.id !== product.id);
        setFilteration(filteredProducts);
    }, [product, products]);

    console.log(filteration);

    return (
        <>
            <Product categoryName={prefix!} prefix={'pr'} products={filteration} />
        </>
    );
};

export default Related;
