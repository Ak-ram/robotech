import { Clock, Calendar, DollarSign, Package, Banknote } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import FormattedPrice from './FormattedPrice';
import Link from 'next/link';

const TransactionAnalyzer = ({ customers }) => {
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
        const customerName = customer.fullName; // Assuming fullName as the customer name field
        const customerId = customer.id; // Assuming fullName as the customer name field
        // Iterate over each transaction
        transactions.products.forEach(transaction => {
          const transactionDate = new Date(transaction.date);
          const dayKey = `${transactionDate.getFullYear()}-${transactionDate.getMonth() + 1}-${transactionDate.getDate()}`;
          const monthKey = `${transactionDate.getFullYear()}-${transactionDate.getMonth() + 1}`;
          const yearKey = `${transactionDate.getFullYear()}`;

          // Add customerName to the transaction
          transaction.customerName = customerName;
          transaction.customerId = customerId;

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
          <Banknote className="w-8 h-8 mr-2 text-gray-500" />
          <div>
            <h3 className="text-lg font-semibold">Total Revenue</h3>
            <p className="text-gray-600"><FormattedPrice amount={calculateTotalRevenue()} /></p>
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
    const renderTransactionsByPeriod = (transactions) => {
      return transactions.map((transaction, index) => (
        <Link href={{
          pathname: `admin/id_${transaction?.customerId}`,
          query: {
            id: transaction?.customerId,
            data: JSON.stringify(customers.find(customer => customer.id === transaction?.customerId))
          },
        }} key={index} className="flex flex-col hover:bg-slate-100 border border-slate-200 rounded p-3 mb-2 justify-between">
          <p className='text-blue-400 font-semibold'>{transaction.customerName}</p> {/* Render customer name */}
          <div className="flex justify-between items-center">
            <p>{transaction.productName}</p>
            <div className="flex items-center">
              <FormattedPrice className='text-sm font-bold' amount={transaction.subtotal} />
            </div>
          </div>
        </Link>
      ));
    };

    switch (period) {
      case 'daily':
        return Object.keys(dailySells)
          .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
          .map(day => (
            <div key={day} className="mb-4">
              <h3 className="text-lg flex items-center justify-between w-full font-semibold">
                <span>{day}</span>
                <span className='text-xs ml-auto'><FormattedPrice className='text-xs' amount={dailySells[day].reduce((accumulator, day) => accumulator + day.subtotal, 0)} /> for {dailySells[day].length} Transaction(s)</span></h3>
              {renderTransactionsByPeriod(dailySells[day])}
            </div>
          ));

      case 'monthly':
        return Object.keys(monthlySells)
          .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
          .map(month => (
            <div key={month} className="mb-4">
              <h3 className="text-lg font-semibold">{month}</h3>
              {renderTransactionsByPeriod(monthlySells[month])}
            </div>
          ));

      case 'yearly':
        return Object.keys(yearlySells)
          .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
          .map(year => (
            <div key={year} className="mb-4">
              <h3 className="text-lg font-semibold">{year}</h3>
              {renderTransactionsByPeriod(yearlySells[year])}
            </div>
          ));


      case 'revenue':
        // Initialize objects to store revenue totals for each day, month, and year
        const dailyRevenue: { [key: string]: number } = {};
        const monthlyRevenue: { [key: string]: number } = {};
        const yearlyRevenue: { [key: string]: number } = {};

        // Calculate total revenue and populate revenue totals for each day, month, and year
        customers.forEach(customer => {
          customer.transactions.products.forEach(transaction => {
            const transactionDate = new Date(transaction.date);
            const dayKey = `${transactionDate.getFullYear()}-${transactionDate.getMonth() + 1}-${transactionDate.getDate()}`;
            const monthKey = `${transactionDate.getFullYear()}-${transactionDate.getMonth() + 1}`;
            const yearKey = `${transactionDate.getFullYear()}`;

            // Update daily revenue
            dailyRevenue[dayKey] = (dailyRevenue[dayKey] || 0) + parseInt(transaction.subtotal);

            // Update monthly revenue
            monthlyRevenue[monthKey] = (monthlyRevenue[monthKey] || 0) + parseInt(transaction.subtotal);

            // Update yearly revenue
            yearlyRevenue[yearKey] = (yearlyRevenue[yearKey] || 0) + parseInt(transaction.subtotal);
          });
        });

        // Calculate total revenue
        const totalRevenue: number = Object.values(yearlyRevenue).reduce((total: number, revenue: number) => total + revenue, 0);

        return (
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Revenue Transactions</h3>
          <div className="bg-white rounded-lg p-4 mb-4">
            <div className="flex items-center mb-4">
              <Banknote className="w-6 h-6 mr-2 text-blue-500" />
              <p className="text-md font-semibold">Total Revenue:</p>
              <p className="ml-auto"><FormattedPrice amount={totalRevenue} /></p>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-2">Daily Revenue Totals</h4>
              {Object.entries(dailyRevenue).map(([day, revenue]) => (
                <p key={day} className="flex items-center"><Clock className="w-5 h-5 mr-2 text-blue-500" />{day}: <FormattedPrice amount={revenue} /></p>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 mb-4">
            <div className="flex items-center mb-4">
              <Calendar className="w-6 h-6 mr-2 text-green-500" />
              <p className="text-md font-semibold">Monthly Revenue Totals</p>
            </div>
            <div>
              {Object.entries(monthlyRevenue).map(([month, revenue]) => (
                <p key={month} className="flex items-center"><Calendar className="w-5 h-5 mr-2 text-green-500" />{month}: <FormattedPrice amount={revenue} /></p>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center mb-4">
              <Package className="w-6 h-6 mr-2 text-yellow-500" />
              <p className="text-md font-semibold">Yearly Revenue Totals</p>
            </div>
            <div>
              {Object.entries(yearlyRevenue).map(([year, revenue]) => (
                <p key={year} className="flex items-center"><Package className="w-5 h-5 mr-2 text-yellow-500" />{year}: <FormattedPrice amount={revenue} /></p>
              ))}
            </div>
          </div>
        </div>
        );
      default:
        return null;
    }
  }

};

export default TransactionAnalyzer;
