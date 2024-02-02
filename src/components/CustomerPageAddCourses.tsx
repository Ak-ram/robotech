import { updateJsonFile } from "@/helpers/updateJSONData";
import OrderModel from "./orderModel"
import { useEffect, useState } from "react";
import { getCourses } from "@/helpers/getCourses";

const CustomerPageAddCourses = ({ customerData, setCustomerData }) => {

    const [showAddOrderModal, setShowAddOrderModal] = useState(false);
    const [list, setList] = useState([]);
    const [newOrder, setNewOrder] = useState({
        productName: '',
        quantity: 1,
        date: ''
    });
    const handleAddOrder = async () => {
        // Validate order details if needed
    
        // Copy the existing transactions
        const existingTransactions = customerData.transactions || [];
    
        // Create a new order
        const newCourseObject = { productName: newOrder.productName, quantity: newOrder.quantity };
    
        // Check if there are any transactions
        if (existingTransactions.length > 0) {
            // Copy the existing transactions
            const updatedTransactions = [...existingTransactions];
    
            // Add the new order to the latest transaction's courses array
            const latestTransaction = updatedTransactions[updatedTransactions.length - 1];
            latestTransaction.courses = [...(latestTransaction.courses || []), newCourseObject];
        } else {
            // If there are no existing transactions, create a new transaction with the new order
            const newTransaction = {
                courses: [newCourseObject],
                amount: 0, // You may update the amount based on the actual logic
            };
    
            // Update the transactions array with the new transaction
            const updatedTransactions = [...existingTransactions, newTransaction];
            customerData.transactions = updatedTransactions;
        }
    
        // Update the customerData with the new transactions array
        const updatedCustomerData = { ...customerData, transactions: customerData.transactions };
    
        // Update the state
        setNewOrder({
            productName: '',
            quantity: 1,
            date: ''
        });
        setShowAddOrderModal(false);
    
        try {
            // Update the JSON file with the updated data
            await updateJsonFile("robotech/pages/customers.json", [updatedCustomerData]);
    
            // You might also want to update your API or other storage mechanisms if applicable
    
            // Update the state with the new data
            setCustomerData(updatedCustomerData);
            console.log(customerData);
        } catch (error) {
            console.error("Error updating JSON file:", error);
            // Handle error appropriately
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
    return (<>
        {customerData.transactions.map((transaction, index) => (
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