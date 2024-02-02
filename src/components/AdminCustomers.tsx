import { useEffect, useState } from "react";
import { fetchJsonData } from "@/helpers/getJSONData";
import { updateJsonFile } from "@/helpers/updateJSONData";
import { Check, X, Trash, Edit, Plus } from "lucide-react";
import NoContent from "./NoContent";
import toast, { Toaster } from "react-hot-toast";
import { v4 as uuidv4 } from 'uuid';
import { ProductType } from "../../type";
import Link from 'next/link'
const AdminCustomers = () => {
    const [jsonArray, setJsonArray] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    interface CustomerServicesType {
        date: string,
        orders: ProductType[],
        amount: number
    }
    interface CustomerType {
        id: string;
        fullName: string;
        phone: string;
        transactions: CustomerServicesType[];
    }

    const [editedItem, setEditedItem] = useState<CustomerType>({
        id: "",
        fullName: "",
        phone: "",
        transactions: []
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchJsonData("robotech/pages/customers.json");
                setJsonArray(data);
            } catch (error) {
                setError((error as Error).message);
            }
        };

        fetchData();
    }, []);

    const handleAddItemClick = () => {
        setEditIndex(-1); // Use -1 to indicate a new item
        setEditedItem({
            id: uuidv4(),
            fullName: "",
            phone: "",
            transactions: []
        });
        setError(null); // Reset error state
    };

    const handleRemoveItem = async (index: number) => {
        const updatedArray = [...jsonArray];
        updatedArray.splice(index, 1);

        try {
            await updateJsonFile("robotech/pages/customers.json", updatedArray);
            setJsonArray(updatedArray);
            toast.success('Question removed successfully')
            toast.loading(`Be patient, changes takes a few moments to be reflected`);
            setTimeout(() => {
                toast.dismiss();

            }, 5000);
        } catch (error) {
            setError((error as Error).message);
        }
    };

    const handleEditClick = (index: number) => {
        setEditIndex(index);
        setEditedItem({ ...jsonArray[index] });
    };

    const handleEditSubmit = async () => {
        // Check for empty fields
        if (
            !editedItem.id ||
            !editedItem.fullName ||
            !editedItem.phone
        ) {
            setError("All fields are required");
            return;
        }

        if (editIndex !== null) {
            let updatedArray;

            if (editIndex === -1) {
                // Add a new item
                updatedArray = [...jsonArray, editedItem];
            } else {
                // Update an existing item
                updatedArray = jsonArray.map((item, index) =>
                    index === editIndex ? editedItem : item
                );
            }

            try {
                await updateJsonFile("robotech/pages/customers.json", updatedArray);
                setJsonArray(updatedArray);
                setEditIndex(null);
                setError(null); // Reset error state
                toast.success('Question added successfully')
                toast.loading(`Be patient, changes takes a few moments to be reflected`);
                setTimeout(() => {
                    toast.dismiss();

                }, 5000);
            } catch (error) {
                setError((error as Error).message);
            }
        }
    };

    const handleEditCancel = () => {
        setEditIndex(null);
        setEditedItem({} as CustomerType); // Cast to CustomerType
    };



    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        key: string
    ) => {
        setEditedItem((prev) => ({ ...prev, [key]: e.target.value }));
    };

    return (
        <div className={`min-h-[400px] lg:p-3 w-full z-10 bottom-0 left-0 lg:relative overflow-hidden mt-5`}>

            {!jsonArray && <h2 className="font-bold mb-4">Current Customer data:</h2>}
            <div className="mb-5 flex items-center justify-end">
                <button
                    className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    onClick={handleAddItemClick}
                >
                    <Plus size={18} className="mr-1" />
                    Add Customer
                </button>
            </div>
            {jsonArray.length !== 0 ?
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300 text-sm">
                        <thead>
                            <tr className="bg-zinc-800 text-white ">
                                <th className="max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses border px-4 py-2">Name</th>
                                <th className="max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses border px-4 py-2">Phone</th>
                                <th className="max-w-[150px] whitespace-nowrap overflow-x-auto text-ellipses border px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jsonArray.map((item, index) => (
                                <tr key={index} className="hover:bg-slate-100">
                                    <td className="max-w-[150px] text-center font-semibold whitespace-nowrap overflow-x-auto text-ellipses border px-4 py-2">
                                        <Link href={{
                                            pathname: `admin/id_${item?.id}`,
                                            query: {
                                                id: item?.id,
                                            },
                                        }} >{item.fullName}</Link>
                                    </td>
                                    <td className="max-w-[150px] text-center font-semibold whitespace-nowrap overflow-x-auto text-ellipses border px-4 py-2">{item.phone}</td>
                                    <td className="max-w-[150px] text-center font-semibold whitespace-nowrap overflow-x-auto text-ellipses border px-2 py-2">
                                        <button
                                            className="mr-1"
                                            onClick={() => handleEditClick(index)}
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            className="mr-1"
                                            onClick={() => handleRemoveItem(index)}
                                        >
                                            <Trash size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div> : <NoContent />}

            {editIndex !== null && (
                <div className="mt-5">
                    <h2 className="font-bold mb-2">
                        {editIndex === -1 ? "Add New Item" : "Edit Item"}
                    </h2>
                    {error && <p className="text-red-500 mb-2">{error}</p>}
                    <div className="flex flex-col lg:flex-row">
                        <div className=" mb-2 lg:pr-4">
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full p-2 border border-gray-300 rounded"
                                value={editedItem.fullName}
                                onChange={(e) => handleInputChange(e, "fullName")}
                            />
                        </div>
                        <div className="lg:w-1/4 mb-2 lg:pr-4">
                            <input
                                type="text"
                                placeholder="Phone No."
                                className="p-2 w-full border border-gray-300 rounded"
                                value={editedItem.phone}
                                onChange={(e) => handleInputChange(e, "phone")}
                            />
                        </div>

                    </div>
                    <div className="flex">
                        <button
                            className="flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2"
                            onClick={handleEditSubmit}
                        >
                            <Check size={18} className="mr-1" />
                            Save
                        </button>
                        <button
                            className="flex items-center bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                            onClick={handleEditCancel}
                        >
                            <X size={18} className="mr-1" />
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* <div className="mt-5">
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddItemClick}
        >
          <Plus size={18} className="mr-1" />
          Add Item
        </button>
      </div> */}
            <Toaster
                position="bottom-right"
                toastOptions={{
                    style: {
                        background: "#000",
                        color: "#fff",
                    },
                }}
            />
        </div>
    );
};

export default AdminCustomers;