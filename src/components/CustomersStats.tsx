import { getCustomerData } from "@/helpers/getCustomerData";
import { LineChart, Search, X } from "lucide-react"
import { useEffect, useState } from "react";
import FormattedPrice from "./FormattedPrice";

const CustomersStats = () => {
    const [isShow, setIsShow] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [customers, setCustomers] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesList = await getCustomerData();
                setCustomers(categoriesList);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        if (typeof window !== "undefined") {
            fetchData();
        }
    }, []);

    useEffect(() => {
        console.log(customers);
    }, [customers]);
    const filteredCategoryStats = customers.filter((customer) =>
        customer?.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (<>
        <section className=''>
            <h1 className="text-lg text-gray-950 font-medium mb-3 text-center">Customers Stats</h1>

            <div className={`${isShow ? "block" : "hidden"} z-50 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center`}>
                <div className={`bg-white min-w-[40rem] p-8 rounded-lg shadow-md`}>
                    <div className="flex-1"> <X className="cursor-pointer" onClick={() => setIsShow(false)} />
                        {/* <ApexChartComp categoryStats={categoryStats} /> */}
                    </div>
                </div></div>
            <div className="flex justify-start gap-2 ">
                <div className="flex flex-col">

                    <div className="py-2 -my-2 align-middle">
                        <div className="shadow overflow-hidden sm:rounded-lg">
                            <div className="flex justify-between items-center gap-2 bg-gray-800 p-3 border-b  border-gray-700">

                                <span className="relative">
                                    <Search className="w-5 h-5 text-gray-500 absolute top-2 right-3" />
                                    <input
                                        type="text"
                                        placeholder="Search by category"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-2 pr-10 py-1 border border-gray-700 rounded bg-gray-800 text-gray-300 focus:outline-none focus:border-blue-500"
                                    />

                                </span>
                                <span onClick={() => setIsShow(true)} className="text-slate-400 hover:text-white cursor-pointer py-1 rounded w-10 h-10 flex items-center justify-center  hover:bg-gray-700 block">

                                    <LineChart className="" />
                                </span>

                            </div>
                            <table className="text-sm w-full text-gray-400">
                                <thead className="bg-gray-800  uppercase ">
                                    <tr className="">
                                        <th scope="col" className="text-sm p-3 text-left tracking-wider">
                                            Name
                                        </th>
                                        <th scope="col" className="text-sm  p-3 text-left tracking-wider">
                                            Phone
                                        </th>
                                        <th scope="col" className="text-sm p-3 text-left tracking-wider">
                                            TPT
                                        </th>
                                        <th scope="col" className="text-sm p-3 text-left tracking-wider">
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-gray-800">
                                    {filteredCategoryStats.map((customerInfo, index) => (
                                        <tr key={index} className=" bg-black bg-opacity-20 ">
                                            <td className="text-center pl-3   flex  py-2.5 whitespace-nowrap">
                                                <span className=" font-medium">{customerInfo.fullName.slice(0, 1).toUpperCase() + customerInfo.fullName.slice(1,)}</span>
                                            </td>
                                            <td className="text-center    py-2.5 whitespace-nowrap">{customerInfo.phone}</td>
                                            <td className="text-center    py-2.5 whitespace-nowrap">
                                                <FormattedPrice className="" amount={customerInfo.total_purchase_transactions} />
                                            </td>
                                            <td className="text-center    py-2.5 whitespace-nowrap">

                                            </td>

                                        </tr>
                                    ))}

                                </tbody>
                            </table>

                        </div>

                    </div></div>
                <section className="rounded-lg min-w-[40%] min-w-[40%]  gap-3 flex p-5 bg-gray-800">
                    <div className="flex justify-center flex-col gap-3 flex-1">
                        <div className="h-28 border border-blue-400 flex flex-col items-center gap-3 justify-center bg-gray-700 rounded">
                            <span className="text-2xl text-blue-400  font-bold"> </span>
                            <span className="text-center text-blue-200">اجمالى المنتجات</span>
                        </div>
                        <div className="h-28 border border-yellow-400 flex flex-col items-center gap-3 justify-center bg-gray-700 rounded">
                            <span className="text-2xl text-yellow-400  font-bold">
                                1   </span>
                            <span className="text-center text-yellow-200">عدد المنتجات المتاحة</span>
                        </div>
                        <div className="h-28 border border-red-400 flex flex-col items-center gap-3 justify-center bg-gray-700 rounded">
                            <span className="text-2xl text-red-400  font-bold">  </span>
                            <span className="text-center text-red-200">عدد المنتجات الغير المتاحة</span>
                        </div>
                    </div>
                    <div className="flex py-2 justify-center flex-col gap-3 flex-1">
                        <div className="h-28 border border-green-400 flex flex-col items-center gap-3 justify-center bg-gray-700 rounded">
                            <span className="text-2xl text-green-400  font-bold">  </span>
                            <span className="text-center text-green-200">اجمالى سعر البضاعه المعروضة</span>
                        </div>
                        <div className="h-28 bg-gray-700 text-white rounded">2</div>
                        <div className="flex-1 border border-green-400 flex flex-col items-center gap-3 justify-center bg-gray-700 rounded">
                            <span className="text-2xl text-green-400  font-bold"> </span>
                            <span className="text-center text-green-200">اجمالى سعر البضاعه الغير متاحه</span>
                        </div>

                    </div>
                </section>
            </div>
        </section>
    </>)
}

export default CustomersStats
