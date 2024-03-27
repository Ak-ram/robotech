import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Clock, Calendar, Package, Banknote, User, ArrowDown, ArrowUp, TrendingUp, TrendingDown, Diff, ChevronDown, RefreshCcw } from 'lucide-react';
import FormattedPrice from './FormattedPrice';
import Link from 'next/link';
import RevenueCharts from './RevenuCharts';

const TransactionAnalyzer = ({ customers }) => {
  const [dailySells, setDailySells] = useState({});
  const [monthlySells, setMonthlySells] = useState({});
  const [yearlySells, setYearlySells] = useState({});
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [show, setShow] = useState(false);
  const [refresh, setRefresh] = useState(false)
  const [searchQuery, setSearchQuery] = useState('');

  const handleRefresh = () => {
    setRefresh(true)
    setTimeout(() => {
      setRefresh(false)
    }, 1000);
  }
  // Function to handle search input change
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to filter transactions based on search query

  useEffect(() => {
    const analyzeTransactions = () => {
      const dailyTransactions = {};
      const monthlyTransactions = {};
      const yearlyTransactions = {};

      customers.forEach(customer => {
        const transactions = customer.transactions;
        const customerName = customer.fullName; // Assuming fullName as the customer name field
        const customerId = customer.id; // Assuming fullName as the customer name field

        transactions.products.forEach(transaction => {
          const transactionDate = new Date(transaction.date);
          const dayKey = `${transactionDate.getFullYear()}-${transactionDate.getMonth() + 1}-${transactionDate.getDate()}`;
          const monthKey = `${transactionDate.getFullYear()}-${transactionDate.getMonth() + 1}`;
          const yearKey = `${transactionDate.getFullYear()}`;

          //  Add customerName to the transaction
          transaction.customerName = customerName;
          transaction.customerId = customerId;


          if (!dailyTransactions[dayKey]) {
            dailyTransactions[dayKey] = [];
          }
          dailyTransactions[dayKey].push(transaction);

          if (!monthlyTransactions[monthKey]) {
            monthlyTransactions[monthKey] = [];
          }
          monthlyTransactions[monthKey].push(transaction);

          if (!yearlyTransactions[yearKey]) {
            yearlyTransactions[yearKey] = [];
          }
          yearlyTransactions[yearKey].push(transaction);
        });

        transactions.courses.forEach(course => {
          const courseTransactionDate = new Date(course.date);
          const dayKey = `${courseTransactionDate.getFullYear()}-${courseTransactionDate.getMonth() + 1}-${courseTransactionDate.getDate()}`;
          const monthKey = `${courseTransactionDate.getFullYear()}-${courseTransactionDate.getMonth() + 1}`;
          const yearKey = `${courseTransactionDate.getFullYear()}`;
          //  Add customerName to the transaction
          course.customerName = customerName;
          course.customerId = customerId;

          if (!dailyTransactions[dayKey]) {
            dailyTransactions[dayKey] = [];
          }
          dailyTransactions[dayKey].push(course);

          if (!monthlyTransactions[monthKey]) {
            monthlyTransactions[monthKey] = [];
          }
          monthlyTransactions[monthKey].push(course);

          if (!yearlyTransactions[yearKey]) {
            yearlyTransactions[yearKey] = [];
          }
          yearlyTransactions[yearKey].push(course);
        });

        transactions.printServices.forEach(printService => {
          const printServiceTransactionDate = new Date(printService.date);
          const dayKey = `${printServiceTransactionDate.getFullYear()}-${printServiceTransactionDate.getMonth() + 1}-${printServiceTransactionDate.getDate()}`;
          const monthKey = `${printServiceTransactionDate.getFullYear()}-${printServiceTransactionDate.getMonth() + 1}`;
          const yearKey = `${printServiceTransactionDate.getFullYear()}`;
          //  Add customerName to the transaction
          printService.customerName = customerName;
          printService.customerId = customerId;

          if (!dailyTransactions[dayKey]) {
            dailyTransactions[dayKey] = [];
          }
          dailyTransactions[dayKey].push(printService);

          if (!monthlyTransactions[monthKey]) {
            monthlyTransactions[monthKey] = [];
          }
          monthlyTransactions[monthKey].push(printService);

          if (!yearlyTransactions[yearKey]) {
            yearlyTransactions[yearKey] = [];
          }
          yearlyTransactions[yearKey].push(printService);
        });
      });

      setDailySells(dailyTransactions);
      setMonthlySells(monthlyTransactions);
      setYearlySells(yearlyTransactions);
    };

    analyzeTransactions();
  }, [customers, refresh]);

  const handlePeriodClick = period => {
    setSelectedPeriod(period);
  };

  const dailyRevenue = {};
  const dailyProfits = {};
  const monthlyRevenue = {};
  const monthlyProfits = {};
  const yearlyRevenue = {};
  const yearlyProfits = {};

  customers.forEach(customer => {
    customer.transactions.products.forEach(transaction => {
      const transactionDate = new Date(transaction.date);
      const dayKey = `${transactionDate.getFullYear()}-${transactionDate.getMonth() + 1}-${transactionDate.getDate()}`;
      const monthKey = `${transactionDate.getFullYear()}-${transactionDate.getMonth() + 1}`;
      const yearKey = `${transactionDate.getFullYear()}`;

      if (!dailyRevenue[dayKey]) {
        dailyRevenue[dayKey] = 0;
      }
      if (!dailyProfits[dayKey]) {
        dailyProfits[dayKey] = 0;
      }
      dailyRevenue[dayKey] += parseInt(transaction.subtotal);
      // dailyProfits[dayKey] += parseInt(transaction.subtotal - (transaction.wholesalePrice || 0));
      dailyProfits[dayKey] += parseInt((transaction.subtotal - (transaction.wholesalePrice * transaction.quantity || 0)).toString());

      if (!monthlyRevenue[monthKey]) {
        monthlyRevenue[monthKey] = 0;
      }
      if (!monthlyProfits[monthKey]) {
        monthlyProfits[monthKey] = 0;
      }
      monthlyRevenue[monthKey] += parseInt(transaction.subtotal);
      // monthlyProfits[dayKey] += parseInt(transaction.subtotal - (transaction.wholesalePrice || 0));
      monthlyProfits[monthKey] += parseInt((transaction.subtotal - (transaction.wholesalePrice * transaction.quantity || 0)).toString());

      if (!yearlyRevenue[yearKey]) {
        yearlyRevenue[yearKey] = 0;
      }
      if (!yearlyProfits[yearKey]) {
        yearlyProfits[yearKey] = 0;
      }
      yearlyRevenue[yearKey] += parseInt(transaction.subtotal);
      // yearlyProfits[dayKey] += parseInt(transaction.subtotal - (transaction.wholesalePrice || 0));
      yearlyProfits[yearKey] += parseInt((transaction.subtotal - (transaction.wholesalePrice * transaction.quantity || 0)).toString());
    });

    customer.transactions.courses.forEach(course => {
      const courseTransactionDate = new Date(course.date);
      const dayKey = `${courseTransactionDate.getFullYear()}-${courseTransactionDate.getMonth() + 1}-${courseTransactionDate.getDate()}`;
      const monthKey = `${courseTransactionDate.getFullYear()}-${courseTransactionDate.getMonth() + 1}`;
      const yearKey = `${courseTransactionDate.getFullYear()}`;

      if (!dailyRevenue[dayKey]) {
        dailyRevenue[dayKey] = 0;
      }
      if (!dailyProfits[dayKey]) {
        dailyProfits[dayKey] = 0;
      }
      dailyRevenue[dayKey] += parseInt(course.subtotal);
      // dailyProfits[dayKey] += parseInt(course.subtotal - (course.wholesalePrice || 0));
      dailyProfits[dayKey] += parseInt((course.subtotal - (course.wholesalePrice * course.quantity || 0)).toString());

      if (!monthlyRevenue[monthKey]) {
        monthlyRevenue[monthKey] = 0;
      }
      if (!monthlyProfits[monthKey]) {
        monthlyProfits[monthKey] = 0;
      }
      monthlyRevenue[monthKey] += parseInt(course.subtotal);
      // monthlyProfits[dayKey] += parseInt(course.subtotal - (course.wholesalePrice || 0));
      monthlyProfits[monthKey] += parseInt((course.subtotal - (course.wholesalePrice * course.quantity || 0)).toString());

      if (!yearlyRevenue[yearKey]) {
        yearlyRevenue[yearKey] = 0;
      }
      if (!yearlyProfits[yearKey]) {
        yearlyProfits[yearKey] = 0;
      }
      yearlyRevenue[yearKey] += parseInt(course.subtotal);
      // yearlyProfits[dayKey] += parseInt(course.subtotal - (course.wholesalePrice || 0));
      yearlyProfits[yearKey] += parseInt((course.subtotal - (course.wholesalePrice * course.quantity || 0)).toString());

    });

    customer.transactions.printServices.forEach(printService => {
      const printServiceTransactionDate = new Date(printService.date);
      const dayKey = `${printServiceTransactionDate.getFullYear()}-${printServiceTransactionDate.getMonth() + 1}-${printServiceTransactionDate.getDate()}`;
      const monthKey = `${printServiceTransactionDate.getFullYear()}-${printServiceTransactionDate.getMonth() + 1}`;
      const yearKey = `${printServiceTransactionDate.getFullYear()}`;

      if (!dailyRevenue[dayKey]) {
        dailyRevenue[dayKey] = 0;
      }
      if (!dailyProfits[dayKey]) {
        dailyProfits[dayKey] = 0;
      }
      dailyRevenue[dayKey] += parseInt(printService.subtotal);
      // dailyProfits[dayKey] += parseInt(printService.subtotal - (printService.wholesalePrice || 0));
      dailyProfits[dayKey] += parseInt((printService.subtotal - (printService.wholesalePrice * printService.quantity || 0)).toString());

      if (!monthlyRevenue[monthKey]) {
        monthlyRevenue[monthKey] = 0;
      }
      if (!monthlyProfits[monthKey]) {
        monthlyProfits[monthKey] = 0;
      }
      monthlyRevenue[monthKey] += parseInt(printService.subtotal);
      // monthlyProfits[dayKey] += parseInt(printService.subtotal - (printService.wholesalePrice || 0));
      monthlyProfits[monthKey] += parseInt((printService.subtotal - (printService.wholesalePrice * printService.quantity || 0)).toString());

      if (!yearlyRevenue[yearKey]) {
        yearlyRevenue[yearKey] = 0;
      }
      if (!yearlyProfits[yearKey]) {
        yearlyProfits[yearKey] = 0;
      }
      yearlyRevenue[yearKey] += parseInt(printService.subtotal);
      // yearlyProfits[dayKey] += parseInt(printService.subtotal - (printService.wholesalePrice || 0));
      yearlyProfits[yearKey] += parseInt((printService.subtotal - (printService.wholesalePrice || 0)).toString());
    });
  });

  const dailyRevenueData = useMemo(() => {
    return Object.entries(dailyRevenue)
      .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime()).reverse()
      .map(([day, revenue]) => ({
        name: day,
        revenue: revenue,
      }));
  }, [dailyRevenue]);
  const dailyProfitsData = useMemo(() => {
    return Object.entries(dailyProfits)
      .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime()).reverse()
      .map(([day, revenue]) => ({
        name: day,
        revenue: revenue,
      }));
  }, [dailyProfits]);
  const monthlyRevenueData = useMemo(() => {
    return Object.entries(monthlyRevenue)
      .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime()).reverse()
      .map(([month, revenue]) => ({
        name: month,
        revenue: revenue,
      }));
  }, [monthlyRevenue]);
  const monthlyProfitsData = useMemo(() => {
    return Object.entries(monthlyProfits)
      .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime()).reverse()
      .map(([month, revenue]) => ({
        name: month,
        revenue: revenue,
      }));
  }, [monthlyProfits]);
  const yearlyRevenueData = useMemo(() => {
    return Object.entries(yearlyRevenue)
      .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime()).reverse()
      .map(([year, revenue]) => ({
        name: year,
        revenue: revenue,
      }));
  }, [yearlyRevenue]);
  const yearlyProfitsData = useMemo(() => {
    return Object.entries(yearlyProfits)
      .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime()).reverse()
      .map(([year, revenue]) => ({
        name: year,
        revenue: revenue,
      }));
  }, [yearlyProfits]);


  const calculateTotalRevenue = useMemo(() => {
    let total = 0;
    customers.forEach(customer => {
      customer.transactions.products.forEach(transaction => {
        total += parseInt(transaction.subtotal);
      });
    });
    customers.forEach(customer => {
      customer.transactions.courses.forEach(transaction => {
        total += parseInt(transaction.subtotal);
      });
    });
    customers.forEach(customer => {
      customer.transactions.printServices.forEach(transaction => {
        total += parseInt(transaction.subtotal);
      });
    });
    return total;
  }, [customers]);


  const renderTransactions = useCallback((period) => {
    const renderTransactionsByPeriod = (transactions) => {
      return transactions.map((transaction, index) => {
        return (
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

                <div title='السعر اللى اشتريت بيه' className="flex flex-col justify-center items-center">
                  <span className='text-xs font-semibold'>Buy</span>

                  <FormattedPrice className='text-xs font-semibold' amount={+transaction?.wholesalePrice! || 0} />
                </div>
                <div title='السعر اللى هتبيع بيه' className="flex  flex-col justify-center items-center">
                  <span className='text-xs font-semibold'>Sell</span>
                  <FormattedPrice className='text-xs font-semibold' amount={+transaction.piecePrice} />
                </div>
                <div title='عدد القطع المباعه' className="flex  flex-col justify-center items-center">
                  <span className='text-xs font-semibold'>Quantity</span>
                  <span className='text-xs font-semibold'>{+transaction.quantity} </span>
                </div>
                <div title='السعر قبل الخصم' className="flex  flex-col justify-center items-center">
                  <span className='text-xs font-semibold whitespace-nowrap'>Pre-Discount</span>
                  <FormattedPrice className='text-xs font-semibold' amount={+transaction.quantity * +transaction.piecePrice} />
                </div>
                <div title='قيمه الخصم' className="flex  flex-col justify-center items-center">
                  <span className='text-xs font-semibold'>Discount</span>
                  <FormattedPrice className='text-xs font-semibold' amount={+transaction.discount || 0} />
                </div>
                <div title='صافى المبلغ او الفلوس الي انت اخذتها من العميل' className="flex  flex-col justify-center items-center">
                  <span className='text-xs font-semibold'>Total</span>
                  {/* <FormattedPrice className='text-xs font-semibold' amount={+transaction.subtotal > 0 ? +transaction?.subtotal : 0} /> */}
                  <FormattedPrice className='text-xs font-semibold' amount={+transaction?.subtotal} />
                </div>
                {/* {transaction?.wholesalePrice && +transaction?.wholesalePrice !== 0 ? */}
                {/* {transaction?.wholesalePrice ? (
                  <>
                    {+transaction.wholesalePrice && (+transaction.wholesalePrice * +transaction.quantity) < +transaction.subtotal ? (
                      <div title='كسبان' className='flex  flex-col items-center'>
                        <span className='text-xs flex items-center text-green-400 font-semibold'>Profit <TrendingUp className='ml-1' size={16} /></span>
                        <FormattedPrice className='text-xs text-green-400 font-semibold' amount={((+transaction.subtotal) - (+transaction.wholesalePrice * +transaction.quantity))} />
                      </div>
                    ) : null}

                    {+transaction.wholesalePrice && Math.abs((+transaction.wholesalePrice * +transaction.quantity) - +transaction.subtotal) < 0.01 ? (
                      <div title='كلون' className='flex  flex-col items-center'>
                        <span className='text-xs flex items-center text-orange-400 font-semibold'>Fair <Diff className='ml-1' size={16} /></span>
                        <FormattedPrice className='text-xs text-orange-400 font-semibold' amount={((+transaction.subtotal) - (+transaction.wholesalePrice * +transaction.quantity))} />
                      </div>
                    ) : null}

                    {+transaction.wholesalePrice && (+transaction.wholesalePrice * +transaction.quantity) > +transaction.subtotal ? (
                      <div title='خسران' className='flex  flex-col items-center'>
                        <span className='text-xs flex items-center text-red-400 font-semibold'>Loss <TrendingDown className='ml-1' size={16} /></span>
                        <FormattedPrice className='text-xs text-red-400 font-semibold' amount={((+transaction.wholesalePrice * +transaction.quantity) - (+transaction.subtotal))} />
                      </div>
                    ) : null}
                  </>
                ) : null} */}
                {transaction.wholesalePrice !== undefined && (
                  <>
                    {((+transaction.wholesalePrice * +transaction.quantity) < +transaction.subtotal) && (
                      <div title='مكسب' className='flex flex-col items-center'>
                        <span className='text-xs flex items-center text-green-400 font-semibold'>Profit <TrendingUp className='ml-1' size={16} /></span>
                        <FormattedPrice className='text-xs text-green-400 font-semibold' amount={((+transaction.subtotal) - (+transaction.wholesalePrice * +transaction.quantity))} />
                      </div>
                    )}

                    {((+transaction.wholesalePrice * +transaction.quantity) > +transaction.subtotal) && (
                      <div title='خسارة' className='flex flex-col items-center'>
                        <span className='text-xs flex items-center text-red-400 font-semibold'>Loss <TrendingDown className='ml-1' size={16} /></span>
                        <FormattedPrice className='text-xs text-red-400 font-semibold' amount={((+transaction.wholesalePrice * +transaction.quantity) - (+transaction.subtotal))} />
                      </div>
                    )}

                    {((+transaction.wholesalePrice * +transaction.quantity) >= +transaction.subtotal && (+transaction.wholesalePrice * +transaction.quantity) <= +transaction.subtotal) && (
                      <div title='بدون عائد' className='flex flex-col items-center'>
                        <span className='text-xs flex items-center text-orange-400 font-semibold'>Fair <Diff className='ml-1' size={16} /></span>
                        <FormattedPrice className='text-xs text-orange-400 font-semibold' amount={0} />
                      </div>
                    )}
                  </>
                )}

              </div>
            </div>

          </Link>
        )
      });
    };

    switch (period) {
      case 'daily':
        return Object.keys(dailySells)
          .filter(day => day.includes(searchQuery))
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
          .filter(month => month.includes(searchQuery))

          .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
          .map(month => (
            <div key={month} className="mb-4">
              <h3 className="text-lg font-semibold">{month}</h3>
              {renderTransactionsByPeriod(monthlySells[month])}
            </div>
          ));

      case 'yearly':
        return Object.keys(yearlySells)
          .filter(year => year.includes(searchQuery))

          .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
          .map(year => (
            <div key={year} className="mb-4">
              <h3 className="text-lg font-semibold">{year}</h3>
              {renderTransactionsByPeriod(yearlySells[year])}
            </div>
          ));

      case 'revenue':
        return (
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">

            <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
            <div className="bg-white rounded-lg p-4 mb-4">
              <div className="flex items-center mb-4">
                <Banknote className="w-6 h-6 mr-2 text-blue-500" />
                <p className="text-md font-semibold">Total Revenue:</p>
                <p className="ml-auto text-lg font-semibold">
                  <FormattedPrice amount={calculateTotalRevenue} /></p>
              </div>
              <div>
                <h4 className="text-md font-semibold mb-2">Daily Revenue and Profits</h4>
                {Object.entries(dailyRevenue)
                  .filter(([day, revenue]) => day.includes(searchQuery))

                  .sort(([dayA]: [string, any], [dayB]: [string, any]) => {
                    // Convert dates to Date objects
                    const dateA = new Date(dayA);
                    const dateB = new Date(dayB);
                    // Compare dates
                    return dateB.getTime() - dateA.getTime();
                  })
                  .map(([day, revenue]) => (
                    <p key={day} className="flex items-center my-2">
                      <Clock className="w-5 h-5 mr-2 text-blue-500" />
                      {day}
                      <div className="flex-grow border-t-2 border-dashed border-slate-300 mx-3"></div>
                      <span>Revenue: <FormattedPrice amount={revenue as number} /></span>
                      {dailyProfits[day] && (
                        <span className="ml-3">Outcome: <FormattedPrice amount={dailyProfits[day] as number} /></span>
                      )}
                    </p>
                  ))}
              </div>

            </div>
            <div className="bg-white rounded-lg p-4 mb-4">
              <div className="flex items-center mb-4">
                <Calendar className="w-6 h-6 mr-2 text-green-500" />
                <p className="text-md font-semibold">Monthly Revenue</p>
              </div>
              <div>
                {Object.entries(monthlyRevenue)
                  .filter(([month, revenue]) => month.includes(searchQuery))

                  .sort(([dayA]: [string, any], [dayB]: [string, any]) => {
                    // Convert dates to Date objects
                    const dateA = new Date(dayA);
                    const dateB = new Date(dayB);
                    // Compare dates
                    return dateB.getTime() - dateA.getTime();
                  })
                  .map(([day, revenue]) => (
                    <p key={day} className="flex items-center my-2">
                      <Clock className="w-5 h-5 mr-2 text-blue-500" />
                      {day}
                      <div className="flex-grow border-t-2 border-dashed border-slate-300 mx-3"></div>
                      <span>Revenue: <FormattedPrice amount={revenue as number} /></span>
                      {monthlyProfits[day] && (
                        <span className="ml-3">Outcome: <FormattedPrice amount={monthlyProfits[day] as number} /></span>
                      )}
                    </p>
                  ))}
              </div>

            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center mb-4">
                <Package className="w-6 h-6 mr-2 text-orange-500" />
                <p className="text-md font-semibold">Yearly Revenue and Profits</p>
              </div>
              <div>
                {Object.entries(yearlyRevenue)
                  .filter(([year, revenue]) => year.includes(searchQuery))

                  .sort(([dayA]: [string, any], [dayB]: [string, any]) => {
                    // Convert dates to Date objects
                    const dateA = new Date(dayA);
                    const dateB = new Date(dayB);
                    // Compare dates
                    return dateB.getTime() - dateA.getTime();
                  })
                  .map(([day, revenue]) => (
                    <p key={day} className="flex items-center my-2">
                      <Clock className="w-5 h-5 mr-2 text-blue-500" />
                      {day}
                      <div className="flex-grow border-t-2 border-dashed border-slate-300 mx-3"></div>
                      <span>Revenue: <FormattedPrice amount={revenue as number} /></span>
                      {yearlyProfits[day] && (
                        <span className="ml-3">Outcome: <FormattedPrice amount={yearlyProfits[day] as number} /></span>
                      )}
                    </p>
                  ))}
              </div>

            </div>
          </div>
        );

      default:
        return null;
    }
  }, [dailySells, monthlySells, yearlySells, searchQuery]);




  return (
    // <div className="overflow-auto mx-auto p-4">
    <div className={`${!show ? "border border-orange-500 border-dashed" : ""} bg-white  rounded-lg mb-5 overflow-hidden`}>
      <div
        className="flex items-center p-5 justify-between cursor-pointer"
        onClick={() => setShow(!show)}
      >
        <h3 className="transform  transition-transform duration-500 font-semibold text-orange-500">
          {show ? "Click to Collapse" : "Expand Revenue Overview"}
        </h3>
        <ChevronDown
          className={`transform text-orange-500 transition-transform duration-300 ${show ? "rotate-180" : ""
            }`}
          size={25}
        />
      </div>
      {show && <>
        <button
          className="mr-5 mb-4 ml-auto block"
          onClick={() =>
            handleRefresh()
          }
        >
          <RefreshCcw className={`${refresh ? "animate-spin" : ""}`} size={16} />
        </button>
        <div className="px-5 grid grid-cols-1 md:grid-cols-4 gap-4">

          <div className="bg-white border border-indigo-500 rounded-lg shadow-lg p-4 flex items-center justify-center cursor-pointer"
            onClick={() => handlePeriodClick('daily')}>
            <Clock className="w-8 h-8 mr-2 text-indigo-500" />
            <div>
              <h3 className="text-lg text-indigo-600 font-semibold">Daily Revenue</h3>
              <p className="text-indigo-500">{Object.keys(dailySells).length}</p>
            </div>
          </div>
          <div className="bg-white border border-green-500  rounded-lg shadow-lg p-4 flex items-center justify-center cursor-pointer"
            onClick={() => handlePeriodClick('monthly')}>
            <Calendar className="w-8 h-8 mr-2 text-green-500" />
            <div>
              <h3 className="text-lg text-green-500  font-semibold">Monthly Revenue</h3>
              <p className="text-green-500 ">{Object.keys(monthlySells).length}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-orange-500 shadow-lg p-4 flex items-center justify-center cursor-pointer"
            onClick={() => handlePeriodClick('yearly')}>
            <Package className="w-8 h-8 mr-2 text-orange-500" />
            <div>
              <h3 className="text-lg text-orange-500 font-semibold">Yearly Revenue</h3>
              <p className="text-orange-600">{Object.keys(yearlySells).length}</p>
            </div>
          </div>
          <div className="bg-white border border-rose-500 rounded-lg shadow-lg p-4 flex items-center justify-center cursor-pointer"
            onClick={() => handlePeriodClick('revenue')}>
            <Banknote className="w-8 h-8 mr-2 text-rose-500" />
            <div>
              <h3 className="text-lg text-rose-500 font-semibold">Total Revenue</h3>
              <p className="text-rose-600"><FormattedPrice amount={calculateTotalRevenue} /></p>
            </div>
          </div>
        </div>
        {selectedPeriod && (
          <div className="mt-8 px-5">
            <h2 className="text-xl font-semibold mb-4">{`Transactions for ${selectedPeriod}`}</h2>
            <input
              type="text"
              placeholder="Search for transactions by date..."
              value={searchQuery}
              className='border rounded py-2 px-4 w-full border-zinc-300 mx-auto'
              onChange={(e) => handleSearchInputChange(e)}
            />
            <div className=" h-[400px] overflow-auto bg-white rounded-lg shadow-lg p-4">
              {renderTransactions(selectedPeriod)}
            </div>
          </div>
        )}
        {/* Render Revenue Charts */}
        <RevenueCharts monthlyProfitsData={monthlyProfitsData} yearlyProfitsData={yearlyProfitsData} dailyProfitsData={dailyProfitsData} dailyRevenueData={dailyRevenueData} monthlyRevenueData={monthlyRevenueData} yearlyRevenueData={yearlyRevenueData} />
      </>
      }
    </div>
  );

};

export default TransactionAnalyzer;
