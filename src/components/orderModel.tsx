import { ProductType } from "../../type"

const OrderModel = ({newOrder,setNewOrder,handleAddOrder,setShowAddOrderModal,list}) => {
    return (<> <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Add Order</h2>
            <form>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Product Name
                    </label>
                    <select
                        className="w-full p-2 border border-gray-300 rounded"
                        value={newOrder.productName}
                        onChange={(e) => setNewOrder({ ...newOrder, productName: e.target.value })}
                    >
                        <option value="">Select a product</option>
                        {/* {list?.map(product:ProductType=><option value="Product 1">Product 1</option>)} */}
                        {list?.map((product:ProductType)=><option value={product?.title!}>{product?.title!}</option>)}
                      
                     
                    </select>
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
    </div></>)
}

export default OrderModel