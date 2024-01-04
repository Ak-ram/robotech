import { ChevronRight } from "lucide-react";
import { useState } from "react"; // Import useState from React
const Categories = ({ categories, setCategoryName }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  return (
    <div className={`min-w-[300px] lg:w-[300px] lg:p-3 border w-full z-10 fixed bottom-0 left-0 lg:relative overflow-hidden bg-white mt-5 shadow-lg border-zinc-400 lg:rounded-md`}>
      <h3 className="font-bold text-lg mt-3 hidden lg:inline-block ">List Of Categories</h3>
      <div className="h-[1px] w-full bg-gray-400 mt-2 hidden lg:inline-block"></div>
      <ul className="text-zinc-600 flex lg:block overflow-x-auto">
        {categories?.map((cat_title: string, i: number) => (
          <li
            key={`${cat_title}_${i}`}
            className={`font-semibold border-b group items-center text-sm lg:text-lg p-3 flex cursor-pointer ${selectedCategory === cat_title ? 'bg-gray-100 text-black' : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-600'
              }`}
            onClick={() => {
              setCategoryName(cat_title);
              setSelectedCategory(cat_title); // Set the selected category
            }}
          >
            <span className={`${selectedCategory === cat_title ? 'bg-green-500' : 'bg-transparent group-hover:bg-gray-300'} hidden lg:inline-block rounded-full h-2 w-2 mt-[4px] mr-2`}></span>
            <p>{cat_title?.charAt(0).toUpperCase() + cat_title?.slice(1)}</p>
            <ChevronRight className="mt-1 hidden lg:inline-block transform transition-transform group-hover:translate-x-2" size={18} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
