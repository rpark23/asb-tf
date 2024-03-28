"use client"
import { useState, useEffect } from 'react';

import Motif from "../components/Motif";
import Logo from "./Logo"

export default function TF() {
  const motifs = require("../../data/motifs.json");

  const [tfName, setTfName] = useState("HA-NRF1");
  const [motifName, setMotifName] = useState(motifs[tfName][0]);
  const [pfm, setPfm] = useState(null);
  const [info, setInfo] = useState(null);

  const changeTF = () => {
    setTfName(document.getElementById("tfs").value);
  };

  const changeMotif = () => {
    setMotifName(document.getElementById("motifs").value);
  };

  useEffect(() => {
    setMotifName(motifs[tfName][0]);
  }, [tfName]);

  useEffect(() => {
    const pfm = require(`../../data/pfms/${motifName}.json`);
    const info = require(`../../data/info/${motifName}.json`);
    setPfm(pfm);
    setInfo(info);
  }, [motifName]);

  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex flex-col items-center sticky top-0 pt-8 w-[100vw] bg-white">
        <div className="flex flex-col mb-6">
          <div className="flex w-[24rem]">
            <p className="mr-2">Select TF: </p>
            <select id="tfs" className="font-bold" onChange={changeTF}>
              {Object.keys(motifs).map((m, k) => (
                <option value={m} key={k}>{m}</option>
              ))}
            </select>
          </div>
          <div className="flex w-[24rem] mt-2">
            <p className="mr-2">Select Motif: </p>
            <select id="motifs" className="font-semibold" onChange={changeMotif}>
              {motifs[tfName].map((m, k) => (
                <option value={m} key={k}>{m}</option>
              ))}
            </select>
          </div>
          <a className="w-[18rem] mt-2 ml-1 italic bg-blue-100 rounded-lg" href={`https://hocomoco12.autosome.org/motif/${motifName}`} target="_blank">View motif on HOCOMOCO website</a>
        </div>
        {pfm ? <Logo motifName={motifName} pfm={pfm} /> : null}
      </div>

      <Motif motifs={motifs} motifName={motifName} />
      {/* {motifs[tfName].map((motifName, key) => (
        <Motif motifs={motifs} motifName={motifName} key={key} />
      ))} */}
    </div>
  );
}