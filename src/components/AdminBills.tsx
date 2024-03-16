import { useEffect, useState } from "react";
import { fetchJsonData } from "@/helpers/getJSONData";
import toast, { Toaster } from "react-hot-toast";
import Link from 'next/link'
import Bill from "./Bill";
const AdminBills = () => {
    const [jsonArray, setJsonArray] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showBill, setShowBill] = useState(false);
    const [selectedBill, setSelectedBill] = useState<any>()


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchJsonData("robotech/pages/bills.json");
                setJsonArray(data);
            } catch (error) {
                console.log((error as Error).message);
            }
        };

        fetchData();
    }, []);



    const openBill = (id) => {
        const selected = jsonArray.find(bill => bill.id === id);
        setSelectedBill(selected.data)
        setShowBill(true)
    }
    return (
        <div className={`min-h-[400px] lg:p-3 w-full bottom-0 left-0 lg:relative overflow-hidden mt-5`}>

            {!jsonArray && <h2 className="font-bold mb-4">Current Customer data:</h2>}

            <div className="mb-5 flex flex-col lg:flex-row items-center justify-between">
                <input
                    type="text"
                    placeholder="Search By Name, Phone"
                    className="text-black mb-2 p-2 border border-gray-300 rounded w-full lg:w-[60%] focus:outline-none focus:border-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

            </div>
            {jsonArray.length !== 0 ? (
                <div className={"flex flex-col gap-2"}>
                    {jsonArray

                        .map((item, index) => (
                            <div
                                key={index}
                                onClick={() => openBill(item.id)}
                                className={`border group cursor-pointer hover:border-zinc-500 border-zinc-300 p-4 rounded-lg bg-white font-medium shadow-md transition-all duration-300 transform 
                            `}
                            >
                                Bill ID: <span className="text-blue-400 group-hover:underline"> {item.id} </span>

                            </div>
                        ))
                    }
                </div >
            ) : <div className="bg-white h-[300px] flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-semibold mb-4">Your Bills Should Goes here...</h2>
                </div>
            </div>}

            {showBill && <Bill setShowBill={setShowBill} transactionData={selectedBill} />
            }
            <Toaster
                position="bottom-right"
                toastOptions={{
                    style: {
                        background: "#000",
                        color: "#fff",
                    },
                }}
            />
        </div >
    );

};

export default AdminBills;