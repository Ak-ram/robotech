import { navigation } from "@/constants/data";
import { getCategories } from "@/helpers/getCategories";
import supabase from "@/supabase/config";
import { getAllProducts } from "@/supabase/getAllProducts";
import {
  ChevronRight,
  Loader,
  Loader2,
  MinusSquare,
  PlusSquare,
  UnfoldVertical,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react"; // Import useState from React

const Categories = ({
  setCategoryName,
  openSidebar,
  setOpenSidebar,
  categoryName
}) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>([""]);
  const [products, setProducts] = useState<any>([]);
  useEffect(() => {
    fetchData();
  }, [categoryName]);

  // Inside useEffect
  const fetchData = async () => {
    try {
      const {data} = await supabase.from('products').select("*").eq("category", categoryName.toLowerCase());
      setProducts(data!);
    } catch (error) {
      console.error('Error fetching data:', (error as Error).message);
    }
  };

  const closeSidebar = () => {
    setSelectedCategory("");
    setIsOpen(false);
    setOpenSidebar(false);
  };

  useEffect(() => {
    const getCategories = async () => {
      const { data, error } = await supabase.from("schema_table").select("*");
      if (error) console.log(error);
      const extractCategories = data!.map((cat) => cat.table_name);
      setCategories(extractCategories);
    };
    getCategories();
  }, []);

  return (
    <div
      className={`flex ${openSidebar ? " w-full " : "w-0 "
        } h-full border border-1 pt-0 shadow-xl absolute left-0 top-0 z-[5] overflow-hidden ease-in-out duration-300 transition-all`}
    >
      <div className="flex-grow lg:flex-grow-0 w-full bg-white ">
        <div className="flex flex-col h-full p-3 overflow-y-auto">
          <X
            className="cursor-pointer w-7 h-7 mr-2 text-slate-700 self-end"
            onClick={closeSidebar}
          />

          <span className="ml-3 mt-5 mb-2 block text-sm md:text-base font-semibold text-gray-500">
            Categories
          </span>

          <nav className="text-zinc-600 block overflow-x-auto">
            <button
              onClick={() => {
                setCategoryName("");
                closeSidebar();
              }}
              className={`text-ellipsis overflow-hidden w-full whitespace-nowrap
                 ${selectedCategory === ""
                  ? "bg-gray-100 text-black"
                  : "text-zinc-800 hover:bg-zinc-100 hover:text-zinc-950"
                } font-semibold flex cursor-pointer items-center lg:border-l-designColor py-2 px-4 font-medium text-gray-600 outline-none lg:hover:border-l-4 lg:hover:border-l-designColor lg:hover:text-designColor focus:border-l-4  text-sm md:text-base`}
            >
              <svg
                className="mr-4 h-5 w-5 align-middle"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  className=""
                ></path>
              </svg>
              All
            </button>
            {categories?.map((cat_title: string, i: number) => (
              <div key={`${cat_title}_${i}`}>
                <button
                  className={`text-ellipsis overflow-hidden w-full whitespace-nowrap ${selectedCategory === cat_title
                      ? "bg-gray-100 text-black"
                      : "text-zinc-800 hover:bg-zinc-100 hover:text-zinc-950"
                    } font-semibold flex cursor-pointer items-center lg:border-l-designColor py-2 px-4 font-medium text-gray-600 outline-none lg:hover:border-l-4 lg:hover:border-l-designColor lg:hover:text-designColor focus:border-l-4  text-sm md:text-base`}
                  onClick={() => {
                    setCategoryName(cat_title);
                    setSelectedCategory((prev) =>
                      prev === cat_title ? "" : cat_title
                    ); // Toggle the selected category
                    setIsOpen(true);
                    // closeSidebar();
                  }}
                >
                  {selectedCategory === cat_title && isOpen ? (
                    products ? (
                      <MinusSquare
                        className="mr-3"
                        size={18}
                        onClick={() => setIsOpen(false)}
                      />
                    ) : (
                      <Loader2 className="mr-3 animate-spin" size={18} />
                    )
                  ) : (
                    <PlusSquare
                      className="mr-3"
                      size={18}
                      onClick={() => setIsOpen(true)}
                    />
                  )}
                  <span className="overflow-auto">
                    {cat_title?.charAt(0).toUpperCase() + cat_title?.slice(1)}
                  </span>
                </button>
                <ol className="w-[250px]">
                  {selectedCategory === cat_title &&
                    isOpen &&
                    products.map((product) => (
                      <Link
                        key={product?.id}
                        href={{
                          pathname: `/id_${product?.id}`,
                          query: {
                            id: product?.id,
                            prefix: product?.category,
                          },
                        }}
                        passHref
                        className="hover:bg-zinc-100 hover:text-zinc-950 py-2 flex pl-3 mb-1 ml-6 items-center gap-1 w-full justify-start"
                      >
                        <ChevronRight size={15} />
                        <li className="w-[200px] text-ellipsis whitespace-nowrap overflow-hidden font-semibold">
                          {product.title}
                        </li>
                      </Link>
                    ))}
                </ol>
              </div>
            ))}
          </nav>

          <span className="ml-3 mt-10 mb-2 block  text-sm md:text-base font-semibold text-gray-500">
            Pages
          </span>

          <nav className="text-zinc-600 block overflow-x-auto">
            {navigation.map((item) => (
              <Link
                href={item?.href}
                key={item._id}
                passHref
                className={`hover:bg-zinc-100 flex cursor-pointer items-center border-l-designColor py-2 px-4 font-semibold text-zinc-800 outline-none  lg:hover:border-l-4 lg:hover:border-l-designColor lg:hover:text-designColor-600 focus:border-l-4  text-sm md:text-base`}
              >
                <svg
                  className="mr-4 h-5 w-5 align-middle"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
                {item?.title.slice(0, 1).toUpperCase() + item?.title.slice(1)}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Categories;
