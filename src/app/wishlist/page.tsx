import Container from "@/components/Container";
import Title from "@/components/Title";
import Wish from "@/components/Wish";
import React from "react";

const page = () => {
  return (
    <Container>
      <Title title="Wishlist" />
      <Wish />
    </Container>
  );
};

export default page;
