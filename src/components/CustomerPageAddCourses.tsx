import { updateJsonFile } from "@/helpers/updateJSONData";
import OrderModel from "./orderModel";
import { useEffect, useState } from "react";
import { getCourses } from "@/helpers/getCourses";
import { fetchJsonData } from "@/helpers/getJSONData";
import toast, { Toaster } from "react-hot-toast";
import FormattedPrice from "./FormattedPrice";
import { Edit, Edit2, ScrollText, Trash } from "lucide-react";
import Bill from "./Bill";

const CustomerPageAddCourses = ({ customerData, setCustomerData }) => {
  const [showAddOrderModal, setShowAddOrderModal] = useState(false);
  const [showBill, setShowBill] = useState(false);
  const [updatedCustomerData, setUpdatedCustomerData] = useState(customerData);
  const [list, setList] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [jsonArray, setJsonArray] = useState<any[]>([]);
  const [newOrder, setNewOrder] = useState({
    productName: "",
    quantity: 1,
    date: "",
    discount: 0,
  });
  useEffect(() => {
    setUpdatedCustomerData(customerData);
  }, [customerData]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchJsonData("robotech/pages/customers.json");
        setJsonArray(data);
      } catch (error) {
        new Error((error as Error).message);
      }
    };

    fetchData();
  }, []);

  const handleAddOrder = async () => {
    // Validate order details if needed
    const existingCustomerIndex = jsonArray.findIndex(
      (customer) => customer.id === customerData.id
    );

    if (existingCustomerIndex !== -1) {
      const existingCustomer = jsonArray[existingCustomerIndex];

      if (!existingCustomer.transactions) {
        existingCustomer.transactions = {
          courses: [],
          printServices: [],
          products: [],
        };
      } else if (!existingCustomer.transactions.courses) {
        existingCustomer.transactions.courses = [];
      }

      existingCustomer.transactions.courses.push(newOrder);
      // Update the total purchase transactions
      existingCustomer.total_purchase_transactions +=
        existingCustomer.transactions.courses.reduce(
          (total, transaction) => total + transaction.subtotal,
          0
        );
      jsonArray[existingCustomerIndex] = existingCustomer;

      // Update the JSON file with the modified JSON array
      try {
        setShowAddOrderModal(false);
        await updateJsonFile("robotech/pages/customers.json", [...jsonArray]);

        // Update the customerData state with the new transaction
        setCustomerData(existingCustomer);
        // Reset newOrder fields
        setNewOrder({
          productName: "",
          quantity: 1,
          date: "",
          discount: 0,
        });
        toast.success(`Item Added/Updated successfully`);
        toast.loading(`Be patient, changes take a few moments to be reflected`);

        setTimeout(() => {
          toast.dismiss();
        }, 5000);
      } catch (error) {
        toast.error((error as Error).message);
      }
    } else {
      // Handle the case where the customer doesn't exist or show an error message
      console.error("Customer not found for ID:", customerData.id);
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const p = await getCourses();
        setList(p);
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
          className="mb-3 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
          onClick={() => setShowAddOrderModal(true)}
        >
          Add Course
        </button>
        {updatedCustomerData?.transactions?.courses
          ?.slice()
          .reverse()
          .map((course, index) => (
            <div
              key={index}
              className="bg-white flex gap-3 p-6 rounded-lg shadow-md mb-4"
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
                  <Edit2
                    className="cursor-not-allowed text-blue-600"
                    size={20}
                  />
                  {/* ADD BILL HERE */}
                  <ScrollText
                    onClick={() => {
                      setShowBill(true);
                      setSelectedCourse(course);
                    }}
                    className="my-2 cursor-pointer text-blue-600"
                    size={20}
                  />
                </div>
                <Trash
                  className="ml-auto mr-2 cursor-not-allowed text-red-600"
                  size={20}
                />
              </div>
              {showBill && selectedCourse && (
                <Bill
                  transactionData={selectedCourse}
                  setShowBill={setShowBill}
                />
              )}
            </div>
          ))}
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
