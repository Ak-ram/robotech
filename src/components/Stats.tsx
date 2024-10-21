import { getCategories } from "@/helpers/getCategories";
import { downloadJSON } from "@/helpers/downloadJsonfile";
import { getProducts } from "@/helpers/getProducts";
import { useEffect, useState } from "react";
import { ProductType } from "../../type";
import FormattedPrice from "./FormattedPrice";
import ApexChartComp from "./ApexChart";
import {
  Banknote,
  CheckCircle,
  ChevronDown,
  DollarSign,
  Download,
  ShoppingCart,
  X,
  XCircle,
} from "lucide-react";
import { exportSupabaseTableToExcel } from "@/lib/exportToExcel";
import supabase from "@/supabase/config";
import AdminAdmins from "./AdminAdmins";
import TransactionAnalyzer from "./update";
import SuperAdminBills from "./SuperAdminBills";
import Stocks from "./Stocks";
import CustomerStatsServicesData from "./CustomerStatsServicesData";
import CustomerStatsTopSelling from "./CustomerStatsTopSelling";
import SuperAdminAggregatedSales from "./SuperAdminAggregatedSales";

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
  const [isShow, setIsShow] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [show, setShow] = useState(false);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [inStock, setInStock] = useState<ProductType[]>([]);
  const [inStockPrice, setInStockPrice] = useState(0);
  const [outStock, setOutStock] = useState<ProductType[]>([]);
  const [outStockPrice, setOutStockPrice] = useState(0);

  const productUtils = async () => {
    const { data: products } = await supabase.from("products").select("*");
    const { data: inStock } = await supabase
      .from("products")
      .select("*")
      .gt("count", 0);
    const { data: outStock } = await supabase
      .from("products")
      .select("*")
      .eq("count", 0);
    return [products, inStock, outStock];
  };
  useEffect(() => {
    const fetchData = async () => {
      const [products, inStock, outStock] = await productUtils();
      setProducts(products!);
      setInStock(inStock!);
      setOutStock(outStock!);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const totalInStockPrice = inStock.reduce((accumulator, currentProduct) => {
      return accumulator + currentProduct.price;
    }, 0);
    const totalOutStockPrice = outStock.reduce(
      (accumulator, currentProduct) => {
        return accumulator + currentProduct.price;
      },
      0,
    );
    setInStockPrice(totalInStockPrice);
    setOutStockPrice(totalOutStockPrice);
  }, [inStock, outStock]);

  return (
    <div className=" mx-auto">
      <section
        className={` ${
          !show ? "border border-indigo-300 border-dashed" : ""
        } bg-white rounded-lg p-5 mb-5`}
      >
        <div
          className={`flex items-center justify-between cursor-pointer`}
          onClick={() => setShow(!show)}
        >
          <h3 className="transform  transition-transform duration-500 font-semibold text-indigo-500">
            {show ? "Click to Collapse" : "Expand Categories & Products Stats"}
          </h3>
          <ChevronDown
            className={`text-blue-300 transform transition-transform duration-300 ${
              show ? "rotate-180" : ""
            }`}
            size={25}
          />
        </div>
        {show && (
          <div className=" mt-5 ">
            <div
              className={`${
                isShow ? "block" : "hidden"
              } z-50 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center`}
            >
              <div
                className={`bg-white min-w-[40rem] p-8 rounded-lg shadow-md`}
              >
                {/* <div className="flex-1"> <X className="cursor-pointer" onClick={() => setIsShow(false)} /> <ApexChartComp categoryStats={categoryStats} /></div> */}
              </div>
            </div>
            <div className="flex justify-start flex-wrap gap-2">
              <div className="flex flex-col md:flex-row gap-2  flex-1">
                <section className="flex-1 w-full  rounded-lg w-[400px] border border-gray-300 p-5 bg-white">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center justify-center p-6 rounded-lg bg-blue-50">
                      <div className="mr-2">
                        <ShoppingCart size={32} className="text-blue-500" />
                      </div>
                      <div>
                        <span className="text-xl font-bold text-blue-700">
                          {products.length}
                        </span>
                        <p className="text-sm text-blue-700">Total Products</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-center p-6 rounded-lg bg-yellow-50">
                      <div className="mr-2">
                        <CheckCircle size={32} className="text-yellow-500" />
                      </div>
                      <div>
                        <span className="text-xl font-bold text-yellow-700">
                          {inStock.length}
                        </span>
                        <p className="text-sm text-yellow-700">
                          Available Products
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-center p-6 rounded-lg bg-red-50">
                      <div className="mr-2">
                        <XCircle size={32} className="text-red-500" />
                      </div>
                      <div>
                        <span className="text-xl font-bold text-red-700">
                          {outStock.length}
                        </span>
                        <p className="text-sm text-red-700">
                          Unavailable Products
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-center p-6 rounded-lg bg-green-50">
                      <div className="mr-2">
                        <span className="text-green-500 text-2xl font-bold">
                          <DollarSign size={32} />
                        </span>
                      </div>
                      <div>
                        <FormattedPrice
                          amount={inStockPrice}
                          className="text-xl font-bold text-green-700"
                        />
                        <p className="text-sm text-green-700">
                          Total Available Price
                        </p>
                      </div>
                    </div>
                    <div className="col-span-full">
                      <div className="flex items-center justify-center p-6 rounded-lg bg-rose-50">
                        <div className="mr-2">
                          <span className="text-rose-500 text-2xl font-bold">
                            <Banknote size={32} />
                          </span>
                        </div>
                        <div>
                          <FormattedPrice
                            amount={outStockPrice}
                            className="text-xl font-bold text-rose-700"
                          />
                          <p className="text-sm text-rose-700">
                            Total Unavailable Price
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <section className="flex-1 w-full overflow-auto h-[400px] rounded-lg w-[400px] border border-gray-300 p-5 bg-white">
                  <h3 className="font-bold text-center">Downloads Center</h3>
                  {[
                    "products",
                    "customers",
                    "courses",
                    "services",
                    "ask_to_be_an_admin",
                    "admins",
                    "announcements",
                    "faq",
                    "location",
                    "schema_table",
                    "slides",
                  ].map((item) => (
                    <div
                      key={item}
                      onClick={() => exportSupabaseTableToExcel(item)}
                      className="bg-gray-200 my-2 cursor-pointer rounded flex items-center justify-between p-3 w-full"
                    >
                      <span>{item.toUpperCase()}</span>
                      <span>
                        <Download size={17} />
                      </span>
                    </div>
                  ))}
                </section>
              </div>
            </div>
          </div>
        )}
      </section>
      <Stocks />
      {/* <CustomerStatsTopSelling /> */}
      <CustomerStatsServicesData />
      <SuperAdminBills />
      <TransactionAnalyzer />
      <SuperAdminAggregatedSales />
      <AdminAdmins />
    </div>
  );
};

export default Stats;
