
"use client"
import { useState, useEffect } from 'react';

import { Chart, LinearScale, CategoryScale } from 'chart.js';
import { BoxPlotController, BoxAndWiskers } from '@sgratzl/chartjs-chart-boxplot';
Chart.register(BoxPlotController, BoxAndWiskers, LinearScale, CategoryScale);

export default function PlotFoldChange(props) {
  const { motifName, pfm, info } = props;

  const [width, setWidth] = useState(null);

  useEffect(() => {
    const pos = Object.keys(pfm);

    const foldChange = [];
    pos.forEach(e => {
      const fc = [];
      const ref = [];
      const alt = [];
      const changes = {};
      info["pos"].forEach((x, i) => {
        if (x == e) {
          fc.push(info['fc'][i]);
          const change = info['ref'][i] + "->" + info['alt'][i];
          if (change in changes) {
            changes[change] += 1;
          } else {
            changes[change] = 1;
          }
          ref.push(info['ref'][i]);
          alt.push(info['alt'][i]);
        }
      });
      foldChange.push(fc);
      // console.log(e, changes);
      // console.log(e, ref, alt);
    });
    
    const boxplotData = {
      labels: pos,
      datasets: [{
        label: 'Fold Change',
        backgroundColor: 'rgba(0,255,0,0.5)',
        borderColor: 'green',
        borderWidth: 1,
        outlierColor: '#999999',
        padding: 10,
        itemRadius: 0,
        data: foldChange
      }]
    };

    const ctx = document.getElementById("foldChange").getContext("2d");
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

    myChart.canvas.parentNode.style.marginLeft = -2 * pos.length  + 'px';
    myChart.canvas.parentNode.style.width = 42*pos.length + 'px';
    setWidth(42*pos.length + 14 + 'px');

    return () => {
      myChart.destroy();
    };
  }, [motifName, pfm, info]);

  return (
    <div className="mt-8">
      <canvas id="foldChange" />
      <p className="invisible">{width}</p>
    </div>
  );
}