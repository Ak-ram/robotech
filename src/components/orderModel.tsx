
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import FormattedPrice from "./FormattedPrice";
import { CourseType, ProductType } from "../../type";

const OrderModel = ({ newOrder, setNewOrder, handleAddOrder, setShowAddOrderModal, list }) => {
    const [selectedItem, setSelectedItem] = useState<CourseType | ProductType | null>(null);

    useEffect(() => {
        // Update subtotal whenever quantity or discount changes
        const subtotal = newOrder.discount > 0 ? (selectedItem?.price || 0) * (newOrder.quantity) - newOrder.discount : (selectedItem?.price || 0) * (newOrder.quantity);
        setNewOrder((prevOrder) => ({ ...prevOrder, subtotal }));
    }, [newOrder.quantity, newOrder.discount, selectedItem]);

    const handleAddOrderClick = () => {
        // Validate quantity
        if (newOrder.quantity <= 0) {
            toast.error("Quantity should be greater than zero");
            return;
        }

        // Validate discount
        if (newOrder.discount < 0 || newOrder.discount > selectedItem?.price!) {
            toast.error("Discount should be non-negative");
            return;
        }

        // Validate selected product
        if (!selectedItem) {
            toast.error("Please select a product");
            return;
        }

        // Proceed with adding order
        handleAddOrder();
    };

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Add Order</h2>
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Product Name
                            </label>
                            <select
                                className="w-full p-2 border border-gray-300 rounded"
                                value={selectedItem?.title || ""}
                                onChange={(e) => {
                                    const selectedProduct = list.find(product => product.title === e.target.value);
                                    setSelectedItem(selectedProduct || null);
                                    setNewOrder({
                                        ...newOrder,
                                        productName: e.target.value,
                                        piecePrice: selectedProduct?.price!,
                                        date: new Date().toISOString()
                                    });
                                }}
                            >
                                <option value="">Select a product</option>
                                {list?.map((product: ProductType) => (
                                    <option key={product?.id} value={product?.title!}>
                                        <span className="mr-4">{product?.title!}</span>
                                        <FormattedPrice amount={product?.price!} />
                                    </option>
                                ))}
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

                        <div className="mb-4 w-full">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Price
                            </label>
                            <div className="w-full p-2 border border-gray-300 rounded">
                                <FormattedPrice amount={selectedItem?.price! * newOrder.quantity} />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Discount
                            </label>
                            <input
                                type="number"
                                className="w-full p-2 border border-gray-300 rounded"
                                value={newOrder.discount || 0}
                                onChange={(e) => setNewOrder({ ...newOrder, discount: parseInt(e.target.value, 10) || 0 })}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Subtotal
                            </label>
                            <input
                                type="number"
                                className="w-full p-2 border border-gray-300 rounded"
                                value={newOrder.subtotal}
                                onChange={(e) => setNewOrder({
                                    ...newOrder,
                                    subtotal: (selectedItem?.price! * newOrder.quantity) - (newOrder.discount || 0)
                                })}
                                disabled
                            />
                        </div>
                        <button
                            type="button"
                            className="bg-green-500 text-white font-bold py-2 px-4 rounded"
                            onClick={handleAddOrderClick}
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

export default OrderModel;
