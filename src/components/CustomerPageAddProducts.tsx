const CustomerPageAddProducts = ({ customerData, setShowAddOrderModal }) => {
    return (<>
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
        </button></>)
}

export default CustomerPageAddProducts