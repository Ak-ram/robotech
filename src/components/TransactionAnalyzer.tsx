// import { Clock, Calendar, DollarSign, Package, Banknote } from 'lucide-react';
// import React, { useEffect, useState } from 'react';
// import FormattedPrice from './FormattedPrice';
// import Link from 'next/link';

// const TransactionAnalyzer = ({ customers }) => {
//   const [dailySells, setDailySells] = useState({});
//   const [monthlySells, setMonthlySells] = useState({});
//   const [yearlySells, setYearlySells] = useState({});
//   const [selectedPeriod, setSelectedPeriod] = useState(null);

//   useEffect(() => {
//     const analyzeTransactions = () => {
//       const dailyTransactions = {};
//       const monthlyTransactions = {};
//       const yearlyTransactions = {};

//       // Iterate over each customer object
//       customers.forEach(customer => {
//         const transactions = customer.transactions;
//         const customerName = customer.fullName; // Assuming fullName as the customer name field
//         const customerId = customer.id; // Assuming fullName as the customer name field
//         // Iterate over each transaction
//         transactions.products.forEach(transaction => {
//           const transactionDate = new Date(transaction.date);
//           const dayKey = `${transactionDate.getFullYear()}-${transactionDate.getMonth() + 1}-${transactionDate.getDate()}`;
//           const monthKey = `${transactionDate.getFullYear()}-${transactionDate.getMonth() + 1}`;
//           const yearKey = `${transactionDate.getFullYear()}`;

//           // Add customerName to the transaction
//           transaction.customerName = customerName;
//           transaction.customerId = customerId;

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

//   const handlePeriodClick = period => {
//     setSelectedPeriod(period);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <div className="bg-white rounded-lg shadow-lg p-4 flex items-center justify-center cursor-pointer"
//           onClick={() => handlePeriodClick('daily')}>
//           <Clock className="w-8 h-8 mr-2 text-gray-500" />
//           <div>
//             <h3 className="text-lg font-semibold">Daily Sells</h3>
//             <p className="text-gray-600">{Object.keys(dailySells).length}</p>
//           </div>
//         </div>
//         <div className="bg-white rounded-lg shadow-lg p-4 flex items-center justify-center cursor-pointer"
//           onClick={() => handlePeriodClick('monthly')}>
//           <Calendar className="w-8 h-8 mr-2 text-gray-500" />
//           <div>
//             <h3 className="text-lg font-semibold">Monthly Sells</h3>
//             <p className="text-gray-600">{Object.keys(monthlySells).length}</p>
//           </div>
//         </div>
//         <div className="bg-white rounded-lg shadow-lg p-4 flex items-center justify-center cursor-pointer"
//           onClick={() => handlePeriodClick('yearly')}>
//           <Package className="w-8 h-8 mr-2 text-gray-500" />
//           <div>
//             <h3 className="text-lg font-semibold">Yearly Sells</h3>
//             <p className="text-gray-600">{Object.keys(yearlySells).length}</p>
//           </div>
//         </div>
//         <div className="bg-white rounded-lg shadow-lg p-4 flex items-center justify-center cursor-pointer"
//           onClick={() => handlePeriodClick('revenue')}>
//           <Banknote className="w-8 h-8 mr-2 text-gray-500" />
//           <div>
//             <h3 className="text-lg font-semibold">Total Revenue</h3>
//             <p className="text-gray-600"><FormattedPrice amount={calculateTotalRevenue()} /></p>
//           </div>
//         </div>
//       </div>
//       {selectedPeriod && (
//         <div className="mt-8">
//           <h2 className="text-xl font-semibold mb-4">{`Transactions for ${selectedPeriod}`}</h2>
//           <div className="bg-white rounded-lg shadow-lg p-4">
//             {renderTransactions(selectedPeriod)}
//           </div>
//         </div>
//       )}

//     </div>

//   );

