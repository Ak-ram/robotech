import supabase from "@/supabase/config";
import { useEffect, useState } from "react";
import { Bill } from "../../type";
import { formatDate } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const TransactionAnalyzer = () => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState('');
  const [dailyStats, setDailyStats] = useState<
    { date: string; totalSells: number; totalProfit: number }[]
  >([]);
  const [monthlyStats, setMonthlyStats] = useState<
    { month: string; totalSells: number; totalProfit: number }[]
  >([]);
  const [yearlyStats, setYearlyStats] = useState<
    { year: string; totalSells: number; totalProfit: number }[]
  >([]);

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
    // Calculate daily stats when bills state changes
    const calculateDailyStats = () => {
      const dailyStatsMap = new Map<
        string,
        { totalSells: number; totalProfit: number }
      >();

      // console.log('bbb',bills[0]?.data[0]?.date); // Sun, Apr 14, 2024, 03:34 PM
      // console.log('dddd',bills[0]?.created_at); // 2024-04-14T13:41:41.99372+00:00
      bills.forEach((bill) => {
        let date;
        if (bill.billCreatedDate) {
          const d = new Date(bill.billCreatedDate).toISOString()
          date = formatDate(d);
        } else {
          date = formatDate(bill.created_at)

        }


        if (!dailyStatsMap.has(date)) {
          dailyStatsMap.set(date, { totalSells: 0, totalProfit: 0 });
        }

        const dailyStat = dailyStatsMap.get(date)!;
        dailyStat.totalSells += bill.data.reduce(
          (acc, curr) => acc + curr.subtotal,
          0,
        );
        dailyStat.totalProfit += bill.data.reduce(
          (acc, curr) =>
            acc + (curr.subtotal - curr.wholesalePrice * curr.quantity),
          0,
        );
      });

      const dailyStatsArray = Array.from(dailyStatsMap).map(
        ([date, { totalSells, totalProfit }]) => ({
          date,
          totalSells,
          totalProfit,
        }),
      );

      setDailyStats(dailyStatsArray);
    };

    const calculateMonthlyAndYearlyStats = () => {
      const monthlyStatsMap = new Map<
        string,
        { totalSells: number; totalProfit: number }
      >();
      const yearlyStatsMap = new Map<
        string,
        { totalSells: number; totalProfit: number }
      >();

      bills.forEach((bill) => {
        // const date = new Date(bill.created_at);
        let date;
        if (bill.billCreatedDate) {
          const d = new Date(bill.billCreatedDate).toISOString()
          date = new Date(d);
        } else {
          date = new Date(bill.created_at);

        }
        const month = `${date.getMonth() + 1}-${date.getFullYear()}`;
        const year = `${date.getFullYear()}`;

        if (!monthlyStatsMap.has(month)) {
          monthlyStatsMap.set(month, { totalSells: 0, totalProfit: 0 });
        }
        if (!yearlyStatsMap.has(year)) {
          yearlyStatsMap.set(year, { totalSells: 0, totalProfit: 0 });
        }

        const monthlyStat = monthlyStatsMap.get(month)!;
        const yearlyStat = yearlyStatsMap.get(year)!;

        monthlyStat.totalSells += bill.data.reduce(
          (acc, curr) => acc + curr.subtotal,
          0,
        );
        monthlyStat.totalProfit += bill.data.reduce(
          (acc, curr) =>
            acc + (curr.subtotal - curr.wholesalePrice * curr.quantity),
          0,
        );

        yearlyStat.totalSells += bill.data.reduce(
          (acc, curr) => acc + curr.subtotal,
          0,
        );
        yearlyStat.totalProfit += bill.data.reduce(
          (acc, curr) =>
            acc + (curr.subtotal - curr.wholesalePrice * curr.quantity),
          0,
        );
      });

      const monthlyStatsArray = Array.from(monthlyStatsMap).map(
        ([month, { totalSells, totalProfit }]) => ({
          month,
          totalSells,
          totalProfit,
        }),
      );
      const yearlyStatsArray = Array.from(yearlyStatsMap).map(
        ([year, { totalSells, totalProfit }]) => ({
          year,
          totalSells,
          totalProfit,
        }),
      );

      setMonthlyStats(monthlyStatsArray);
      setYearlyStats(yearlyStatsArray);
    };

    calculateDailyStats();
    calculateMonthlyAndYearlyStats();
  }, [bills]);


  const sortedDailyStats = dailyStats.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  })

  return (
    <section
      className={` ${!show ? "border border-indigo-300 border-dashed" : ""
        } bg-white rounded-lg p-5 mb-5`}
    >
      <div
        className={`flex items-center justify-between cursor-pointer`}
        onClick={() => setShow(!show)}
      >
        <h3 className="transform  transition-transform duration-500 font-semibold text-indigo-500">
          {show ? "Click to Collapse" : "Expand Bill Analizer"}
        </h3>
        <ChevronDown
          className={`text-blue-300 transform transition-transform duration-300 ${show ? "rotate-180" : ""
            }`}
          size={25}
        />
      </div>
      {show && (
        <div className="grid gap-4 mt-5">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl  font-semibold mb-2">Daily Profits</h2>
              <input
                placeholder="Search By Date (ex; 14/4/2024)"
                className="mb-2 border border-blue-400 px-2 py-1 w-[50%] rounded"
                type="search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
            <div className="max-h-[300px] overflow-auto">
              {sortedDailyStats
                .filter((item) => item.date.includes(searchValue)).map((dailyStat, index) => (
                  <div
                    key={index}
                    className={`p-4 bg-gray-100 rounded-lg mb-2 flex justify-between items-center`}
                  >
                    <h3 className="text-lg font-semibold">
                      Date: { new Date(dailyStat.date).toLocaleDateString('ar-eg')}

                    </h3>
                    <p>Total Sells: {dailyStat.totalSells} L.E</p>
                    <p>Total Profit: {dailyStat.totalProfit} L.E</p>
                  </div>
                ))}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Monthly Profits</h2>
            <div className="max-h-[300px] overflow-auto">

              {monthlyStats.map((monthlyStat, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-4 rounded-lg mb-2 flex justify-between items-center"
                >
                  <h3 className="text-lg font-semibold">
                    Month: {monthlyStat.month}
                  </h3>
                  <p>Total Sells: {monthlyStat.totalSells} L.E</p>
                  <p>Total Profit: {monthlyStat.totalProfit} L.E</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Yearly Profits</h2>
            <div className="max-h-[300px] overflow-auto">

              {yearlyStats.map((yearlyStat, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-4 rounded-lg mb-2 flex justify-between items-center"
                >
                  <h3 className="text-lg font-semibold">
                    Year: {yearlyStat.year}
                  </h3>
                  <p>Total Sells: {yearlyStat.totalSells} L.E</p>
                  <p>Total Profit: {yearlyStat.totalProfit} L.E</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TransactionAnalyzer;
