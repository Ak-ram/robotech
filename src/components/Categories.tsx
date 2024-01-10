import { ChevronRight } from "lucide-react";
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
    <div className="w-screen bg-gray-100">
      <div className="h-screen w-64 pb-10">
        <div className="flex h-full flex-grow flex-col overflow-y-auto rounded-br-lg rounded-tr-lg bg-white pt-5 shadow-md">


          <span className="ml-3 mt-10 mb-2 block text-xs font-semibold text-gray-500">Analytics</span>

          <div className="flex mt-3 flex-1 flex-col">
            <div className="">
              <nav className="flex-1">
                <a href="#" title="" className="flex cursor-pointer items-center border-l-4 border-l-rose-600 py-2 px-4 text-sm font-medium text-rose-600 outline-none transition-all duration-100 ease-in-out focus:border-l-4">
                  <svg className="mr-4 h-5 w-5 align-middle" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" className=""></path>
                  </svg>
                  Dashboard
                </a>



                <a href="#" className="flex cursor-pointer items-center border-l-rose-600 py-2 px-4 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-rose-600 hover:text-rose-600 focus:border-l-4">
                  <svg className="mr-4 h-5 w-5 align-middle" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>

                  Messages
                  <span className="ml-auto rounded-full bg-rose-600 px-2 text-xs text-white">6</span>
                </a>

                <div className="relative transition">
                  <input className="peer hidden" type="checkbox" id="menu-1" checked />
                  <button className="flex peer relative w-full items-center border-l-rose-600 py-3 px-4 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:text-rose-600 focus:border-l-4">
                    <span className="flex mr-5 w-5"
                    ><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg
                      ></span>
                    Analytics
                    <label htmlFor="menu-1" className="absolute inset-0 h-full w-full cursor-pointer"></label>
                  </button>
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute right-0 top-4 ml-auto mr-5 h-4 text-gray-600 transition peer-checked:rotate-180 peer-hover:text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>

                  <ul className="duration-400 flex m-2 max-h-0 flex-col overflow-hidden rounded-xl bg-gray-100 font-medium transition-all duration-300 peer-checked:max-h-96">
                    <li className="flex m-2 cursor-pointer border-l-rose-600 py-3 pl-5 text-sm text-gray-600 transition-all duration-100 ease-in-out hover:border-l-4 hover:text-rose-600">
                      <span className="mr-5"
                      ><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg
                        ></span>
                      Revenue
                    </li>
                    <li className="flex m-2 cursor-pointer border-l-rose-600 py-3 pl-5 text-sm text-gray-600 transition-all duration-100 ease-in-out hover:border-l-4 hover:text-rose-600">
                      <span className="mr-5"
                      ><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg
                        ></span>
                      Refunds
                    </li>
                  </ul>
                </div>
              </nav>

              <span className="ml-3 mt-10 mb-2 block text-xs font-semibold text-gray-500">Product Mangement</span>

              <nav className="flex-1">
                {categories?.map((cat_title: string, i: number) => (
                  <button
                    onClick={() => {
                      setCategoryName(cat_title);
                      setSelectedCategory(cat_title); // Set the selected category
                    }}
                    className="flex cursor-pointer items-center border-l-rose-600 py-2 px-4 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-rose-600 hover:text-rose-600 focus:border-l-4">
                    <svg className="mr-4 h-5 w-5 align-middle" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" className=""></path>
                    </svg>
                    {cat_title?.charAt(0).toUpperCase() + cat_title?.slice(1)}
                  </button>
                ))}
              </nav>

              <span className="ml-3 mt-10 mb-2 block text-xs font-semibold text-gray-500">Content Management</span>

              <nav className="flex-1">
                <a href="#" className="flex cursor-pointer items-center border-l-rose-600 py-2 px-4 text-sm font-medium text-gray-600 outline-none transition-all duration-100 ease-in-out hover:border-l-4 hover:border-l-rose-600 hover:text-rose-600 focus:border-l-4">
                  <svg className="mr-4 h-5 w-5 align-middle" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  Blogs
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Categories;
