import supabase from "@/supabase/config";
import { useEffect, useState } from "react";
import { Bill } from "../../type";

const TransactionAnalyzer = () => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [totalSubtotal, setTotalSubtotal] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await supabase.from("bills").select("*");
        setBills(data!);
      } catch (error) {
        console.error("Error fetching data:", (error as Error).message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Calculate total subtotal when bills state changes
    const calculateTotalSubtotal = () => {
      const total = bills.reduce((accumulator, bill) => {
        return (
          accumulator +
          bill.data.reduce((subtotalAccumulator, transaction) => {
            return subtotalAccumulator + transaction.subtotal;
          }, 0)
        );
      }, 0);
      setTotalSubtotal(total);
    };

    calculateTotalSubtotal();
  }, [bills]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Bills Analyzer</h1>
      <div className="grid gap-4">
        {bills.map((bill) => (
          <div key={bill.id} className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">
              Customer Name: {bill.customerData.fullName}
            </h2>
            <p className="mb-2">Customer ID: {bill.customerData.id}</p>
            <p className="mb-2">Bill ID: {bill.id}</p>
            <p className="mb-2">Date: {bill.created_at}</p>
            <p>
              Total Subtotal:{" "}
              {bill.data.reduce((acc, curr) => acc + curr.subtotal, 0)}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">
          Total Subtotal: {totalSubtotal}
        </h2>
      </div>
    </div>
  );
};

export default TransactionAnalyzer;
