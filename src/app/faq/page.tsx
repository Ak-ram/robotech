
import Container from "@/components/Container";
import SupportComponent from "@/components/SupportComponent";
import { HelpCircle } from "lucide-react";
// import { getFaq } from "@/helpers/getFaq";
import React from "react";
const page = async () => {
  // const products = await getFaq();
  return (

    <Container className="pt-10 !mx-0">
      <div className="border-b px-3 border-gray-400 pb-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Lucide HelpCircle icon */}
          <HelpCircle className="w-8 h-8 text-gray-600" />
          <div>
            <h2 className="text-xl font-bold text-gray-800">FAQ</h2>
            <p className="text-gray-600">Get Answers to Your Questions</p>
          </div>
        </div>
      </div>
      <SupportComponent />    </Container>


  );
};

export default page;
