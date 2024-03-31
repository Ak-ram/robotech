import { getCustomerOrdersList } from "@/helpers/getCustomerOrdersLists";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { CourseType, Order, ProductType, transactionsType } from "../../type";
import FormattedPrice from "./FormattedPrice";

const CustomerOrdersList = ({ showOrdersList, setShowOrdersList, customerId }) => {
    const [courses, setCourses] = useState([]);
    const [products, setProducts] = useState([]);
    const [services, setServices] = useState([]);
    const [selected, setSelected] = useState("products");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const transactions = await getCustomerOrdersList(customerId);
                return transactions;
            } catch (err) {
                console.log(err);
            }
        };
        fetchOrders().then((data) => {
            const { courses, products, printServices } = data!.transactions;
            setCourses(courses);
            setProducts(products);
            setServices(printServices);
        });
    }, [customerId, showOrdersList]);

    const handleButtonClick = (type) => {
        setSelected(type);
    };

    const getSelectedData = () => {
        switch (selected) {
            case "products":
                return products;
            case "courses":
                return courses;
            case "services":
                return services;
            default:
                return [];
        }
    };

    return (
        <div
            className={`${showOrdersList ? "right-0" : "-right-full"} p-10 rounded-lg duration-500 transition-all absolute w-full bg-white h-full top-0`}
        >
            <X className="ml-auto cursor-pointer" onClick={() => setShowOrdersList(false)} />
            <section>
                <h3 className="font-bold text-2xl text-slate-600">Orders List</h3>
                <div className="flex items-center justify-evenly mt-5">
                    <button
                        className={`bg-slate-200 hover:bg-slate-300 focus:bg-slate-300 flex-1 h-18 inline-block px-8 py-5 font-bold text-black`}
                        onClick={() => handleButtonClick("products")}
                    >
                        Products
                    </button>
                    <button
                        className={`bg-slate-200 hover:bg-slate-300 focus:bg-slate-300 flex-1 h-18 inline-block px-8 py-5 font-bold text-black `}
                        onClick={() => handleButtonClick("courses")}
                    >
                        Courses
                    </button>
                    <button
                        className={`bg-slate-200 hover:bg-slate-300 focus:bg-slate-300 flex-1 h-18 inline-block px-8 py-5 font-bold text-black `}
                        onClick={() => handleButtonClick("services")}
                    >
                        Services
                    </button>
                </div>

                <div className="mt-5">
                    <ul>
                        {getSelectedData().length > 0 ? (
                            getSelectedData().map((item: Order, i) => (
                                <li key={`${item.productName}_${i}`} className="border-b py-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-bold">{item.productName}</h4>
                                            <p className="text-gray-500">Date: {item.date}</p>
                                        </div>

                                        <ul className="flex gap-2 items-center bg-gray-200 p-3 rounded text-sm">
                                            <li>Price: {item.piecePrice} EGP</li>
                                            <li>Quantity: {item.quantity}</li>
                                            <li>Discount: {item.discount}</li>
                                            <li>Subtotal: {item.subtotal}</li>
                                        </ul>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <li className="border-b py-4">No items</li>
                        )}
                    </ul>
                </div>
            </section>
        </div>
    );
};

export default CustomerOrdersList;