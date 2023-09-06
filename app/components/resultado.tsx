'use client';

export default function Resultado(args: any) {
    const {rendimento, setPage} = args

    return (
      <main className="flex min-h-screen flex-col items-center justify-between">
        <div>
          <h1>Ola, seu rendimento mensal é de {rendimento}</h1>
          <button className="styled-button" onClick={()=>{setPage('index')} }> Voltar</button>
        </div>
      </main>
      );
}