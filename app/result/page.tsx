'use client';

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function Resultado(args: any) {
  // const {rendimento, setPage} = args
  const searchParams = useSearchParams()
  console.log(searchParams.get('rendimento'))
  const rendimento = searchParams.get('rendimento')

  return (

    <main className="flex flex-col items-center justify-between middle-full">
      <div className="w-full max-w-md p-6 bg-gray-100 bg-opacity-25 rounded shadow-md">
        <div>
          <h1>Ola, seu rendimento mensal é de {rendimento}</h1>

          <Link
            href={{
              pathname: '/'
            }}
          >
            <button className="styled-button"> Fazer nova simulação</button>
          </Link>
        </div>
      </div>
    </main>
  );
}