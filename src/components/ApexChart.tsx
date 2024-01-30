import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexChart = ({ categoryStats }) => {
  const [chartState, setChartState] = useState({
    series: [],
    options: {
      chart: {
        width: 600,
        type: 'pie',
      },
      labels: [],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    },
  });

  useEffect(() => {
    if (categoryStats) {
      const seriesData = categoryStats.map((category) => category.inStockLength);
      const labelsData = categoryStats.map((category) => category.categoryName);

      setChartState({
        ...chartState,
        series: seriesData,
        options: {
          ...chartState.options,
          labels: labelsData,
        },
      });
    }
  }, [categoryStats]);

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={chartState.options} series={chartState.series} type="pie" width={600} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ApexChart;
