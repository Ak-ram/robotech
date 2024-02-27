"use client";

import ConfettiComponent from "@/components/ConfettiComponent";
import Container from "@/components/Container";
import Link from "next/link";

const page = () => {
  const openWhatsApp = () => {
    const phoneNumber = "201102071544";
    const message = "Hi Robotech, I need some help.";
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Check if window is defined (client-side) before opening a new window
    if (typeof window !== 'undefined') {
        window.open(whatsappLink, '_blank');
    } else {
        // Handle server-side rendering case (optional)
        console.warn("Window object is not defined. Unable to open WhatsApp.");
    }
};

  return (
    <Container className="flex items-center justify-center py-20">
      <ConfettiComponent />
      <div className="flex flex-col items-center justify-center gap-y-5">
        <h2 className="text-4xl font-bold">
        Your order has been sent to the Robotech</h2>
        <p>You can now track your order by contacting us via WhatsApp.</p>
        <div className="flex items-center gap-x-5">
            <button onClick={openWhatsApp} className="bg-black text-slate-100 w-44 h-12 rounded-full text-base font-semibold hover:bg-designColor duration-300">
             Contact Us
            </button>
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
