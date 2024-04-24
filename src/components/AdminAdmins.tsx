import { useEffect, useState, useRef } from "react";
import CustomerStatsInStocks from "./CustomerStatsInStocks";
import CustomerStatsOutStocks from "./CustomerStatsOutStocks";
import { getProducts } from "@/helpers/getProducts";
import { ProductType, StateProps } from "../../type";
import { Check, ChevronDown, Edit, ShieldPlus, Trash, X } from "lucide-react";
import supabase from "@/supabase/config";
import { useSelector } from "react-redux";
import SuperAdminEditForm from "./SuperAdminEditForm";

const AdminAdmins = () => {
  const superAdminInfo = useSelector((state: StateProps) => state.pro.superAdminInfo);
  const [askedToBeAnAdmin, setAskedToBeAnAdmin] = useState<any>([]);
  const [admins, setAdmins] = useState<any>([]);
  const [show, setShow] = useState(false);
  const [superAdminEditFormOpen, setSuperAdminEditFormOpening] = useState(false)
  const [superAdmin, setSuperAdmin] = useState({ email: '', password: '', secret: '' })
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

  const handleRemoveAdminAsked = async (admin, displayConfirmation = true) => {
    if (displayConfirmation) {
      const confirm = window.confirm("Sure to delete this request ?");
      if (!confirm) {
        return;
      }
    }
    const { data } = await supabase
      .from("ask_to_be_an_admin")
      .delete()
      .eq("email", admin.email)
      .select();
    const updatedList = askedToBeAnAdmin.filter(
      (ask) => ask.id !== data![0].id
    );
    setAskedToBeAnAdmin(updatedList);
  };

  const handleAskAcception = async (asked) => {
    const confirm = window.confirm("Sure to make this email as an admin ?");
    if (confirm) {
      await supabase.from("admins").insert(asked);
      const updatedList = [...admins, asked];
      setAdmins(updatedList);
      handleRemoveAdminAsked(asked, false);
    }
  };

  const handleEditSuperAdmin = async (superAdmin) => {
    if (!superAdmin) window.alert("Refresh the page and try again.");
    setSuperAdminEditFormOpening(true)
    const { data: toEdit } = await supabase
      .from("super_admins")
      .select("*").eq('email', superAdmin.email).single();
    setSuperAdmin(toEdit)
  }

  return (
    <div
      className={`${!show ? "border border-indigo-500 border-dashed" : ""
        } bg-white rounded-lg mb-5 overflow-hidden`}
    >
      <div
        className="flex items-center p-5 justify-between cursor-pointer"
        onClick={() => setShow(!show)}
      >
        <h3 className="transform  transition-transform duration-500 font-semibold text-indigo-500">
          {show ? "Click to Collapse" : "Expand Admins Request"}
        </h3>
        <ChevronDown
          className={`transform text-indigo-500 transition-transform duration-300 ${show ? "rotate-180" : ""
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
              <div className="flex-1 h-48 overflow-auto border p-3 rounded border-slate-300 ">
                <h3>Asked To Be An Admins</h3>
                {askedToBeAnAdmin?.map((asked) => (
                  <div
                    className="bg-gray-200 p-2 flex items-center justify-between rounded my-2 "
                    key={asked?.id}
                  >
                    <div>{asked?.email}</div>
                    <div className="flex gap-2 ml-auto items-center justify-center">
                      <Check
                        onClick={() => handleAskAcception(asked)}
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
              <div className="flex-1 h-48 overflow-auto  border p-3 rounded border-slate-300 ">
                <h3>Admins</h3>
                {admins?.map((admin) => (
                  <div
                    className="bg-gray-200  p-2 flex items-center justify-between rounded my-2 "
                    key={admin?.id}
                  >
                    <div>{admin?.email}</div>
                    <div className="flex gap-2 ml-auto items-center justify-center">
                      {superAdminInfo?.email !== admin?.email ? (
                        <Trash
                          onClick={() => handleRemoveAdmin(admin)}
                          className="text-rose-600 cursor-pointer"
                          size={16}
                        />
                      ) : (
                        <>

                          <span title="Super Admin Badge" className="text-sm font-bold text-green-500">
                            <ShieldPlus size={20} />
                          </span>
                          <Edit
                            onClick={() => handleEditSuperAdmin(admin)}
                            className="text-blue-600 cursor-pointer"
                            size={16}
                          />
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      {superAdminEditFormOpen && <SuperAdminEditForm {...{ superAdmin, superAdminEditFormOpen, setSuperAdmin, setSuperAdminEditFormOpening }} />}
    </div>
  );
};

export default AdminAdmins;
