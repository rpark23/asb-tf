"use client"
import { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

export default function PlotCounts(props) {
  const { motifName, pfm, info } = props;

  const [width, setWidth] = useState(null);

  useEffect(() => {
    const pos = Object.keys(pfm);

    const unique = new Set(info["pos"]);
    const counts = new Array(pos.length).fill(0);
    unique.forEach(e => {
      info["pos"].forEach(x => {
        if (x == e) {
          counts[e] += 1
        }
      })
    });

    const posIndices = Array.from(Array(pos.length).keys());

    // const ctx = document.getElementById(motifName);
    const ctx = document.getElementById("counts");
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: posIndices,
        datasets: [{
          label: ' # of ASB Sites',
          data: counts,
          backgroundColor: 'rgba(255,0,0,0.5)',
          borderColor: 'red',
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          legend: {
            position: "top" //"bottom"
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    
    myChart.canvas.parentNode.style.marginLeft = -2 * pos.length + 'px';
    myChart.canvas.parentNode.style.width = 42*pos.length + 'px';
    setWidth(42*pos.length + 14 + 'px');

    return () => {
      myChart.destroy();
    };
  }, [pfm]);
  // }, [motifName, pfm, info]);

  return (
    <div>
      {/* <canvas width={`${pfm.length}px`} id="counts"/> */}
      <canvas id="counts"/>
      <p className="invisible">{width}</p>
      {/* <canvas id={motifName}/> */}
    </div>
  );
}