const VodafoneCash = ({ isVodafoneCashOpened, setIsVodafoneCashOpened }) => {
    return (
        <>
            <div className={`${isVodafoneCashOpened ? "flex" : "hidden"} mt-8 lg:m-0 items-center justify-center bg-gray-100`}>
                <div className="flex w-[35rem] flex-col rounded-lg bg-white px-6 shadow-lg sm:px-14">
                    <div className="flex w-full justify-between self-start pt-5 lg:pt-12 pb-4 lg:pb-8">
                        <h2 className="font-serif font-semibold text-gray-700 lg:text-2xl">Follow these steps to pay with Vodafone Cash</h2>
                        <button onClick={() => setIsVodafoneCashOpened(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 cursor-pointer text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex w-full flex-col pb-8 pt-4">
                        <div className="relative mb-4">
                            <label className="flex cursor-pointer flex-col rounded-2xl border border-gray-300 bg-slate-100/80 p-4 pr-8 sm:pr-16">
                                <span className="mb-2 font-bold">Step 1</span>
                                <p className="text-sm sm:text-base">Take a screenshot of this page.</p>
                            </label>
                        </div>
                        <div className="relative mb-4">
                            <label className="flex cursor-pointer flex-col rounded-2xl border border-gray-300 bg-slate-100/80 p-4 pr-8 sm:pr-16">
                                <span className="mb-2 font-bold">Step 2</span>
                                <p className="text-sm sm:text-base">Send the total price to the following Vodafone Cash number: 01066745733</p>
                            </label>
                        </div>

                        <button className="my-2 rounded-md bg-gray-900 py-3 font-medium text-white">Contact us in whatsapp</button>

                    </div>
                </div>
            </div>
        </>

    )
}

export default VodafoneCash