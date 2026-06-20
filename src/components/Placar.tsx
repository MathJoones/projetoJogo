import { useJogo } from '../context/JogoContext';

export default function Placar() {
  const { aluno, estado, sair } = useJogo();

  const saldo = estado?.saldoAtual ?? aluno?.saldo ?? 0;
  const aposta = estado?.aposta ?? 0;

  return (
    <section className="placar">
      <div className="placar-info">
        <div className="placar-item">
          <span className="placar-label">Jogador</span>
          <span className="placar-valor">{aluno?.nome ?? '—'}</span>
        </div>
        <div className="placar-item">
          <span className="placar-label">Saldo</span>
          <span className="placar-valor placar-saldo">R$ {saldo.toLocaleString('pt-BR')},00</span>
        </div>
        <div className="placar-item">
          <span className="placar-label">Aposta atual</span>
          <span className="placar-valor">R$ {aposta.toLocaleString('pt-BR')},00</span>
        </div>
      </div>
      <button className="btn-sair" onClick={sair} title="Sair">
        Sair
      </button>
    </section>
  );
}
