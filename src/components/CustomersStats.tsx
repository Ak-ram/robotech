import React, { useEffect, useState } from "react";
import { getCustomerData } from "@/helpers/getCustomerData";
import { Activity, ArrowDown01, ArrowUp01, Clock, GitCommitHorizontal, LineChart, Link2Icon, LinkIcon, Search, Sparkle, X, Download, Ban, ChevronDown } from "lucide-react";
import FormattedPrice from "./FormattedPrice";
import Link from "next/link";
import CustomerStatsChart from "./CustomerStatsChart";
import { downloadJSON } from "@/helpers/downloadJsonfile";
import { getProducts } from "@/helpers/getProducts";
import TransactionAnalyzer from "./TransactionAnalyzer";
import CustomerStatsTopSelling from "./CustomerStatsTopSelling";
import CustomerStatsOutStocks from "./CustomerStatsOutStocks";
import CustomerStatsInStocks from "./CustomerStatsInStocks";
import Stocks from "./Stocks";
import CustomerStatsServicesData from "./CustomerStatsServicesData";

const CustomersStats = () => {
    const [isShow, setIsShow] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [show, setShow] = useState(false);

    const [customers, setCustomers] = useState<any[]>([]);
    const [highestTotalPurchase, setHighestTotalPurchase] = useState<number | null>(null);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesList = await getCustomerData();
                sortCustomers(categoriesList, sortOrder); // Initial sorting based on sortOrder

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        if (typeof window !== "undefined") {
            fetchData();
        }
    }, []);


    // Calculate the number of transactions for each customer
    const calculateNumberOfTransactions = (customerId: string): number => {
        const customer = customers.find((c) => c.id === customerId);
        return customer ? customer.transactions?.products?.length + customer.transactions?.courses?.length + customer.transactions?.printServices?.length : 0;
    };

    const filteredCategoryStats = customers.filter((customer) =>
        customer?.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const sortCustomers = (data: any[], order: "asc" | "desc") => {
        const sortedCustomers = [...data].sort((a, b) => {
            const compareValue = b.total_purchase_transactions - a.total_purchase_transactions;
            return order === "asc" ? compareValue : -compareValue;
        });

        // Find the customer with the highest total purchase after sorting
        const highestTotal = sortedCustomers.reduce((max, customer) => {
            return customer.total_purchase_transactions > max ? customer.total_purchase_transactions : max;
        }, 0);

        setHighestTotalPurchase(highestTotal);

        setCustomers(sortedCustomers);
    };

    const handleSortClick = () => {
        const newOrder = sortOrder === "asc" ? "desc" : "asc";
        setSortOrder(newOrder);
        sortCustomers(customers, newOrder);
    };


    const [searchQuery, setSearchQuery] = useState('');

    // Function to handle changes in the search query
    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };
    return (<>
        <section className='my-5'>

            <div className={`${isShow ? "block" : "hidden"} z-50 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center`}>
                <div className={`bg-white min-w-[40rem] p-8 rounded-lg shadow-md`}>

                    <div className="flex-1 "> <X className="ml-auto cursor-pointer" onClick={() => setIsShow(false)} />
                        {/* <ApexChartComp categoryStats={categoryStats} /> */}

                        <CustomerStatsChart customers={customers} />
                    </div>
                </div>


            </div>



            <CustomerStatsTopSelling customers={customers} />







            <div className="flex flex-col">
                <Stocks />
                <CustomerStatsServicesData />
                <div className={`${!show ? "border border-blue-300 border-dashed" : ""} bg-white rounded-lg mb-5 overflow-hidden`}>
                <div
                    className="flex items-center p-5 justify-between cursor-pointer"
                    onClick={() => setShow(!show)}
                >
                    <h3 className="transform  transition-transform duration-500 font-semibold text-blue-400">
                        {show ? "Click to Collapse" : "Expand Customer Data"}
                    </h3>
                    <ChevronDown
                        className={`transform text-blue-300 transition-transform duration-300 ${show ? "rotate-180" : ""
                            }`}
                        size={25}
                    />
                </div>
                {show && 
                <div className="p-5 my-2 align-middle">
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
                            <div className="flex items-center gap-1">
<span className="text-white text-xs">{filteredCategoryStats?.length} Customer</span>
                                <span className="text-slate-400 hover:text-white cursor-pointer py-1 rounded w-10 h-10 flex items-center justify-center  hover:bg-gray-700 block" onClick={handleSortClick}>
                                    {sortOrder === "asc" ? <ArrowDown01 /> : <ArrowUp01 />}

                                </span>

                                <span onClick={() => setIsShow(true)} className="text-slate-400 hover:text-white cursor-pointer py-1 rounded w-10 h-10 flex items-center justify-center  hover:bg-gray-700 block">

                                    <LineChart className="" />
                                </span>
                                <span onClick={() => downloadJSON(`${process.env.NEXT_PUBLIC_GITHUB_PROFILE}/api/robotech/pages/customers.json`, 'customers.json')} className="text-slate-400 hover:text-black cursor-pointer py-1 rounded w-10 h-10 flex items-center justify-center hover:bg-slate-200 block">
                                    <Download className="" />
                                </span>
                            </div>
                        </div>
                        <div className="w-full max-h-[400px] overflow-auto">
                            <div className="bg-gray-800 uppercase text-gray-400">
                                <div className="flex">
                                    <div className="p-3 flex-1 text-left text-sm tracking-wider">Name</div>
                                    <div className="p-3 w-1/6 text-left text-sm tracking-wider">Phone</div>
                                    <div className="p-3 w-1/6 text-left text-sm tracking-wider"># Transactions</div>
                                    <div className="p-3 w-1/6 text-left text-sm tracking-wider">TPT</div>
                                    <div className="p-3 w-1/6 text-left text-sm tracking-wider">Link</div>

                                </div>
                            </div>
                            <div className="bg-gray-800 text-white">
                                {filteredCategoryStats.map((customerInfo, index) => (
                                    <div key={index} className="flex hover:bg-opacity-50 bg-black bg-opacity-20">
                                        <div className="p-3 flex gap-2 flex-1 whitespace-nowrap">
                                            {highestTotalPurchase === customerInfo.total_purchase_transactions && (
                                                <span title="عميل مميز - الاكثر شراء">
                                                    <Sparkle className="mt-1 text-yellow-500 mr-2 animate-pulse" size={20} />
                                                </span>
                                            )}
                                            {calculateNumberOfTransactions(customerInfo.id) > 1 && (
                                                <span title="عميل متكرر">
                                                    <Activity className="mt-1 text-green-500 mr-2 animate-pulse" size={20} />
                                                </span>
                                            )}
                                            {calculateNumberOfTransactions(customerInfo.id) === 1 && (
                                                <span title="عميل عابر">
                                                    <GitCommitHorizontal className="mt-1 text-rose-500 mr-2 animate-pulse" size={20} />
                                                </span>
                                            )}
                                            {calculateNumberOfTransactions(customerInfo.id) === 0 && (
                                                <span title="عميل محتمل">
                                                    <Clock className="mt-1 text-slate-500 mr-2 animate-pulse" size={20} />
                                                </span>
                                            )}
                                            <span className="font-medium">{customerInfo.fullName}</span>
                                        </div>
                                        <div className="p-3 w-1/6 whitespace-nowrap">{customerInfo.phone}</div>
                                        <div className="p-3 w-1/6 whitespace-nowrap">
                                            {calculateNumberOfTransactions(customerInfo.id)}
                                        </div>
                                        <div className="p-3 w-1/6 whitespace-nowrap">
                                            <FormattedPrice amount={customerInfo.total_purchase_transactions} />
                                        </div>
                                        <div className="p-3 w-1/6 whitespace-nowrap">
                                            <Link href={{ pathname: `admin/id_${customerInfo?.id}`, query: { id: customerInfo?.id, data: JSON.stringify(customerInfo) } }}>
                                                <LinkIcon />
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>


                    </div>

                </div>
                }
</div>
            </div>

            {/* Display additional statistics */}
            <div className="mt-4">
                <TransactionAnalyzer customers={customers} />

            </div>
        </section>
    </>)
}

export default CustomersStats
