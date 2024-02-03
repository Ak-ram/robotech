import { updateJsonFile } from "@/helpers/updateJSONData";
import OrderModel from "./orderModel"
import { useEffect, useState } from "react";
import { getPrintServices } from "@/helpers/getPrintServices";
import { fetchJsonData } from "@/helpers/getJSONData";
import toast, { Toaster } from "react-hot-toast";

const CustomerPageAddPrintServices = ({ customerData, setCustomerData }) => {

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
                    printServices: [],
                };
            } else if (!existingCustomer.transactions.printServices) {
                existingCustomer.transactions.printServices = [];
            }

            existingCustomer.transactions.printServices.push(newOrder);

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
                const p = await getPrintServices();
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
    return (<>
        {customerData?.transactions?.printServices?.map((service, index) => (
            <div key={index} className="mb-4">
                <p className="text-gray-600 mb-2">Date: {service["date"]}</p>
                <p className="text-gray-600 mb-2">Name: {service["productName"]}</p>
                <p className="text-gray-600 mb-2">Quantity: {service["quantity"]}</p>
            </div>
        ))}

        <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
            onClick={() => setShowAddOrderModal(true)}
        >
            Add Print Service
        </button>

        {/* Modal for adding orders */}
        {showAddOrderModal && (
            <OrderModel list={list} newOrder={newOrder} setNewOrder={setNewOrder} handleAddOrder={handleAddOrder} setShowAddOrderModal={setShowAddOrderModal} />
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
    </>)
}

export default CustomerPageAddPrintServices