import { Check, X } from "lucide-react";
import { useState } from "react";

const SuperAdminEditForm = ({ superAdminEditFormOpen, setSuperAdminEditFormOpening }) => {
    const [editedItem, setEditedItem] = useState<any>({ email: '', password: '' });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        key: string
    ) => {
        const { name, value } = e.target;
        if (
            (key === "count" || key === "price" || key === "previousPrice") &&
            !/^\d*\.?\d*$/.test(value)
        ) {
            return;
        }
        setEditedItem((prev) => ({ ...prev, [key]: value }));
    };

    const handleSave = () => {
        // Implement the save functionality here
    };

    const handleCancel = () => {
        // Implement the cancel functionality here
    };

    return (
        <div>
            {superAdminEditFormOpen && (
                <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white max-h-[700px] overflow-auto min-w-[600px] p-8 rounded-lg shadow-md">
                        <h2 className="font-bold mb-2 text-center text-lg">
                            Edit Super Admin
                        </h2>

                        <div className="">
                            {Object.entries({
                                email: "Email",
                                password: "Password",
                            }).map(([key, placeholder], index) => (
                                <div key={key} className={`flex-col mb-2 lg:pr-4`}>
                                    <span className="font-bold text-sm mb-2 inline-block ml-1">
                                        {placeholder}
                                    </span>

                                    <input
                                        type={"text"}
                                        placeholder={placeholder}
                                        className={`border border-gray-300 rounded outline-none w-full p-2 `}
                                        value={editedItem[key]}
                                        onChange={(e) => handleInputChange(e, key)}
                                    />

                                </div>
                            ))}
                        </div>
                        <div className="flex">
                            <button
                                className="flex items-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2"
                                onClick={handleSave}
                            >
                                <Check size={18} className="mr-1" />
                                Save
                            </button>
                            <button
                                className="flex items-center bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                                onClick={handleCancel}
                            >
                                <X size={18} className="mr-1" />
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SuperAdminEditForm;
