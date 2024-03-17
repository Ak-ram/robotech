// import { useEffect, useState } from "react";
// import { fetchJsonData } from "@/helpers/getJSONData";
// import toast, { Toaster } from "react-hot-toast";
// import Link from 'next/link'
// import Bill from "./Bill";
// import { Edit, Eye, Trash, TrashIcon } from "lucide-react";
// import { searchItems } from "@/lib/utils";
// import supabase from "@/supabase/config";
// const AdminBills = () => {
//     const [jsonArray, setJsonArray] = useState<any[]>([]);
//     const [billsList, setBillsList] = useState<any[]>([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [showBill, setShowBill] = useState(false);
//     const [selectedBill, setSelectedBill] = useState<any>()


//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const { data } = await supabase.from('bills').select('');
//                 console.log(data)
//                 setJsonArray(data!);
//                 setBillsList(data!)
//             } catch (error) {
//                 console.log((error as Error).message);
//             }
//         };

//         fetchData();
//     }, []);



//     const openBill = (id) => {
//         const selected = jsonArray.find(bill => bill.id === id);
//         setSelectedBill(selected)
//         setShowBill(true)
//     }
//     const handleRemoveBill = async (id) => {
//         const confirm = window.confirm('Sure to Remove ?');
//         if (confirm) {
//             const index = billsList.findIndex(item => item.id === id);
//             if (index === -1) return; // Customer not found
//             const updatedArray = [...billsList];
//             updatedArray.splice(index, 1);

//             try {
//                 setBillsList(updatedArray)
//                 await supabase.from('bills')
//                     .delete()
//                     .eq('id', id);

//                 toast.success('Bill removed successfully')
//             } catch (error) {
//                 console.log(error)
//             }
//         }

//     }
//     return (
//         <div className={`min-h-[400px] lg:p-3 w-full bottom-0 left-0 lg:relative overflow-hidden mt-5`}>

//             {!jsonArray && <h2 className="font-bold mb-4">Current Customer data:</h2>}

//             <div className="mb-5 flex flex-col lg:flex-row items-center justify-between">
//                 <input
//                     type="text"
//                     placeholder="Search By Customer Name, Bill ID"
//                     className="text-black mb-2 p-2 border border-gray-300 rounded w-full lg:w-[60%] focus:outline-none focus:border-blue-500"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                 />

//             </div>
//             {billsList.length !== 0 ? (
//                 <div className={"flex flex-col gap-2"}>
//                     {billsList
//                        .searchItems(billsList,searchTerm,'id')
                       
//                        .map((item, index) => (
//                             <div
//                                 key={index}
//                                 className={`flex items-center justify-between border group hover:border-zinc-500 border-zinc-300 p-4 rounded-lg bg-white font-medium shadow-md transition-all duration-300 transform 
//                             `}
//                             >
//                                 <div className="flex flex-col gap-1 text-zinc-600">
//                                     <span>Customer Name: <span className="text-black">{item?.customerData?.fullName}</span></span>
//                                     <span>Bill ID:  <span className="text-blue-400">{item.id}</span> </span>
//                                 </div>
//                                 <div className="flex justify-end">
//                                     <button
//                                         className="flex gap-1 items-center  bg-blue-100 py-1 px-2 rounded text-blue-500 hover:text-blue-600 mr-2 transition-colors duration-300"
//                                         onClick={() => openBill(item.id)}                                    >
//                                         <Eye size={17} />    View
//                                     </button>
//                                     <button
//                                         className="flex gap-1 items-center bg-red-100 py-1 px-2 rounded text-red-500 hover:text-red-600 transition-colors duration-300"
//                                         onClick={() => handleRemoveBill(item.id)}
//                                     >
//                                         <TrashIcon size={17} />  Remove
//                                     </button>
//                                 </div>
//                             </div>
//                         ))
//                     }
//                 </div >
//             ) : <div className="bg-white h-[300px] flex items-center justify-center">
//                 <div className="text-center">
//                     <h2 className="text-xl font-semibold mb-4">Your Bills Should Goes here...</h2>
//                 </div>
//             </div>}

//             {showBill && <Bill id={selectedBill.id} setShowBill={setShowBill} transactionData={selectedBill.data} />
//             }
//             <Toaster
//                 position="bottom-right"
//                 toastOptions={{
//                     style: {
//                         background: "#000",
//                         color: "#fff",
//                     },
//                 }}
//             />
//         </div >
//     );

// };

// export default AdminBills;



