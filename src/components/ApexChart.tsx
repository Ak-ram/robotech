import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const ApexChart = ({ categoryStats }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (categoryStats) {
      const data = categoryStats.map((category) => ({
        name: category.categoryName,
        value: category.inStockLength,
      }));

      setChartData(data);
    }
  }, [categoryStats]);

  return (
    <div>
      <ResponsiveContainer width={600} height={400}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}`}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={generateRandomColor()} />
            ))}
          </Pie>
          <Legend />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

// Function to generate random colors for chart slices
const generateRandomColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
};

export default ApexChart;