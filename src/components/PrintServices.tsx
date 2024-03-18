"use client";
import React, { useEffect, useState } from "react";
import Product from "./Product";
import supabase from "@/supabase/config";

function PrintServices() {
  const [services, setServices] = useState<any>([]);

  useEffect(() => {
    const fetchPrintServices = async () => {
      try {
        const { data } = await supabase.from("services").select();
        setServices(data!);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (typeof window !== "undefined") {
      // Run the effect only in the browser environment
      fetchPrintServices();
    }
  }, []);

  return <Product categoryName="print" prefix="print" products={services} />;
}

export default PrintServices;