//   function calculateTotalRevenue() {
//     let total = 0;
//     customers.forEach(customer => {
//       customer.transactions.products.forEach(transaction => {
//         total += parseInt(transaction.subtotal);
//       });
//     });
//     return total;
//   }

//   function renderTransactions(period) {
//     const renderTransactionsByPeriod = (transactions) => {
//       return transactions.map((transaction, index) => (
//         <Link href={{
//           pathname: `admin/id_${transaction?.customerId}`,
//           query: {
//             id: transaction?.customerId,
//             data: JSON.stringify(customers.find(customer => customer.id === transaction?.customerId))
//           },
//         }} key={index} className="flex flex-col hover:bg-slate-100 border border-slate-200 rounded p-3 mb-2 justify-between">
//           <p className='text-blue-400 font-semibold'>{transaction.customerName}</p> {/* Render customer name */}
//           <div className="flex justify-between items-center">
//             <p>{transaction.productName}</p>
//             <div className="flex items-center">
//               <FormattedPrice className='text-sm font-bold' amount={transaction.subtotal} />
//             </div>
//           </div>
//         </Link>
//       ));
//     };

//     switch (period) {
//       case 'daily':
//         return Object.keys(dailySells)
//           .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
//           .map(day => (
//             <div key={day} className="mb-4">
//               <h3 className="text-lg flex items-center justify-between w-full font-semibold">
//                 <span>{day}</span>
//                 <span className='text-xs ml-auto'><FormattedPrice className='text-xs' amount={dailySells[day].reduce((accumulator, day) => accumulator + day.subtotal, 0)} /> for {dailySells[day].length} Transaction(s)</span></h3>
//               {renderTransactionsByPeriod(dailySells[day])}
//             </div>
//           ));

//       case 'monthly':
//         return Object.keys(monthlySells)
//           .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
//           .map(month => (
//             <div key={month} className="mb-4">
//               <h3 className="text-lg font-semibold">{month}</h3>
//               {renderTransactionsByPeriod(monthlySells[month])}
//             </div>
//           ));

//       case 'yearly':
//         return Object.keys(yearlySells)
//           .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
//           .map(year => (
//             <div key={year} className="mb-4">
//               <h3 className="text-lg font-semibold">{year}</h3>
//               {renderTransactionsByPeriod(yearlySells[year])}
//             </div>
//           ));


//       case 'revenue':
//         // Initialize objects to store revenue totals for each day, month, and year
//         const dailyRevenue: { [key: string]: number } = {};
//         const monthlyRevenue: { [key: string]: number } = {};
//         const yearlyRevenue: { [key: string]: number } = {};

//         // Calculate total revenue and populate revenue totals for each day, month, and year
//         customers.forEach(customer => {
//           customer.transactions.products.forEach(transaction => {
//             const transactionDate = new Date(transaction.date);
//             const dayKey = `${transactionDate.getFullYear()}-${transactionDate.getMonth() + 1}-${transactionDate.getDate()}`;
//             const monthKey = `${transactionDate.getFullYear()}-${transactionDate.getMonth() + 1}`;
//             const yearKey = `${transactionDate.getFullYear()}`;

//             // Update daily revenue
//             dailyRevenue[dayKey] = (dailyRevenue[dayKey] || 0) + parseInt(transaction.subtotal);

//             // Update monthly revenue
//             monthlyRevenue[monthKey] = (monthlyRevenue[monthKey] || 0) + parseInt(transaction.subtotal);

//             // Update yearly revenue
//             yearlyRevenue[yearKey] = (yearlyRevenue[yearKey] || 0) + parseInt(transaction.subtotal);
//           });
//         });

//         // Calculate total revenue
//         const totalRevenue: number = Object.values(yearlyRevenue).reduce((total: number, revenue: number) => total + revenue, 0);

