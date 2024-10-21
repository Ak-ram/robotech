import {
    CheckCheck,
    ChevronDown,
    Search,
  } from "lucide-react";
  import { useEffect, useState } from "react";
  import supabase from "@/supabase/config";
import FormattedPrice from "./FormattedPrice";
  
  const SuperAdminAggregatedSales = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [aggregatedData, setAggregatedData] = useState<any[]>([]);
    const [show, setShow] = useState(false);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const { data, error } = await supabase.from("aggregated_sales").select();
          if (error) throw error;
          setAggregatedData(data!);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      if (typeof window !== "undefined") {
        fetchData();
      }
    }, []);
  
    const handleSearchInputChange = (e) => {
      setSearchQuery(e.target.value);
    };
  
    return (
      <div
        className={`${
          !show ? "border border-gray-500 border-dashed" : ""
        } bg-white rounded-lg mb-5 overflow-hidden`}
      >
        <div
          className="flex items-center p-5 justify-between cursor-pointer"
          onClick={() => setShow(!show)}
        >
          <h3 className="transform transition-transform duration-500 font-semibold text-gray-500">
            {show ? "Click to Collapse" : "Expand Aggregated Sales Data"}
          </h3>
          <ChevronDown
            className={`transform text-gray-500 transition-transform duration-300 ${
              show ? "rotate-180" : ""
            }`}
            size={25}
          />
        </div>
        {show && (
          <div
            className={`bg-white my-5 px-3 rounded-lg shadow-md animate-fade-in`}
          >
            <h2 className="whitespace-nowrap font-semibold flex items-center justify-center text-gray-500 bg-gray-100 py-2 px-4 rounded-md">
              <CheckCheck className="mr-2 text-gray-500" size={22} /> Aggregated Data
              <span className="mx-4 relative">
                <Search className="w-5 h-5 text-gray-500 absolute top-1.5 right-3" />
                <input
                  type="text"
                  placeholder="Product Name..."
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  className="pl-2 pr-10 w-[180px] placeholder-gray-300 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:border-gray-500"
                />
              </span>
              <span className="ml-auto text-sm">
                {aggregatedData && aggregatedData.length} Item(s)
              </span>
            </h2>
  
            <div className="mb-3 h-[380px] overflow-auto py-3 px-2 rounded-md">
              {aggregatedData &&
                aggregatedData
                  .filter((item) =>
                    item.product_name
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                  )
                  .map((item) => (
                    <div
                      className="flex items-center justify-start gap-1 border-b border-gray-300 py-2"
                      key={item.product_name}
                    >
                      <div className="px-3 flex-grow text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                        <strong>{item.product_name}</strong>
                      </div>
                      <div className="px-3 text-sm">
                        Sold Quantity: {item.total_sold}
                      </div>
                      <div className="px-3 text-sm">
                        Total Amount: <FormattedPrice amount={+item.total_amount}/>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default SuperAdminAggregatedSales;
  