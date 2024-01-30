"use client";
import Container from "@/components/Container";
import { useRouter } from "next/navigation";
import React, { ReactComponentElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StateProps } from "../../type";
import AdminProducts from "./AdminProducts";
import Print3DComponent from "./Admin3DComponent";
import AdminCourses from "./AdminCourses";
import Admin3DComponent from "./Admin3DComponent";
import AdminAbout from "./AdminAbout";
import AdminFaq from "./AdminFaq";
import AdminSlides from "./AdminSlides";
import AdminAnnouncement from "./AdminAnnouncement";
import { BarChart, GraduationCap, HelpCircle, Key, LayoutList, Menu, Printer, SlidersHorizontal, Smile, StickyNote, X } from "lucide-react";
import Stats from "./Stats";

const AdminComponent = () => {
  const userInfo = useSelector((state: StateProps) => state.pro.userInfo);
  const router = useRouter();
  interface SidebarItem {
    id: number;
    label: string;
    content: any;
    icon: any;
  }
  const [selectedItem, setSelectedItem] = useState<SidebarItem | null>(null);
  const [isOpen, setOpen] = useState<Boolean>(true);

  const sidebarItems: SidebarItem[] = [
    { id: 1,icon:<LayoutList/>, label: "Products", content: <AdminProducts /> },
    { id: 2,icon:<Printer/>, label: "3D", content: <Admin3DComponent /> },
    { id: 3,icon:<GraduationCap />, label: "Courses", content: <AdminCourses /> },
    { id: 4,icon:<Smile/>, label: "About", content: <AdminAbout /> },
    { id: 5,icon:<HelpCircle/>, label: "Faq", content: <AdminFaq /> },
    { id: 6,icon:<SlidersHorizontal/>, label: "Slides", content: <AdminSlides /> },
    { id: 7,icon:<StickyNote/>, label: "Announcement", content: <AdminAnnouncement /> },
    { id: 8,icon:<BarChart/>, label: "Stats", content: <Stats /> },
    // Add more items as needed
  ];

  const handleItemClick = (item: SidebarItem) => {
    setSelectedItem(item);
  };
  // Check authentication status without redirecting
  if (!userInfo) {
    router.push('/login')
    return <h2>You should login first, you will be redirected to login page...</h2>; // Or render a login component, redirect, or some other behavior
  }

  // Check if the user has the right authorization
  const isAuthorized =
    userInfo.email === process.env.NEXT_PUBLIC_AUTH_USERNAME &&
    userInfo.password === process.env.NEXT_PUBLIC_AUTH_PASSWORD;

  if (!isAuthorized) {
    return null; // Or render a login component, redirect, or some other behavior
  }

  return (
    <>
      {/* Sidebar */}
      <div className={`select-none bg-white text-black transition-all ${isOpen ? 'w-[250px] py-4 px-2' : 'w-0'}  lg:border-r lg:border-gray-200 `}>
        {/* <h2 className="text-2xl font-bold mb-4">Pages</h2> */}

        <ul className="flex items-center bg-white py-2 px-2 font-bold justify-between overflow-x-auto gap-x-3 lg:flex-col lg:bg-transparent lg:items-start">
          {sidebarItems.map((item) => (
            <li
              key={item.id}
              className={`flex items-center gap-2 my-2 w-full hover:bg-slate-300 p-1.5 rounded-md cursor-pointer ${selectedItem === item ? "bg-slate-300" : ""
                } my-0`}
              onClick={() => handleItemClick(item)}
            >
              {item.icon}
              {item.label}
            </li>
          ))}
        </ul>
      </div>
      {/* Main content */}
      <div className="flex-1 py-5 p-4 ">
        {/* <header className="flex items-center justify-between mb-8"> */}
        {/* <h2 className="text-2xl font-bold">Robotech Panel</h2>
        </header> */}

        {selectedItem ? (
          <div className="">
           
            <div className="border-b-zinc-300 pb-2 border-b mb-2 flex items-center gap-2">
            <span className="hover:bg-slate-300 bg-white  py-1 px-1 rounded cursor-pointer w-fit inline-block" onClick={() => setOpen(!isOpen)}>
              {
                isOpen ? <X /> : <Menu />
              }
            </span>
              <span className="bg-white hover:bg-slate-300 font-bold px-1.5 py-1 rounded">{selectedItem.label} Page</span>
            </div>
            <div>{selectedItem.content}</div>
          </div>
        ) : (
          <div>
            <span  className="cursor-pointer w-fit inline-block" onClick={() => setOpen(!isOpen)}>
              {
                isOpen ? <X /> : <Menu />
              }


            </span>
            <p className="font-bold text-lg flex items-center justify-center lg:h-[500px] mb-5 text-gray-600">

              Select Page from the sidebar.
            </p>
          </div>
        )}
      </div>
    </>


  );
};

export default AdminComponent;
