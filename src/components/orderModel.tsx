
// import { useState, useEffect } from "react";
// import toast, { Toaster } from "react-hot-toast";
// import FormattedPrice from "./FormattedPrice";
// import { CourseType, ProductType } from "../../type";
// import { fetchJsonData } from "@/helpers/getJSONData";
// import { updateJsonFile } from "@/helpers/updateJSONData";

// const OrderModel = ({ newOrder, setNewOrder, handleAddOrder, setShowAddOrderModal, list }) => {
//     const [selectedItem, setSelectedItem] = useState<CourseType | ProductType | null>(null);
//     const [categoriesList, setCategoriesList] = useState<any[][]>([[]]);

//     useEffect(() => {
//         // Update subtotal whenever quantity or discount changes
//         const subtotal = newOrder.discount > 0 ? (selectedItem?.price || 0) * (newOrder.quantity) - newOrder.discount : (selectedItem?.price || 0) * (newOrder.quantity);
//         setNewOrder((prevOrder) => ({ ...prevOrder, subtotal }));
//     }, [newOrder.quantity, newOrder.discount, selectedItem]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const data = await fetchJsonData("robotech/pages/categories.json");
//                 setCategoriesList(data);
//                 if (data.length > 0) {
//                 }

//             } catch (error) {
//                 toast.error(`${(error as Error).message}`);
//             }
//         };

//         fetchData();
//     }, []);

//     useEffect(() => {
//         console.log(categoriesList); // This will reflect the updated state
//     }, [categoriesList]); // Add categoriesList as a dependency to useEffect

//     const handleAddOrderClick = async () => {
//         // Validate quantity
//         if (newOrder.quantity <= 0) {
//             toast.error("Quantity should be greater than zero");
//             return;
//         }

//         if ("count" in selectedItem!) {
//             // Access the count property only when the selectedItem is of type ProductType
//             const itemCount = +selectedItem.count;
//             if (newOrder.quantity > itemCount) {
//                 toast.error(`only ${itemCount} piece(s) available in-stock`);

//                 return;
//             }
//             else {
//                 let obj = categoriesList[0][selectedItem.category].find(product => product.id === selectedItem.id)
//                 let updatedObject = { ...obj, count: `${(+selectedItem?.count - +newOrder?.quantity)}` };
//                 const updatedProducts = categoriesList[0][selectedItem.category].map(product => {
//                     if (product.id === selectedItem.id) {
//                         return updatedObject;
//                     }
//                     return product;
//                 });

//                 // Update the correct object within the categoriesList array
//                 const updatedCategoriesList = [...categoriesList]; // Copy the original array
//                 updatedCategoriesList[0][selectedItem.category] = updatedProducts; // Update the correct category array

//                 setCategoriesList(updatedCategoriesList); // Update the state with the updated array
//                 await updateJsonFile("robotech/pages/categories.json", categoriesList);

//             }




//         }


//         // Validate discount
//         if (newOrder.discount < 0 || newOrder.discount > selectedItem?.price!) {
//             toast.error("Discount should be non-negative");
//             return;
//         }

//         // Validate selected product
//         if (!selectedItem) {
//             toast.error("Please select a product");
//             return;
//         }





