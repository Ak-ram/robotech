'use client'
import React, { useEffect, useState } from "react";

import AdminComponent from "@/components/AdminComponent";
import { XCircle } from "lucide-react";

interface RouteProps {}

const Page: React.FC<RouteProps> = () => {
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(true);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 870px)'); // Adjust threshold as needed
    const handleChange = () => setIsLargeScreen(!mq.matches);
    
    setIsLargeScreen(!mq.matches); // Set initial state
    
    mq.addEventListener('change', handleChange);

    return () => {
      mq.removeEventListener('change', handleChange);
    };
  }, []);

  if (!isLargeScreen) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <div className="bg-white w-96 p-8 rounded-lg shadow-md flex flex-col items-center">
          <XCircle className="text-red-500 w-12 h-12 mb-4" />
          <p className="text-center text-red-500">
            This page is not optimized for smaller screens. Please access it
            on a larger device or desktop for the best experience.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex relative"  style={isLargeScreen ? {} : { display: "none" }}>
      <AdminComponent />
    </div>
  );
};

export default Page;
