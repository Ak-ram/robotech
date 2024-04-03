import { getCustomerOrdersList } from "@/helpers/getCustomerOrdersLists";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Bill, CourseType, ProductType, transactionsType } from "../../type";
import FormattedPrice from "./FormattedPrice";
import { formatDate } from "@/lib/utils";

const CustomerOrdersList = ({
  showOrdersList,
  setShowOrdersList,
  customerId,
}) => {
  const [customerBills, setCustomerBills] = useState<Bill[]>([]); // for fetching customer bills();

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
      data!.map((item: Bill) => {
        list.push(item);
      });
      setCustomerBills(list);
    });
  }, [customerId, showOrdersList]);

  return (
    <div
      className={`${showOrdersList ? "right-0" : "-right-full"} overflow-auto flex flex-col p-10 rounded-lg duration-500 transition-all absolute w-full bg-white h-full top-0`}
    >
      <div className="">
        <X
          className="ml-auto cursor-pointer"
          onClick={() => setShowOrdersList(false)}
        />
      </div>
      <section className="flex-1 flex flex-col">
        <h3 className="font-bold text-2xl text-slate-600">Orders List</h3>

        <div className="mt-5 flex-1">
          <ul>
            {customerBills.length > 0 ? (
              customerBills.map(({ created_at, data, id }: Bill, i) => (
                <li key={`${id}_${i}`} className="border-b py-4">
                  <div className="flex items-center justify-between ">
                    <div>
                      <h4 className="font-bold">Bill Id: #{id}</h4>
                      <p className="text-gray-500">
                        Date: {formatDate(created_at)}
                      </p>
                    </div>
                    <div className="flex  max-h-[200px] overflow-y-auto flex-col w-[90%] gap-2">
                      {data.map(
                        (
                          {
                            piecePrice,
                            quantity,
                            discount,
                            subtotal,
                            productName,
                          },
                          j,
                        ) => (
                          <ul
                            key={`${id}_${j}_${piecePrice}`}
                            className="flex ml-auto overflow-y-hidden overflow-x-auto whitespace-nowrap w-[60%] gap-2 items-center bg-gray-200 p-3 rounded text-sm"
                          >
                            <li>Title: {productName}</li>
                            <li>Price: {piecePrice} EGP</li>
                            <li>Quantity: {quantity}</li>
                            <li>Discount: {discount}</li>
                            <li>Subtotal: {subtotal}</li>
                          </ul>
                        ),
                      )}
                    </div>
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
