import { useEffect, useState } from "react";
import OrderModel from "./orderModel"
import { updateJsonFile } from "@/helpers/updateJSONData";
import { getProducts } from "@/helpers/getProducts";
import { ProductType } from "../../type";

const CustomerPageAddProducts = ({ customerData, setCustomerData }) => {
    const [showAddOrderModal, setShowAddOrderModal] = useState(false);
    const [list, setList] = useState<ProductType[]>([]);
    const [newOrder, setNewOrder] = useState({
        productName: '',
        quantity: 1,
        date:''
    });
 useEffect(() => {
    const fetchProducts = async () => {
      try {
        const p = await getProducts();
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
    const handleAddOrder = () => {
        // Validate order details if needed

        // Copy the existing transactions
        const existingTransactions = customerData.transactions || [];

        // Create a new order
        const newOrderObject = { productName: newOrder.productName, quantity: newOrder.quantity };

        // Check if there are any transactions
        if (existingTransactions.length > 0) {
            // Copy the existing transactions
            const updatedTransactions = [...existingTransactions];

            // Add the new order to the latest transaction's orders array
            const latestTransaction = updatedTransactions[0];
            latestTransaction.orders = [...latestTransaction?.orders, newOrderObject];
        } else {
            // If there are no existing transactions, create a new transaction with the new order
            const newTransaction = {
                
                orders: [newOrderObject],
                amount: 0, // You may update the amount based on the actual logic
            };

            // Update the transactions array with the new transaction
            const updatedTransactions = [newTransaction];
            customerData.transactions = updatedTransactions;
        }

        // Update the customerData with the new transactions array
        const updatedCustomerData = { ...customerData };

        // Update the state
        setNewOrder({
            productName: '',
            quantity: 1,
            date:''
        });
        setShowAddOrderModal(false);
        updateJsonFile("robotech/pages/customers.json", [updatedCustomerData]);
        setCustomerData(updatedCustomerData);
        console.log(customerData);

        // You might want to update your JSON file or API with the updatedCustomerData
        // updateJsonFile(updatedCustomerData); // Assuming there is a function to update JSON data
    };
    return (<>
        {/* {customerData.transactions.map((transaction, index) => (
            <div key={index} className="mb-4">
                <p className="text-gray-600 mb-2">Date: {transaction["date"]}</p>

                <ul>
                    {transaction?.orders?.map((order, orderIndex) => (
                        <li key={orderIndex}>
                            Product: {order.productName}, Quantity: {order.quantity}, Date: {order.date}
                        </li>
                    ))}
                </ul>

                {/* <p className="mt-2 text-gray-600">Amount: ${transaction.amount.toFixed(2)}</p>
            </div>
        ))} */}

        <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
            onClick={() => setShowAddOrderModal(true)}
        >
            Add Product
        </button>

        {/* Modal for adding orders */}
        {showAddOrderModal && (
            <OrderModel list={list} newOrder={newOrder} setNewOrder={setNewOrder} handleAddOrder={handleAddOrder} setShowAddOrderModal={setShowAddOrderModal} />
        )}
    </>)
}

export default CustomerPageAddProducts