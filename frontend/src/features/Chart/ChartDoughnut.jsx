import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import './ChartDoughnut.css';

const ChartDoughnut = ({ realEstate, auto, cash, stock }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        align: 'center', 
        font: {weight: 'bold'},
        labels: {
          position: 'static',
          font: {size: "18px"}, 
          boxWidth: 30,
          // textAlign	: "right",
          padding: 30,
          // textAlign: 'center', 
          
         },
      },
     title: {
       display: true,
       text: 'Аналитика',
       font: {size: "25px"},
       padding: 40,
     },
     
   }
  };
  const lineChartData = {
    labels: ['Недвижимость', 'Прочие активы', 'Валюта', 'Биржа'],
    cutoutPercentage: 10,
    datasets: [
      {
        data: [realEstate.currentPrice, auto.currentPrice, cash, stock.purchasePrice],
        labels: ['Red', 'Yellow', 'Blue', 'Green'],
        borderColor: '#fff',
        hoverBorderColor: 'white',
        offset: 10,

        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'green',
        ],
        hoverOffset: 3,
        weight: 200,
        fill: true,
      },
    ],
  };

  return <Doughnut width={4} height={1} options={options} data={lineChartData} />;
};
export default ChartDoughnut;
