"use client";

import Container from "@/components/Container";
import LoginComponent from "@/components/LoginComponent";
import Link from "next/link";

const page = () => {
  return (
    <Container className="flex items-center justify-center py-20">
      <div className="min-h-[400px] w-[500px] flex flex-col items-center justify-center gap-y-5">
       <LoginComponent />
      </div>
    </Container>
  );
};

export default page;
