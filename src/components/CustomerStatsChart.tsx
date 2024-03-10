import React from "react";
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
        <p className="font-semibold">Total purchased products: <FormattedPrice amount={maxProductAmount} /></p>
        <p className="font-semibold">Total purchased courses: <FormattedPrice amount={maxCourseAmount} /></p>
        <p className="font-semibold">Total purchased print services: <FormattedPrice amount={maxPrintServiceAmount} /></p>
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

  const filteredCustomers = customers.filter(customer => calculateTransactionLength(customer) > 0);

  const chartData = filteredCustomers.map(customer => ({
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
          <Bar dataKey="maxTransactionAmounts.products" name="Total purchased products" fill="#ffc658" />
          <Bar dataKey="maxTransactionAmounts.courses" name="Total purchased courses" fill="#ff7f50" />
          <Bar dataKey="maxTransactionAmounts.printServices" name="Total purchased print services" fill="#8a2be2" />
        </BarChart>
      </div>
    </>
  );
};

export default CustomerStatsChart;

