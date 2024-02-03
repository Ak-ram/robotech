
'use client'
import { useState, useEffect, ChangeEvent } from 'react';
import Link from "next/link";
import Logo from "./Logo";
import { AlignJustify, Heart, PhoneCall, Search, ShoppingBagIcon, ShoppingBasket, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { navigation } from "@/constants/data";
import { useSelector } from "react-redux";
import { ProductType, StateProps } from "../../type";
import FormattedPrice from './FormattedPrice';
import WhatsApp from './WhatsApp';
import SearchComponent from './SearchComponent';

// Define the type for product items


const Navbar = () => {
  const pathname = usePathname();
  const { productData, favoriteData } = useSelector(
    (state: StateProps) => state.pro
  );

  const [totalAmt, setTotalAmt] = useState(0);
  const [rowPrice, setRowPrice] = useState(0);
  const [openSidebar, setOpenSidebar] = useState(false);


  useEffect(() => {
    let amt = 0;
    let rowAmt = 0;
    productData.map((item: ProductType) => {
      amt += item.price * item.quantity;
      return;
    });
    productData.map((item: ProductType) => {
      rowAmt += item?.previousPrice * item?.quantity;
    });
    setTotalAmt(amt);
    setRowPrice(rowAmt);
  }, [productData]);


  const [flashAnimation, setFlashAnimation] = useState(false);

  useEffect(() => {
    // Trigger flash animation when totalAmt changes
    setFlashAnimation(true);

    // Reset flash animation after a short delay (adjust as needed)
    const timeoutId = setTimeout(() => {
      setFlashAnimation(false);
    }, 500); // 500 milliseconds

    return () => clearTimeout(timeoutId);
  }, [totalAmt]);



  return (
    <div className="py-2 sm:py-4 bg-white/80 text-zinc-800 sticky top-0 z-10  backdrop-blur-2xl">
      <div className="w-[98%] relative mx-auto order-first flex-wrap max-w-screen-xl mx-auto h-full flex items-center px-4 xl:px-0">
        {/* Logo */}

        <span onTouchEnd={() => setOpenSidebar(true)}
          onClick={() => setOpenSidebar(true)} className='md:hidden h-full w-12 '>

          <AlignJustify />
        </span>

        <Logo />
        {/* Navigation */}
        <ul className={`${openSidebar ? "translate-x-0" : "-translate-x-full md:translate-x-0"} flex px-2 -ml-6 absolute md:relative top-0 w-[250px] border-gray-400 border-r md:border-0 z-50 transition transform bgDesign md:bg-transprot md:px-0  flex-col justify-start order-last text-xs sm:text-sm flex-1  md:order-none md:justify-center h-screen md:h-fit md:w-fit md:flex-row py-2 items-center gap-5 text-sm uppercase`}>
          <X className='ml-auto text-black m-2 md:hidden' onClick={() => setOpenSidebar(false)} />
          {navigation.map((item) => (
            <Link href={item?.href} key={item.title}>
              <li
                className={`mt-2 hover:text-designColor cursor-pointer duration-200 relative overflow-hidden group ${item.href === pathname && "text-designColor font-bold"
                  }`}
              >
                {item?.title}
                <span
                  className={`hidden md:block absolute h-[2px] w-full bg-designColor left-0 bottom-0 -translate-x-[100%] z-10 translate-y-[1px] group-hover:translate-x-0 transition-transform duration-500 ${item.href === pathname && "translate-x-0 bg-designColor"
                    }`}
                />
              </li>
            </Link>
          ))}
        </ul>

        {/* icons */}
        <div className="w-[70%] justify-end md:w-fit md:justify-start ml-auto flex items-center gap-x-5">

          <div className='border-l border-r px-3 hidden lg:flex items-center text-xs gap-2 text-gray/80'>
            <PhoneCall className='text-gray/80 md:w-6 md:h-6' />
            <div className='flex flex-col gap-2'>
              <span><span className='font-bold '>Support </span>(+20) 11 0207 1544 </span>
              <span>robotechspace8@gmail.com</span>
            </div>
          </div>
          <Link
            href={"/wishlist"}
            className="text-designColor cursor-pointer duration-200 relative group"
          >
            <Heart className="w-8 h-8" />
            <span className="absolute top-0 -left-1 bg-black text-white  w-5 h-5  rounded-full  flex items-center justify-center group-hover: sm:font-bold ">
              {favoriteData ? favoriteData.length : 0}
            </span>
          </Link>
          <Link
            href={"/cart"}
            className={`${flashAnimation ? "animate-ping" : ""
              } text-designColor cursor-pointer duration-200 relative group`}
          >            <ShoppingBasket className="w-8 h-8" />
            <span className="absolute top-0 -left-1  bg-black text-white w-5 h-5 rounded-full  flex items-center justify-center group-hover: sm:font-bold ">
              {productData ? productData.length : 0}
            </span>
          </Link>
          <span
            className="-ml-3  font-bold flex flex-col justify-center items-center -gap-2"
          >
            <span className=''>({productData ? productData.length.toLocaleString('ar') : 0}) items</span>
            <FormattedPrice className='text-sm' amount={totalAmt} />
          </span>


        </div>

      </div>
      <div className='mt-3 md:h-[1px] w-full bg-gray-900 opacity-20'></div>
     {/* 
       <div className='flex items-center w-[95%] gap-2 md:w-[80%] mx-auto'>
        <span className='md:block hidden mt-4 font-bold'>Look for specific Product ? </span>
         <SearchComponent /> 

      </div> */}
    </div>

  );
};

export default Navbar;