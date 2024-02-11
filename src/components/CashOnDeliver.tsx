import { useRef, useState } from "react";
import emailjs from '@emailjs/browser'
import toast, { Toaster } from "react-hot-toast";

import EmailJsForm from "./EmailJsForm";
const CashOnDelivery = ({ rowPrice, totalAmt, isCashOnDeliveryOpened, setCashOnDeliveryOpened }) => {



    return (

        <>
            <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
                <p className="text-xl font-medium">Payment Details</p>
                <p className="text-gray-400">Complete your order by providing your payment details.</p>
                <EmailJsForm totalAmt={totalAmt} />
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
    )
}

export default CashOnDelivery;
