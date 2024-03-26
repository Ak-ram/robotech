import { useEffect, useState } from "react";
import { getAllProducts } from "@/supabase/getAllProducts";
import ProductCard from "./ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Item {
  prefix: string;
  categoryName: string;
}

const Product = ({ prefix, categoryName }: Item) => {
  const [products, setProducts] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(12); // Number of items per page

  useEffect(() => {
    fetchData();
  }, [currentPage, perPage, categoryName]);
  useEffect(() => {
    // Reset page number to 1 whenever categoryName changes
    setCurrentPage(1);
  }, [categoryName]);

  // Inside Product component
  const handlePrev = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleNext = () => {
    if (products.length < perPage) return;
    setCurrentPage(prevPage => prevPage + 1);
  };

  // Inside useEffect
  const fetchData = async () => {
    try {
      const offset = (currentPage - 1) * perPage;
      const data = await getAllProducts(categoryName, perPage, offset);
      setProducts(data);
    } catch (error) {
      console.error('Error fetching data:', (error as Error).message);
    }
  };


  return (
    <div className={`flex-1 min-h-screen pt-5 bg-white mt-2 rounded-lg`}>
      {/* Your other JSX code */}

      {/* Pagination controls */}
      <div className="mx-2 px-3 sm:mx-4 flex relative flex-wrap items-center justify-end">
        <ul className="flex items-center ml-auto -space-x-px h-8">
          <li className="mr-2">
            Page No: {currentPage}
          </li>
          <li>
            <button
              className={`flex items-center justify-center px-1 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700`}
              onClick={handlePrev}
            >
              <ChevronLeft size={18} />
              <span className="hidden sm:block ml-1">Previous</span>
            </button>
          </li>
          <li>
            <button
              className={`flex items-center justify-center px-1 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700`}
              onClick={handleNext}
            >
              <span className="hidden sm:block mr-1">Next</span>
              <ChevronRight size={18} />
            </button>
          </li>
        </ul>
      </div>

      {/* Render product cards */}
      <div className="m-auto p-5 md:mx-4 flex flex-wrap items-start justify-start grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-2 gap-2 mt-2">
        {products.map((item) => (


          <ProductCard item={item} prefix={prefix} />

        ))}
      </div>
    </div>
  );
};

export default Product;
