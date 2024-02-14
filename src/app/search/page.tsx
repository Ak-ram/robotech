import Container from "@/components/Container";
import PrintServices from "@/components/PrintServices";
import SearchComponent from "@/components/SearchComponent";
import SearchPage from "@/components/SearchPage";
import { Printer, Search } from "lucide-react";
import React from "react";
const page = async () => {

  return (
    <Container className="py-10">
      <div className="border-b w-full border-gray-400 pb-4 flex items-center justify-between">
      <div className="space-x-4">
        {/* Lucide Printer icon */}
        <div className="flex">
        <Search className="w-8 h-8 text-gray-600" />
          <h2 className="text-xl font-bold text-gray-800">Searching</h2>
          <p className="text-gray-600">Look for product ?</p>
        </div>
      <SearchComponent/>
      </div>
    </div>
    </Container>
  );
};

export default page;
