import Container from "@/components/Container";
import PrintServices from "@/components/PrintServices";
import React from "react";
const page = async () => {

  return (
    <Container>
      <div className="border-b-[1px] border-b-zinc-400 pb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">3D print</h2>
        <p>Bring your ideas to life.</p>
      </div>
      <PrintServices/>
    </Container>
  );
};

export default page;
