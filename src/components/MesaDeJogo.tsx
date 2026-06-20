import { useJogo } from '../context/JogoContext';
import MaoCartas from './MaoCartas';

export default function MesaDeJogo() {
  const { estado, carregando, erro, iniciarJogo, fazerAposta, pedir, parar, dobrar, novaPartida, valorAposta, aluno } = useJogo();

  const emJogo = estado?.status === 'EM_JOGO';
  const finalizada = estado?.status === 'FINALIZADA';
  const aguardando = estado?.status === 'AGUARDANDO_APOSTA';

  function corResultado(resultado: string | null) {
    if (resultado === 'VITORIA') return '#2ecc71';
    if (resultado === 'DERROTA') return '#e74c3c';
    return '#f39c12';
  }

  return (
    <section className="mesa-jogo">
      <h2>Mesa de Blackjack</h2>

      {erro && <p className="erro">{erro}</p>}

      {/* Estado: sem partida */}
      {!estado && (
        <div className="mesa-inicio">
          <p>Selecione sua aposta e clique em Jogar</p>
          <button className="btn-primario" onClick={iniciarJogo} disabled={carregando || !aluno}>
            {carregando ? 'Aguardando...' : 'Nova Partida'}
          </button>
        </div>
      )}

      {/* Estado: aguardando aposta */}
      {aguardando && (
        <div className="mesa-aposta">
          <p>Aposta selecionada: <strong>R$ {valorAposta},00</strong></p>
          <button className="btn-primario" onClick={fazerAposta} disabled={carregando}>
            {carregando ? 'Distribuindo...' : 'Confirmar Aposta e Jogar'}
          </button>
        </div>
      )}

      {/* Cartas em jogo ou finalizadas */}
      {(emJogo || finalizada) && estado && (
        <div className="mesa-partida">
          <MaoCartas
            cartas={estado.maoDealer}
            titulo="Dealer"
            valor={estado.valorDealer}
            esconderSegunda={emJogo && estado.maoDealer.length === 2}
          />

          <MaoCartas
            cartas={estado.maoJogador}
            titulo="Você"
            valor={estado.valorJogador}
          />

          {/* Ações durante o jogo */}
          {emJogo && (
            <div className="mesa-acoes">
              <button className="btn-acao" onClick={pedir} disabled={carregando}>
                Pedir Carta
              </button>
              <button className="btn-acao btn-parar" onClick={parar} disabled={carregando}>
                Parar
              </button>
              <button className="btn-acao btn-dobrar" onClick={dobrar} disabled={carregando || (aluno?.saldo ?? 0) < (estado.aposta ?? 0)}>
                Dobrar
              </button>
            </div>
          )}

          {/* Resultado */}
          {finalizada && (
            <div className="mesa-resultado">
              <p style={{ color: corResultado(estado.resultado), fontSize: '1.5rem', fontWeight: 'bold' }}>
                {estado.mensagem ?? estado.resultado}
              </p>
              <p>Saldo final: R$ {estado.saldoAtual},00</p>
              <button className="btn-primario" onClick={novaPartida}>
                Jogar Novamente
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