//         return (
//           <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
//             <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
//             <div className="bg-white rounded-lg p-4 mb-4">
//               <div className="flex items-center mb-4">
//                 <Banknote className="w-6 h-6 mr-2 text-blue-500" />
//                 <p className="text-md font-semibold">Total Revenue:</p>
//                 <p className="ml-auto text-lg font-semibold">
//                   <FormattedPrice amount={totalRevenue} /></p>
//               </div>
//               <div>
//                 <h4 className="text-md font-semibold mb-2">Daily Revenue</h4>
//                 {Object.entries(dailyRevenue).map(([day, revenue]) => (
//                   <p key={day} className="flex items-center my-2">
//                     <Clock className="w-5 h-5 mr-2 text-blue-500" />{day}
//                      <div className="flex-grow border-t-2 border-dashed border-slate-300 mx-3"></div>
//                     <FormattedPrice amount={revenue} /></p>
//                 ))}
//               </div>
//             </div>
//             <div className="bg-white rounded-lg p-4 mb-4">
//               <div className="flex items-center mb-4">
//                 <Calendar className="w-6 h-6 mr-2 text-green-500" />
//                 <p className="text-md font-semibold">Monthly Revenue</p>
//               </div>
//               <div>
//                 {Object.entries(monthlyRevenue).map(([month, revenue]) => (
//                   <p key={month} className="flex items-center my-2">
//                   <Calendar className="w-5 h-5 mr-2 text-blue-500" />{month}
//                    <div className="flex-grow border-t-2 border-dashed border-slate-300 mx-3"></div>
//                   <FormattedPrice amount={revenue} /></p>
//                 ))}
//               </div>
//             </div>
//             <div className="bg-white rounded-lg p-4">
//               <div className="flex items-center mb-4">
//                 <Package className="w-6 h-6 mr-2 text-yellow-500" />
//                 <p className="text-md font-semibold">Yearly Revenue</p>
//               </div>
//               <div>
//                 {Object.entries(yearlyRevenue).map(([year, revenue]) => (
//                   <p key={year} className="flex items-center my-2">
//                   <Package className="w-5 h-5 mr-2 text-blue-500" />{year}
//                    <div className="flex-grow border-t-2 border-dashed border-slate-300 mx-3"></div>
//                   <FormattedPrice amount={revenue} /></p>
//                 ))}
//               </div>
//             </div>
//           </div>
//         );
//       default:
//         return null;
//     }
//   }

// };

// export default TransactionAnalyzer;



