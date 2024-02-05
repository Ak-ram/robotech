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
  console.log(payload)
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip shadow-md bg-white border border-slate-400 p-4 rounded rtl">
        <p className="font-semibold">Name: <span>{formatFullName(label)}</span></p>
        <p className="font-semibold">Total Purches: <FormattedPrice amount={payload[0].value} /></p>
      </div>

    );
  }

  return null;
};

const CustomerStatsChart = ({ customers }) => {
  const calculateAverageTransactionAmount = customer => {
    const totalTransactions =
      customer.transactions.courses.length +
      customer.transactions.products.length +
      customer.transactions.printServices.length;

    const totalSubtotal =
      customer.transactions.courses.reduce(
        (sum, course) => sum + course.subtotal,
        0
      ) +
      customer.transactions.products.reduce(
        (sum, product) => sum + product.subtotal,
        0
      ) +
      customer.transactions.printServices.reduce(
        (sum, printService) => sum + printService.subtotal,
        0
      );

    return totalTransactions > 0 ? totalSubtotal / totalTransactions : 0;
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
    transactionLength: calculateAverageTransactionAmount(customer),
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
