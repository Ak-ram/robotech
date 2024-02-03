import { updateJsonFile } from "@/helpers/updateJSONData";
import OrderModel from "./orderModel"
import { useEffect, useState } from "react";
import { getCourses } from "@/helpers/getCourses";
import { fetchJsonData } from "@/helpers/getJSONData";
import toast, { Toaster } from "react-hot-toast";
import FormattedPrice from "./FormattedPrice";

const CustomerPageAddCourses = ({ customerData, setCustomerData }) => {

    const [showAddOrderModal, setShowAddOrderModal] = useState(false);
    const [list, setList] = useState([]);
    const [jsonArray, setJsonArray] = useState<any[]>([]);
    const [newOrder, setNewOrder] = useState({
        productName: '',
        quantity: 1,
        date: ''
    });

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
                };
            } else if (!existingCustomer.transactions.courses) {
                existingCustomer.transactions.courses = [];
            }

            existingCustomer.transactions.courses.push(newOrder);

            jsonArray[existingCustomerIndex] = existingCustomer;

            // Update the JSON file with the modified JSON array
            try {
                setShowAddOrderModal(false)
                await updateJsonFile("robotech/pages/customers.json", [...jsonArray]);

                // Update the customerData state with the new transaction
                setCustomerData(existingCustomer);

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
        const fetchProducts = async () => {
            try {
                const p = await getCourses();
                setList(p);

            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        if (typeof window !== 'undefined') {
            // Run the effect only in the browser environment
            fetchProducts();
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
                {customerData?.transactions?.courses?.map((course, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-lg shadow-md mb-4"
                    >
                        <p className="text-gray-600 mb-2">Transaction date: {course["date"]}</p>
                        <p className="text-gray-600 mb-2">Course name: {course["productName"]}</p>
                        <p className="text-gray-600 mb-2">Course price: <FormattedPrice amount={course["piecePrice"]} /></p>
                        <p className="text-gray-600 mb-2">Discound: <FormattedPrice amount={course["discount"]!} /></p>
                        <p className="text-gray-600 mb-2">Sub-total price: <FormattedPrice amount={course["subtotal"]!} /></p>
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

    )
}

export default CustomerPageAddCourses