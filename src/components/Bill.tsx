import React, { useState } from "react";
import { DoorClosed, Eraser, Printer, X } from "lucide-react";
import DetailedLogo from '@/assets/DetailedLogo.png';
import Image from "next/image";
import FormattedPrice from "./FormattedPrice";
import toast from "react-hot-toast";

interface TransactionData {
  productName: string;
  quantity: number;
  date: string;
  discount: number;
  piecePrice: number;
  subtotal: number;
}

interface BillProps {
  setBillData?: (data: TransactionData[]) => void;
  id?: string;
  transactionData: TransactionData[];
  setShowBill: React.Dispatch<React.SetStateAction<boolean>>;
}

const Bill: React.FC<BillProps> = ({
  setBillData = () => { },
  transactionData,
  setShowBill,
  id
}) => {
  // Add your company data
  const companyData = {
    name: "Robotech Space",
    address: "In front of Alex Bank, Beni Suef",
    phone: "01102071544"
  };

  const [printMode, setPrintMode] = useState(false);

  // Calculate total amount
  const totalAmount = transactionData.reduce(
    (total, transaction) => total + transaction.subtotal,
    0
  );
  const dating = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  const handlePrint = () => {
    setPrintMode(true);
    setTimeout(() => {
      window.print();
      setPrintMode(false);
      setBillData([]);
      setShowBill(false);
    }, 100);
  };

  return (
    <>

      <div  className="printContainer overflow-hidden fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white w-full max-w-screen-md mx-auto p-6 md:p-8 rounded-lg">
          {!printMode && (
            <div className="hide-when-printing flex items-center justify-between">
              <X
                className="cursor-pointer ml-auto text-gray-600"
                size="24"
                onClick={() => {
                  setShowBill(false);
                }}
              />
            </div>
          )}
          <div className="">
            {/* Logo and Company Information */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <Image
                  className="mr-2 w-44"
                  src={DetailedLogo}
                  alt="Company Logo"
                  width={70}
                  height={70}
                />
                {/* <span className="font-bold text-lg">{companyData.name}</span> */}
                {/* <p>{companyData.address}</p> */}
                {/* <p>{companyData.phone}</p> */}
              </div>
              <div className="text-right">
                ID: {id}
              </div>
            </div>

            {/* Invoice Details */}
            <div className="mb-4">
              <h2 className="text-xl font-bold mb-2">Invoice</h2>
              <span className="mb-2 block font-medium text-sm">{dating}</span>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 text-sm text-left">Product Name</th>
                    <th className="p-3 text-sm text-left">Quantity</th>
                    <th className="p-3 text-sm text-left">Piece Price</th>
                    <th className="p-3 text-sm text-left">Discount</th>
                    <th className="p-3 text-sm text-left">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {transactionData.map((transaction, index) => (
                    <tr key={index} className="border-b">
                      <td className="text-sm p-3">{transaction.productName}</td>
                      <td className="text-sm p-3">{transaction.quantity}</td>
                      <td className="text-sm p-3">
                        <FormattedPrice amount={transaction.piecePrice} />
                      </td>
                      <td className="text-sm p-3">
                        <FormattedPrice amount={transaction.discount} />
                      </td>
                      <td className="text-sm p-3">
                        <FormattedPrice amount={transaction.subtotal} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total Amount */}
            <div className="border-t border-gray-300 py-4">
              <p className="font-bold">
                Total Amount: <FormattedPrice amount={totalAmount} />
              </p>
            </div>

            {/* Signature Section */}
            <div className="mt-6 mb-10">
              <h3 className="text-lg font-bold mb-2">Signatures</h3>
              <div className="flex justify-between">
                <div>
                  <p>Customer&rsquo;s Signature:</p>
                  {/* Add a signature line or space for the customer to sign */}
                </div>
                <div>
                  <p>{companyData.name} Signature:</p>
                  {/* Add a signature line or space for your company to sign */}
                </div>
              </div>
            </div>

            <button
              className={`hide-when-printing py-3 justify-center flex items-center gap-2 mt-auto px-5 rounded focus:outline-none bg-blue-200 text-blue-700 hover:bg-blue-500 hover:text-white transition duration-300`}
              onClick={handlePrint}
            >
              Print
              <Printer className="" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bill;