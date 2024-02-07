import Container from "@/components/Container";
import PrintServices from "@/components/PrintServices";
import { Printer } from "lucide-react";
import React from "react";
const page = async () => {

  return (
    <Container className="py-10">
      <div className="border-b border-gray-400 pb-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        {/* Lucide Printer icon */}
        <Printer className="w-8 h-8 text-gray-600" />
        <div>
          <h2 className="text-xl font-bold text-gray-800">Printing</h2>
          <p className="text-gray-600">Bring your ideas to life.</p>
        </div>
      </div>
    </div>
      <PrintServices/>
    </Container>
  );
};

export default page;
