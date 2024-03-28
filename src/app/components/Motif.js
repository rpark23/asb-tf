"use client"
import { useState, useEffect } from 'react';

// import Logo from "./Logo"
import PlotCounts from "./PlotCounts";
import PlotImportance from './PlotImportance';
import PlotFoldChange from './PlotFoldChange';

export default function Motif(props) {
  const { motifName } = props;

  const [pfm, setPfm] = useState(null);
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const pfm = require(`../../data/pfms/${motifName}.json`);
    const info = require(`../../data/info/${motifName}.json`);
    setPfm(pfm);
    setInfo(info);
  }, [motifName]);

  return (
    <div className="mt-8">
      {/* <h2 className="font-semibold text-lg">{motifName}</h2> */}
      {/* {pfm ? <Logo motifName={motifName} pfm={pfm} /> : null} */}
      {info ? <>
        <PlotCounts motifName={motifName} pfm={pfm} info={info} />
        <PlotFoldChange motifName={motifName} pfm={pfm} info={info} />
        <PlotImportance motifName={motifName} pfm={pfm} info={info} />
      </> : null}
    </div>
  );
}