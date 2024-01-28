
import Container from "@/components/Container";
import SupportComponent from "@/components/SupportComponent";
// import { getFaq } from "@/helpers/getFaq";
import React from "react";
const page = async () => {
  // const products = await getFaq();
  return (
    <Container className="py-10">
      <div className="border-b-[1px] border-b-zinc-400 pb-4 flex items-center justify-between">
        <h2 className="font-bold text-2xl">FAQ</h2>
      </div>

      <SupportComponent />

    </Container>
  );
};

export default page;