//         // Proceed with adding order
//         handleAddOrder();
//     };
//     return (
//         <>
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//                 <div className="bg-white min-w-[40rem] p-8 rounded-lg shadow-md">
//                     <h2 className="text-xl font-semibold mb-4">Add Order</h2>
//                     <form>
//                         <div className="mb-4">
//                             <label className="block text-gray-700 text-sm font-bold mb-2">
//                                 Product Name
//                             </label>
//                             <select
//                                 className="w-full p-2 border border-gray-300 rounded"
//                                 value={selectedItem?.title || ""}
//                                 onChange={(e) => {
//                                     const selectedProduct = list.find(product => product.title === e.target.value);
//                                     setSelectedItem(selectedProduct || null);
//                                     setNewOrder({
//                                         ...newOrder,
//                                         productName: e.target.value,
//                                         piecePrice: selectedProduct?.price!,
//                                         date: new Date().toLocaleDateString('en-US', {
//                                             weekday: 'short',
//                                             year: 'numeric',
//                                             month: 'short',
//                                             day: '2-digit',
//                                             hour: '2-digit',
//                                             minute: '2-digit',
//                                         })
//                                     });
//                                 }}
//                             >
//                                 <option value="">Select a product</option>
//                                 {list?.map((product: ProductType) => (
//                                     <option key={`${product?.id}_${product?.title}`} value={product?.title!}>
//                                         <span className="mr-4">{product?.title!}</span>
//                                         <FormattedPrice amount={product?.price!} />
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div className="mb-4">
//                             <label className="block text-gray-700 text-sm font-bold mb-2">
//                                 Quantity
//                             </label>
//                             <input
//                                 type="number"
//                                 className="w-full p-2 border border-gray-300 rounded"
//                                 value={newOrder.quantity}
//                                 onChange={(e) => setNewOrder({ ...newOrder, quantity: parseInt(e.target.value, 10) })}
//                             />
//                         </div>

//                         <div className="mb-4 w-full">
//                             <label className="block text-gray-700 text-sm font-bold mb-2">
//                                 Price
//                             </label>
//                             <div className="w-full p-2 border border-gray-300 rounded">
//                                 <FormattedPrice amount={selectedItem?.price! * newOrder.quantity} />
//                             </div>
//                         </div>
//                         <div className="mb-4">
//                             <label className="block text-gray-700 text-sm font-bold mb-2">
//                                 Discount
//                             </label>
//                             <input
//                                 type="number"
//                                 className="w-full p-2 border border-gray-300 rounded"
//                                 value={newOrder.discount}
//                                 onChange={(e) => setNewOrder({ ...newOrder, discount: isNaN(parseInt(e.target.value, 10)) ? 0 : parseInt(e.target.value, 10) })}
//                             />
//                         </div>
//                         <div className="mb-4">
//                             <label className="block text-gray-700 text-sm font-bold mb-2">
//                                 Subtotal
//                             </label>
//                             <input
//                                 type="number"
//                                 className="w-full p-2 border border-gray-300 rounded"
//                                 value={newOrder.subtotal}
//                                 onChange={(e) => setNewOrder({
//                                     ...newOrder,
//                                     subtotal: (selectedItem?.price! * newOrder.quantity) - (newOrder.discount || 0)
//                                 })}
//                                 disabled
//                             />
//                         </div>
//                         <button
//                             type="button"
//                             className="bg-green-500 text-white font-bold py-2 px-4 rounded"
//                             onClick={handleAddOrderClick}
//                         >
//                             Add Order
//                         </button>
//                         <button
//                             type="button"
//                             className="bg-gray-500 text-white font-bold py-2 px-4 rounded ml-2"
//                             onClick={() => setShowAddOrderModal(false)}
//                         >
//                             Cancel
//                         </button>
//                     </form>
//                 </div>
//             </div>
//             <Toaster
//                 position="bottom-right"
//                 toastOptions={{
//                     style: {
//                         background: "#000",
//                         color: "#fff",
//                     },
//                 }}
//             />
//         </>
//     );
// };

// export default OrderModel;



import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import FormattedPrice from "./FormattedPrice";
import { CourseType, ProductType } from "../../type";
import { fetchJsonData } from "@/helpers/getJSONData";
import { updateJsonFile } from "@/helpers/updateJSONData";

