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
    console.log('billData', billData)
  }, [billData])
  const handleAddOrder = async () => {
    try {
      // Fetch the customer data
      const { data, error } = await supabase
        .from("customers")
        .select("transactions")
        .eq("id", customerData.id)
        .single();

      if (error) {
        throw error;
      }

      // Extract existing transactions from the fetched data
      const existingTransactions = data?.transactions || { courses: [] };

      // Add the new order to the printServices array
      existingTransactions.courses.push(newOrder);
      setBillData([...billData, newOrder]);

      await supabase
        .from("customers")
        .select("total_purchase_transactions")
        .eq("id", customerData.id)
        .single();
      const { printServices, courses, products } = existingTransactions;

      const newTotal =
        printServices.reduce((total, item) => total + item.subtotal, 0) +
        courses.reduce((total, item) => total + item.subtotal, 0) +
        products.reduce((total, item) => total + item.subtotal, 0);

      await supabase
        .from("customers")
        .update({ total_purchase_transactions: newTotal })
        .eq("id", customerData.id);
      // Update the transactions field with the modified data
      setShowAddOrderModal(false);
      const { data: updatedData, error: updateError } = await supabase
        .from("customers")
        .update({ transactions: existingTransactions })
        .eq("id", customerData.id);

      if (updateError) {
        throw updateError;
      }
      // Fetch the updated customer data after adding the order
      const { data: updatedCustomer, error: customerError } = await supabase
        .from("customers")
        .select()
        .eq("id", customerData.id)
        .single();

      if (customerError) {
        throw customerError;
      }

      // Update the updatedCustomerData state variable with the new data
      setUpdatedCustomerData(updatedCustomer);
      // Optionally update local state or perform other actions
      // ...
      // Show success message
      toast.success("Item Added/Updated successfully");
      toast.loading("Be patient, changes take a few moments to be reflected");

      setTimeout(() => {
        toast.dismiss();
      }, 3000);
    } catch (error) {
      // Handle errors
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

          {billData && billData?.map((course, index) => (
            <div
              key={index}
              className={`bg-white flex gap-3 p-6 rounded-lg shadow-md mb-4`}
            >
              <div className="flex-1">
                <p className="text-gray-600 mb-2">
                  Transaction date: {course["date"]}
                </p>
                <p className="text-gray-600 mb-2">
                  Course name: {course["productName"]}
                </p>
                <p className="text-gray-600 mb-2">
                  Course price:{" "}
                  <FormattedPrice amount={+course["piecePrice"]} />
                </p>
                <p className="text-gray-600 mb-2">
                  Discound: <FormattedPrice amount={+course["discount"]!} />
                </p>
                <p className="text-gray-600 mb-2">
                  Sub-total price:{" "}
                  <FormattedPrice amount={+course["subtotal"]!} />
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex-1">
                  {/* ADD BILL HERE */}
                  <ScrollText
                    onClick={() => {
                      setShowBill(true);
                      setSelectedCourse(course);
                    }}
                    className="my-2 ml-auto cursor-pointer text-blue-600"
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
