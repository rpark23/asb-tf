"use client"
import { useState, useEffect } from 'react';

const BASE = ['A', 'C', 'G', 'T'];
const COLOR = {'A': "blue", 'C': "orange", 'G': "red", 'T': "green"};
const EPS = 0.00000001;

export default function Logo(props) {
  const { motifName, pfm } = props;

  const [sortedOrder, setSortedOrder] = useState(null);
  const [dy, setDy] = useState(null);
  const [sortedHeights, setSortedHeights] = useState(null);

  useEffect(() => {
    const pos = Object.keys(pfm);

    let bases = [];
    let heights = [];
    let dys = [];
    pos.forEach(pos => {
      let sum = 0;
      for (let i=0; i<pfm[pos].length; i++) {
        if (pfm[pos][i] > 0) {
          sum += pfm[pos][i] * Math.log2(pfm[pos][i]);
        }
      }
      sum += 2;

      let sorted = pfm[pos].slice().sort();
      let currOrder = [];
      let currHeights = [];
      let currDys = [];
      let currDy = 0;
      for (const i in sorted) {
        let x = pfm[pos].indexOf(sorted[i]);
        currOrder.push(BASE[x]);
        let height = pfm[pos][x] * sum;
        currHeights.push(height);
        currDys.push(currDy);
        currDy -= 60*height;
      }
      bases.push(currOrder);
      heights.push(currHeights);
      dys.push(currDys);
    });
    setSortedHeights(heights);
    setSortedOrder(bases);
    setDy(dys);
  }, [motifName, pfm]);

  return (
    <div>
      {sortedOrder ? 
        <div className="font-mono flex items-end">
          {Object.keys(sortedOrder).map((i, k) => (
            <div className="flex flex-col" key={k} id={k}>
              <svg width="40" viewBox="0 -110 40 120" xmlns="http://www.w3.org/2000/svg" style={{ fontSize: 64, textAnchor: "start", textOrientation: 'upright', writingMode: "vertical-lr"}}>
                {sortedOrder[i].map((e, x) => (
                  <text fill={COLOR[e]} x={20} y={-60} transform={`scale(1, ${sortedHeights[i][x]}), translate(0, ${dy[i][x]/(sortedHeights[i][x] + EPS)})`} key={x}>{e}</text>
                ))}
              </svg>
            </div>
          ))}
        </div>
      : null}
    </div>
  );
}