import { Copy, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import FormattedPrice from "./FormattedPrice";

const VodafoneCash = ({ totalAmt,isVodafoneCashOpened, setIsVodafoneCashOpened }) => {
    const [showNumber, setShowNumber] = useState(false);

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
        const phoneNumber = "201066745733";
        const message = "Hello, I want to inquire about Vodafone Cash payment.";
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappLink, '_blank');
      };

    return (
        <>
            <div
                className={`${isVodafoneCashOpened ? "flex" : "hidden"
                    } w-full h-full top-0 left-0 flex items-center justify-center backdrop-blur-2xl fixed mt-8 lg:m-0 items-center justify-center bg-gray-100`}
            >
                <div className="flex w-[35rem] flex-col rounded-lg bg-white px-6 shadow-lg sm:px-14">
                    <div className="flex w-full justify-between self-start pt-12 pb-8">
                        <h2 className="font-sansserif font-semibold text-gray-700 lg:text-2xl">
                            Follow these steps to pay with Vodafone Cash
                        </h2>
                        <button onClick={() => setIsVodafoneCashOpened(false)}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 cursor-pointer text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="flex w-full flex-col pb-8 pt-4">
                        <div className="relative mb-4">
                            <label className="flex flex-col rounded-2xl border border-gray-300 bg-slate-100/80 p-4 pr-8 sm:pr-16">
                                <span className="mb-2 font-bold">Step 1</span>
                                <p className="text-sm sm:text-base">
                                    Take a screenshot of your <Link target="_blank" className="text-blue-600 cursor-pointer" href={'./cart'}>cart page <ExternalLink className="m-0 inline-block" size={16} /></Link>
                                </p>
                            </label>
                        </div>
                       
                        <div className="relative mb-4">
                            <label className="flex flex-col rounded-2xl border border-gray-300 bg-slate-100/80 p-4 pr-8 sm:pr-16">
                                <span className="mb-2 font-bold">Step 2</span>
                                <p className="text-sm sm:text-base">
                                    Send Screenshot & &quot;<FormattedPrice amount={totalAmt}/>&quot; to the following Vodafone Cash number:{" "}
                                    {showNumber ? (
                                        <span className="items-center justify-start gap-2">
                                            <span>01066745733</span>
                                            <span className="cursor-pointer" onClick={() => {
                                                copyToClipboard("01066745733");
                                            }}><Copy className="m-0 inline-block ml-2" size={16} /></span>

                                        </span>
                                    ) : (
                                        <button
                                            className="cursor-pointer text-blue-600 ml-2"
                                            onClick={() => {
                                                setShowNumber(true);
                                            }}
                                        >
                                            Show Number
                                        </button>
                                    )}
                                </p>
                            </label>
                        </div>

                        <button onClick={openWhatsApp} className="my-2 rounded-md bg-gray-900 py-3 font-medium text-white">
                            Contact us in WhatsApp
                        </button>
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