const CustomSelect = ({ options, onSelect, newOrder, setNewOrder, setSelectedItem }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setFilteredOptions(options.filter(option =>
            option.title.toLowerCase().includes(searchTerm.toLowerCase())
        ));
    }, [options, searchTerm]);

    const handleSelect = (option) => {
        onSelect(option);
        setIsOpen(false);
        setSearchTerm(option.title); // Set search term to selected option's title
        setSelectedItem(option || null);

        setNewOrder({
            ...newOrder,
            productName: option?.title,
            piecePrice: option?.price!,
            wholesalePrice:option.wholesalePrice || 0,
            discount: option.discount,

            date: new Date().toLocaleDateString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
            })



        })
    }

    return (
        <div className="custom-select relative ">
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsOpen(true)}
                className="w-full p-2 border border-gray-300 rounded"
            />
            {isOpen && (
                <ul className="max-h-[300px] border border-slate-400 shadow-lg overflow-auto absolute top-12 w-full left-0 bg-white">
                    {filteredOptions.map(option => (
                        <li className="px-2 rounded cursor-pointer py-1 my-1 hover:bg-slate-100" key={option.id} onClick={() => handleSelect(option)}>
                            {option.title} - <FormattedPrice amount={option.price} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const OrderModel = ({ newOrder, setNewOrder, handleAddOrder, setShowAddOrderModal, list }) => {
    const [selectedItem, setSelectedItem] = useState<CourseType | ProductType | null>(null);
    const [categoriesList, setCategoriesList] = useState<any[][]>([[]]);

    useEffect(() => {
        // Fetch categories data
        const fetchData = async () => {
            try {
                const data = await fetchJsonData("robotech/pages/categories.json");
                setCategoriesList(data);
            } catch (error) {
                toast.error(`${(error as Error).message}`);
            }
        };
        fetchData();
    }, []);

    // Calculate subtotal whenever selectedItem or newOrder changes
    useEffect(() => {
        if (selectedItem && newOrder.quantity >= 0 && newOrder.discount >= 0) {
            const subtotal = (selectedItem.price * newOrder.quantity) - newOrder.discount;
            setNewOrder({ ...newOrder, subtotal });
        }
    }, [selectedItem, newOrder.quantity, newOrder.discount, setNewOrder]);

    const handleSelect = (option) => {
        setSelectedItem(option);
        setNewOrder({
            ...newOrder,
            productName: option.title,
            piecePrice: option.price,
            discount: option.discount || 0,
            wholesalePrice:option.wholesalePrice || 0,
            date: new Date().toLocaleDateString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
            })
        });
        console.log('new order',option)

    };

    const handleAddOrderClick = async () => {
        // Validate selected product
        if (!selectedItem) {
            toast.error("Please select a product");
            return;
        }


        if (newOrder.quantity <= 0) {
            toast.error("Quantity should be greater than zero");
            return;
        }

        if ("count" in selectedItem!) {
            // Access the count property only when the selectedItem is of type ProductType
            const itemCount = +selectedItem.count;
            if (newOrder.quantity > itemCount) {
                toast.error(`only ${itemCount} piece(s) available in-stock`);

                return;
            }
            else {
                let obj = categoriesList[0][selectedItem.category].find(product => product.id === selectedItem.id)
                let updatedObject = { ...obj, count: `${(+selectedItem?.count - +newOrder?.quantity)}` };
                const updatedProducts = categoriesList[0][selectedItem.category].map(product => {
                    if (product.id === selectedItem.id) {
                        return updatedObject;
                    }
                    return product;
                });

                // Update the correct object within the categoriesList array
                const updatedCategoriesList = [...categoriesList]; // Copy the original array
                updatedCategoriesList[0][selectedItem.category] = updatedProducts; // Update the correct category array

                setCategoriesList(updatedCategoriesList); // Update the state with the updated array
                await updateJsonFile("robotech/pages/categories.json", categoriesList);

            }




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
            <div className="fixed inset-0 bg-black bg-opacity-50 z-100 flex items-center justify-center">
                <div className="bg-white min-w-[40rem] p-8 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Add Order</h2>
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Product Name
                            </label>
                            <CustomSelect setSelectedItem={setSelectedItem} setNewOrder={setNewOrder} newOrder={newOrder} options={list} onSelect={handleSelect} />
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
                                value={newOrder.discount}
                                onChange={(e) => setNewOrder({ ...newOrder, discount: isNaN(parseInt(e.target.value, 10)) ? 0 : parseInt(e.target.value, 10) })}
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
                                    subtotal: (+selectedItem?.price! * +newOrder.quantity!) - (+newOrder.discount! || 0)
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
