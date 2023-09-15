'use client';

import { useState } from 'react';
// import Index from './components/index';
// import Resultado from './components/resultado';
import Link from 'next/link'


export default function Home() {
  const [rendimentoMensal, setRendimentoMensal] = useState('');
  const [idade, setIdade] = useState('');

  const setRendimento = (value: any) => {
    if (!Number.isNaN(Number(value))) {
      setRendimentoMensal(value)
    }
  }

  const setAge = (value: any) => {
    if (!Number.isNaN(Number(value))) {
      setIdade(value)
    }
  }

  return (
    <main className="flex flex-col items-center justify-between middle-full">
      <div className="w-full max-w-md p-6 bg-gray-100 bg-opacity-25 rounded shadow-md">
        <div className="container">
          <h1 style={{ padding: '4rem', color: 'white', fontSize: 'larger' }}>
            Consultoria Financeira com <br /><b>Emerson Lima Aleixo</b>.
          </h1>

          <h3 style={{ marginBottom: '4rem', color: 'red', textTransform: 'uppercase' }}>
            <b>
              Prepare-se para uma revolução financeira! Com um simples toque, você vai desbloquear o poder da inteligência artificial para conquistar seus sonhos financeiros como nunca antes. Deixe-nos mostrar o caminho para o sucesso financeiro total, começando com a sua renda e idade.
            </b>
          </h3>

          <input type="text"
            value={rendimentoMensal}
            onChange={(e: any) => setRendimento(e.target.value)}
            className="rounded-input"
            name="rendimento"
            placeholder="RENDA" />
          <br /><br />
          <input type="number"
            value={idade}
            onChange={(e: any) => setAge(e.target.value)}
            className="rounded-input"
            name="idade"
            placeholder="IDADE" />
          <br /><br />

          <Link
            href={{
              pathname: '/result',
              query: {
                rendimento: rendimentoMensal
              }
            }}
          >
            <button type="submit" className="styled-button" >Avançar</button>
          </Link>
        </div>
      </div>
    </main>
  )

}
