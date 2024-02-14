import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ProductType, StateProps } from "../../type";
import Image from "next/image";
import { Ban, Filter, Heart, ShoppingBasket, ShoppingBasketIcon, ShoppingCart } from "lucide-react";
import FormattedPrice from "./FormattedPrice";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToFavorite } from "@/redux/proSlice";
import toast, { Toaster } from "react-hot-toast";
import { calculatePercentage } from "@/helpers";
import Loading from "./Loading";

interface Item {
  products: ProductType[];
  prefix: string;
  categoryName: string;
}

const Product = ({ products, prefix, categoryName }: Item) => {
  const [perPage, setPerPage] = useState({
    start: 0,
    end: 12,
    pageNo: 1,
  });
  const [sortingOption, setSortingOption] = useState("price"); // Default sorting option
  const [sortingOrder, setSortingOrder] = useState("asc"); // Default sorting order
  const { favoriteData } = useSelector((state: StateProps) => state.pro);

  const isFavorite = (productId: any) => {
    return favoriteData.some((favoriteItem) => favoriteItem.id === productId);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    setPerPage({ start: 0, end: 12, pageNo: 1 });
  }, [categoryName]);

  // Function to handle sorting
  const handleSorting = () => {
    // Ensure products is defined and an array before sorting
    if (!Array.isArray(products)) {
      return [];
    }

    // Sort the products array based on the selected sorting option and order
    const sortedProducts = [...products].sort((a, b) => {
      if (sortingOrder === "asc") {
        return a[sortingOption] - b[sortingOption];
      } else {
        return b[sortingOption] - a[sortingOption];
      }
    });

    return sortedProducts;
  };

  const [showSortingOptions, setShowSortingOptions] = useState(false);

  // Ref for sorting options UI
  const sortingOptionsRef = useRef<HTMLDivElement>(null); // Ensure proper typing

  // Function to toggle the visibility of sorting options
  const toggleSortingOptions = () => {
    setShowSortingOptions(!showSortingOptions);
  };

  // Attach click event listener to the document
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortingOptionsRef.current && !sortingOptionsRef.current.contains(event.target as Node)) {
        setShowSortingOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handlePrev = () => {
    const newStart = Math.max(0, perPage.start - 12);
    const newEnd = newStart + 12;
    setPerPage({ start: newStart, end: newEnd, pageNo: perPage.pageNo - 1 });
  };

  const handleNext = () => {
    const newStart = perPage.start + 12;
    const newEnd = Math.min(products.length, perPage.end + 12);
    setPerPage({ start: newStart, end: newEnd, pageNo: perPage.pageNo + 1 });
  };

  return (
    <div className={`flex-1 pt-5`}>
      <nav aria-label="Page navigation example" className="mx-2 sm:mx-4 flex relative flex-wrap items-center justify-end">
        {/* Filter Icon */}
        <div className="mr-2">
          <button
            onClick={() => toggleSortingOptions()}
            className="flex items-center px-2 py-1 border border-gray-300 rounded-md hover:bg-gray-100 hover:text-gray-700"
          >
            <Filter className="w-5 h-5 mr-1" />
            <span className="hidden sm:inline">Filter</span>
          </button>
        </div>

        {/* Sorting options UI */}
        {showSortingOptions && (
          <div ref={sortingOptionsRef} className="absolute z-50 left-0  p-4 rounded top-11 bg-white border border-zinc-400 flex flex-col gap-2 justify-start shadow-md">
            <div className="mr-2 flex items-center">
              <label htmlFor="sortingOption" className="mr-2">Sort by:</label>
              <select
                id="sortingOption"
                value={sortingOption}
                onChange={(e) => setSortingOption(e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded-md"
              >
                <option value="price">Price</option>
                {/* Add more sorting options here */}
              </select>
            </div>
            <div className="mr-2 flex items-center">
              <label htmlFor="sortingOrder" className="mr-2">Order:</label>
              <select
                id="sortingOrder"
                value={sortingOrder}
                onChange={(e) => setSortingOrder(e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded-md"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
        )}

        <ul className="flex items-center ml-auto -space-x-px h-8 ">
          <li className="  mr-2">
            {perPage.pageNo} / {Math.ceil(products?.length / 12)}
          </li>
          <li>
            <button
              className={`${perPage?.start === 0 ? 'opacity-60 cursor-not-allowed' : ''} flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700`}
              onClick={handlePrev}
              disabled={perPage.start === 0}
            >
              <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
              </svg>
              <span className="hidden sm:block   ml-1">Previous</span>
            </button>
          </li>
          <li>
            <button
              className={`${perPage?.end >= products?.length ? 'opacity-60 cursor-not-allowed' : ''} flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700`}
              onClick={handleNext}
              disabled={perPage.end >= products?.length}
            >
              <span className="hidden sm:block   mr-1">Next</span>
              <svg className="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 9l4-4-4-4" />
              </svg>
            </button>
          </li>
        </ul>
      </nav>




      <div className="m-auto pb-5 md:mx-4 flex flex-wrap items-start justify-start grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-2">
        {/* Use handleSorting function to get sorted products */}
        {handleSorting().slice(perPage.start, perPage.end).map((item) => (
          <div
          title={item?.title}
            key={`${item.id}_${item.title}`}
            className="p-0 w-full mx-auto relative bg-white group border-[1px] border-slate-300 hover:border-designColor/60 duration-300 hover:shadow-xl overflow-hidden rounded-md"
          >

            <Link
              href={{
                pathname: `/id_${item?.id}`,
                query: {
                  id: item?.id,
                  prefix: (prefix === "print" ? prefix : item?.category),
                },
              }}
              className="min-w-[130px] relative sm:mx-3 sm:mt-3 flex mx-auto h-48 lg:h-68 overflow-hidden rounded-xl"
            >
              <img
                className="peer group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300 transition-timing-function ease-in-out shadow-lg absolute top-0 right-0 h-full w-full object-contain"
                src={item.image1}
                alt="product image"
              />


              {item.image2 ? (
                <img
                  className="peer  bg-white sm:absolute  top-0 -right-96 h-full w-full object-contain  transition-all delay-100 duration-1000 hover:right-0 peer-hover:right-0"
                  src={item.image2}
                  alt="product image"
                />
              ) : null}


              {
                item.price < item.previousPrice && calculatePercentage(item?.price, item?.previousPrice) ?
                  <span className="absolute -top-2 -left-2 m-2 rounded-full bg-black px-2 text-center  md: font-medium text-white">
                    {calculatePercentage(item?.price, item?.previousPrice)}% OFF
                  </span>
                  : null}
            </Link>

            <div className="group w-[60%] flex justify-center w-full items-start flex-col">
              {/* <div className="absolute top-4 right-2 flex items-center space-x-2">

                        <ShoppingCart
                          onClick={() => {
                            dispatch(addToCart(item));
                            toast.success(`${item?.title} is added to Cart!`);
                          }}
                          className="text-zinc-500  cursor-pointer duration-200 hover:text-black"
                        />
                      </div> */}
              {/* <div className="py-3 px-10 backdrop-blur-2xl bg-opacity-20 bottom-0 left-0 translate-y-full transition-all group-hover:translate-y-0 w-full absolute"> */}
              <div className="py-3  transition-all px-5 backdrop-blur-2xl bg-opacity-20 bottom-0 left-0 border-t border-slate-300 rounded transition-all w-full ">
                <p
                  className="pr-2 text-xl whitespace-nowrap text-ellipsis overflow-hidden duration-300 font-bold">
                  {item?.title}
                </p>
                <p className="flex  items-center justify-start w-full text-black font-semibold">
                  {item?.previousPrice > item?.price ? <del><FormattedPrice className={'text-base  text-zinc-500'} amount={item?.previousPrice} /></del>
                    : null}
                  {prefix === 'print' ? <span className="text-lg">{item?.unit} / </span> : null}
                  <FormattedPrice className={'text-xl'} amount={item?.price} />
                </p>
                <div className="flex gap-2  w-full items-center justify-between mt-2">



                  {item?.count > 0 || prefix === 'print' ? (

                    <span onClick={() => {
                      dispatch(addToCart(item));
                      // toast.success(`${item?.title} is added to Cart!`);
                    }} className="flex cursor-pointer gap-2 font-semibold items-center text-gray-600 bg-designColor/30 px-2 py-1 rounded">
                      Add to cart
                      <ShoppingBasketIcon

                        className=" ustify-center rounded flex items-center gap-1 font-semibold text-designColor rounded  duration-300 bg-white text-blue-500 px-[3px] p-[1px] w-7 h-7 duration-200 "
                      />
                    </span>




                  ) : (
                    <>
                      <span className="cursor-not-allowed flex gap-2 font-semibold items-center text-red-400 bg-red-100 px-2 py-1 rounded">
                        Out of stock
                        <Ban
                          className=" ustify-center rounded flex items-center gap-1 font-semibold text-rose-400 bg-white rounded-sm  duration-300 text-zinc-500 px-[3px] p-[1px] w-7 h-7 duration-200 "
                        />
                      </span>
                    </>
                  )}



                  {prefix !== 'print' ? <Heart
                    fill={isFavorite(item.id) ? "red" : "black"}
                    onClick={() => {
                      dispatch(addToFavorite(item));
                      // if (isFavorite(item?.id)) {
                      //   toast.error(`${item?.title} removed from favorites!`);
                      // } else {
                      //   toast.success(`${item?.title} added to favorites!`);
                      // }
                    }}
                    className="text-zinc-500  cursor-pointer duration-200 hover:text-black"
                  /> : null
                  }

                </div>
              </div>
            </div>
          </div>

          // )) 
        ))}
      </div>
      
    </div>
  );
};

export default Product;
