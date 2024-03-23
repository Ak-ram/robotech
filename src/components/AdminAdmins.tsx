import { useEffect, useState, useRef } from "react";
import CustomerStatsInStocks from "./CustomerStatsInStocks";
import CustomerStatsOutStocks from "./CustomerStatsOutStocks";
import { getProducts } from "@/helpers/getProducts";
import { ProductType } from "../../type";
import { Check, ChevronDown, Trash } from "lucide-react";
import supabase from "@/supabase/config";

const AdminAdmins = () => {
  const [askedToBeAnAdmin, setAskedToBeAnAdmin] = useState<any>([]);
  const [admins, setAdmins] = useState<any>([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: askedToBeAnAdminList } = await supabase
          .from("ask_to_be_an_admin")
          .select("*");
        setAskedToBeAnAdmin(askedToBeAnAdminList);
        const { data: adminsList } = await supabase.from("admins").select("*");
        setAskedToBeAnAdmin(askedToBeAnAdminList);
        setAdmins(adminsList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (typeof window !== "undefined") {
      fetchData();
    }
  }, []);

  const handleRemoveAdmin = async (admin) => {
    const confirm = window.confirm("Sure to delete this admin ?");
    if (confirm) {
      const { data } = await supabase
        .from("admins")
        .delete()
        .eq("email", admin.email)
        .select();
      const updatedList = admins.filter((admin) => admin.id !== data![0].id);
      setAdmins(updatedList);
    }
  };

  const handleRemoveAdminAsked = async (admin) => {
    const confirm = window.confirm("Sure to delete this request ?");
    if (confirm) {
      const { data } = await supabase
        .from("ask_to_be_an_admin")
        .delete()
        .eq("email", admin.email)
        .select();
      const updatedList = askedToBeAnAdmin.filter((ask) => ask.id !== data![0].id);
      setAskedToBeAnAdmin(updatedList);
    }
  };
  return (
    <div
      className={`${
        !show ? "border border-green-500 border-dashed" : ""
      } bg-white rounded-lg mb-5 overflow-hidden`}
    >
      <div
        className="flex items-center p-5 justify-between cursor-pointer"
        onClick={() => setShow(!show)}
      >
        <h3 className="transform  transition-transform duration-500 font-semibold text-green-500">
          {show ? "Click to Collapse" : "Expand Admins Request"}
        </h3>
        <ChevronDown
          className={`transform text-green-500 transition-transform duration-300 ${
            show ? "rotate-180" : ""
          }`}
          size={25}
        />
      </div>
      {show && (
        <div className="transition-all px-5 duration-500 overflow-hidden">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="flex gap-2 pb-5">
              <div className="flex-1 border p-3 rounded border-slate-300 ">
                <h3>Asked To Be An Admins</h3>
                {askedToBeAnAdmin?.map((asked) => (
                  <div
                    className="bg-gray-200 p-2 flex items-center justify-between rounded my-2 "
                    key={asked?.id}
                  >
                    <div>{asked?.email}</div>
                    <div className="flex gap-2 ml-auto items-center justify-center">
                      <Check
                        className="text-green-600 cursor-pointer"
                        size={16}
                      />
                      <Trash
                        onClick={() => handleRemoveAdminAsked(asked)}
                        className="text-rose-600 cursor-pointer"
                        size={16}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex-1 border p-3 rounded border-slate-300 ">
                <h3>Admins</h3>
                {admins?.map((admin) => (
                  <div
                    className="bg-gray-200 p-2 flex items-center justify-between rounded my-2 "
                    key={admin?.id}
                  >
                    <div>{admin?.email}</div>
                    <div className="flex gap-2 ml-auto items-center justify-center">
                      <Trash
                        onClick={() => handleRemoveAdmin(admin)}
                        className="text-rose-600 cursor-pointer"
                        size={16}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminAdmins;
