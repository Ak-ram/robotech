import { useEffect } from "react";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";

const CustomerStatsChart = ({ customers }) => {
  // Calculate the average transaction amount for a customer
  const calculateAverageTransactionAmount = customer => {
    const coursesLength = customer.transactions.courses.length;
    const productsLength = customer.transactions.products.length;
    const printServicesLength = customer.transactions.printServices.length;
    return coursesLength + productsLength + printServicesLength
  };
  // Calculate the maximum transaction amount for a customer in each array
  const calculateMaxTransactionAmount = customer => {
    const maxTransactionAmounts = {
      products: customer.transactions.products.reduce((maxAmount, product) => {
        const transactionAmount = product.subtotal;
        return transactionAmount > maxAmount ? transactionAmount : maxAmount;
      }, 0),
      courses: customer.transactions.courses.reduce((maxAmount, course) => {
        const transactionAmount = course.subtotal;
        return transactionAmount > maxAmount ? transactionAmount : maxAmount;
      }, 0),
      printServices: customer.transactions.printServices.reduce((maxAmount, printService) => {
        const transactionAmount = printService.subtotal;
        return transactionAmount > maxAmount ? transactionAmount : maxAmount;
      }, 0),
    };

    return maxTransactionAmounts;
  };

  useEffect(() => {
    // Code for data manipulation or additional logic if needed
  }, [customers]);

  // Transform the customer data into a format compatible with Recharts
  const chartData = customers.map(customer => ({
    name: customer.fullName,
    totalTransactions: customer.total_purchase_transactions,
    averageTransactionAmount: calculateAverageTransactionAmount(customer),
    maxTransactionAmounts: calculateMaxTransactionAmount(customer),
    // Add more properties for additional statistics
  }));

  return (
    <>
      {/* ... (your existing JSX) */}
      <div className="mt-4">
        {/* Recharts BarChart component */}
        <BarChart width={600} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {/* Bar for total purchase transactions */}
          <Bar dataKey="totalTransactions" fill="#8884d8" />
          {/* Bar for average transaction amount */}
          <Bar dataKey="averageTransactionAmount" fill="#82ca9d" />
          {/* Bar for maximum transaction amount in products */}
          <Bar dataKey="maxTransactionAmounts.products" fill="#ffc658" />
          {/* Bar for maximum transaction amount in courses */}
          <Bar dataKey="maxTransactionAmounts.courses" fill="#ff7f50" />
          {/* Bar for maximum transaction amount in printServices */}
          <Bar dataKey="maxTransactionAmounts.printServices" fill="#8a2be2" />
          {/* Add more Bar components for other statistics */}
        </BarChart>
      </div>
    </>
  );
};

export default CustomerStatsChart;