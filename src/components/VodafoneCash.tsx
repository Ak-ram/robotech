import { Copy, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import FormattedPrice from "./FormattedPrice";
import EmailJsForm from "./EmailJsForm";

const VodafoneCash = ({ totalAmt, productData }) => {

    const copyToClipboard = (text) => {
        // Create a temporary textarea element
        const textArea = document.createElement("textarea");
        textArea.value = text;

        // Append the textarea to the document
        document.body.appendChild(textArea);

        // Select the text in the textarea
        textArea.select();
        textArea.setSelectionRange(0, 99999); // For mobile devices

        // Execute the copy command
        document.execCommand("copy");

        // Remove the temporary textarea
        document.body.removeChild(textArea);

        // Provide user feedback (you can customize this part)
        toast.success("Phone number copied to clipboard!");
    };
    const openWhatsApp = () => {
        const phoneNumber = "201102071544";
        const message = "Hello, I want to inquire about Vodafone Cash payment.";
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        
        if (typeof window !== 'undefined') {
            // Execute only in the browser environment
            window.open(whatsappLink, '_blank');
        } else {
            // Handle non-browser environment (optional)
            console.error("Cannot open WhatsApp in non-browser environment.");
        }
    };
    

    return (
        <>
            <div
                className="pt-8 mt-8 bg-gray-50 lg:mt-0"

            >
                <div className="flex flex-col rounded-lg px-6 ">

                    <div className="flex w-full flex-col pb-8 pt-4">
                        <p className="text-xl font-medium">Payment Details</p>
                        <p className="text-gray-400">Complete your order by providing your payment details.</p>
                        <div className="relative mb-4">
                            <label className="flex flex-col rounded-2xl border border-gray-300 bg-slate-100/80 p-4 pr-8 sm:pr-16">
                                <span className="mb-2 font-bold">Hint</span>
                                <p className="text-sm sm:text-base">
                                    Send <FormattedPrice amount={totalAmt} /> to our vodafone cash number:{" "}
                                    <span className="items-center justify-start gap-2">
                                        <strong>01066745733</strong>
                                        <span className="cursor-pointer" onClick={() => {
                                            copyToClipboard("01066745733");
                                        }}><Copy className="m-0 inline-block ml-2" size={16} /></span>

                                    </span>

                                </p>
                            </label>
                        </div>
                        <EmailJsForm  productData={productData} totalAmt={totalAmt} />

                     
                    </div>
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

export default VodafoneCash;
