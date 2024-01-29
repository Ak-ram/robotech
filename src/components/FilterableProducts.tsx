'use client'
import React, { useState, useEffect, ChangeEvent } from 'react';
import Categories from './Categories';
import Product from './Product';
import { getCategoryProducts } from '@/helpers/getCategoryProducts';
import { getProducts } from '@/helpers/getProducts';
import { Search } from 'lucide-react';
import FormattedPrice from './FormattedPrice';
import { ProductType, StateProps } from '../../type';
import { useSelector } from 'react-redux';
import Link from 'next/link';
// import { AlignJustify } from 'lucide-react';

function FilterableProducts({ categories }) {
  const [categoryName, setCategoryName] = useState('');
  const [products, setProducts] = useState<any[]>([]);
  const [res, setRes] = useState<ProductType[]>([]);
  const [isInput, setIsInput] = useState(false);
  const [inputQuery, setInputQuery] = useState<string>("");
  const [totalAmt, setTotalAmt] = useState(0);
  const [rowPrice, setRowPrice] = useState(0);

  // Function to toggle the slide-bottom class on click

  const searching = (query: string) => {
    setIsInput(true);
    setInputQuery(query);
  };
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
    const fetchData = async () => {
      let allProducts = await getProducts();
      // Perform the search operation here and update the 'res' state
      const searchResults = allProducts.filter((item: ProductType) =>
        item.title.toLowerCase().includes(inputQuery.toLowerCase())
      );

      setRes(searchResults);
      console.log(res)
    };

    fetchData();
  }, [inputQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        event.target instanceof Element &&
        event.target.closest(".search-container") === null
      ) {
        setIsInput(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

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
    <div className='mt-5'>
      <div className='relative mt-5 flex gap-4 m-auto '>
        <Categories setCategoryName={setCategoryName} categories={categories} />
        <div>
          <div className="mt-5 flex flex-col gap-2 items-center">
            <h2 className="text-2xl font-bold lg:text-3xl ">Choose a Category</h2>
            <p className="text-sm lg:text-lg text-center">
              Explore custom layouts designed for seamless electronic shopping.
            </p>
          </div>
          <div className="mt-2 md:mt-0 relative flex-1 relative flex justify-center items-center">
            <Search className="text-zinc-500 absolute top-7 left-2 md:w-5 md:h-5" />
            <input
              onInput={(e: ChangeEvent<HTMLInputElement>) =>
                searching(e.target.value)
              }
              className="outline-none h-10 pl-10 border rounded-md pr-20 py-2 md:py-3 mr-auto mt-4 w-full"
              type="search"
              placeholder="Search..."
            />
            <span className='text-xs font-semibold sm:text-sm text-zinc-500 absolute top-7 right-4'>Result: {res?.length}</span>
            <ul
              className={`max-h-[50vh] overflow-auto ${isInput ? "block py-1 lg:py-3 " : "hidden p-0 "
                } shadow-lg mx-0 top-11 w-full border shadow-md border-zinc-400 z-10 absolute bg-white mt-5 rounded-lg`}
            >
              {res.length > 0 ? (
                res.map((item, index) => (
                  <li
                    key={item.title}
                    className={`${isInput ? 'py-1 border-b' : 'p-0 border-0'
                      } hover:bg-zinc-100 cursor-pointer hover:bg-slate-200 rounded-sm my-1`}

                  >
                    <Link
                      className='flex items-center font-bold justify-between px-3'
                      href={{ pathname: `/id_${item?.id}`, query: { id: item?.id, prefix: item?.category } }}>

                      <span className='flex-col flex'>
                        <span className='text-sm mb-2 text-blue-400'>{item.title}</span>
                        <span className='text-xs font-bold'><FormattedPrice amount={item?.price} /></span>
                      </span>
                      <img
                        className={'w-16 h-16 hidden sm:inline-block rounded-md'}
                        src={item.image1}
                        width={70}
                        height={70} />
                    </Link>
                  </li>
                ))
              ) : (
                <li>No results found</li>
              )}
            </ul>
          </div>
          <Product categoryName={categoryName} prefix={'pr'} products={products} />
        </div>
      </div>
    </div>
  );
}

export default FilterableProducts;
