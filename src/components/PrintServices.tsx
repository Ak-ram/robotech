'use client'
import React, { useEffect, useState } from 'react'
import Product from './Product';
import { getPrintServices } from '@/helpers/getPrintServices';

function PrintServices() {
    const [services, setServices] = useState([])

    useEffect(() => {
        const fetchPrintServices = async () => {
            try {
                const printServices = await getPrintServices();
                setServices(printServices);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        if (typeof window !== "undefined") {
            // Run the effect only in the browser environment
            fetchPrintServices();
        }
    }, []);


    return (
        <Product prefix='print' products={services} />
        )
}

export default PrintServices