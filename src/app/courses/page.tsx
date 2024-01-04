import Container from "@/components/Container";
import Courses from "@/components/Courses";
import React from "react";
const page = async () => {
  return (
    <Container>
      <div className="border-b-[1px] relative border-b-zinc-400 pb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Courses</h2>
        <p>Manage You Data</p>
      </div>
        <Courses />
    </Container>
  );
};

export default page;
