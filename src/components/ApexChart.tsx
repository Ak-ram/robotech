// import React, { useState, useEffect } from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// const ApexChart = ({ categoryStats }) => {
//   const [chartData, setChartData] = useState([]);

//   useEffect(() => {
//     if (categoryStats) {
//       const data = categoryStats.map((category) => ({
//         name: abbreviateName(category.categoryName),
//         fullName: category.categoryName, // Full name for tooltip
//         value: category.inStockLength,
//       }));

//       setChartData(data);
//     }
//   }, [categoryStats]);

//   // Function to abbreviate the category name
//   const abbreviateName = (fullName) => {
//     // Your abbreviation logic goes here
//     // For simplicity, let's just use the first two characters
//     return fullName.substring(0, 2).toUpperCase();
//   };

//   return (
//     <div>
//       <BarChart width={400} height={200} data={chartData}>
//         <CartesianGrid strokeDasharray="1 1" />
//         <XAxis dataKey="name" angle={-60} textAnchor="end" interval={0} />
//         <YAxis />
//         <Tooltip formatter={(value, name, props) => [value, props.payload.fullName]} />
//         <Legend
//           formatter={(value, entry, index) => (
//             <span style={{ color: entry.color }}>In Stock Qunatity</span>
//           )}
//           align="right"
//           verticalAlign="top"
//           height={36}
//         />
//         <Bar dataKey="value" fill="#1a73e8" label={{ position: 'top', fill: '#1a73e8' }} />
//       </BarChart>
//     </div>
//   );
// };

// export default ApexChart;


import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ApexChart = ({ categoryStats }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (categoryStats) {
      const data = categoryStats.map((category) => ({
        name: abbreviateName(category.categoryName),
        fullName: category.categoryName,
        value: category.inStockLength,
      }));

      setChartData(data);
    }
  }, [categoryStats]);

  const abbreviateName = (fullName) => {
    return fullName.substring(0, 2).toUpperCase();
  };

  return (
    <div>
      <LineChart className='w-full' width={600} height={400} data={chartData}>
        <CartesianGrid strokeDasharray="1 1" />
        <XAxis dataKey="name" angle={-60} textAnchor="end" interval={0} />
        <YAxis />
        <Tooltip formatter={(value, name, props) => [value, props.payload.fullName]} />
        {/* <Legend
          formatter={(value, entry, index) => (
            <span style={{ color: entry.color }}>In Stock Quantity</span>
          )}
          align="right"
          verticalAlign="top"
          height={36}
        /> */}
        <Line type="monotone" dataKey="value" stroke="#1a73e8" label={{ position: 'top', fill: '#1a73e8' }} />
      </LineChart>
    </div>
  );
};

export default ApexChart;
