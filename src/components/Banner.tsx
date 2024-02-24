// 'use client'
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import Slider, { Settings } from "react-slick";
// import Image from "next/image";
// import { Clock, Smartphone, Map, MailPlus, RefreshCcw, ExternalLink } from "lucide-react";
// import { getSlidesData } from "@/helpers/getSlidesData";
// import ProductSlider from "./ProductSlider";

// interface BannerProps { }

// const Banner: React.FC<BannerProps> = () => {
//   const [dotActive, setDotActive] = useState<number>(0);
//   const [slides, setSlides] = useState<any[]>([]);

//   const settings: Settings = {
//     // dots: true,
//     infinite: true,
//     autoplay: true,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: false,
//     fade: true,
//     speed: 1000,
//     beforeChange: (prev: number, next: number) => {
//       setDotActive(next);
//     },
//     appendDots: (dots: any) => (
//       <div
//         style={{
//           top: "80%",
//           left: "67%",
//           userSelect: 'none'
//         }}
//         className="absolute translate-x[-50%] translate-y[-50%]"
//       >
//         <ul
//           style={{
//             width: "100%",
//             display: "flex",
//             alignItems: "center",
//             gap: 3,
//             userSelect: 'all'
//           }}
//           className="justify-center"
//         >
//           {dots}
//         </ul>
//       </div>
//     ),
//     customPaging: (i: number) => (
//       <div
//         className={`${i === dotActive ? 'items-center justify-center text-designColor border-designColor md:bg-transparent bg-designColor w-[18px] h-[6px] md:w-fit md:h-fit' : "text-slate-500 border-slate-500 w-[6px] h-[6px] bg-black md:bg-transparent  md:w-fit md:h-fit"} rounded-full md:rounded-none cursor-pointer flex text-sm font-bold border-b pb-1 md:mx-1 select-none`}


//       ><Link href={slides[i]?.link_url! || ''} className="hidden md:flex items-center gap-1">
//           <ExternalLink size={15} />{slides[i]?.link_text}</Link>
//       </div>
//     ),
//   };

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const slideList = await getSlidesData();
//         setSlides(slideList);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     if (typeof window !== "undefined") {
//       // Run the effect only in the browser environment
//       fetchProducts();
//     }
//   }, []);
//   return (
//     <div className="lg:min-h-[500px] relative">
//       <div className="flex gap-3">
//         <Slider {...settings} >
//           {slides &&
//             slides.map((slide, index) => (
//               <div
//                 key={slide?.id}
//                 className={`${dotActive === index ? "z-10" : "z-0"} w-[70%] pb-5 lg:h-[450px] relative transition-all duration-500 ease-in-out`}

//               >
//                 <div className=" flex items-center justify-center lg:inline-block h-[200px] lg:h-full bg-white z-0 relative">
//                   <img
//                     src={slide?.image}
//                     width={200}
//                     height={200}
//                     alt="sliderone"
//                     className={`rounded-3xl object-contain w-full h-full transform transition-transform duration-500 ease-in-out ${dotActive === index ? 'translate-x-0' : '-translate-x-full'}`}
//                   />
//                 </div>

//               </div>
//             ))}
//         </Slider>
//         <ProductSlider />
//         </div>


//       <div className="mt-10 rounded-sm h-20 px-10 w-full hidden lg:inline-flex items-center gap-x-12 ">
//         <div className="border border-b-designColor rounded-sm h-20 bg-white mx-auto lg:inline-flex items-center gap-x-12 p-10">
//           <div className="flex items-center gap-5 w-60">
//             <Clock className="text-designColor w-8 h-8" />
//             <div>
//               <p>Saterday - Thursday</p>
//               <p className="font-semibold">Open</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-5 w-60">
//             <Smartphone className="text-designColor w-8 h-8" />
//             <div>
//               <a className="select-text" href="tel:1102071544">+20 11 0207 1544</a>
//               <p className="font-semibold">Order by Phone</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-5 w-60">
//             <Map className="text-designColor w-8 h-8" />
//             <div>
//               <a className="text-sm hover:underline" href="https://www.google.com/maps/search/%D8%A8%D9%86%D9%83+%D8%A7%D9%84%D8%A5%D8%B3%D9%83%D9%86%D8%AF%D8%B1%D9%8A%D9%87%E2%80%AD/@29.075876,31.0982042,17z?entry=ttu">
//                 بنى سويف, امام بنك الاسكندرية
//               </a>
//               <p className="font-semibold">Address</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-5 w-60">
//             <MailPlus className="text-designColor w-8 h-8" />
//             <div>
//               <a className="text-sm hover:underline" href="mailto:robotechspace8@gmail.com">robotechspace8@gmail.com</a>
//               <p className="font-semibold">Email us</p>
//             </div>
//           </div>
//         </div>


//       </div>
//     </div>
//   );
// };

// export default Banner;
import React, { useState, useEffect } from "react";
import Slider, { Settings } from "react-slick";
import { getSlidesData } from "@/helpers/getSlidesData";
import ProductSlider from "./ProductSlider";
import Link from "next/link";


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
          userSelect: 'none'
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
        className={`${i === dotActive ? 'bg-designColor w-6 h-2 ' : "w-2 h-2 border border-zinc-400"} rounded-full cursor-pointer`}
      >
        <span className="hidden md:flex items-center gap-1">

        </span>
      </div>
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
    <div className="relative flex gap-3 mt-2 lg:p-5 bg-white rounded-lg w-[97%] mx-auto">
      <div className="lg:w-[70%] lg:border  overflow-hidden  rounded-lg border-slate-200">
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div
              key={slide?.id}
              className={`${dotActive === index ? "z-10" : "z-0"
                } w-full relative`}
            >
              <div className="flex items-center justify-center h-full">
                <img
                  src={slide?.image || "https://via.placeholder.com/800x400"}
                  alt={`Slide ${index}`}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className="hidden lg:block lg:w-[28%]">
        <ProductSlider />
      </div>
    </div>
  );
};

export default Banner;
