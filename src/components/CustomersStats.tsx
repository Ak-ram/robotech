import React, { useEffect, useState } from "react";
import { getCustomerData } from "@/helpers/getCustomerData";
import { Activity, Briefcase, Book, ArrowDown01, ArrowUp01, Clock, GitCommitHorizontal, LineChart, Link2Icon, LinkIcon, Search, Sparkle, X, Download } from "lucide-react";
import FormattedPrice from "./FormattedPrice";
import Link from "next/link";
import CustomerStatsChart from "./CustomerStatsChart";
import { downloadJSON } from "@/helpers/downloadJsonfile";

const CustomersStats = () => {
    const [isShow, setIsShow] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState("");
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

    useEffect(() => {
        console.log(customers);
    }, [customers]);
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

    const getMostSellingProduct = () => {
        const productMap = new Map();
        customers.forEach((customer) => {
            customer.transactions.products.forEach((product) => {
                const { productName, quantity } = product;
                if (productMap.has(productName)) {
                    productMap.set(productName, productMap.get(productName) + quantity);
                } else {
                    productMap.set(productName, quantity);
                }
            });
        });

        let mostSellingProduct = '';
        let maxQuantity = 0;

        productMap.forEach((quantity, productName) => {
            if (quantity > maxQuantity) {
                maxQuantity = quantity;
                mostSellingProduct = productName;
            }
        });

        return { mostSellingProduct, sellingTimes: maxQuantity };
    };
    const getMostSellingService = () => {
        const serviceMap = new Map();
        customers.forEach((customer) => {
            customer.transactions.printServices.forEach((service) => {
                const { productName, quantity } = service;
                if (serviceMap.has(productName)) {
                    serviceMap.set(productName, serviceMap.get(productName) + quantity);
                } else {
                    serviceMap.set(productName, quantity);
                }
            });
        });

        let mostSellingService = '';
        let maxQuantity = 0;

        serviceMap.forEach((quantity, serviceName) => {
            if (quantity > maxQuantity) {
                maxQuantity = quantity;
                mostSellingService = serviceName;
            }
        });

        return { mostSellingService, sellingTimes: maxQuantity };
    };
    const getMostSellingCourse = () => {
        const courseMap = new Map();
        customers.forEach((customer) => {
            customer.transactions.courses.forEach((course) => {
                const { productName, quantity } = course;
                if (courseMap.has(productName)) {
                    courseMap.set(productName, courseMap.get(productName) + quantity);
                } else {
                    courseMap.set(productName, quantity);
                }
            });
        });

        let mostSellingCourse = '';
        let maxQuantity = 0;

        courseMap.forEach((quantity, courseName) => {
            if (quantity > maxQuantity) {
                maxQuantity = quantity;
                mostSellingCourse = courseName;
            }
        });

        return { mostSellingCourse, sellingTimes: maxQuantity };
    };
    const mostSellingProductData = getMostSellingProduct();
    const mostSellingServiceData = getMostSellingService();
    const mostSellingCourseData = getMostSellingCourse();
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
            <div className="flex flex-col">

                <div className="bg-white my-5 p-6 rounded-lg shadow-md animate-fade-in">
                    {/* Top Selling Heading */}
                    <h2 className="text-2xl font-semibold mb-6 flex items-center justify-center bg-blue-100 py-2 px-4 rounded-md">
                        <Activity className="mr-2 text-blue-500" size={24} /> Top Selling
                    </h2>

                    {/* Top Selling Product */}
                    <div className="mb-3 py-3 px-4 rounded-md">
                        <h3 className="text-lg font-semibold mb-3 flex items-center">
                            <Briefcase className="mr-2 text-yellow-500" size={20} /> Product:
                        </h3>
                        <div className="flex items-center justify-between border-b border-gray-300 py-2">
                            <div className="pl-3">{mostSellingProductData.mostSellingProduct}</div>
                            <div className="text-zinc-500 font-semibold">
                                Sold {mostSellingProductData.sellingTimes} times
                            </div>
                        </div>
                    </div>

                    {/* Top Selling Service */}
                    <div className="mb-3  py-3 px-4 rounded-md">
                        <h3 className="text-lg font-semibold mb-3 flex items-center">
                            <Briefcase className="mr-2 text-yellow-500" size={20} /> Service:
                        </h3>
                        <div className="flex items-center justify-between border-b border-gray-300 py-2">
                            <div className="pl-3">{mostSellingServiceData.mostSellingService}</div>
                            <div className="text-zinc-500 font-semibold">
                                Sold {mostSellingServiceData.sellingTimes} times
                            </div>
                        </div>
                    </div>

                    {/* Top Selling Course */}
                    <div className=" py-3 px-4 rounded-md">
                        <h3 className="text-lg font-semibold mb-3 flex items-center">
                            <Book className="mr-2 text-purple-500" size={20} /> Course:
                        </h3>
                        <div className="flex items-center justify-between border-b border-gray-300 py-2">
                            <div className="pl-3">{mostSellingCourseData.mostSellingCourse}</div>
                            <div className="text-zinc-500 font-semibold">
                                Sold {mostSellingCourseData.sellingTimes} times
                            </div>
                        </div>
                    </div>
                </div>


                <h1 className="text-xl text-gray-950 font-medium mb-3 text-center">Customers Stats</h1>

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
                            <div className="flex items-center gap-1">

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
                        <table className="w-full text-gray-400">
                            <thead className="bg-gray-800 uppercase">
                                <tr>
                                    <th className="p-3 text-left text-sm tracking-wider">Name</th>
                                    <th className="p-3 text-left text-sm tracking-wider">Phone</th>
                                    <th className="p-3 text-left text-sm tracking-wider"># Transactions</th>
                                    <th className="p-3 text-left text-sm tracking-wider">TPT</th>
                                    <th className="p-3 text-left text-sm tracking-wider"></th>
                                    <th className="p-3 text-left text-sm tracking-wider"></th>
                                </tr>
                            </thead>
                            <tbody className="bg-gray-800">
                                {filteredCategoryStats.map((customerInfo, index) => (
                                    <tr key={index} className="hover:bg-opacity-50 bg-black bg-opacity-20">
                                        <td className="pl-3 flex py-2.5 whitespace-nowrap">
                                            {highestTotalPurchase === customerInfo.total_purchase_transactions && <span title="عميل مميز - الاكثر شراء"><Sparkle className="mt-1 text-yellow-500 mr-2 animate-pulse" size={20} /></span>}
                                            {calculateNumberOfTransactions(customerInfo.id) > 3 && <span title="عميل متكرر"><Activity className="mt-1 text-green-500 mr-2 animate-pulse" size={20} /></span>}
                                            {calculateNumberOfTransactions(customerInfo.id) === 1 && <span title="عميل عابر"><GitCommitHorizontal className="mt-1 text-rose-500 mr-2 animate-pulse" size={20} /></span>}
                                            {calculateNumberOfTransactions(customerInfo.id) === 0 && <span title="عميل محتمل"><Clock className="mt-1 text-slate-500 mr-2 animate-pulse" size={20} /></span>}
                                            <span className="font-medium">{customerInfo.fullName}</span>
                                        </td>
                                        <td className="py-2.5 whitespace-nowrap">{customerInfo.phone}</td>
                                        <td className="py-2.5 text-center whitespace-nowrap">
                                            {calculateNumberOfTransactions(customerInfo.id)}

                                        </td>
                                        <td className="py-2.5 whitespace-nowrap">
                                            <FormattedPrice amount={customerInfo.total_purchase_transactions} />
                                        </td>
                                        <td className="py-2.5 whitespace-nowrap">
                                            <Link href={{
                                                pathname: `admin/id_${customerInfo?.id}`,
                                                query: {
                                                    id: customerInfo?.id,
                                                    data: JSON.stringify(customerInfo)
                                                },
                                            }}>
                                                <LinkIcon />
                                            </Link>
                                        </td>
                                        <td className="py-2.5 whitespace-nowrap"></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>


                    </div>

                </div>

            </div>

            {/* Display additional statistics */}
            <div className="mt-4">
            </div>
        </section>
    </>)
}

export default CustomersStats
