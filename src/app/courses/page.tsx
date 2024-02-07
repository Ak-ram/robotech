import Container from "@/components/Container";
import Courses from "@/components/Courses";
import { Book } from "lucide-react";
import React from "react";
const page = async () => {
  return (
    <Container className="py-10">
       <div className="border-b border-gray-400 pb-4 mb-5 relative flex items-center justify-between">
      <div className="flex items-center space-x-4">
        {/* Lucide Book icon */}
        <Book className="w-8 h-8 text-gray-600" />
        <div>
          <h2 className="text-xl font-bold text-gray-800">Courses</h2>
          <p className="text-gray-600">Nurturing Your Potential</p>
        </div>
      </div>
    </div>
        <Courses />
    </Container>
  );
};

export default page;
