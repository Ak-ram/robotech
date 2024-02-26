// import { useEffect, useState } from "react";
// import CustomerStatsInStocks from "./CustomerStatsInStocks";
// import CustomerStatsOutStocks from "./CustomerStatsOutStocks";
// import { getProducts } from "@/helpers/getProducts";
// import { ProductType } from "../../type";
// import { ChevronDown } from "lucide-react";

// const Stocks = () => {

//     const [instock, setInstock] = useState<ProductType[]>([]);
//     const [outstock, setOutstock] = useState<ProductType[]>([]);
//     const [show, setShow] = useState(false)
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const allProducts = await getProducts();
//                 let instock = allProducts.filter((product: ProductType) => +product?.count > 0)
//                 let outstock = allProducts.filter((product: ProductType) => +product?.count === 0)
//                 setInstock(instock);
//                 setOutstock(outstock);
//             } catch (error) {
//                 console.error("Error fetching data:", error);
//             }
//         };

//         if (typeof window !== "undefined") {
//             fetchData();
//         }
//     }, [instock, outstock]);





//     return (<div className="bg-white rounded-lg p-5">

//         <div className="flex items-center justify-end">

//             <ChevronDown className="cursor-pointer" size={25} onClick={() => setShow(!show)} />
//         </div>
//         {show &&
//             <div className="flex gap-2 "> <div className="flex-1">
//                 <CustomerStatsInStocks setInstock={setInstock} instock={instock} />
//             </div>
//                 <div className="flex-1">
//                     <CustomerStatsOutStocks setOutstock={setOutstock} outstock={outstock} />
//                 </div></div>}

//     </div>)
// }
// export default Stocks;
import { useEffect, useState, useRef } from "react";
import CustomerStatsInStocks from "./CustomerStatsInStocks";
import CustomerStatsOutStocks from "./CustomerStatsOutStocks";
import { getProducts } from "@/helpers/getProducts";
import { ProductType } from "../../type";
import { ChevronDown } from "lucide-react";

const Stocks = () => {
  const [instock, setInstock] = useState<ProductType[]>([]);
  const [outstock, setOutstock] = useState<ProductType[]>([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allProducts = await getProducts();
        let instock = allProducts.filter(
          (product: ProductType) => +product?.count > 0
        );
        let outstock = allProducts.filter(
          (product: ProductType) => +product?.count === 0
        );
        setInstock(instock);
        setOutstock(outstock);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (typeof window !== "undefined") {
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (show) {
      contentRef.current!.style.maxHeight = `${contentRef.current!.scrollHeight}px`;
    } else {
      contentRef.current!.style.maxHeight = "0px";
    }
  }, [show]);

  return (
    <div className="bg-white rounded-lg mb-5 overflow-hidden">
      <div
        className="flex items-center p-5 justify-between cursor-pointer"
        onClick={() => setShow(!show)}
      >
        <h3 className="transform  transition-transform duration-500 font-semibold text-blue-400">
            {show ? "Click to Collapse" : "Click to Expand"}
        </h3>
        <ChevronDown
          className={`transform transition-transform duration-300 ${
            show ? "rotate-180" : ""
          }`}
          size={25}
        />
      </div>
      <div
        className="transition-all px-5 duration-500 overflow-hidden"
        ref={contentRef}
      >
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="flex gap-2">
            <div className="flex-1">
              <CustomerStatsInStocks
                setInstock={setInstock}
                instock={instock}
              />
            </div>
            <div className="flex-1">
              <CustomerStatsOutStocks
                setOutstock={setOutstock}
                outstock={outstock}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stocks;