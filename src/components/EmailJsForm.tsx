// import { useRef, useState } from "react";
// import FormattedPrice from "./FormattedPrice";
// import { Map, MessageSquare, PhoneCall } from "lucide-react";
// import toast from "react-hot-toast";
// import emailjs from '@emailjs/browser'

// const EmailJsForm = ({ totalAmt, productData }) => {
//     const [clientName, setClientName] = useState("");
//     const [phone, setPhone] = useState("");
//     const [address, setAddress] = useState("");
//     const [message, setMessage] = useState("");
//     const formElement = useRef(null);


//     const handleNameChange = (e) => {
//         setClientName(e.target.value);
//     }

//     const handlePhoneChange = (e) => {
//         setPhone(e.target.value);
//     }
//     const handleMessageChange = (e) => {
//         setMessage(e.target.value);
//     }
//     const handleAddressChange = (e) => {
//         setAddress(e.target.value);
//     }



//     const sendEmail = (e) => {
//         e.preventDefault();
//         console.log(productData)
//         if (!phone || !clientName || !address) {
//             toast.error("Please provide both your name and phone number.")
//             return;
//         }


//         emailjs.sendForm(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!, process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!, formElement.current!, process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!)
//             .then((result) => {
//                 toast.success('Order submitted. Expect a call from customer service soon. Thank you.')
//                 setClientName('')
//                 setPhone('')
//                 setMessage('')
//                 setAddress('')
//             }, (error) => {
//                 toast.error("Order unsuccessful. An error occurred.")

//             });
//     };

//     return (<form ref={formElement} onSubmit={sendEmail}>
//         <input type="hidden" name="client_totalAmt" value={totalAmt} />
//         <input type="hidden" name="productData" value={JSON.stringify(productData)} />

//         <label htmlFor="client_name" className="mt-4 mb-2 block text-sm font-medium">Your Name</label>
//         <div className="relative">
//             <input onChange={handleNameChange} type="text" value={clientName} id="client_name" name="client_name" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Your full name here" />
//             <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
//                     <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
//                 </svg>
//             </div>
//         </div>

//         <label htmlFor="phone-no" className="mt-4 mb-2 block text-sm font-medium">Phone Number</label>
//         <div className="">
//             <div className="relative">
//                 <input value={phone}
//                     name="client_phone"
//                     onChange={handlePhoneChange}
//                     type="text" id="phone-no" className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="01x-xxxx-xxxx" />
//                 <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
//                     <PhoneCall size={14} className="text-zinc-400" />
//                 </div>
//             </div>
//         </div>


//         <label htmlFor="address" className="mt-4 mb-2 block text-sm font-medium">Address</label>
//         <div className="">
//             <div className="relative">
//                 <input value={address}
//                     name="client_address"
//                     onChange={handleAddressChange} type="text" id="address" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Your Address" />
//                 <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
//                     <Map size={16} className="text-zinc-400" />
//                 </div>
//             </div>
//         </div>


//         <label htmlFor="message" className="mt-4 mb-2 block text-sm font-medium">Message</label>
//         <div className="">
//             <div className="relative">
//                 <input value={message}
//                     name="client_message"
//                     onChange={handleMessageChange} type="text" id="message" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Message" />
//                 <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
//                     <MessageSquare size={16} className="text-zinc-400" />
//                 </div>
//             </div>
//         </div>

//         <div className="mt-6 border-t border-b py-2">

//         </div>
//         <div className="mt-6 flex items-center justify-between">
//             <p className="text-sm font-medium text-gray-900">Total</p>
//             <p className="text-2xl font-semibold text-gray-900"><FormattedPrice
//                 amount={totalAmt}
//                 className="font-semibold text-lg"
//             />
//             </p>
//         </div>
//         <button onClick={sendEmail} className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">Place Order</button>

//     </form>)
// }

// export default EmailJsForm


import { useRef, useState } from "react";
import FormattedPrice from "./FormattedPrice";
import { Map, MessageSquare, PhoneCall } from "lucide-react";
import toast from "react-hot-toast";
import emailjs from '@emailjs/browser'

const EmailJsForm = ({ totalAmt, productData }) => {
    const [clientName, setClientName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [message, setMessage] = useState("");
    const formElement = useRef(null);

    const handleNameChange = (e) => {
        setClientName(e.target.value);
    }

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    }
    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    }
    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    }

    const sendEmail = (e) => {
        e.preventDefault();
        console.log(productData)
        if (!phone || !clientName || !address) {
            toast.error("Please provide both your name and phone number.")
            return;
        }

        emailjs.sendForm(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!, process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!, formElement.current!, process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!)
            .then((result) => {
                toast.success('Order submitted. Expect a call from customer service soon. Thank you.')
                setClientName('')
                setPhone('')
                setMessage('')
                setAddress('')
            }, (error) => {
                toast.error("Order unsuccessful. An error occurred.")
            });
    };

    return (
        <form ref={formElement} onSubmit={sendEmail}>
            <input type="hidden" name="client_totalAmt" value={totalAmt} />
            {productData.map((product, index) => (
                <>
                    <input key={`product_${index}`} type="hidden" name={`product_${index + 1}_title`} value={product.title} />
                    <input key={`product_${index}`} type="hidden" name={`product_${index + 1}_price`} value={product.price} />
                    <input key={`product_${index}`} type="hidden" name={`product_${index + 1}_qunatity`} value={product.quantity} />
                    <input key={`product_${index}`} type="hidden" name={`product_${index + 1}_subTotal`} value={`${+product.price * +product.quantity}`} />
                </>
            ))}

            <label htmlFor="client_name" className="mt-4 mb-2 block text-sm font-medium">Your Name</label>
            <div className="relative">
                <input onChange={handleNameChange} type="text" value={clientName} id="client_name" name="client_name" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Your full name here" />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                    </svg>
                </div>
            </div>

            <label htmlFor="phone-no" className="mt-4 mb-2 block text-sm font-medium">Phone Number</label>
            <div className="">
                <div className="relative">
                    <input value={phone}
                        name="client_phone"
                        onChange={handlePhoneChange}
                        type="text" id="phone-no" className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="01x-xxxx-xxxx" />
                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                        <PhoneCall size={14} className="text-zinc-400" />
                    </div>
                </div>
            </div>


            <label htmlFor="address" className="mt-4 mb-2 block text-sm font-medium">Address</label>
            <div className="">
                <div className="relative">
                    <input value={address}
                        name="client_address"
                        onChange={handleAddressChange} type="text" id="address" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Your Address" />
                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                        <Map size={16} className="text-zinc-400" />
                    </div>
                </div>
            </div>


            <label htmlFor="message" className="mt-4 mb-2 block text-sm font-medium">Message</label>
            <div className="">
                <div className="relative">
                    <input value={message}
                        name="client_message"
                        onChange={handleMessageChange} type="text" id="message" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Message" />
                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                        <MessageSquare size={16} className="text-zinc-400" />
                    </div>
                </div>
            </div>
            {/* Your form inputs for client details */}
            <button onClick={sendEmail} className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">Place Order</button>
        </form>
    );
}

export default EmailJsForm;
