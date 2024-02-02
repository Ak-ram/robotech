
'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { updateJsonFile } from '@/helpers/updateJSONData';

const CustomerPage = () => {
  const router = useRouter();
  const searchPar = useSearchParams();
  const customerId = searchPar?.get("id");
  const data = searchPar?.get("data");

  const initialCustomerData = typeof data === 'string' ? JSON.parse(data) : null;
  const [customerData, setCustomerData] = useState(initialCustomerData);
  const [showAddOrderModal, setShowAddOrderModal] = useState(false);
  const [newOrder, setNewOrder] = useState({
    productName: '',
    quantity: 1,
  });

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
      latestTransaction.orders = [...latestTransaction.orders, newOrderObject];
    } else {
      // If there are no existing transactions, create a new transaction with the new order
      const newTransaction = {
        date: new Date().toISOString(),
        orders: [newOrderObject],
        amount: 0, // You may update the amount based on the actual logic
      };

      // Update the transactions array with the new transaction
      const updatedTransactions = [newTransaction];
      customerData.transactions = updatedTransactions;
      console.log(updatedTransactions);
    }

    // Update the customerData with the new transactions array
    const updatedCustomerData = { ...customerData };

    // Update the state
    setNewOrder({
      productName: '',
      quantity: 1,
    });
    setShowAddOrderModal(false);
    updateJsonFile("robotech/pages/customers.json", [updatedCustomerData]);
    setCustomerData(updatedCustomerData);
    // You might want to update your JSON file or API with the updatedCustomerData
    // updateJsonFile(updatedCustomerData); // Assuming there is a function to update JSON data
  };


  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-semibold mb-4">Customer ID: {customerId}</h1>

      {customerData && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          {/* ... (Your existing code) */}
          <h2 className="text-xl font-semibold mb-4">Customer Information</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 mb-2">Full Name:</p>
              <p className="font-semibold">{customerData.fullName}</p>
            </div>

            <div>
              <p className="text-gray-600 mb-2">Phone No.:</p>
              <p className="font-semibold">{customerData.phone}</p>
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Transactions</h2>

            {customerData.transactions.map((transaction, index) => (
              <div key={index} className="mb-4">
                <p className="text-gray-600 mb-2">Date: {transaction["date"]}</p>

                <ul>
                  {transaction.orders.map((order, orderIndex) => (
                    <li key={orderIndex}>
                      Product: {order.productName}, Quantity: {order.quantity}
                    </li>
                  ))}
                </ul>

                <p className="mt-2 text-gray-600">Amount: ${transaction.amount.toFixed(2)}</p>
              </div>
            ))}

            <button
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
              onClick={() => setShowAddOrderModal(true)}
            >
              Add Order
            </button>

            {/* Modal for adding orders */}
            {showAddOrderModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold mb-4">Add Order</h2>
                  <form>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Product Name
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={newOrder.productName}
                        onChange={(e) => setNewOrder({ ...newOrder, productName: e.target.value })}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Quantity
                      </label>
                      <input
                        type="number"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={newOrder.quantity}
                        onChange={(e) => setNewOrder({ ...newOrder, quantity: parseInt(e.target.value, 10) })}
                      />
                    </div>
                    <button
                      type="button"
                      className="bg-green-500 text-white font-bold py-2 px-4 rounded"
                      onClick={handleAddOrder}
                    >
                      Add Order
                    </button>
                    <button
                      type="button"
                      className="bg-gray-500 text-white font-bold py-2 px-4 rounded ml-2"
                      onClick={() => setShowAddOrderModal(false)}
                    >
                      Cancel
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerPage;





// "use client"
// import { useRouter, useSearchParams } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import { updateJsonFile } from '@/helpers/updateJSONData';


// const CustomerPage = () => {
//   const router = useRouter();
//   const searchPar = useSearchParams();
//   const customerId = searchPar?.get("id");
//   const data = searchPar?.get("data");

//   // Parse data based on its type
//   const customerData = typeof data === 'string' ? JSON.parse(data) : null;
// console.log(customerData)
//   const [showAddOrderModal, setShowAddOrderModal] = useState(false);
//   const [lastCustomerData, setLastCustomerData] = useState(customerData);
//   const [newOrder, setNewOrder] = useState({
//     productName: '',
//     quantity: 1,
//   });
//   useEffect(()=>{

//   },[customerData])
//   const handleAddOrder = () => {
//     // Validate order details if needed
  
//     // Copy the existing transactions
//     const existingTransactions = customerData.transactions || [];
  
//     // Create a new order
//     const newOrderObject = { productName: newOrder.productName, quantity: newOrder.quantity };
  
//     // Check if there are any transactions
//     if (existingTransactions.length > 0) {
//       // Copy the existing transactions
//       const updatedTransactions = [...existingTransactions];
  
//       // Add the new order to the latest transaction's orders array
//       const latestTransaction = updatedTransactions[0];
//       latestTransaction.orders = [...latestTransaction.orders, newOrderObject];
//     } else {
//       // If there are no existing transactions, create a new transaction with the new order
//       const newTransaction = {
//         date: new Date().toISOString(),
//         orders: [newOrderObject],
//         amount: 0, // You may update the amount based on the actual logic
//       };
  
//       // Update the transactions array with the new transaction
//       const updatedTransactions = [newTransaction];
//       customerData.transactions = updatedTransactions;
//       console.log(updatedTransactions)
//     }
  
//     // Update the customerData with the new transactions array
//     const updatedCustomerData = { ...customerData };
  
//     // Update the state
//     setNewOrder({
//       productName: '',
//       quantity: 1,
//     });
//     setShowAddOrderModal(false);
//     updateJsonFile("robotech/pages/customers.json", [updatedCustomerData]);
//     setLastCustomerData(updatedCustomerData)
//     // You might want to update your JSON file or API with the updatedCustomerData
//     // updateJsonFile(updatedCustomerData); // Assuming there is a function to update JSON data
//   };
  


//   return (
//     <div className="container mx-auto mt-8">
//       <h1 className="text-2xl font-semibold mb-4">Customer ID: {customerId}</h1>

//       {customerData && (
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           {/* ... (Your existing code) */}
//           <h2 className="text-xl font-semibold mb-4">Customer Information</h2>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <p className="text-gray-600 mb-2">Full Name:</p>
//               <p className="font-semibold">{lastCustomerData.fullName}</p>
//             </div>

//             <div>
//               <p className="text-gray-600 mb-2">Phone No.:</p>
//               <p className="font-semibold">{lastCustomerData.phone}</p>
//             </div>
//           </div>
//           <div className="mt-6">
//             <h2 className="text-xl font-semibold mb-4">Transactions</h2>

//             {lastCustomerData.transactions.map((transaction, index) => (
//               <div key={index} className="mb-4">
//                 <p className="text-gray-600 mb-2">Date: {transaction["date"]}</p>

//                 <ul>
//                   {transaction.orders.map((order, orderIndex) => (
//                     <li key={orderIndex}>
//                       Product: {order.productName}, Quantity: {order.quantity}
//                     </li>
//                   ))}
//                 </ul>

//                 <p className="mt-2 text-gray-600">Amount: ${transaction.amount.toFixed(2)}</p>
//               </div>
//             ))}

//             <button
//               className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
//               onClick={() => setShowAddOrderModal(true)}
//             >
//               Add Order
//             </button>

//             {/* Modal for adding orders */}
//             {showAddOrderModal && (
//               <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//                 <div className="bg-white p-8 rounded-lg shadow-md">
//                   <h2 className="text-xl font-semibold mb-4">Add Order</h2>
//                   <form>
//                     <div className="mb-4">
//                       <label className="block text-gray-700 text-sm font-bold mb-2">
//                         Product Name
//                       </label>
//                       <input
//                         type="text"
//                         className="w-full p-2 border border-gray-300 rounded"
//                         value={newOrder.productName}
//                         onChange={(e) => setNewOrder({ ...newOrder, productName: e.target.value })}
//                       />
//                     </div>
//                     <div className="mb-4">
//                       <label className="block text-gray-700 text-sm font-bold mb-2">
//                         Quantity
//                       </label>
//                       <input
//                         type="number"
//                         className="w-full p-2 border border-gray-300 rounded"
//                         value={newOrder.quantity}
//                         onChange={(e) => setNewOrder({ ...newOrder, quantity: parseInt(e.target.value, 10) })}
//                       />
//                     </div>
//                     <button
//                       type="button"
//                       className="bg-green-500 text-white font-bold py-2 px-4 rounded"
//                       onClick={handleAddOrder}
//                     >
//                       Add Order
//                     </button>
//                     <button
//                       type="button"
//                       className="bg-gray-500 text-white font-bold py-2 px-4 rounded ml-2"
//                       onClick={() => setShowAddOrderModal(false)}
//                     >
//                       Cancel
//                     </button>
//                   </form>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CustomerPage;
