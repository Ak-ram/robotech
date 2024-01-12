import { useRef, useState } from "react";
import emailjs from '@emailjs/browser'
import toast, { Toaster } from "react-hot-toast";
import FormattedPrice from "./FormattedPrice";
const CashOnDelivery = ({ totalAmt,isCashOnDeliveryOpened, setCashOnDeliveryOpened }) => {
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


    return (<div
        className={`${isCashOnDeliveryOpened ? "flex" : "hidden"
            } w-full h-full top-0 left-0 flex items-center justify-center backdrop-blur-2xl fixed mt-8 lg:m-0 items-center justify-center bg-gray-100`}
    ><div className="flex min-h-screen w-screen w-full items-center justify-center text-gray-600 bg-gray-50">
            <div className="relative">

                <div className="hidden sm:block h-56 w-56 text-indigo-300 absolute a-z-10 -left-20 -top-20">
                    <svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='40' height='40' patternTransform='scale(0.6) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='none' /><path d='M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5' stroke-width='1' stroke='none' fill='currentColor' /></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(#a)' /></svg>
                </div>
                <div className="hidden sm:block h-28 w-28 text-indigo-300 absolute a-z-10 -right-20 -bottom-20">
                    <svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='b' patternUnits='userSpaceOnUse' width='40' height='40' patternTransform='scale(0.5) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='none' /><path d='M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5' stroke-width='1' stroke='none' fill='currentColor' /></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(#b)' /></svg>
                </div>
                <div className="relative flex flex-col sm:w-[30rem] rounded-lg border-gray-400 bg-white shadow-lg px-4">
                    <div className="flex-auto p-6">
                        <div className="relative mb-10 flex flex-shrink-0 flex-grow-0 items-center justify-center overflow-hidden">
                            <a href="#" className="mt-5 flex cursor-pointer items-center gap-2 text-indigo-500 no-underline hover:text-indigo-500">
                                <span className="flex-shrink-0 text-3xl font-black tracking-tight opacity-100">Robotech Space</span>
                            </a>
                            <button className="absolute right-1" onClick={() => setCashOnDeliveryOpened(false)}>
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
                        <h4 className="mb-2 font-medium text-gray-700 xl:text-xl">Total Price: <FormattedPrice amount={totalAmt}/></h4>
                        <p className="mb-6 text-gray-500">Kindly share your information to finalize the payment process.</p>

                        <form ref={formElement} onSubmit={sendEmail} className="mb-4">
                            <div className="mb-4">
                                <label htmlFor="name" className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">Your Name</label>
                                <input value={clientName} name='client_name'
                                    onChange={handleNameChange} type="text" className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow" id="name" placeholder="Enter your name" />
                            </div>
                            <div className="mb-4">
                                <div className="flex justify-between">
                                    <label className="mb-2 inline-block text-xs font-medium uppercase text-gray-700" htmlFor="phoneNumber">Phone Number</label>

                                </div>
                                <div className="relative flex w-full flex-wrap items-stretch">
                                    <input value={phone}
                                        name="client_phone"
                                        onChange={handlePhoneChange} type="tel" id="phoneNumber" className="relative block flex-auto cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow" placeholder="01XXXXXXXXX" />
                                </div>
                            </div>
                            <div className="mb-4">
                                <div className="flex justify-between">
                                    <label className="mb-2 inline-block text-xs font-medium uppercase text-gray-700" htmlFor="clientMessage">Message</label>

                                </div>
                                <div className="relative flex w-full flex-wrap items-stretch">
                                    <input value={message}
                                        name="client_message"
                                        onChange={handleMessageChange} type="textarea" id="clientMessage" className="relative block flex-auto cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow" placeholder="Have any question?" />
                                </div>
                            </div>

                            <div className="mb-4">
                                <button onClick={sendEmail} className="grid w-full cursor-pointer select-none rounded-md border border-indigo-500 bg-indigo-500 py-2 px-5 text-center align-middle text-sm text-white shadow hover:border-indigo-600 hover:bg-indigo-600 hover:text-white focus:border-indigo-600 focus:bg-indigo-600 focus:text-white focus:shadow-none" type="submit">Submit</button>
                            </div>
                        </form>

                        <p className="mb-4 text-center">
                            back to your
                            <span onClick={() => setCashOnDeliveryOpened(false)} className="cursor-pointer text-indigo-500 no-underline hover:text-indigo-500"> Cart Page</span>
                        </p>
                    </div>
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
    </div>)
}

export default CashOnDelivery;