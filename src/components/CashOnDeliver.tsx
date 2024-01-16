import { useRef, useState } from "react";
import emailjs from '@emailjs/browser'
import toast, { Toaster } from "react-hot-toast";
import FormattedPrice from "./FormattedPrice";
import { MessageSquare, PhoneCall } from "lucide-react";
const CashOnDelivery = ({ totalAmt, isCashOnDeliveryOpened, setCashOnDeliveryOpened }) => {
    const [clientName, setClientName] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const formElement = useRef(null);

    const sendEmail = (e) => {
        e.preventDefault();
        if (!phone || !clientName) {
            toast.error("Please provide both your name and phone number.")
            return;
        }


        emailjs.sendForm(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!, process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!, formElement.current!, process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!)
            .then((result) => {
                console.log(result.text);
                toast.success('Order submitted. Expect a call from customer service soon. Thank you.')
                setClientName('')
                setPhone('')
                setMessage('')
            }, (error) => {
                console.log(error.text);
                toast.error("Order unsuccessful. An error occurred.")

            });
    };
    const handleNameChange = (e) => {
        setClientName(e.target.value);
    }

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    }
    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    }


    return (
        // <div
        //     className={`${isCashOnDeliveryOpened ? "flex" : "hidden"
        //         } w-full h-full top-0 left-0 flex items-center justify-center backdrop-blur-2xl fixed mt-8 lg:m-0 items-center justify-center bg-gray-100`}
        // ><div className="flex min-h-screen w-screen w-full items-center justify-center text-gray-600 bg-gray-50">
        //         <div className="relative">

        //             <div className="hidden sm:block h-56 w-56 text-indigo-300 absolute a-z-10 -left-20 -top-20">
        //                 <svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='40' height='40' patternTransform='scale(0.6) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='none' /><path d='M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5' stroke-width='1' stroke='none' fill='currentColor' /></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(#a)' /></svg>
        //             </div>
        //             <div className="hidden sm:block h-28 w-28 text-indigo-300 absolute a-z-10 -right-20 -bottom-20">
        //                 <svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='b' patternUnits='userSpaceOnUse' width='40' height='40' patternTransform='scale(0.5) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='none' /><path d='M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5' stroke-width='1' stroke='none' fill='currentColor' /></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(#b)' /></svg>
        //             </div>
        //             <div className="relative flex flex-col sm:w-[30rem] rounded-lg border-gray-400 bg-white shadow-lg px-4">
        //                 <div className="flex-auto p-6">
        //                     <div className="relative mb-10 flex flex-shrink-0 flex-grow-0 items-center justify-center overflow-hidden">
        //                         <a href="#" className="mt-5 flex cursor-pointer items-center gap-2 text-indigo-500 no-underline hover:text-indigo-500">
        //                             <span className="flex-shrink-0 text-3xl font-black tracking-tight opacity-100">Robotech Space</span>
        //                         </a>
        //                         <button className="absolute right-1" onClick={() => setCashOnDeliveryOpened(false)}>
        //                             <svg
        //                                 xmlns="http://www.w3.org/2000/svg"
        //                                 className="h-5 w-5 cursor-pointer text-gray-400"
        //                                 fill="none"
        //                                 viewBox="0 0 24 24"
        //                                 stroke="currentColor"
        //                                 strokeWidth="2"
        //                             >
        //                                 <path
        //                                     strokeLinecap="round"
        //                                     strokeLinejoin="round"
        //                                     d="M6 18L18 6M6 6l12 12"
        //                                 />
        //                             </svg>
        //                         </button>
        //                     </div>
        //                     <h4 className="mb-2 font-medium text-gray-700 xl:text-xl text-center">Total Price: <FormattedPrice amount={totalAmt}/></h4>
        //                     <p className="mb-6 text-gray-500 text-center">Kindly share your information to finalize the payment process.</p>

        //                     <form ref={formElement} onSubmit={sendEmail} className="mb-4">
        //                         <div className="mb-4">
        //                             <label htmlFor="name" className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">Your Name</label>
        //                             <input value={clientName} name='client_name'
        //                                 onChange={handleNameChange} type="text" className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow" id="name" placeholder="Enter your name" />
        //                         </div>
        //                         <div className="mb-4">
        //                             <div className="flex justify-between">
        //                                 <label className="mb-2 inline-block text-xs font-medium uppercase text-gray-700" htmlFor="phoneNumber">Phone Number</label>

        //                             </div>
        //                             <div className="relative flex w-full flex-wrap items-stretch">
        //                                 <input value={phone}
        //                                     name="client_phone"
        //                                     onChange={handlePhoneChange} type="tel" id="phoneNumber" className="relative block flex-auto cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow" placeholder="01XXXXXXXXX" />
        //                             </div>
        //                         </div>
        //                         <div className="mb-4">
        //                             <div className="flex justify-between">
        //                                 <label className="mb-2 inline-block text-xs font-medium uppercase text-gray-700" htmlFor="clientMessage">Message</label>

        //                             </div>
        //                             <div className="relative flex w-full flex-wrap items-stretch">
        //                                 <input value={message}
        //                                     name="client_message"
        //                                     onChange={handleMessageChange} type="textarea" id="clientMessage" className="relative block flex-auto cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow" placeholder="Have any question?" />
        //                             </div>
        //                         </div>

        //                         <div className="mb-4">
        //                             <button onClick={sendEmail} className="grid w-full cursor-pointer select-none rounded-md border border-indigo-500 bg-indigo-500 py-2 px-5 text-center align-middle text-sm text-white shadow hover:border-indigo-600 hover:bg-indigo-600 hover:text-white focus:border-indigo-600 focus:bg-indigo-600 focus:text-white focus:shadow-none" type="submit">Submit</button>
        //                         </div>
        //                     </form>

        //                     <p className="mb-4 text-center">
        //                         back to your
        //                         <span onClick={() => setCashOnDeliveryOpened(false)} className="cursor-pointer text-indigo-500 no-underline hover:text-indigo-500"> Cart Page</span>
        //                     </p>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        //     <Toaster
        //         position="bottom-right"
        //         toastOptions={{
        //             style: {
        //                 background: "#000",
        //                 color: "#fff",
        //             },
        //         }}
        //     />
        // </div>
        <><div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
            <p className="text-xl font-medium">Payment Details</p>
            <p className="text-gray-400">Complete your order by providing your payment details.</p>
            <div className="">
                 <label htmlFor="clientName" className="mt-4 mb-2 block text-sm font-medium">Your Name</label>
                <div className="relative">
                    <input type="text" id="clientName" name="clientName" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Your full name here" />
                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                        </svg>
                    </div>
                </div> 
               
                <label htmlFor="phone-no" className="mt-4 mb-2 block text-sm font-medium">Phone Number</label>
                <div className="">
                    <div className="relative">
                        <input type="text" id="phone-no" name="phone-no" className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="01x-xxxx-xxxx" />
                        <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                            <PhoneCall size={14} className="text-zinc-400"/>
                        </div>
                    </div>
                </div>
                <label htmlFor="message" className="mt-4 mb-2 block text-sm font-medium">Message</label>
                <div className="">
                    <div className="relative">
                        <input type="text" id="message" name="message" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Message" />
                        <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                        <MessageSquare size={16}  className="text-zinc-400"/>
                        </div>
                    </div>
                </div>

                <div className="mt-6 border-t border-b py-2">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">Subtotal</p>
                        <p className="font-semibold text-gray-900">$399.00</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">Shipping</p>
                        <p className="font-semibold text-gray-900">$8.00</p>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">Total</p>
                    <p className="text-2xl font-semibold text-gray-900">
                    </p>
                </div>
            </div>
            <button className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">Place Order</button>
        </div> </>
    )
}

export default CashOnDelivery;
