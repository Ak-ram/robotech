"use client";

import React from "react";

import AdminComponent from "@/components/AdminComponent";
import { useRouter } from "next/navigation";


const page = () => {
  // const router = useRouter();
  const router = '';

  return (
    // <Container>
    <div className="flex relative">
      <AdminComponent router={router} />

    </div>
    // </Container>

  );
};

export default page;
