import React, { useEffect } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import FormattedPrice from "./FormattedPrice";
import { formatFullName } from "@/lib/utils";

const CustomTooltip = ({ active, payload, label }) => {
  console.log(payload);

  if (active && payload && payload.length) {
    const totalPurchase = payload[0].value;
    const transactionLength = payload[1].value;
    const maxProductAmount = payload[2].value;
    const maxCourseAmount = payload[3].value;
    const maxPrintServiceAmount = payload[4].value;

    return (
      <div className="custom-tooltip shadow-md bg-white border border-slate-400 p-4 rounded rtl">
        <p className="font-semibold">Name: <span>{formatFullName(label)}</span></p>
        <p className="font-semibold">Total Purchases: <FormattedPrice amount={totalPurchase} /></p>
        <p className="font-semibold">Transaction Length: {transactionLength}</p>
        <p className="font-semibold">Max Product Amount: <FormattedPrice amount={maxProductAmount} /></p>
        <p className="font-semibold">Max Course Amount: <FormattedPrice amount={maxCourseAmount} /></p>
        <p className="font-semibold">Max Print Service Amount: <FormattedPrice amount={maxPrintServiceAmount} /></p>
      </div>
    );
  }

  return null;
};


const CustomerStatsChart = ({ customers }) => {
  const calculateTransactionLength = customer => {
    return customer.transactions.courses.length + customer.transactions.products.length + customer.transactions.printServices.length;
  };

  const calculateMaxTransactionAmount = customer => {
    const maxTransactionAmounts = {
      products: customer.transactions.products.reduce(
        (maxAmount, product) => {
          const transactionAmount = product.subtotal;
          return transactionAmount > maxAmount
            ? transactionAmount
            : maxAmount;
        },
        0
      ),
      courses: customer.transactions.courses.reduce(
        (maxAmount, course) => {
          const transactionAmount = course.subtotal;
          return transactionAmount > maxAmount
            ? transactionAmount
            : maxAmount;
        },
        0
      ),
      printServices: customer.transactions.printServices.reduce(
        (maxAmount, printService) => {
          const transactionAmount = printService.subtotal;
          return transactionAmount > maxAmount
            ? transactionAmount
            : maxAmount;
        },
        0
      )
    };

    return maxTransactionAmounts;
  };

  useEffect(() => {
    // Code for data manipulation or additional logic if needed
  }, [customers]);

  const chartData = customers.map(customer => ({
    name: customer.fullName,
    "اجمالي المشتريات": customer.total_purchase_transactions,
    transactionLength: calculateTransactionLength(customer),
    maxTransactionAmounts: calculateMaxTransactionAmount(customer)
  }));

  return (
    <>
      <div className="mt-4">
        <BarChart width={800} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip active={undefined} payload={undefined} label={undefined} />} />
          <Legend layout="vertical" align="right" verticalAlign="top" />
          <Bar dataKey="اجمالي المشتريات" fill="#8884d8" />
          <Bar dataKey="transactionLength" fill="#82ca9d" />
          <Bar dataKey="maxTransactionAmounts.products" fill="#ffc658" />
          <Bar dataKey="maxTransactionAmounts.courses" name="اغلى كورس" fill="#ff7f50" />
          <Bar dataKey="maxTransactionAmounts.printServices" fill="#8a2be2" />
        </BarChart>
      </div>
    </>
  );
};

export default CustomerStatsChart;
