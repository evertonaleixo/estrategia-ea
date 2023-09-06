'use client';

export default function Index(args: any) {
    const {setRendimento, rendimento, setPage} = args

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">

      <div className="container">
        <h1 style={{padding: '1rem'}}>
          Consultoria Financeira por <br /><b>Emerson Lima Aleixo</b>.
        </h1>

        <h2>Transforme sua Vida Financeira</h2>
        <p style={{marginBottom: '1rem'}}>
          Informe o valor que você recebe todos os meses para fazermos um diagnóstico e planejamento dos seus gastos, e assim, você poderá ter uma vida financeira mais saudável.
        </p>
        
            <input type="text" 
              value={rendimento} 
              onChange={(e)=>setRendimento(e.target.value)}
              className="rounded-input" 
              name="rendimento" 
              placeholder="Informe seu rendimento mensal" />
            <br /><br />
            <button type="submit" className="styled-button" onClick={()=>{setPage('resultado')}}>Avançar</button>
      </div>
    </main>
  );
}
