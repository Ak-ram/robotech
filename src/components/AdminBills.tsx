import { useEffect, useState } from "react";
import { fetchJsonData } from "@/helpers/getJSONData";
import { updateJsonFile } from "@/helpers/updateJSONData";
import { Check, X, Plus, TrashIcon, Edit, PhoneCall, User } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { v4 as uuidv4 } from 'uuid';
import { CourseType, ProductType } from "../../type";
import Link from 'next/link'
import NoContent from "./NoContent";
const AdminBills = () => {
    const [jsonArray, setJsonArray] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    interface CustomerType {
        id: string;
        fullName: string;
        phone: string;
        address: string;
        faculty: string;
        age: number;
        total_purchase_transactions: number;
        transactions: {};
    }

    const [editedItem, setEditedItem] = useState<CustomerType>({
        id: "",
        fullName: "",
        phone: "",
        address: "",
        faculty: "",
        age: 0,
        total_purchase_transactions: 0,
        transactions: {
            products: [],
            courses: [],
            printServices: [],
        }
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchJsonData("robotech/pages/bills.json");
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
            age: 0,
            address: "",
            faculty: "",
            total_purchase_transactions: 0,
            transactions: {
                products: [],
                courses: [],
                printServices: [],
            }
        });
        setError(null); // Reset error state
        setSearchTerm('');
    };

    const handleEditClick = (customerId: string) => {
        const index = jsonArray.findIndex(item => item.id === customerId);
        setEditIndex(index);
        setEditedItem({ ...jsonArray[index] });
        // setSearchTerm('');
    };

    const handleRemoveItem = async (customerId: string) => {

        let confirmDel = window.confirm('Deleting this customer will also remove associated data such as transactions, products, courses, and print services purchased, impacting the stats page.')
        if (confirmDel) {
            const index = jsonArray.findIndex(item => item.id === customerId);
            if (index === -1) return; // Customer not found
            const updatedArray = [...jsonArray];
            updatedArray.splice(index, 1);

            try {
                await updateJsonFile("robotech/pages/bills.json", updatedArray);
                setJsonArray(updatedArray);
                toast.success('Customer removed successfully');
                toast.loading(`Be patient, changes take a few moments to be reflected`);
                setTimeout(() => {
                    toast.dismiss();
                }, 5000);
            } catch (error) {
                setError((error as Error).message);
            }
        }
    };


    const handleEditSubmit = async () => {
        // Check for empty fields
        if (
            !editedItem.id ||
            !editedItem.fullName ||
            !editedItem.phone ||
            !editedItem.age
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

        // Validate Age format
        if (editedItem.age > 60) {
            toast.error("Max Age is 60");
            return;
        }


        // Validate Age format
        if (editedItem.age < 10) {
            toast.error("Min Age is 10");
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

                await updateJsonFile("robotech/pages/bills.json", updatedArray);
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
        <div className={`min-h-[400px] lg:p-3 w-full bottom-0 left-0 lg:relative overflow-hidden mt-5`}>

            {!jsonArray && <h2 className="font-bold mb-4">Current Customer data:</h2>}

            <div className="mb-5 flex flex-col lg:flex-row items-center justify-between">
                <input
                    type="text"
                    placeholder="Search By Name, Phone"
                    className="text-black mb-2 p-2 border border-gray-300 rounded w-full lg:w-[60%] focus:outline-none focus:border-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

            </div>
            {jsonArray.length !== 0 ? (
                <div className={"flex flex-col gap-2"}>
                    {jsonArray

                        .map((item, index) => (
                            <div
                                key={index}
                                className={`border group cursor-pointer hover:border-zinc-500 border-zinc-300 p-4 rounded-lg bg-white font-medium shadow-md transition-all duration-300 transform 
                            `}
                            >
                                Bill ID: <span className="text-blue-400 group-hover:underline"> {item.id} </span>

                            </div>
                        ))
                    }
                </div >
            ) : <div className="bg-white h-[300px] flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-semibold mb-4">Your Bills Should Goes here...</h2>
                </div>
            </div>}

            {
                editIndex !== null && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
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
                    </div>
                )
            }

            <Toaster
                position="bottom-right"
                toastOptions={{
                    style: {
                        background: "#000",
                        color: "#fff",
                    },
                }}
            />
        </div >
    );

};

export default AdminBills;