import { useEffect, useState } from "react";
import { fetchJsonData } from "@/helpers/getJSONData";
import { updateJsonFile } from "@/helpers/updateJSONData";
import { Check, X, Trash, Edit, Plus } from "lucide-react";
import NoContent from "./NoContent";
import toast, { Toaster } from "react-hot-toast";
import { v4 as uuidv4 } from 'uuid';
import { CourseType, ProductType } from "../../type";
import Link from 'next/link'
const AdminCustomers = () => {
    const [jsonArray, setJsonArray] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [isLinkDisabled, setLinkDisabled] = useState(false);

    interface CustomerServicesType {
        orders: ProductType[],
        courses: CourseType[],
        amount: number
    }
    interface CustomerType {
        id: string;
        fullName: string;
        phone: string;
        address: string;
        faculty: string;
        age: number;
        transactions: {};
    }

    const [editedItem, setEditedItem] = useState<CustomerType>({
        id: "",
        fullName: "",
        phone: "",
        address: "",
        faculty: "",
        age: 0,
        transactions: {}
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
        setLinkDisabled(true); // Disable the link
        setEditIndex(-1); // Use -1 to indicate a new item
        setEditedItem({
            id: uuidv4(),
            fullName: "",
            phone: "",
            age: 0,
            address: "",
            faculty: "",
            transactions: {}
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
            toast.error("All fields are required");
            return;
        }

        // Validate full name (each word should have at least 3 characters)
        const fullNameWords = editedItem.fullName.trim().split(' ');
        if (fullNameWords.length < 2 || fullNameWords.some(word => word.trim().length < 3)) {
            toast.error("Each word in the full name should have at least 3 characters");
            return;
        }


        // Validate phone number format
        const phoneRegex = /^(01[0-9]{9})$/;
        if (!phoneRegex.test(editedItem.phone)) {
            toast.error("Invalid phone number format. It should start with '01' and have 11 digits.");
            return;
        }

        if (editIndex !== null) {
            try {
                let updatedArray;

                if (editIndex === -1) {
                    // Add a new item without overwriting existing ones
                    updatedArray = [...jsonArray, editedItem];
                } else {
                    // Update an existing item without overwriting existing ones
                    updatedArray = jsonArray.map((item, index) =>
                        index === editIndex ? editedItem : item
                    );
                }

                await updateJsonFile("robotech/pages/customers.json", updatedArray);
                setJsonArray(updatedArray);
                setEditIndex(null);
                toast.success(editIndex === -1 ? 'Customer added successfully' : 'Customer updated successfully');
                toast.loading(`Be patient, changes take a few moments to be reflected`);
                setTimeout(() => {
                    toast.dismiss();
                }, 5000);
            } catch (error) {
                toast.error((error as Error).message);
            }
        }

        // Enable the link after 10 seconds
        setTimeout(() => {
            setLinkDisabled(false);
        }, 10000);
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
                                        <td className="max-w-[150px] text-center font-semibold whitespace-nowrap overflow-x-auto text-ellipses border px-4 py-2">
                                            <Link href={{
                                                pathname: `admin/id_${item?.id}`,
                                                query: {
                                                    id: item?.id,
                                                    data: JSON.stringify(item)
                                                },
                                            }} className={isLinkDisabled ? 'cursor-wait text-gray-500' : ''}>
                                                {item.fullName}

                                            </Link>
                                        </td>
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
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white w-[500px] p-8 rounded-lg shadow-md">

                        <h2 className="font-bold mb-2 text-center text-lg">
                            {editIndex === -1 ? "Add New Customer" : "Edit Customer"}
                        </h2>
                        {error && <p className="text-red-500 mb-2">{error}</p>}
                        <div className="">
                            <div className=" mb-2 lg:pr-4">
                                <span className="font-bold mb-1">Full Name</span>
                                
                                <input
                                    type="text"
                                    placeholder="Akram Ashraf"
                                    className="w-full p-2 border border-gray-300 rounded"
                                    value={editedItem.fullName}
                                    onChange={(e) => handleInputChange(e, "fullName")}
                                />
                            </div>
                            <div className=" mb-2 lg:pr-4">
                                <span className="font-bold mb-1">Phone No.</span>

                                <input
                                    type="text"
                                    placeholder="01XXXXXXXXX"
                                    className="p-2 w-full border border-gray-300 rounded"
                                    value={editedItem.phone}
                                    onChange={(e) => handleInputChange(e, "phone")}
                                />
                            </div>
                            <div className=" mb-2 lg:pr-4">
                                <span className="font-bold mb-1">Age</span>

                                <input
                                    type="number"
                                    placeholder="20"
                                    className="p-2 w-full border border-gray-300 rounded"
                                    value={editedItem.age}
                                    onChange={(e) => handleInputChange(e, "age")}
                                />
                            </div>
                            <div className=" mb-2 lg:pr-4">
                                <span className="font-bold mb-1">Address</span>

                                <input
                                    type="text"
                                    placeholder="شرق النيل, بني سويف, مصر"
                                    className="p-2 w-full border border-gray-300 rounded"
                                    value={editedItem.address}
                                    onChange={(e) => handleInputChange(e, "address")}
                                />
                            </div>
                            <div className=" mb-2 lg:pr-4">
                                <span className="font-bold mb-1">Faculty</span>
                                <input
                                    type="text"
                                    placeholder="BS, Beni-Suef University"
                                    className="p-2 w-full border border-gray-300 rounded"
                                    value={editedItem.faculty}
                                    onChange={(e) => handleInputChange(e, "faculty")}
                                />
                            </div>
                        </div>
                        <div className="flex mt-5">
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