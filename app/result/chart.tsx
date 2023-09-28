'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  Tooltip,
  PointElement,
  ArcElement,
} from "chart.js";
import React from 'react';


// Register ChartJS components using ChartJS.register
ChartJS.register(
  ArcElement,
  Tooltip
);

import { Doughnut } from 'react-chartjs-2';


export default function Chart(args: any) {
  const { rendimento, idade } = args;

  const moradia = (rendimento * .20).toFixed(2);
  const educacao = (rendimento * .25).toFixed(2);
  const alimentacao = (rendimento * .25).toFixed(2);
  const lazer = (rendimento * .10).toFixed(2);
  const investimentos = (rendimento * .20).toFixed(2);

  const totalGastos = parseFloat(moradia + educacao + alimentacao + lazer + investimentos).toFixed(2);


  const computed_data = [moradia, educacao, alimentacao, lazer, investimentos]
  const computer_labels = ['Moradia', 'Educação', 'Alimentação', 'Lazer', 'Investimentos']
  const customLabels = computer_labels.map((label, index) => `${label}: ${computed_data[index]}`)

  console.log(investimentos);

  const data = {
    labels: customLabels,
    datasets: [
      {
        label: 'Recomendação',
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        data: [moradia, educacao, alimentacao, lazer, investimentos]
      },
    ],
  };

  const options = {
    maintainAspectRatio: false, // Evita que o gráfico de pizza seja distorcido
    legend: { display: true, position: "right" },

    datalabels: {
      display: true,
      color: "white",
    },
    tooltips: {
      backgroundColor: "#5a6e7f",
    },
  };

  return (
    <div className="w-full max-w-md p-6">
      <div className="w-full max-w-md p-6">
        <Doughnut height="190px" width="190px" data={data} options={options} />
      </div>
      <div className="text-white">

        <p>Com base em um rendimento mensal de <b>R$ {rendimento}</b>, recomendamos a seguinte distribuição de gastos:</p>
        <br />
        <br />

        <ul>
          <li style={{paddingBottom: '7px'}}><b>Moradia (20%)</b>: R$ {moradia} - Para manter sua habitação, incluindo aluguel ou hipoteca.</li>
          <li style={{paddingBottom: '7px'}}><b>Educação (25%)</b>: R$ {educacao} - Para investir em sua educação, cursos e livros.</li>
          <li style={{paddingBottom: '7px'}}><b>Alimentação (25%)</b>: R$ {alimentacao} - Para manter uma dieta saudável e fazer compras.</li>
          <li style={{paddingBottom: '7px'}}><b>Lazer (10%)</b>: R$ {lazer} - Para desfrutar de atividades de lazer e entretenimento.</li>
          <li style={{paddingBottom: '7px'}}><b>Investimentos (20%)</b>: R$ {investimentos} - Para construir seu futuro financeiro através de investimentos.</li>
        </ul>

        <p>O valor total disponível para gastos é de R$ {totalGastos}</p>
      </div>
    </div>

  );
}