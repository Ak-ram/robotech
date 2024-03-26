"use client";
import React, { useEffect, useState } from "react";
import Product from "./Product";
import supabase from "@/supabase/config";
import ServiceCard from "./ServiceCard";

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

  return <div className="m-auto p-5 md:mx-4 flex flex-wrap items-start justify-start grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-2 gap-2 mt-2">
  {services.map((item) => (


    <ServiceCard item={item} />

  ))}
</div>;
}

export default PrintServices;
