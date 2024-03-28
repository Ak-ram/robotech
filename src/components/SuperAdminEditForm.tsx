import supabase from "@/supabase/config";
import { Check, X } from "lucide-react";
import { useState } from "react";

const SuperAdminEditForm = ({ setSuperAdmin, superAdminEditFormOpen, setSuperAdminEditFormOpening, superAdmin }) => {
    const [editedItem, setEditedItem] = useState({ email: superAdmin.email, password: superAdmin.password });
    const [oldEmail, setOldEmail] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [canEdit, setCanEdit] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleInputChange = (e, key) => {
        const { value } = e.target;
        setEditedItem(prev => ({ ...prev, [key]: value }));
    };

    const handleOldEmailChange = (e) => {
        setOldEmail(e.target.value);
    };

    const handleOldPasswordChange = (e) => {
        setOldPassword(e.target.value);
    };

    const validateEmail = (email) => {
        // Basic email validation pattern
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Check if the email matches the pattern
        const isValid = emailPattern.test(email);

        return isValid;
    };

    const validatePassword = (password) => {
        // Minimum password length requirement
        const minLength = 8;

        // Check if the password meets the minimum length requirement
        const isValid = password.length >= minLength;

        return isValid;
    };

    const handleCheckCredentials = () => {
        if (oldEmail === superAdmin.email && oldPassword === superAdmin.password) {
            setCanEdit(true);
            setEmailError("");
            setPasswordError("");
        } else {
            setCanEdit(false);
            setEmailError("Incorrect old email or password. Please try again.");
        }
    };


    const handleSave = async () => {
        const isEmailValid = validateEmail(editedItem.email);
        const isPasswordValid = validatePassword(editedItem.password);

        if (isEmailValid && isPasswordValid) {
            if (
                editedItem.email === superAdmin.email &&
                editedItem.password === superAdmin.password
            ) {
                // No changes were made
                setEmailError("No changes were made to the email and password.");
            } else {
                // Changes were made, proceed with saving
                try {
                    const { data, error } = await supabase
                        .from('super_admins')
                        .update(editedItem)
                        .eq('id', superAdmin.id);





                    if (error) {
                        // Handle the error condition
                        console.error("Error updating the Supabase table:", error);
                    } else {
                        // Update successful
                        console.log("Supabase table updated successfully:", data);
                        setEmailError("");
                        setPasswordError("");
                        handleCancel()

                    }
                } catch (error) {
                    // Handle any other errors
                    console.error("An error occurred while updating the Supabase table:", error);
                }
            }
        } else {
            setEmailError(isEmailValid ? "" : "Invalid email.");
            setPasswordError(isPasswordValid ? "" : "Invalid password, less than 8 chars");
        }
    };
   
    const handleCancel = () => {
        setEditedItem({ email: superAdmin.email, password: superAdmin.password });
        setSuperAdminEditFormOpening(false);
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
                            <div className={`flex-col mb-2 lg:pr-4`}>
                                <span className="font-bold text-sm mb-2 inline-block ml-1">
                                    Old Email
                                </span>
                                <input
                                    type="email"
                                    placeholder="Old Email"
                                    className={`border border-gray-300 rounded outline-none w-full p-2 `}
                                    value={oldEmail}
                                    onChange={handleOldEmailChange}
                                />
                            </div>
                            <div className={`flex-col mb-2 lg:pr-4`}>
                                <span className="font-bold text-sm mb-2 inline-block ml-1">
                                    Old Password
                                </span>
                                <input
                                    type="password"
                                    placeholder="Old Password"
                                    className={`border border-gray-300 rounded outline-none w-full p-2 `}
                                    value={oldPassword}
                                    onChange={handleOldPasswordChange}
                                />
                            </div>
                            {canEdit && Object.entries({
                                email: "New Email",
                                password: "New Password",
                            }).map(([key, placeholder], index) => (
                                <div key={key} className={`flex-col mb-2 lg:pr-4`}>
                                    <span className="font-bold text-sm mb-2 inline-block ml-1">
                                        {placeholder}
                                    </span>

                                    <input
                                        type={key === "password" ? "password" : "email"}
                                        placeholder={placeholder}
                                        className={`border border-gray-300 rounded outline-none w-full p-2 `}
                                        value={editedItem[key]}
                                        onChange={(e) => handleInputChange(e, key)}
                                    />

                                </div>
                            ))}
                            <div className="text-red-500 text-sm">
                                {emailError}
                            </div>
                            <div className="text-red-500 text-sm">
                                {passwordError}
                            </div>
                        </div>
                        <div className="flex gap-2">
                            {!canEdit && <button
                                className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-auto"
                                onClick={handleCheckCredentials}
                            >
                                Check Credentials
                            </button>}
                            {canEdit && (
                                <button
                                    className="flex my-1 items-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2"
                                    onClick={handleSave}
                                    disabled={!canEdit}
                                >
                                    <Check size={18} className="mr-1" />
                                    Save
                                </button>
                            )}
                            <button
                                className="flex my-1 items-center bg-rose-500 hover:bg-rose-600 text-white font-bold py-2 px-4 rounded mr-2"
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