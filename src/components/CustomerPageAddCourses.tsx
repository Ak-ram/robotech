import OrderModel from "./orderModel";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import FormattedPrice from "./FormattedPrice";
import { ScrollText, Trash } from "lucide-react";
import Bill from "./Bill";
import supabase from "@/supabase/config";

const CustomerPageAddCourses = ({
  billData,
  setBillData,
  customerData,
  setCustomerData,
}) => {
  const [showAddOrderModal, setShowAddOrderModal] = useState(false);
  const [showBill, setShowBill] = useState(false);
  const [updatedCustomerData, setUpdatedCustomerData] = useState(customerData);
  const [list, setList] = useState<any>([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [lastOrderId, setLastOrderId] = useState("");

  const [jsonArray, setJsonArray] = useState<any[]>([]);
  const [newOrder, setNewOrder] = useState({
    productName: "",
    quantity: 1,
    date: "",
    discount: 0,
    subtotal: 0,
    piecePrice: 0,
  });
  useEffect(() => {
    setUpdatedCustomerData(customerData);
  }, [customerData]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await supabase.from("customers").select();

        setJsonArray(data!);
      } catch (error) {
        new Error((error as Error).message);
      }
    };

    fetchData();
  }, [billData]);
  useEffect(() => {
    console.log("billData", billData);
  }, [billData]);
  const handleAddOrder = async () => {
    try {
      setBillData([...billData, newOrder]);
      setShowAddOrderModal(false);
    } catch (error) {
      console.error("Error adding order:", (error as Error).message);
      toast.error((error as Error).message);
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await supabase.from("courses").select();
        setList(data!);
      } catch (error) {
        console.error("Error fetching Courses:", error);
      }
    };

    if (typeof window !== "undefined") {
      // Run the effect only in the browser environment
      fetchCourses();
    }
  }, []);
  const handleRemoveItemFromBill = (item) => {
    const confirm = window.confirm(
      "Are you sure you want to remove this item?",
    );
    if (!confirm) {
      return;
    }
    setBillData(billData.filter((i) => i !== item));
  };
  return (
    <>
      <div className="max-w-3xl mx-auto my-8">
        <button
          className={`mb-3 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300`}
          onClick={() => setShowAddOrderModal(true)}
        >
          Add Course
        </button>
        <div>
          {/* {updatedCustomerData?.transactions?.courses
          ?.slice()
          .reverse() */}

          {billData &&
            billData?.map((course, index) => (
              <div
                key={index}
                className={`bg-white flex gap-3 p-6 rounded-lg shadow-md mb-4`}
              >
                <div className="flex-1 mr-2 justify-between flex items-center">
                  <p className="text-gray-600">{course["productName"]}</p>
                  <p className="text-gray-600">
                    <FormattedPrice amount={+course["subtotal"]!} />
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex-1">
                    {/* ADD BILL HERE */}
                    <Trash
                      onClick={() => handleRemoveItemFromBill(course)}
                      className="my-2 ml-auto cursor-pointer text-rose-600"
                      size={20}
                    />
                  </div>
                </div>
                {showBill && selectedCourse && (
                  <Bill
                    transactionData={[selectedCourse]}
                    setShowBill={setShowBill}
                  />
                )}
              </div>
            ))}
        </div>
      </div>
      {showAddOrderModal && (
        <OrderModel
          list={list}
          newOrder={newOrder}
          setNewOrder={setNewOrder}
          handleAddOrder={handleAddOrder}
          setShowAddOrderModal={setShowAddOrderModal}
        />
      )}

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#000",
            color: "#fff",
          },
        }}
      />
    </>
  );
};

export default CustomerPageAddCourses;
