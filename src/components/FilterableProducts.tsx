'use client'
import React, { useState, useEffect } from 'react';
import Categories from './Categories';
import Product from './Product';
import { getCategoryProducts } from '@/helpers/getCategoryProducts';
// import { AlignJustify } from 'lucide-react';

function FilterableProducts({ categories }) {
  const [categoryName, setCategoryName] = useState('sensor');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const p = await getCategoryProducts(categoryName);
        setProducts(p);
        console.log(p);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    if (typeof window !== 'undefined') {
      // Run the effect only in the browser environment
      fetchProducts();
    }
  }, [categoryName]);

 

  return (
    <div className='mt-5'>
      <div className='relative mt-5 flex gap-4 m-auto '>
        <Categories setCategoryName={setCategoryName} categories={categories} />
        <Product prefix={'pr'} products={products} />
      </div>
    </div>
  );
}

export default FilterableProducts;
