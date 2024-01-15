'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Slider, { Settings } from "react-slick";
import Image from "next/image";
import { Clock, Smartphone, Map, MailPlus } from "lucide-react";
import { getSlidesData } from "@/helpers/getSlidesData";

interface BannerProps { }

const Banner: React.FC<BannerProps> = () => {
  const [dotActive, setDotActive] = useState<number>(0);
  const [slides, setSlides] = useState<any[]>([]);

  const settings: Settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    speed: 1000,
    beforeChange: (prev: number, next: number) => {
      setDotActive(next);
    },
    appendDots: (dots: any) => (
      <div
        style={{
          top: "80%",
          left: "67%",
        }}
        className="absolute translate-x[-50%] translate-y[-50%]"
      >
        <ul
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 3,
            userSelect: 'all'
          }}
          className="justify-center"
        >
          {dots}
        </ul>
      </div>
    ),
    customPaging: (i: number) => (
      <div
        style={
          i === dotActive
            ? {
              width: "20px",
              height: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              background: "#fe9a05",
              cursor: "pointer",
              borderRadius: "1rem",
            }
            : {
              width: "6px",
              height: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              background: "#131921",
              cursor: "pointer",
              borderRadius: "1rem",
            }
        }
      ></div>
    ),
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const slideList = await getSlidesData();
        setSlides(slideList);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (typeof window !== "undefined") {
      // Run the effect only in the browser environment
      fetchProducts();
    }
  }, []);
  return (
    <div className="lg:min-h-[500px] relative">
      <Slider {...settings}>
        {slides &&
          slides.map((slide, index) => (
            <div
              key={slide?.id}
              // className={`${dotActive === index ? "z-10" : "z-0"} lg:bg-none lg:bg-transparent w-full pb-5 h-[450px] bg-slate-200 relative`}
              className={`${dotActive === index ? "z-10" : "z-0"} lg:bg-none lg:bg-transparent w-full pb-5 h-[450px] bg-slate-200 relative transition-all duration-500 ease-in-out`}

            >
              <div className="w-full lg:w-1/3 flex items-center justify-center lg:inline-block h-[200px] lg:h-full bg-white lg:bg-designColor z-0 relative">
                <img
                  src={slide?.image}
                  width={200}
                  height={200}
                  alt="sliderone"
                  className={`w-80 lg:w-[400px] p-3 rounded-3xl lg:absolute object-cover lg:top-10 lg:-right-44 transform transition-transform duration-500 ease-in-out ${dotActive === index ? 'translate-x-0' : '-translate-x-full'}`}
                // priority
                />
              </div>
              <div className="h-300 p-5 lg:absolute lg:top-1/2 lg:left-2/3 transform lg:-translate-x-1/2 lg:-translate-y-1/2 flex flex-col items-center justify-center gap-5">
                <p className="text-2xl font-bold uppercase text-center">{slide?.heading}</p>
                <p className="w-96 px-4 text-center text-zinc-600">{slide?.sub_heading}</p>
                <Link href={slide?.link_url} passHref>
                  <span className="text-base font-medium text-white bg-designColor rounded-md px-4 py-2">{slide?.link_text}</span>
                </Link>
              </div>
            </div>
          ))}
      </Slider>
      <div className="mb-5 rounded-sm h-20 absolute left-1/2 -bottom-10 transform -translate-x-1/2 hidden lg:inline-flex items-center gap-x-12 p-10">
        <div className="border border-b-designColor rounded-sm h-20 bg-white absolute left-1/2 -bottom-10 transform -translate-x-1/2 hidden lg:inline-flex items-center gap-x-12 p-10">
          <div className="flex items-center gap-5 w-60">
            <Clock className="text-designColor w-8 h-8" />
            <div>
              <p>Saterday - Thursday</p>
              <p className="font-semibold">Open</p>
            </div>
          </div>
          <div className="flex items-center gap-5 w-60">
            <Smartphone className="text-designColor w-8 h-8" />
            <div>
              <a className="select-text" href="tel:1102071544">+20 11 0207 1544</a>
              <p className="font-semibold">Order by Phone</p>
            </div>
          </div>
          <div className="flex items-center gap-5 w-60">
            <Map className="text-designColor w-8 h-8" />
            <div>
              <a className="text-sm hover:underline" href="https://www.google.com/maps/search/%D8%A8%D9%86%D9%83+%D8%A7%D9%84%D8%A5%D8%B3%D9%83%D9%86%D8%AF%D8%B1%D9%8A%D9%87%E2%80%AD/@29.075876,31.0982042,17z?entry=ttu">
                بنى سويف, امام بنك الاسكندرية
              </a>
              <p className="font-semibold">Address</p>
            </div>
          </div>
          <div className="flex items-center gap-5 w-60">
            <MailPlus className="text-designColor w-8 h-8" />
            <div>
              <a className="text-sm hover:underline" href="mailto:robotechspace8@gmail.com">robotechspace8@gmail.com</a>
              <p className="font-semibold">Email us</p>
            </div>
          </div>
        </div>      </div>
    </div>
  );
};

export default Banner;
