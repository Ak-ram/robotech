import { getCustomerOrdersList } from "@/helpers/getCustomerOrdersLists";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { CourseType, Order, ProductType, transactionsType } from "../../type";
import FormattedPrice from "./FormattedPrice";

const CustomerOrdersList = ({
  showOrdersList,
  setShowOrdersList,
  customerId,
}) => {
  const [customerBills, setCustomerBills] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const bills = await getCustomerOrdersList(customerId);
        return bills;
      } catch (err) {
        console.log(err);
      }
    };
    fetchOrders().then((data) => {
      console.log("customer list of bills", data!);
      let list = [];
      data!.map((item) => {
        list.push(item.data);
      });
      setCustomerBills(list);
    });
  }, [customerId, showOrdersList]);

  return (
    <div
      className={`${showOrdersList ? "right-0" : "-right-full"} p-10 rounded-lg duration-500 transition-all absolute w-full bg-white h-full top-0`}
    >
      <X
        className="ml-auto cursor-pointer"
        onClick={() => setShowOrdersList(false)}
      />
      <section>
        <h3 className="font-bold text-2xl text-slate-600">Orders List</h3>

        <div className="mt-5">
          <ul>
            {customerBills.length > 0 ? (
              customerBills.map((item: Order, i) => (
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
