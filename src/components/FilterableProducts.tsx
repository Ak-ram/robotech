'use client'
import React, { useState, useEffect, ChangeEvent } from 'react';
import Categories from './Categories';
import Product from './Product';
import { getCategoryProducts } from '@/helpers/getCategoryProducts';
import { getProducts } from '@/helpers/getProducts';
import { AlignJustify, LibraryBig, Search, X } from 'lucide-react';
import FormattedPrice from './FormattedPrice';
import { ProductType, StateProps } from '../../type';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import SearchComponent from './SearchComponent';
// import { AlignJustify } from 'lucide-react';

function FilterableProducts({ categories }) {
  const [categoryName, setCategoryName] = useState('');
  const [products, setProducts] = useState<any[]>([]);
  const [totalAmt, setTotalAmt] = useState(0);
  const [rowPrice, setRowPrice] = useState(0);
  const [openSidebar, setOpenSidebar] = useState(true);

  // Function to toggle the slide-bottom class on click


  const { productData, favoriteData } = useSelector(
    (state: StateProps) => state.pro
  );
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




  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const p = await getCategoryProducts(categoryName);
        setProducts(p);
      } catch (error) {
        console.error('Error fetching products:', error);
      }

    };

    if (typeof window !== 'undefined') {
      // Run the effect only in the browser environment
      fetchProducts();
    }
  }, [categoryName]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const p = await getProducts();
        setProducts(p);

      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    if (typeof window !== 'undefined') {
      // Run the effect only in the browser environment
      fetchProducts();
    }
  }, []);


  return (
    <div className='mt-3 md:mt-0'>
      <div className='relative flex gap-4 m-auto'>
        <Categories setOpenSidebar={setOpenSidebar} openSidebar={openSidebar} setCategoryName={setCategoryName} categories={categories} />
        <div className='flex-1'>
            <AlignJustify size={18} className='md:hidden cursor-pointer text-slate-700 absolute top-7 mr-3 ml-auto' onClick={()=>setOpenSidebar(true)} />
          <div className="hidden md:flex flex-col gap-2 items-center">
            <h2 className="text-2xl font-bold lg:text-3xl ">Choose a Category</h2>
            <p className="text-sm lg:text-lg text-center">
              Explore custom layouts designed for seamless electronic shopping.
            </p>
          </div>
          {/* <SearchComponent /> */}
          <div className={`${openSidebar ? "blur-md md:blur-none":"blur-none"} `}>

          <Product categoryName={categoryName} prefix={'pr'} products={products} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterableProducts;
