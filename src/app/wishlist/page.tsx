import Container from "@/components/Container";
import Title from "@/components/Title";
import Wish from "@/components/Wish";
import { Heart } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <Container>
    <div className="border-b border-gray-400 mt-6 pb-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Heart className="w-8 h-8 text-gray-600" />
        <div>
          <h2 className="text-xl font-bold text-gray-800">Your Wishlist</h2>
          <p className="text-gray-600">Explore items you've saved for later.</p>
        </div>
      </div>
    </div>
    <Wish />
  </Container>
  
  
  );
};

export default page;
