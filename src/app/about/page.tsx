import Container from "@/components/Container";
import AboutComponent from "@/components/AboutComponent";
import Link from "next/link";
import React from "react";

const page = async () => {
  return (
    <Container>
      <div className="border-b-[1px] border-b-zinc-400 pb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">About</h2>
      </div>
    <AboutComponent />
    </Container>
  );
};

export default page;
