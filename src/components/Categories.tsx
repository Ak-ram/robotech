import { navigation } from "@/constants/data";
import { ChevronRight, Loader, Loader2, MinusSquare, PlusSquare, UnfoldVertical, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react"; // Import useState from React

const Categories = ({ categories, setCategoryName, openSidebar, setOpenSidebar, products }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const closeSidebar = () => {
    setSelectedCategory('');
    setIsOpen(false);
    setOpenSidebar(false);
  };

  return (
    <div className={`flex ${openSidebar ? "w-[320px] p-3" : "w-0 overflow-hidden"} transition-all border-t-0 `}>
      <div className="flex-grow lg:flex-grow-0 bg-white shadow-md">
        <div className="flex flex-col h-full p-3 overflow-y-auto">
          <X className="cursor-pointer text-slate-700 self-end" onClick={closeSidebar} />

          <span className="ml-3 mt-5 mb-2 block text-sm md:text-base font-semibold text-gray-500">Categories</span>

          <nav className="text-zinc-600 block overflow-x-auto">
            <button
              onClick={closeSidebar}
              className={`text-ellipsis overflow-hidden lg:w-full whitespace-nowrap
                 ${selectedCategory === '' ? 'bg-gray-100 text-black' : 'text-zinc-800 hover:bg-zinc-100 hover:text-zinc-950'} font-semibold flex cursor-pointer items-center lg:border-l-designColor py-2 px-4 font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out lg:hover:border-l-4 lg:hover:border-l-designColor lg:hover:text-designColor focus:border-l-4  text-sm md:text-base`}
            >
              <svg className="mr-4 h-5 w-5 align-middle" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" className=""></path>
              </svg>
              All
            </button>
            {categories?.map((cat_title: string, i: number) => (
              <div key={`${cat_title}_${i}`}>
                <button
                  className={`text-ellipsis overflow-hidden lg:w-full whitespace-nowrap ${selectedCategory === cat_title ? 'bg-gray-100 text-black' : 'text-zinc-800 hover:bg-zinc-100 hover:text-zinc-950'} font-semibold flex cursor-pointer items-center lg:border-l-designColor py-2 px-4 font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out lg:hover:border-l-4 lg:hover:border-l-designColor lg:hover:text-designColor focus:border-l-4  text-sm md:text-base`}
                  onClick={() => {
                    setCategoryName(cat_title);
                    setSelectedCategory((prev) => (prev === cat_title ? '' : cat_title)); // Toggle the selected category
                    setIsOpen(true);
                    // closeSidebar();
                  }}
                >
                  {selectedCategory === cat_title && isOpen ? (
                    (products) ?
                      <MinusSquare className="mr-3" size={18} onClick={() => setIsOpen(false)} /> :
                      <Loader2 className="mr-3 animate-spin" size={18} />
                  ) : (
                    <PlusSquare className="mr-3" size={18} onClick={() => setIsOpen(true)} />
                  )}
                  <span>{cat_title?.charAt(0).toUpperCase() + cat_title?.slice(1)}</span>
                </button>
                <ol className="w-[250px]">
                  {selectedCategory === cat_title && isOpen &&
                    products.map(product => (
                      <Link key={product?.id} href={{
                        pathname: `/id_${product?.id}`,
                        query: {
                          id: product?.id,
                          prefix: product?.category,
                        },
                      }} passHref
                        className="hover:bg-zinc-100 hover:text-zinc-950 py-2 flex pl-3 mb-1 ml-6 items-center gap-1 w-full justify-start">
                        <ChevronRight size={15} />
                        <li className="w-[200px] text-ellipsis whitespace-nowrap overflow-hidden font-semibold">{product.title}</li>

                      </Link>
                    ))}
                </ol>
              </div>
            ))}
          </nav>

          <span className="ml-3 mt-10 mb-2 block  text-sm md:text-base font-semibold text-gray-500">Pages</span>

          <nav className="text-zinc-600 block overflow-x-auto">
            {navigation.map((item) => (
              <Link href={item?.href} key={item._id} passHref
                className={`hover:bg-zinc-100 flex cursor-pointer items-center border-l-designColor py-2 px-4 font-semibold text-zinc-800 outline-none transition-all duration-100 ease-in-out lg:hover:border-l-4 lg:hover:border-l-designColor lg:hover:text-designColor-600 focus:border-l-4  text-sm md:text-base`}>
                <svg className="mr-4 h-5 w-5 align-middle" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
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
