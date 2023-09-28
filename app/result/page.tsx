'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Chart from "./chart";


export default function Resultado(args: any) {

  const searchParams = useSearchParams()
  const rendimento = searchParams.get('rendimento')
  const idade = searchParams.get('idade')

  return (

    <main className="flex flex-col items-center justify-between middle-full">
      <div className="w-full max-w-md p-6 bg-gray-100 bg-opacity-25 rounded shadow-md">
        <div>
          <h2 className="text-xl font-semibold mb-4">Distribuição Recomendada da Renda</h2>

          <Chart idade={idade} rendimento={rendimento}/>

          <div className="text-center mt-4">
            <Link href="/">
              <p className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Voltar para a Página Inicial</p>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}