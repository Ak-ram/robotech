import supabase from "@/supabase/config";
import { useEffect, useState } from "react";
import { Bill } from "../../type";
import { formatDate } from "@/lib/utils";

const TransactionAnalyzer = () => {
  const [bills, setBills] = useState<Bill[]>([]);
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

      bills.forEach((bill) => {
        const date = formatDate(bill.created_at);

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
        const date = new Date(bill.created_at);
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Bills Analyzer</h1>
      <div className="grid gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Daily Profits</h2>
          {dailyStats.map((dailyStat, index) => (
            <div
              key={index}
              className="bg-gray-100 p-4 rounded-lg mb-2 flex justify-between items-center"
            >
              <h3 className="text-lg font-semibold">Date: {dailyStat.date}</h3>
              <p>Total Sells: {dailyStat.totalSells} L.E</p>
              <p>Total Profit: {dailyStat.totalProfit} L.E</p>
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Monthly Profits</h2>
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
        <div>
          <h2 className="text-xl font-semibold mb-2">Yearly Profits</h2>
          {yearlyStats.map((yearlyStat, index) => (
            <div
              key={index}
              className="bg-gray-100 p-4 rounded-lg mb-2 flex justify-between items-center"
            >
              <h3 className="text-lg font-semibold">Year: {yearlyStat.year}</h3>
              <p>Total Sells: {yearlyStat.totalSells} L.E</p>
              <p>Total Profit: {yearlyStat.totalProfit} L.E</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionAnalyzer;
