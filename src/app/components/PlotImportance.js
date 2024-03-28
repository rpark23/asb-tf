
"use client"
import { useState, useEffect } from 'react';

import { Chart, LinearScale, CategoryScale } from 'chart.js';
import { BoxPlotController, BoxAndWiskers } from '@sgratzl/chartjs-chart-boxplot';
Chart.register(BoxPlotController, BoxAndWiskers, LinearScale, CategoryScale);

export default function PlotImportance(props) {
  const { motifName, pfm, info } = props;

  const [width, setWidth] = useState(null);

  useEffect(() => {
    const pos = Object.keys(pfm);

    const importance1 = [];
    const importance2 = [];
    const importance3 = [];
    const importance4 = [];
    pos.forEach(e => {
      const scores1 = [];
      const scores2 = [];
      const scores3 = [];
      const scores4 = [];
      info["pos"].forEach((x, i) => {
        if (x == e) {
          scores1.push(info[0][i]);
          scores2.push(info[1][i]);
          scores3.push(info[2][i]);
          scores4.push(info[3][i]);
        }
      });
      importance1.push(scores1);
      importance2.push(scores2);
      importance3.push(scores3);
      importance4.push(scores4);
    });
    
    const boxplotData = {
      labels: pos,
      datasets: [{
        label: 'Importance Score 1',
        backgroundColor: 'rgba(255,0,0,0.5)',
        borderColor: 'red',
        borderWidth: 1,
        outlierColor: '#999999',
        padding: 10,
        itemRadius: 0,
        data: importance1
      }, {
        label: 'Importance Score 2',
        backgroundColor: 'rgba(0,255,0,0.5)',
        borderColor: 'green',
        borderWidth: 1,
        outlierColor: '#999999',
        padding: 10,
        itemRadius: 0,
        data: importance2
      }, {
        label: 'Importance Score 3',
        backgroundColor: 'rgba(0,0,255,0.5)',
        borderColor: 'blue',
        borderWidth: 1,
        outlierColor: '#999999',
        padding: 10,
        itemRadius: 0,
        data: importance3
      }, {
        label: 'Importance Score 4',
        backgroundColor: 'rgba(255,165,0,0.5)',
        borderColor: 'orange',
        borderWidth: 1,
        outlierColor: '#999999',
        padding: 10,
        itemRadius: 0,
        data: importance4
      }]
    };

    const ctx = document.getElementById("importance").getContext("2d");
    const myChart = new Chart(ctx, {
      type: 'boxplot',
      data: boxplotData,
      options: {
        responsive: true,
        legend: {
          position: 'top',
        },
        plugins: {
          tooltip: {
            enabled: false
          }
        }
      }
    });

    myChart.canvas.parentNode.style.marginLeft = -2 * pos.length - 14 + 'px';
    myChart.canvas.parentNode.style.width = 42*pos.length + 14 + 'px';
    setWidth(42*pos.length + 14 + 'px');

    return () => {
      myChart.destroy();
    };
  }, [motifName, pfm, info]);

  return (
    <div className="mt-8">
      <canvas id="importance" />
      <p className="invisible">{width}</p>
      {/* <canvas id={motifName + "importance"} /> */}
    </div>
  );
}