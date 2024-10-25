import Container from "@/components/Container";
import PrintServices from "@/components/PrintServices";
import { LayoutList, PackageCheck, Printer } from "lucide-react";
import React from "react";
import { Toaster } from "react-hot-toast";
const page = async () => {

  return (
    <Container className="pt-7 !m-0">
      <div className="border-b border-gray-400 pb-4 flex items-center justify-between">
      <div className="flex items-center mx-3 space-x-4">
        {/* Lucide Printer icon */}
        <PackageCheck className="w-8 h-8 text-gray-600" />
        <div>
          <h2 className="text-xl font-bold text-gray-800">Services</h2>
          <p className="text-gray-600">Transform your concepts into reality.</p>
        </div>
      </div>
    </div>
      <PrintServices/>
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
