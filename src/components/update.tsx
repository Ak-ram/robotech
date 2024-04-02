import supabase from "@/supabase/config";
import { useEffect, useState } from "react";
import { BillType } from "../../type";
const TransactionAnalyzer = () => {
  const [bills, setBills] = useState<BillType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from("bills").select("*");
      setBills((data as BillType[])!);
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto">
      {bills.map((bill) => (
        <div key={bill.id} className="my-4 p-4 border border-gray-300">
          <h2 className="text-lg font-bold mb-2">Bill ID: {bill.id}</h2>
          <p className="text-gray-600 mb-2">Created At: {bill.created_at}</p>
          <div className="mb-4">
            <h3 className="text-md font-semibold mb-2">Data:</h3>
            {bill.data.map((item) => (
              <div key={item.productId} className="flex mb-2">
                <p className="w-1/3">Product Name: {item.productName}</p>
                <p className="w-1/3">Quantity: {item.quantity}</p>
                <p className="w-1/3">Subtotal: {item.subtotal}</p>
              </div>
            ))}
          </div>
          <div>
            <h3 className="text-md font-semibold mb-2">Customer Data:</h3>
            <p>Customer ID: {bill.customerData.id}</p>
            <p>Phone: {bill.customerData.phone}</p>
            <p>Address: {bill.customerData.address}</p>
            <p>Full Name: {bill.customerData.fullName}</p>
            <p>Join Date: {bill.customerData.join_date}</p>
            <div>
              <h4 className="text-sm font-semibold mb-1">Transactions:</h4>
              <div className="mb-2">
                <h5 className="text-sm font-semibold mb-1">Courses:</h5>
                {bill.customerData.transactions.courses.map((course) => (
                  <div key={course.date} className="flex mb-1">
                    <p className="w-1/3">Course Name: {course.productName}</p>
                    <p className="w-1/3">Quantity: {course.quantity}</p>
                    <p className="w-1/3">Subtotal: {course.subtotal}</p>
                  </div>
                ))}
              </div>
              <div className="mb-2">
                <h5 className="text-sm font-semibold mb-1">Products:</h5>
                {bill.customerData.transactions.products.map((product) => (
                  <div key={product.date} className="flex mb-1">
                    <p className="w-1/3">Product Name: {product.productName}</p>
                    <p className="w-1/3">Quantity: {product.quantity}</p>
                    <p className="w-1/3">Subtotal: {product.subtotal}</p>
                  </div>
                ))}
              </div>
              <div>
                <h5 className="text-sm font-semibold mb-1">Print Services:</h5>
                {bill.customerData.transactions.printServices.map((service) => (
                  <div key={service.date} className="flex mb-1">
                    <p className="w-1/3">Service Name: {service.productName}</p>
                    <p className="w-1/3">Quantity: {service.quantity}</p>
                    <p className="w-1/3">Subtotal: {service.subtotal}</p>
                  </div>
                ))}
              </div>
            </div>
            <p>
              Total Purchase Transactions:{" "}
              {bill.customerData.total_purchase_transactions}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionAnalyzer;
