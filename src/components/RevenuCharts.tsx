
import { LineChart, XAxis, CartesianGrid, Tooltip, Legend, YAxis, Line } from "recharts";

 const RevenueCharts = ({ dailyProfitsData, dailyRevenueData,monthlyProfitsData,yearlyProfitsData, monthlyRevenueData, yearlyRevenueData }) => {
  const combinedData = dailyProfitsData.map((dataPoint, index) => {
    const revenue = Math.max(0, dailyRevenueData[index].revenue); // Set negative revenue to zero
    return {
      name: dataPoint.name,
      profit: dataPoint.revenue,
      revenue: revenue,
    };
  });
  
  const monthlyCombinedData = monthlyRevenueData.map((dataPoint, index) => {
    const revenue = Math.max(0, dataPoint.revenue); // Set negative revenue to zero
    return {
      name: dataPoint.name,
      profit: monthlyProfitsData[index].revenue,
      revenue: revenue,
    };
  });
  
  const yearlyCombinedData = yearlyRevenueData.map((dataPoint, index) => {
    const revenue = Math.max(0, dataPoint.revenue); // Set negative revenue to zero
    return {
      name: dataPoint.name,
      profit: yearlyProfitsData[index].revenue,
      revenue: revenue,
    };
  });
  

  return (
    <div className="mt-8 px-5">
      <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>

      <div className="flex p-6 bg-white rounded overflow-auto">
        <div className="">
          <h4 className="text-md font-semibold mb-2 text-indigo-500">Daily Sells and Profits</h4>
          <LineChart width={760} height={300} data={combinedData}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid stroke="#eee" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#8884d8" name="Daily Sells" />
            <Line type="monotone" dataKey="profit" stroke="#82ca9d" name="Daily Profits" />
            
          </LineChart>
        </div>
      </div>

      <div className="flex p-6 bg-white rounded overflow-auto">
        <div className="">
          <h4 className="text-md font-semibold mb-2 text-indigo-500">Monthly Sells and Profits</h4>
          <LineChart width={760} height={300} data={monthlyCombinedData}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid stroke="#eee" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#8884d8" name="Monthly Sells" />
            <Line type="monotone" dataKey="profit" stroke="#82ca9d" name="Monthly Profits" />
          </LineChart>
        </div>
      </div>

      <div className="flex p-6 bg-white rounded overflow-auto">
        <div className="">
          <h4 className="text-md font-semibold mb-2 text-indigo-500">Yearly Sells and Profits</h4>
          <LineChart width={760} height={300} data={yearlyCombinedData}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid stroke="#eee" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#8884d8" name="Yearly Sells" />
            <Line type="monotone" dataKey="profit" stroke="#82ca9d" name="Yearly Profits" />
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default RevenueCharts;