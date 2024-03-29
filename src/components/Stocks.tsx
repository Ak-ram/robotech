import { useEffect, useState, useRef } from "react";
import CustomerStatsInStocks from "./CustomerStatsInStocks";
import CustomerStatsOutStocks from "./CustomerStatsOutStocks";
import { getProducts } from "@/helpers/getProducts";
import { ProductType } from "../../type";
import { ChevronDown, RefreshCcw } from "lucide-react";
import supabase from "@/supabase/config";

const Stocks = () => {
  const [instock, setInstock] = useState<any>([]);
  const [outstock, setOutstock] = useState<any>([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allProducts = await getProducts();
        const { data: instockData } = await supabase
          .from("products")
          .select("*")
          .gt("count", 0);
        const { data: outstockData } = await supabase
          .from("products")
          .select("*")
          .eq("count", 0);

        setInstock(instockData);
        setOutstock(outstockData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (typeof window !== "undefined") {
      fetchData();
    }
  }, [refresh]);
  const handleRefresh = () => {
    setRefresh(true)
    setTimeout(() => {
      setRefresh(false)
    }, 1000);
  }
  return (
    <div
      className={`${!show ? "border border-green-500 border-dashed" : ""
        } bg-white rounded-lg mb-5 overflow-hidden`}
    >
      <div
        className="flex items-center p-5 justify-between cursor-pointer"
        onClick={() => setShow(!show)}
      >
        <h3 className="transform  transition-transform duration-500 font-semibold text-green-500">
          {show ? "Click to Collapse" : "Expand Stock Data"}
        </h3>
        <ChevronDown
          className={`transform text-green-500 transition-transform duration-300 ${show ? "rotate-180" : ""
            }`}
          size={25}
        />
      </div>
      {show && (
        <div className="transition-all px-5 duration-500 overflow-hidden">
          <button
            className="mr-2 ml-auto block"
            onClick={() =>
              handleRefresh()
            }
          >
            <RefreshCcw className={`${refresh ? "animate-spin" : ""}`} size={16} />
          </button>
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
      )}
    </div>
  );
};

export default Stocks;
