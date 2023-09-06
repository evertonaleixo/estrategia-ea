'use client';

import { useState } from 'react';
import Index from './components/index';
import Resultado from './components/resultado';

export default function Home() {
  const [rendimentoMensal, setRendimentoMensal] = useState('');
  const [selectedPage, setSelectedPage] = useState('index');

  const setRendimento = (value: any) => {
    if (!Number.isNaN(Number(value))) {
      setRendimentoMensal(value)
    }
  }
  if (selectedPage === 'index'){
    return (
      <Index 
        rendimento={rendimentoMensal} 
        setRendimento={setRendimento} 
        setPage={setSelectedPage}/>
    );
  } else if(selectedPage === 'resultado'){
    return (
      <Resultado 
        rendimento={rendimentoMensal} 
        setPage={setSelectedPage}/>
    );
  } else {
    return (
      <Index 
        rendimento={rendimentoMensal} 
        setRendimento={setRendimento} 
        setPage={setSelectedPage}/>
    );
  }
  
}
