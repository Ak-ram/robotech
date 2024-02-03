import { updateJsonFile } from "@/helpers/updateJSONData";
import OrderModel from "./orderModel"
import { useEffect, useState } from "react";
import { getCourses } from "@/helpers/getCourses";
import { fetchJsonData } from "@/helpers/getJSONData";
import toast from "react-hot-toast";

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
        const existingCustomerIndex = jsonArray.findIndex(customer => customer.id === customerData.id);
    
        if (existingCustomerIndex !== -1) {
            const existingCustomer = jsonArray[existingCustomerIndex];
    
            const newCourseObject = {
                productName: newOrder.productName,
                quantity: newOrder.quantity,
                date: newOrder.date,
            };
            
            if (!existingCustomer.transactions) {
                existingCustomer.transactions = [];
            }
            
            existingCustomer.transactions.push(newCourseObject);
    
            jsonArray[existingCustomerIndex] = existingCustomer;
            
            // Update the JSON file with the modified JSON array
            try {
                console.log([...jsonArray]);
    
                await updateJsonFile("robotech/pages/customers.json", [...jsonArray]);
                console.log('after', [...jsonArray]);
                
                setJsonArray([...jsonArray]);
                
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
    }


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
    return (<>
        {customerData?.transactions?.map((transaction, index) => (
            <div key={index} className="mb-4">
                <p className="text-gray-600 mb-2">Date: {transaction["date"]}</p>

                <ul>
                    {transaction.courses?.map((course, orderIndex) => {
                        if (course === null || course === undefined) return;
                        return <li key={orderIndex}>
                            Product: {course?.productName!}, Quantity: {course?.quantity!} ,Date: {course?.date!}
                        </li>
                    })}
                </ul>

                <p className="mt-2 text-gray-600">Amount: ${transaction.amount.toFixed(2)}</p>
            </div>
        ))}

        <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
            onClick={() => setShowAddOrderModal(true)}
        >
            Add Course
        </button>

        {/* Modal for adding orders */}
        {showAddOrderModal && (
            <OrderModel list={list} newOrder={newOrder} setNewOrder={setNewOrder} handleAddOrder={handleAddOrder} setShowAddOrderModal={setShowAddOrderModal} />
        )}
    </>)
}

export default CustomerPageAddCourses