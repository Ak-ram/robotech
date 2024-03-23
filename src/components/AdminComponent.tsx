import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { StateProps } from "../../type";
import {
  BarChart,
  GraduationCap,
  HelpCircle,
  Key,
  LayoutList,
  Loader,
  Map,
  Menu,
  Paperclip,
  Printer,
  ScrollText,
  SlidersHorizontal,
  Smile,
  StickyNote,
  UserCircle,
  X,
} from "lucide-react";
import Stats from "./Stats";
import AdminCustomers from "./AdminCustomers";
import { useRouter } from "next/navigation";
import Loading from "./Loading";
import AdminProducts from "./AdminProducts";
import Admin3DComponent from "./Admin3DComponent";
import AdminCourses from "./AdminCourses";
import AdminAbout from "./AdminAbout";
import AdminFaq from "./AdminFaq";
import AdminSlides from "./AdminSlides";
import AdminAnnouncement from "./AdminAnnouncement";
import AdminLocation from "./AdminLocation";
import AdminBills from "./AdminBills";
import supabase from "@/supabase/config";
import toast from "react-hot-toast";

const AdminComponent = () => {
  const userInfo = useSelector((state: StateProps) => state.pro.userInfo);
  interface SidebarItem {
    id: number;
    label: string;
    content: any;
    icon: any;
  }
  const [selectedItem, setSelectedItem] = useState<SidebarItem | null>(null);
  const [isOpen, setOpen] = useState<Boolean>(true);
  const [password, setPassword] = useState<string>("");
  const [isPasswordEntered, setIsPasswordEntered] = useState<boolean>(false);
  const router = useRouter();

  // useEffect(() => {
  //   const storedPasswordStatus = sessionStorage.getItem("isPasswordEntered");
  //   console.log(storedPasswordStatus)
  //   if (storedPasswordStatus === "true") {
  //     setIsPasswordEntered(true);
  //   }
  // }, []);
  useEffect(() => {
    return () => {
      setIsPasswordEntered(false);
    };
  }, []);
  const sidebarItems: SidebarItem[] = [
    {
      id: 1,
      icon: <LayoutList />,
      label: "Products",
      content: <AdminProducts />,
    },
    {
      id: 2,
      icon: <Printer />,
      label: "Services",
      content: <Admin3DComponent />,
    },
    {
      id: 3,
      icon: <GraduationCap />,
      label: "Courses",
      content: <AdminCourses />,
    },
    { id: 4, icon: <Smile />, label: "News", content: <AdminAbout /> },
    { id: 5, icon: <HelpCircle />, label: "Faq", content: <AdminFaq /> },
    {
      id: 6,
      icon: <SlidersHorizontal />,
      label: "Slides",
      content: <AdminSlides />,
    },
    {
      id: 7,
      icon: <StickyNote />,
      label: "Announcement",
      content: <AdminAnnouncement />,
    },
    { id: 8, icon: <Map />, label: "Location", content: <AdminLocation /> },
    {
      id: 9,
      icon: <UserCircle />,
      label: "Customers",
      content: <AdminCustomers />,
    },
    { id: 10, icon: <BarChart />, label: "Stats", content: <Stats /> },
    { id: 11, icon: <ScrollText />, label: "Bills", content: <AdminBills /> },
    // Add more items as needed
  ];

  const handleItemClick = (item: SidebarItem) => {
    setSelectedItem(item);
  };

  const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if the entered password matches the pre-defined password
    const preDefinedPassword = process.env.NEXT_PUBLIC_STATS_AUTH_PASSWORD;
    if (password === preDefinedPassword) {
      setIsPasswordEntered(true);
      // sessionStorage.setItem("isPasswordEntered", "true");
    }
  };

  if (!userInfo) {
    setTimeout(() => {
      router.push("/ask_to_be_an_admin");
    }, 1000);
    return (
      <div className="h-[400px] flex items-center justify-center flex-col gap-3 p-3 mx-auto">
        <Loader className="animate-spin" />
        <h2 className="text-center">
          Ask to be an admin first, you will be redirected to the another
          page...
        </h2>
        {/* Redirect to the login page */}
      </div>
    );
  }
  const isAuthorized = async () => {
    try {
      const { data, error } = await supabase
        .from("admins")
        .select("email")
        .eq("email", userInfo.email)
        .single();

      if (error) {
        throw error;
      }

      return data !== null; // Return true if data exists, indicating authorization
    } catch (error) {
      console.error("Error checking authorization:", (error as any).message);
      return false; // Return false in case of an error
    }
  };

  // Call the function and handle the result
  isAuthorized()
    .then((authorized) => {
      if (!authorized) {
        setTimeout(() => {
          router.push("/ask_to_be_an_admin");
        }, 1000);
        return null; // Or render a login component, redirect, or some other behavior
      }

      // Continue with authorized logic
    })
    .catch((error) => {
      console.error("Error checking authorization:", error.message);
    });


  return (
    <>
      <div
        className={`select-none bg-white text-black transition-all ${
          isOpen ? "w-[250px] py-4 px-2" : "w-0"
        }  lg:border-r lg:border-gray-200 `}
      >
        <ul className="bg-white py-2  font-bold justify-between overflow-x-auto  lg:bg-transparent lg:items-start">
          {sidebarItems.map((item) => (
            <li
              key={item.id}
              className={`flex items-center gap-2 my-2 w-full hover:bg-slate-200 p-1.5 rounded-md cursor-pointer ${
                selectedItem === item ? "bg-slate-300" : ""
              } my-0`}
              onClick={() => handleItemClick(item)}
            >
              {item.icon}
              {item.label}
            </li>
          ))}
        </ul>
      </div>
      <div
        className={`${
          isOpen ? "max-w-screen-lg" : "w-full"
        } flex-1  mx-auto py-5 p-4 `}
      >
        {selectedItem ? (
          <div className="">
            <div className="border-b-zinc-300 pb-2 border-b mb-2 flex items-center gap-2">
              <span
                className="hover:bg-slate-300 bgwhite  py-1 px-1 rounded cursor-pointer w-fit inline-block"
                onClick={() => setOpen(!isOpen)}
              >
                {isOpen ? <X /> : <Menu />}
              </span>
              <span className="bg-white  hover:bg-slate-300 font-bold px-1.5 py-1 rounded">
                {selectedItem.label} Page
              </span>
            </div>
            {isPasswordEntered || selectedItem.id !== 10 ? (
              selectedItem.content
            ) : (
              <div className="grid place-items-center h-[300px]">
                <form onSubmit={handlePasswordSubmit}>
                  <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                    <div className="text-2xl font-bold mb-4">
                      Enter Password
                    </div>

                    <div className="mb-4">
                      <div className="border flex rounded-md focus-within:border-blue-500">
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter the password"
                          className="border-l-0 p-2 text-gray-700 focus:outline-none"
                        />
                        <span className="flex items-center text-gray-400 hover:text-gray-500 bg-white px-2">
                          <Key />
                        </span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        ) : (
          <div>
            <span
              className="cursor-pointer w-fit inline-block"
              onClick={() => setOpen(!isOpen)}
            >
              {isOpen ? <X /> : <Menu />}
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
