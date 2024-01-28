'use client'
import Image from "next/image";
import whatsappImg from "@/assets/whatsapp.png";

const WhatsApp = () => {
    const openWhatsApp = () => {
        const phoneNumber = "201066745733";
        const message = "Hi Robotech, I need some help.";
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappLink, '_blank');
    };


  return (
    <>
      <div
        className="fixed right-4 bottom-10 z-50 cursor-pointer"
        onClick={openWhatsApp}
      >
        <Image
          className="animate-pulse md:w-14"
          src={whatsappImg}
          width={40}
          height={40}
          alt="whatsapp"
        />
      </div>
    </>
  );
};

export default WhatsApp;
