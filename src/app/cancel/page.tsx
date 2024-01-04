"use client";

import Container from "@/components/Container";
import Link from "next/link";

const page = () => {
  return (
    <Container className="flex items-center justify-center py-20">
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-y-5">
        <h2 className="text-4xl font-bold">
        Your order has been canceled.
        </h2>
        <p>Continue shopping with us for more great deals and products.</p>
        <div className="flex items-center gap-x-5">
          <Link href={"/"}>
            <button className="bg-black text-slate-100 w-44 h-12 rounded-full text-base font-semibold hover:bg-designColor duration-300">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default page;
