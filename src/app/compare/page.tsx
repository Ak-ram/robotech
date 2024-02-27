import Container from "@/components/Container";
import Compare from "@/components/Compare";
import { GitCompareArrows } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <Container>
    <div className="border-b border-gray-400 mt-6 pb-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <GitCompareArrows className="w-8 h-8 text-gray-600" />
        <div>
          <h2 className="text-xl font-bold text-gray-800">Compare Products</h2>
          <p className="text-gray-600">Compare Products to goes here.</p>
        </div>
      </div>
    </div>
    <Compare />
  </Container>
  
  
  );
};

export default page;