import React, { useEffect, useState } from "react";
import { fetchJsonData } from "@/helpers/getJSONData";
import toast, { Toaster } from "react-hot-toast";
import Link from 'next/link'
import Bill from "./Bill";
import { Edit, Eye, Trash, TrashIcon } from "lucide-react";
import supabase from "@/supabase/config";

const AdminBills = () => {
    const [jsonArray, setJsonArray] = useState<any[]>([]);
    const [billsList, setBillsList] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('name');
    const [showBill, setShowBill] = useState(false);
    const [selectedBill, setSelectedBill] = useState<any>()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await supabase.from('bills').select('');
                console.log(data)
                setJsonArray(data!);
                setBillsList(data!)
            } catch (error) {
                console.log((error as Error).message);
            }
        };

        fetchData();
    }, []);

    const filterItems = (items: any[], searchTerm: string, searchType: string) => {
        return items.filter(item => {
            const term = searchTerm.toLowerCase();
            switch (searchType) {
                case 'name':
                    return item?.customerData?.fullName?.toLowerCase().includes(term);
                case 'phone':
                    return item?.customerData?.phone?.toLowerCase().includes(term);
                case 'id':
                    return item?.id === +term;
                default:
                    return false;
            }
        });
    }

    const handleSearch = () => {
        const filteredItems = filterItems(jsonArray, searchTerm, searchType);
        setBillsList(filteredItems);
    }

    const openBill = (id) => {
        const selected = jsonArray.find(bill => bill.id === id);
        setSelectedBill(selected)
        setShowBill(true)
    }

    const handleRemoveBill = async (id) => {
        const confirm = window.confirm('Sure to Remove ?');
        if (confirm) {
            const index = billsList.findIndex(item => item.id === id);
            if (index === -1) return; // Customer not found
            const updatedArray = [...billsList];
            updatedArray.splice(index, 1);

            try {
                setBillsList(updatedArray)
                await supabase.from('bills')
                    .delete()
                    .eq('id', id);

                toast.success('Bill removed successfully')
            } catch (error) {
                console.log(error)
            }
        }

    }

    return (
        <div className={`min-h-[400px] lg:p-3 w-full bottom-0 left-0 lg:relative overflow-hidden mt-5`}>

            {!jsonArray && <h2 className="font-bold mb-4">Current Customer data:</h2>}

            <div className="mb-5 flex flex-col lg:flex-row items-center justify-between">
                <input
                    type="text"
                    placeholder="Search By Customer Name, Bill ID"
                    className="text-black mb-2 p-2 border border-gray-300 rounded w-full lg:w-[60%] focus:outline-none focus:border-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="text-black mb-2 p-2 border border-gray-300 rounded lg:ml-3 focus:outline-none focus:border-blue-500"
                >
                    <option value="name">Name</option>
                    <option value="phone">Phone</option>
                    <option value="id">Bill ID</option>
                </select>
                <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Search</button>
            </div>
            {billsList.length !== 0 ? (
                <div className={"flex flex-col gap-2"}>
                    {billsList.map((item, index) => (
                        <div
                            key={index}
                            className={`flex items-center justify-between border group hover:border-zinc-500 border-zinc-300 p-4 rounded-lg bg-white font-medium shadow-md transition-all duration-300 transform 
                        `}
                        >
                            <div className="flex flex-col gap-1 text-zinc-600">
                                <span>Customer Name: <span className="text-black">{item?.customerData?.fullName}</span></span>
                                <span>Bill ID:  <span className="text-blue-400">{item.id}</span> </span>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    className="flex gap-1 items-center  bg-blue-100 py-1 px-2 rounded text-blue-500 hover:text-blue-600 mr-2 transition-colors duration-300"
                                    onClick={() => openBill(item.id)}                                    >
                                    <Eye size={17} />    View
                                </button>
                                <button
                                    className="flex gap-1 items-center bg-red-100 py-1 px-2 rounded text-red-500 hover:text-red-600 transition-colors duration-300"
                                    onClick={() => handleRemoveBill(item.id)}
                                >
                                    <TrashIcon size={17} />  Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white h-[300px] flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-xl font-semibold mb-4">Your Bills Should Goes here...</h2>
                    </div>
                </div>
            )}

            {showBill && <Bill id={selectedBill.id} setShowBill={setShowBill} transactionData={selectedBill.data} />}
            <Toaster
                position="bottom-right"
                toastOptions={{
                    style: {
                        background: "#000",
                        color: "#fff",
                    },
                }}
            />
        </div>
    );

};

export default AdminBills;
