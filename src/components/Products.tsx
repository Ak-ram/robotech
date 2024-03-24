"use client";
import Container from "./Container";
import FilterableProducts from "./FilterableProducts";

const Products = () => {
  return (
    <div className="-mt-3 md:mt-2">
      <Container className="m-0">
        <FilterableProducts />
      </Container>
    </div>
  );
};

export default Products;
