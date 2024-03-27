import React, { useState, useEffect } from "react";
import { addSuperAdmin } from "@/redux/proSlice";
import { useDispatch, useSelector } from "react-redux";
import { SidebarItem, StateProps } from "../../type";
import {
  Key,
  Loader,
  Menu,
  User,
  X,
} from "lucide-react";

import { useRouter } from "next/navigation";
import AdminProducts from "./AdminProducts";

import supabase from "@/supabase/config";
import { sidebarItems } from "@/lib/sidebarItems";

const AdminComponent = () => {
  const userInfo = useSelector((state: StateProps) => state.pro.userInfo);
  const superAdminInfo = useSelector(
    (state: StateProps) => state.pro.superAdminInfo
  );

  const [selectedItem, setSelectedItem] = useState<SidebarItem | null>(sidebarItems[0]);
  const [isOpen, setOpen] = useState<Boolean>(true);
  const [superAdminPassword, setSuperAdminPassword] = useState<string>("");
  const [superAdminEmail, setSuperAdminEmail] = useState<string>("");
  const [isSuperAdminAuth, setIsSuperAdminAuth] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    if (superAdminInfo) {
      const isExistingInSupbase = async () => {
        const { data } = await supabase
          .from("super_admins")
          .select("*")
          .eq("email", superAdminInfo.email)
          .eq("password", superAdminInfo.password)
          .single();

        if (data !== null) {
          setIsSuperAdminAuth(true);
        } else {
          setIsSuperAdminAuth(false)
        }
      };

      isExistingInSupbase(); // Invoke the function to perform the database check
    }
  }, [superAdminInfo]); // Include superAdminInfo in the dependency array



  const handleItemClick = (item: SidebarItem) => {
    setSelectedItem(item);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await supabase
      .from("super_admins")
      .select("*")
      .eq("email", superAdminEmail) // condition for email
      .eq("password", superAdminPassword)
      .single(); // condition for password

    if (
      superAdminEmail === data!?.email &&
      superAdminPassword === data!?.password
    ) {
      setIsSuperAdminAuth(true);
      dispatch(
        addSuperAdmin({ email: superAdminEmail, password: superAdminPassword })
      );
      // dispatch(deleteUser());

      const { data } = await supabase
        .from("admins")
        .select("*")
        .eq("email", superAdminEmail);
      if (!data) {
        await supabase.from("admins").insert({ email: superAdminEmail });
      }
    } else {
      setMsg("Incorrect email or password! ❌");
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
        className={`select-none bg-white text-black transition-all ${isOpen ? "w-[250px] py-4 px-2" : "w-0"
          }  lg:border-r lg:border-gray-200 `}
      >
        <ul className="bg-white py-2  font-bold justify-between overflow-x-auto  lg:bg-transparent lg:items-start">
          {sidebarItems.map((item) => (
            <li
              key={item.id}
              className={`flex items-center gap-2 my-2 w-full hover:bg-slate-200 p-1.5 rounded-md cursor-pointer ${selectedItem === item ? "bg-slate-300" : ""
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
        className={`${isOpen ? "max-w-screen-lg" : "w-full"
          } flex-1  mx-auto py-5 p-4 `}
      >
        {selectedItem &&
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
            {isSuperAdminAuth || selectedItem.id !== 10 ? (
              selectedItem.content
            ) : (
              <div className="grid place-items-center h-[300px]">
                <form onSubmit={handleSubmit}>
                  <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
                    <div className="text-2xl font-bold mb-4">
                      Enter Password
                    </div>

                    <div className="mb-4">
                      <div className="border flex rounded-md focus-within:border-blue-500">
                        <input
                          type="email"
                          value={superAdminEmail}
                          onChange={(e) => setSuperAdminEmail(e.target.value)}
                          placeholder="Enter your email"
                          className="border-l-0 p-2 text-gray-700 focus:outline-none"
                        />
                        <span className="flex items-center text-gray-400 hover:text-gray-500 bg-white px-2">
                          <User />
                        </span>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="border flex rounded-md focus-within:border-blue-500">
                        <input
                          type="password"
                          value={superAdminPassword}
                          onChange={(e) =>
                            setSuperAdminPassword(e.target.value)
                          }
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
                    <span className="mt-3 font-bold text-sm text-rose-700">
                      {msg}
                    </span>
                  </div>
                </form>
              </div>
            )}
          </div>
        }
      </div>
    </>
  );
};

export default AdminComponent;
