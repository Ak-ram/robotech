import React from "react";
import { Facebook, Mail, MapPin, Phone } from 'lucide-react';
import Container from "./Container";
import Logo from "./Logo";
import { navigation } from "@/constants/data";
import Link from "next/link";

const Footer = () => {
  return (
    
  <div className="bg-zinc-900 text-zinc-300">
    <Container className="md:flex gap-3 py-5 px-0 justify-between">
      <div className="flex-1 items-center justify-between">
        <div className="bg-zinc-800 md:bg-transparent rounded-[.5rem] md:rounded-0 p-3 py-5 md:p-1 flex flex-col items-center justify-center md:items-start">
          <Logo className="mb-3 text-white bg-slate-200 rounded-full h-20 w-20 flex items-center justify-center" spanClassName="bg-white text-black" />
          <span className="text-designColor font-bold">RobotechSpace</span>
          <span className="text-sm ml-2 ">Mechatronics Engineering Space</span>
          <p className="w-full lg:max-w-md text-zinc-500 text-center md:text-left">We integrate cutting-edge technologies for precision and innovation in spacecraft design, robotics, and control systems.</p>
        </div>
        <div className="mt-5 bg-zinc-800 md:bg-transparent rounded-[.5rem] md:rounded-0 p-5 md:p-1">
          <span className="font-bold text-designColor">Contact Us</span>
          <ul className="mt-3 space-y-2">
            <li className="w-fit flex gap-2 hover:underline">
              <Facebook />
              <a href="https://www.facebook.com/robotechspace">facebook.com/robotechspace</a>
            </li>
            <li className="flex w-fit gap-2 hover:underline">
              <Mail />
              <a href="mailto:robotechspace8@gmail.com">robotechspace8@gmail.com</a>
            </li>
            <li className="flex gap-2 w-fit hover:underline">
              <Phone />
              <a className="select-text" href="tel:1102071544">+20 11 0207 1544</a>
            </li>
            <li className="flex gap-2 w-fit hover:underline">
              <MapPin />
              <span className="ml-2 hover:underline">بنى سويف, امام بنك الاسكندرية</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex-2 flex-1 flex-1 mt-5 md:mt-0">
        <div className="border-b-[1px] pb-5 border-b-zinc-800">
          <span className="font-bold text-designColor">Quick Links</span>
          <ul className="flex gap-x-4 flex-wrap pl-4 mt-3">
            {navigation.map((item) => (
              <li key={item?._id}>
                <Link href={item?.href}>
                  <button className="hover:text-white duration-200">{item?.title}</button>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-3">
          <span className="font-bold text-designColor">Our Location</span>
          <a className="ml-2 hover:underline" href="https://www.google.com/maps/search/%D8%A8%D9%86%D9%83+%D8%A7%D9%84%D8%A5%D8%B3%D9%83%D9%86%D8%AF%D8%B1%D9%8A%D9%87%E2%80%AD/@29.075876,31.0982042,17z?entry=ttu">
            بنى سويف, امام بنك الاسكندرية
          </a>
          <iframe
            height="300"
            className="w-full mt-3"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3487.0091030606804!2d31.09562927474659!3d29.075875975425614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145a260dbed490f1%3A0xa94f7ebe4d6ec208!2z2KjZhtmDINin2YTYpdiz2YPZhtiv2LHZitmH!5e0!3m2!1sen!2seg!4v1703771682342!5m2!1sen!2seg"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </Container>
  </div>
)
};

export default Footer;
