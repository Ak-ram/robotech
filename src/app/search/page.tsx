import Container from "@/components/Container";
import PrintServices from "@/components/PrintServices";
import SearchComponent from "@/components/SearchComponent";
import { Printer, Search, SearchCheck, SearchX } from "lucide-react";
import React from "react";
import { Toaster } from "react-hot-toast";
const page = async () => {
  return (
  <Container className="py-10">
      <div className="border-b w-full border-gray-400 pb-4 flex items-center justify-between">
        <div className="space-x-4 sm:w-[98%] mx-auto">
          {/* Lucide Printer icon */}
          <div className="flex items-center space-x-4">
            {/* Lucide Printer icon */}
            <Search className="w-8 h-8 text-gray-600" />
            <div>
              <h2 className="text-xl font-bold text-gray-800">Search</h2>
              <p className="text-gray-600">Look for product?</p>
            </div>
          </div>
          <SearchComponent />
        </div>
      </div>
      <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#000",
                color: "#fff",
              },
            }}
          />
    </Container>
  );
};

export default page;
