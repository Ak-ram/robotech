import { X } from "lucide-react"

const Bill = ({ transactionData,setShowBill }) => {
    return (<>
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white max-h-[700px] overflow-auto min-w-[600px] p-8 rounded-lg shadow-md">
<X className="cursor-pointer ml-auto" onClick={()=> setShowBill(false)} />
                <div className="p-4">
                    <h2 className="text-lg font-bold mb-4">Bill Details</h2>
                    <p>Transaction date: {transactionData["date"]}</p>
                    <p>Course name: {transactionData["CourseName"]}</p>

                </div>

            </div>
        </div>
    </>)
}

export default Bill