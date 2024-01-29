'use client'
import Image from "next/image";
import whatsappImg from "@/assets/whatsapp.png";

const WhatsApp = () => {
    const openWhatsApp = () => {
        const phoneNumber = "201102071544";
        const message = "Hi Robotech, I need some help.";
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappLink, '_blank');
    };


  return (
    <>
      <div
        className="fixed right-4 bottom-14 wobble-hor-bottom z-50 cursor-pointer"
        onClick={openWhatsApp}
      >
        <Image
        style={{filter: 'drop-shadow(0px 0px 6px black)'}}
          className="md:w-14"
          src={whatsappImg}
          width={50}
          height={50}
          alt="whatsapp"
        />
      </div>
    </>
  );
};

export default WhatsApp;