import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Clock, Calendar, Package, Banknote, User, Cable, ArrowDown, ArrowUp, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
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
        // const wholesalePrice = customer.wholesalePrice; // Assuming fullName as the customer name field
        // Iterate over each transaction
        transactions.products.forEach(transaction => {
          const transactionDate = new Date(transaction.date);
          const dayKey = `${transactionDate.getFullYear()}-${transactionDate.getMonth() + 1}-${transactionDate.getDate()}`;
          const monthKey = `${transactionDate.getFullYear()}-${transactionDate.getMonth() + 1}`;
          const yearKey = `${transactionDate.getFullYear()}`;

          // Add customerName to the transaction
          transaction.customerName = customerName;
          transaction.customerId = customerId;
          // transaction.wholesalePrice = wholesalePrice;

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

  // Calculate total revenue and populate revenue totals for each day, month, and year
  const dailyRevenue = {};
  const monthlyRevenue = {};
  const yearlyRevenue = {};
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

  const dailyRevenueData = Object.entries(dailyRevenue)
    .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime()).reverse()
    .map(([day, revenue]) => ({
      name: day,
      revenue: revenue,
    }));

  const monthlyRevenueData = Object.entries(monthlyRevenue)
    .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime()).reverse()
    .map(([month, revenue]) => ({
      name: month,
      revenue: revenue,
    }));

  const yearlyRevenueData = Object.entries(yearlyRevenue)
    .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime()).reverse()
    .map(([year, revenue]) => ({
      name: year,
      revenue: revenue,
    }));


  return (
    <div className="container overflow-auto mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-indigo-500 rounded-lg shadow-lg p-4 flex items-center justify-center cursor-pointer"
          onClick={() => handlePeriodClick('daily')}>
          <Clock className="w-8 h-8 mr-2 text-indigo-500" />
          <div>
            <h3 className="text-lg text-indigo-600 font-semibold">Daily Sells</h3>
            <p className="text-indigo-500">{Object.keys(dailySells).length}</p>
          </div>
        </div>
        <div className="bg-white border border-green-500  rounded-lg shadow-lg p-4 flex items-center justify-center cursor-pointer"
          onClick={() => handlePeriodClick('monthly')}>
          <Calendar className="w-8 h-8 mr-2 text-green-500" />
          <div>
            <h3 className="text-lg text-green-500  font-semibold">Monthly Sells</h3>
            <p className="text-green-500 ">{Object.keys(monthlySells).length}</p>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-orange-500 shadow-lg p-4 flex items-center justify-center cursor-pointer"
          onClick={() => handlePeriodClick('yearly')}>
          <Package className="w-8 h-8 mr-2 text-orange-500" />
          <div>
            <h3 className="text-lg text-orange-500 font-semibold">Yearly Sells</h3>
            <p className="text-orange-600">{Object.keys(yearlySells).length}</p>
          </div>
        </div>
        <div className="bg-white border border-rose-500 rounded-lg shadow-lg p-4 flex items-center justify-center cursor-pointer"
          onClick={() => handlePeriodClick('revenue')}>
          <Banknote className="w-8 h-8 mr-2 text-rose-500" />
          <div>
            <h3 className="text-lg text-rose-500 font-semibold">Total Revenue</h3>
            <p className="text-rose-600"><FormattedPrice amount={calculateTotalRevenue()} /></p>
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
      {/* Render Revenue Charts */}
      {/* <div className="mt-8 ">
        <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
        <div className='flex p-6 bg-white rounded'>
          <div className=''>
             // Daily Revenue Chart 
            <h4 className="text-md font-semibold mb-2 text-indigo-500">Daily Revenue</h4>
            <LineChart width={380} height={300} data={dailyRevenueData}>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid stroke="#eee" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
            </LineChart>
          </div>
          <div>
           // Monthly Revenue Chart 
            <h4 className="text-md font-semibold mb-2 text-green-500">Monthly Revenue</h4>
            <LineChart width={380} height={300} data={monthlyRevenueData}>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid stroke="#eee" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
            </LineChart>
          </div>
          <div>
           // Yearly Revenue Chart
            <h4 className="text-md font-semibold mb-2 text-orange-500">Yearly Revenue</h4>
            <LineChart width={380} height={300} data={yearlyRevenueData}>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid stroke="#eee" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#ffc658" />
            </LineChart>
          </div>
        </div>
      </div> */}
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
      console.log('tr', transactions)
      return transactions.map((transaction, index) => (
        <Link href={{
          pathname: `admin/id_${transaction?.customerId}`,
          query: {
            id: transaction?.customerId,
            data: JSON.stringify(customers.find(customer => customer.id === transaction?.customerId))
          },
        }} key={index} className="flex hover:bg-slate-100 border border-slate-200 rounded p-3 mb-2 items-center gap-3">
          <User size={25} className='text-blue-400' />
          <div className='flex-1 flex gap-4 justify-between items-center'>
            <div className='flex flex-col  font-semibold'>
              <span className='text-blue-400 '>{transaction.customerName}</span>

              <span className='flex-1'>{transaction.productName}</span>
            </div>

            <div className='ml-auto flex gap-4'>

              <div className="flex flex-col justify-center items-center">
                <span className='text-xs font-semibold'>Buy</span>
                <FormattedPrice className='text-xs font-semibold' amount={transaction?.wholesalePrice || 0} />
              </div>
              <div className="flex  flex-col justify-center items-center">
                <span className='text-xs font-semibold'>Sell</span>
                <FormattedPrice className='text-xs font-semibold' amount={transaction.piecePrice} />
              </div>
              <div className="flex  flex-col justify-center items-center">
                <span className='text-xs font-semibold'>Quantity</span>
                <FormattedPrice className='text-xs font-semibold' amount={transaction.quantity} />
              </div>
              <div className="flex  flex-col justify-center items-center">
                <span className='text-xs font-semibold'>Sub Total</span>
                <FormattedPrice className='text-xs font-semibold' amount={transaction.subtotal} />
              </div>
              <div className="flex  flex-col justify-center items-center">
                <span className='text-xs font-semibold'>Discount</span>
                <FormattedPrice className='text-xs font-semibold' amount={transaction.discount} />
              </div>
              {transaction?.wholesalePrice && transaction?.wholesalePrice !== 0 &&
                <>

                  {transaction?.wholesalePrice && (transaction?.wholesalePrice * transaction?.quantity) < transaction.subtotal &&
                    <div className='flex  flex-col items-center'>
                      <span className='text-xs flex items-center text-green-400 font-semibold'>Profit <ArrowUp size={16}/></span>
                      <FormattedPrice className='text-xs text-green-400 font-semibold' amount={((transaction.subtotal) - (transaction?.wholesalePrice * transaction?.quantity || 0))} />
                    </div>
                  }
                  {transaction?.wholesalePrice && (transaction?.wholesalePrice * transaction?.quantity) > transaction.subtotal &&
                    <div className='flex  flex-col items-center'>
                      <span className='text-xs flex items-center text-red-400 font-semibold'><ArrowDown size={16}/>Loss</span>
                      <FormattedPrice className='text-xs text-red-400 font-semibold' amount={((transaction?.wholesalePrice * transaction?.quantity || 0) - (transaction.subtotal))} />
                    </div>
                  }
                </>
              }
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
            <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
            <div className="bg-white rounded-lg p-4 mb-4">
              <div className="flex items-center mb-4">
                <Banknote className="w-6 h-6 mr-2 text-blue-500" />
                <p className="text-md font-semibold">Total Revenue:</p>
                <p className="ml-auto text-lg font-semibold">
                  <FormattedPrice amount={totalRevenue} /></p>
              </div>
              <div>
                <h4 className="text-md font-semibold mb-2">Daily Revenue</h4>
                {Object.entries(dailyRevenue).map(([day, revenue]) => (
                  <p key={day} className="flex items-center my-2">
                    <Clock className="w-5 h-5 mr-2 text-blue-500" />{day}
                    <div className="flex-grow border-t-2 border-dashed border-slate-300 mx-3"></div>
                    <FormattedPrice amount={revenue} /></p>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 mb-4">
              <div className="flex items-center mb-4">
                <Calendar className="w-6 h-6 mr-2 text-green-500" />
                <p className="text-md font-semibold">Monthly Revenue</p>
              </div>
              <div>
                {Object.entries(monthlyRevenue).map(([month, revenue]) => (
                  <p key={month} className="flex items-center my-2">
                    <Calendar className="w-5 h-5 mr-2 text-blue-500" />{month}
                    <div className="flex-grow border-t-2 border-dashed border-slate-300 mx-3"></div>
                    <FormattedPrice amount={revenue} /></p>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center mb-4">
                <Package className="w-6 h-6 mr-2 text-yellow-500" />
                <p className="text-md font-semibold">Yearly Revenue</p>
              </div>
              <div>
                {Object.entries(yearlyRevenue).map(([year, revenue]) => (
                  <p key={year} className="flex items-center my-2">
                    <Package className="w-5 h-5 mr-2 text-blue-500" />{year}
                    <div className="flex-grow border-t-2 border-dashed border-slate-300 mx-3"></div>
                    <FormattedPrice amount={revenue} /></p>
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
