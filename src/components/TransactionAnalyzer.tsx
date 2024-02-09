// import React, { useEffect, useState } from 'react';

// const TransactionAnalyzer = ({customers}) => {
//   const [dailySells, setDailySells] = useState({});
//   const [monthlySells, setMonthlySells] = useState({});
//   const [yearlySells, setYearlySells] = useState({});

//   useEffect(() => {
//     const analyzeTransactions = () => {
//       const dailyTransactions = {};
//       const monthlyTransactions = {};
//       const yearlyTransactions = {};
//       // Iterate over each customer object
//       customers?.forEach(customer => {
//         const transactions = customer.transactions;

//         // Iterate over each transaction
//         transactions.products.forEach(transaction => {
//           const transactionDate = new Date(transaction.date);
//           const dayKey = `${transactionDate.getFullYear()}-${transactionDate.getMonth() + 1}-${transactionDate.getDate()}`;
//           const monthKey = `${transactionDate.getFullYear()}-${transactionDate.getMonth() + 1}`;
//           const yearKey = `${transactionDate.getFullYear()}`;

//           // Group transactions by day
//           if (!dailyTransactions[dayKey]) {
//             dailyTransactions[dayKey] = [];
//           }
//           dailyTransactions[dayKey].push(transaction);

//           // Group transactions by month
//           if (!monthlyTransactions[monthKey]) {
//             monthlyTransactions[monthKey] = [];
//           }
//           monthlyTransactions[monthKey].push(transaction);

//           // Group transactions by year
//           if (!yearlyTransactions[yearKey]) {
//             yearlyTransactions[yearKey] = [];
//           }
//           yearlyTransactions[yearKey].push(transaction);
//         });
//       });

//       setDailySells(dailyTransactions);
//       setMonthlySells(monthlyTransactions);
//       setYearlySells(yearlyTransactions);
//     };

//     // Call the function to analyze transactions
//     analyzeTransactions();
//   }, [customers]);

//   return (
//     <div>
//       <h2>Daily Sells</h2>
//      <pre>{JSON.stringify(dailySells, null, 2)}</pre>

//       <h2>Monthly Sells</h2>
//       <pre>{JSON.stringify(monthlySells, null, 2)}</pre>

//       <h2>Yearly Sells</h2>
//       <pre>{JSON.stringify(yearlySells, null, 2)}</pre> 
//     </div>
//   );
// };

// export default TransactionAnalyzer;
import { Clock, Calendar, DollarSign, Package } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const TransactionAnalyzer = ({customers}) => {
  const [dailySells, setDailySells] = useState({});
  const [monthlySells, setMonthlySells] = useState({});
  const [yearlySells, setYearlySells] = useState({});
  const [selectedPeriod, setSelectedPeriod] = useState(null);

  useEffect(() => {
    const analyzeTransactions = () => {
      const dailyTransactions = {};
      const monthlyTransactions = {};
      const yearlyTransactions = {};

      // Iterate over each customer object
      customers.forEach(customer => {
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

  const handlePeriodClick = period => {
    setSelectedPeriod(period);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-lg p-4 flex items-center justify-center cursor-pointer"
          onClick={() => handlePeriodClick('daily')}>
          <Clock className="w-8 h-8 mr-2 text-gray-500" />
          <div>
            <h3 className="text-lg font-semibold">Daily Sells</h3>
            <p className="text-gray-600">{Object.keys(dailySells).length}</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-4 flex items-center justify-center cursor-pointer"
          onClick={() => handlePeriodClick('monthly')}>
          <Calendar className="w-8 h-8 mr-2 text-gray-500" />
          <div>
            <h3 className="text-lg font-semibold">Monthly Sells</h3>
            <p className="text-gray-600">{Object.keys(monthlySells).length}</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-4 flex items-center justify-center cursor-pointer"
          onClick={() => handlePeriodClick('yearly')}>
          <Package className="w-8 h-8 mr-2 text-gray-500" />
          <div>
            <h3 className="text-lg font-semibold">Yearly Sells</h3>
            <p className="text-gray-600">{Object.keys(yearlySells).length}</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-4 flex items-center justify-center cursor-pointer"
          onClick={() => handlePeriodClick('revenue')}>
          <DollarSign className="w-8 h-8 mr-2 text-gray-500" />
          <div>
            <h3 className="text-lg font-semibold">Total Revenue</h3>
            <p className="text-gray-600">{calculateTotalRevenue()}</p>
          </div>
        </div>
      </div>
      {selectedPeriod && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">{`Transactions for ${selectedPeriod}`}</h2>
          <div className="bg-white rounded-lg shadow-lg p-4">
            {renderTransactions(selectedPeriod)}
          </div>
        </div>
      )}
    </div>
  );

  function calculateTotalRevenue() {
    let total = 0;
    customers.forEach(customer => {
      customer.transactions.products.forEach(transaction => {
        total += parseInt(transaction.subtotal);
      });
    });
    return total;
  }

  function renderTransactions(period) {
    switch (period) {
      case 'daily':
        return Object.keys(dailySells).map(day => (
          <div key={day} className="mb-4">
            <h3 className="text-lg font-semibold">{day}</h3>
            {dailySells[day].map((transaction, index) => (
              <div key={index} className="flex justify-between">
                <p>{transaction.productName}</p>
                <p>${transaction.subtotal}</p>
              </div>
            ))}
          </div>
        ));
      case 'monthly':
        return Object.keys(monthlySells).map(month => (
          <div key={month} className="mb-4">
            <h3 className="text-lg font-semibold">{month}</h3>
            {monthlySells[month].map((transaction, index) => (
              <div key={index} className="flex justify-between">
                <p>{transaction.productName}</p>
                <p>${transaction.subtotal}</p>
              </div>
            ))}
          </div>
        ));
      case 'yearly':
        return Object.keys(yearlySells).map(year => (
          <div key={year} className="mb-4">
            <h3 className="text-lg font-semibold">{year}</h3>
            {yearlySells[year].map((transaction, index) => (
              <div key={index} className="flex justify-between">
                <p>{transaction.productName}</p>
                <p>${transaction.subtotal}</p>
              </div>
            ))}
          </div>
        ));
        case 'revenue':
          let totalRevenue = 0;
          customers.forEach(customer => {
            customer.transactions.products.forEach(transaction => {
              totalRevenue += parseInt(transaction.subtotal);
            });
          });
        
          return (
            <div>
              <h3 className="text-lg font-semibold">Revenue Transactions</h3>
              <p>Total Revenue: ${totalRevenue}</p>
            </div>
          );
    
      default:
        return null;
    }
  }
};

export default TransactionAnalyzer;
