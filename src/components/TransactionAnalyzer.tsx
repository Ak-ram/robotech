import React, { useEffect, useState } from 'react';

const TransactionAnalyzer = ({customers}) => {
  const [dailySells, setDailySells] = useState({});
  const [monthlySells, setMonthlySells] = useState({});
  const [yearlySells, setYearlySells] = useState({});

  useEffect(() => {
    const analyzeTransactions = () => {
      const dailyTransactions = {};
      const monthlyTransactions = {};
      const yearlyTransactions = {};
      // Iterate over each customer object
      customers?.forEach(customer => {
        const transactions = customer.transactions;

        // Iterate over each transaction
        transactions.products.forEach(transaction => {
          const transactionDate = new Date(transaction.date);
          const dayKey = `${transactionDate.getFullYear()}-${transactionDate.getMonth() + 1}-${transactionDate.getDate()}`;
          const monthKey = `${transactionDate.getFullYear()}-${transactionDate.getMonth() + 1}`;
          const yearKey = `${transactionDate.getFullYear()}`;

          // Group transactions by day
          if (!dailyTransactions[dayKey]) {
            dailyTransactions[dayKey] = [];
          }
          dailyTransactions[dayKey].push(transaction);

          // Group transactions by month
          if (!monthlyTransactions[monthKey]) {
            monthlyTransactions[monthKey] = [];
          }
          monthlyTransactions[monthKey].push(transaction);

          // Group transactions by year
          if (!yearlyTransactions[yearKey]) {
            yearlyTransactions[yearKey] = [];
          }
          yearlyTransactions[yearKey].push(transaction);
        });
      });

      setDailySells(dailyTransactions);
      setMonthlySells(monthlyTransactions);
      setYearlySells(yearlyTransactions);
    };

    // Call the function to analyze transactions
    analyzeTransactions();
  }, [customers]);

  return (
    <div>
      <h2>Daily Sells</h2>
     <pre>{JSON.stringify(dailySells, null, 2)}</pre>

      <h2>Monthly Sells</h2>
      <pre>{JSON.stringify(monthlySells, null, 2)}</pre>

      <h2>Yearly Sells</h2>
      <pre>{JSON.stringify(yearlySells, null, 2)}</pre> 
    </div>
  );
};

export default TransactionAnalyzer;
