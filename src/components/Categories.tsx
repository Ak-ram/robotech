import { navigation } from "@/constants/data";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react"; // Import useState from React
const Categories = ({ categories, setCategoryName }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  return (
    // <div className={`min-w-[300px] lg:w-[300px] lg:p-3 border w-full z-10 fixed bottom-0 left-0 lg:relative overflow-hidden bg-white mt-5 shadow-lg border-zinc-400 lg:rounded-md`}>
    //   <h3 className="font-bold text-lg mt-3 hidden lg:inline-block ">List Of Categories</h3>
    //   <div className="h-[1px] w-full bg-gray-400 mt-2 hidden lg:inline-block"></div>
    //   <ul className="text-zinc-600 flex lg:block overflow-x-auto">
    //     {categories?.map((cat_title: string, i: number) => (
    //       <li
    //         key={`${cat_title}_${i}`}
    //         className={`font-semibold border-b group items-center text-sm lg:text-lg p-3 flex cursor-pointer ${selectedCategory === cat_title ? 'bg-gray-100 text-black' : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-600'
    //           }`}
    //         onClick={() => {
    //           setCategoryName(cat_title);
    //           setSelectedCategory(cat_title); // Set the selected category
    //         }}
    //       >
    //         <span className={`${selectedCategory === cat_title ? 'bg-green-500' : 'bg-transparent group-hover:bg-gray-300'} hidden lg:inline-block rounded-full h-2 w-2 mt-[4px] mr-2`}></span>
    //         <p>{cat_title?.charAt(0).toUpperCase() + cat_title?.slice(1)}</p>
    //         <ChevronRight className="mt-1 hidden lg:inline-block transform transition-transform group-hover:translate-x-2" size={18} />
    //       </li>
    //     ))}
    //   </ul>
    // </div>
    <div className="min-w-[300px] lg:w-[300px] lg:p-3 w-full z-10 fixed border-t lg:border-t-0 border-gray-300 bottom-0 left-0 lg:relative overflow-hidden w-64">
      <div className="flex h-full flex-grow flex-col overflow-y-auto lg:rounded-br-lg lg:rounded-tr-lg bg-white shadow-md">

        <div className="flex flex-col">

          <span className="ml-3 mt-5 lg:mt-10 mb-2 block text-xs font-semibold text-gray-500">Product Mangement</span>

          <nav className="text-zinc-600 flex lg:block overflow-x-auto">
            {categories?.map((cat_title: string, i: number) => (
              <button
              key={`${cat_title}_${i}`}
                onClick={() => {
                  setCategoryName(cat_title);
                  setSelectedCategory(cat_title); // Set the selected category
                }}
                className={`lg:w-full ${selectedCategory === cat_title ? 'bg-gray-100 text-black' : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-600'} flex cursor-pointer items-center border-l-designColor py-2 px-4 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out lg:hover:border-l-4 lg:hover:border-l-designColor lg:hover:text-designColor focus:border-l-4`}>
                <svg className="mr-4 h-5 w-5 align-middle" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" className=""></path>
                </svg>
                {cat_title?.charAt(0).toUpperCase() + cat_title?.slice(1)}
              </button>
            ))}
          </nav>

          <span className="hidden ml-3 lg:mt-10 mb-2 lg:block text-xs font-semibold text-gray-500">Pages</span>

          <nav className="hidden justify-center lg:items-start text-zinc-600 flex lg:block overflow-x-auto">
            {navigation.map((item) => (
              <Link href={item?.href} key={item._id} className={`hover:bg-zinc-100 flex cursor-pointer items-center border-l-designColor py-2 px-4 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out lg:hover:border-l-4 lg:hover:border-l-designColor lg:hover:text-designColor-600 focus:border-l-4`}>
                <svg className="mr-4 h-5 w-5 align-middle" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                {item?.title}
              </Link>
            ))}

          </nav>
        </div>
      </div>

    </div >
  );
};

export default Categories;
