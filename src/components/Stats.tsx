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
  LineChart,
  Search,
  ShoppingCart,
  X,
  XCircle,
} from "lucide-react";
import CustomersStats from "./CustomersStats";
import { exportSupabaseTableToExcel } from "@/lib/exportToExcel";
import supabase from "@/supabase/config";
import AdminAdmins from "./AdminAdmins";

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
      0
    );
    setInStockPrice(totalInStockPrice);
    setOutStockPrice(totalOutStockPrice);
  }, [inStock, outStock]);

  return (
    <div className=" mx-auto">
      <section
        className={` ${
          !show ? "border border-indigo-300 border-dashed" : ""
        } bg-white rounded-lg p-5`}
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
                {/* <div className="-my-2 flex-1 overflow-x-auto ">
                  <div className="py-2 px-3">
                    <div className="shadow-xl border border-slate-300 overflow-hidden sm:rounded-lg">
                      <div className="flex justify-between items-center gap-2 bg-white p-3 border-b  border-slate-300">
                        <span className="relative">
                          <Search className="w-5 h-5 text-gray-500 absolute top-2 right-3" />
                          <input
                            type="text"
                            placeholder="Search by category"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-2 pr-10 py-1 border border-slate-300 rounded bg-white text-black focus:outline-none focus:border-blue-500"
                          />
                        </span>
                        <div className="flex gap-1">
                          <span
                            onClick={() => setIsShow(true)}
                            className="text-slate-500 hover:text-black cursor-pointer py-1 rounded w-10 h-10 flex items-center justify-center  hover:bg-slate-200 block"
                          >
                            <LineChart className="" />
                          </span>
                          <span
                            onClick={() =>
                              exportSupabaseTableToExcel("products")
                            }
                            className="text-slate-500 hover:text-black cursor-pointer py-1 rounded w-10 h-10 flex items-center justify-center hover:bg-slate-200 block"
                          >
                            <Download className="" />
                          </span>
                        </div>
                      </div>

                      <div className="w-full text-sm text-gray-600">
                        <div className="bg-black text-white text-sm uppercase flex">
                          <div className="w-2/6 p-3 text-xs whitespace-nowrap font-semibold text-left tracking-wider">
                            Category
                          </div>
                          <div className="w-1/6 p-3 text-xs whitespace-nowrap font-semibold text-left tracking-wider">
                            Quantity
                          </div>
                          <div className="w-1/6 p-3 text-xs whitespace-nowrap font-semibold text-left tracking-wider">
                            In Stock
                          </div>
                          <div className="w-1/6 p-3 text-xs whitespace-nowrap font-semibold text-left tracking-wider">
                            IS Price
                          </div>
                          <div className="w-1/6 p-3 text-xs whitespace-nowrap font-semibold text-left tracking-wider">
                            Out Stock
                          </div>
                          <div className="w-1/6 p-3 text-xs whitespace-nowrap font-semibold text-left tracking-wider">
                            OS Price
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
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

      <CustomersStats />
      <AdminAdmins/>
    </div>
  );
};

export default Stats;
