import React from "react";
import { X } from "lucide-react";
import DetailedLogo from '@/assets/DetailedLogo.png';
import Image from "next/image";

const Bill = ({ transactionData, setShowBill }) => {
    const { date, productName, quantity, subtotal, piecePrice,discount } = transactionData;
console.log(transactionData)
    // Add your company data
    const companyData = {
        name: "Electronic Store",
        address: "123 Main Street, Cityville",
        phone: "(555) 123-4567",
    };

    return (
        <>
            <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white w-full max-w-screen-md mx-auto p-6 md:p-8 rounded-lg shadow-md">
                    <X
                        className="cursor-pointer ml-auto text-gray-600"
                        size="24"
                        onClick={() => setShowBill(false)}
                    />
                    <div className="p-4">
                        {/* Logo and Company Information */}
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <Image className="mr-2 w-44" src={DetailedLogo} alt="Company Logo" width={70} height={70} />

                                <span className="font-bold text-lg">{companyData.name}</span>
                            </div>
                            <div className="text-right">
                                <p>{companyData.address}</p>
                                <p>{companyData.phone}</p>
                            </div>
                        </div>

                        {/* Invoice Details */}
                        <h2 className="text-xl font-bold mb-4">Invoice</h2>
                        <div className="mb-4 flex flex-col gap-3">
                            <p className="font-bold text-zinc-800">
                                Transaction Date: <span className="font-semibold">{date}</span>
                            </p>
                            <p className="font-bold text-zinc-800">
                                Product Name: <span className="font-semibold"> {productName}</span>
                            </p>
                            <p className="font-bold text-zinc-800">
                                Quantity: <span className="font-semibold"> {quantity}</span>
                            </p>
                            <p className="font-bold text-zinc-800">
                                Piece Price:  <span className="font-semibold">{piecePrice}</span>
                            </p>
                            <p className="font-bold text-zinc-800">
                                Discount:  <span className="font-semibold">{discount}</span>
                            </p>
                        </div>

                        {/* Subtotal and Total */}
                        <div className="border-t border-gray-300 py-4 mb-4">
                            <p className="text-sm">
                                <strong>Subtotal:</strong> {subtotal}
                            </p>
                            {/* Add more fields if needed, such as taxes, discounts, etc. */}
                        </div>
                        <div className="text-sm font-bold">
                            Total: {subtotal} {/* You may need to calculate the total based on other factors */}
                        </div>
                        {/* Signature Section */}
                        <div className="my-16">
                            <h3 className="text-lg font-bold mb-2">Signatures</h3>
                            <div className="flex justify-between">
                                <div>
                                    <p>Customer's Signature:</p>
                                    {/* Add a signature line or space for the customer to sign */}
                                </div>
                                <div>
                                    <p>{companyData.name} Signature:</p>
                                    {/* Add a signature line or space for your company to sign */}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Bill;
