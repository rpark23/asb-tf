"use client"
import { useState, useEffect } from 'react';

import TF from './components/TF.js';

export default function Home() {
  return (
    <main className="flex flex-col items-center pb-32">
      <TF />
    </main>
  );
}
