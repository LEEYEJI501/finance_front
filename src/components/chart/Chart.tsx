import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ChartComponent = ({ stockData }) => {
  const chartData = {
    labels: stockData.map(stock => stock.date),
    datasets: [
      {
        label: '',
        data: stockData.map(stock => stock.closePrice),
        borderColor: 'rgba(255, 255, 255, 0.8)',
        backgroundColor: 'rgba(0, 0, 0, 0)', 
        pointRadius: 0, 
        borderWidth: 2, 
        tension: 0.4, 
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,   // X축 그리드 
        },
        ticks: {
          display: false,   // X축 라벨 
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', 
        },
        ticks: {
          display: true,   // Y축 라벨
        },
      },
    },
    plugins: {
      legend: {
        display: false,   // 범례
      },
      tooltip: {
        enabled: true,   // 툴팁
      },
    },
  };

  return (
    <div className="w-full h-96 bg-gray-900 rounded-lg p-4"> 
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default ChartComponent;
