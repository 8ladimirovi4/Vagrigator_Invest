import React from "react";
import { Line } from "react-chartjs-2";

const ChartLine = ({ monthlyName, monthlyData }) => {
  const options = {
    responsive: true,
   plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Исторические данные',
        font: {size: "15px"}
      },
    }
  };
  const lineChartData = {
    labels: monthlyName,
    datasets: [
      {
        data: monthlyData,
        label: "Стоимость",
        borderColor: "rgba(1, 13, 117)",
        backgroundColor: "rgba(121, 183, 219, 0.5)",
        //backgroundColor: "rgba(1, 13, 117)",
        fill: true,
        // lineTension: 0.5,
      },
    ],
  };

  return <Line width={110} height={30} data={lineChartData} options={options} />;
};
export default ChartLine;
