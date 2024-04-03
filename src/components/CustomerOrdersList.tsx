import { getCustomerOrdersList } from "@/helpers/getCustomerOrdersLists";
import { DotIcon, X } from "lucide-react";
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
  const [totalPrice, setTotalPrice] = useState<number>(0);

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
  useEffect(() => {
    // Calculate total price when customerBills change
    const calculateTotalPrice = () => {
      let totalPrice = 0;
      customerBills.forEach((bill) => {
        bill.data.forEach((transaction) => {
          totalPrice += transaction.subtotal;
        });
      });
      setTotalPrice(totalPrice);
    };

    calculateTotalPrice();
  }, [customerBills]);

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
        <h3 className="text-slate-600 flex items-center">
          <span className="font-bold text-2xl mr-3 "> Orders List</span>
          <div className="flex items-center bg-green-100 p-2 px-3 rounded text-green-900">
            <span className="mt-1 mr-2">
              <DotIcon size={7} className="rounded-full bg-green-500" />
            </span>
            ( <FormattedPrice amount={totalPrice} />)
            <span className="mx-2">for</span>
            <span>({customerBills.length}) Bills</span>
            {/* <span className="ml-3">
             {customerBills.length === 0
              ? "عميل محتمل"
                ? customerBills.length <= 3
                ? "عميل عابر"

                  : "عميل متردد"
              }
          </span>*/}
          </div>
        </h3>

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
