import { useJogo } from '../context/JogoContext';

const FICHAS = [
  { valor: 10, label: 'R$ 10' },
  { valor: 50, label: 'R$ 50' },
  { valor: 100, label: 'R$ 100' },
  { valor: 200, label: 'R$ 200' },
  { valor: 500, label: 'R$ 500' },
];

export default function Fichas() {
  const { valorAposta, setValorAposta, estado, aluno } = useJogo();

  const podeApostar = !estado || estado.status === 'AGUARDANDO_APOSTA';

  return (
    <section className="fichas-container">
      <h3>Selecionar Aposta</h3>
      <div className="fichas-lista">
        {FICHAS.map(ficha => {
          const semSaldo = (aluno?.saldo ?? 0) < ficha.valor;
          const selecionada = valorAposta === ficha.valor;
          return (
            <button
              key={ficha.valor}
              className={`ficha ${selecionada ? 'ficha-selecionada' : ''} ${semSaldo ? 'ficha-desabilitada' : ''}`}
              onClick={() => setValorAposta(ficha.valor)}
              disabled={!podeApostar || semSaldo}
              title={semSaldo ? 'Saldo insuficiente' : `Apostar ${ficha.label}`}
            >
              {ficha.label}
            </button>
          );
        })}
      </div>
      <p className="aposta-atual">
        Aposta: <strong>R$ {valorAposta},00</strong>
      </p>
    </section>
  );
}
