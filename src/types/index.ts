export interface Aluno {
  id: number;
  nome: string;
  email: string;
  saldo: number;
}

export type StatusPartida = 'AGUARDANDO_APOSTA' | 'EM_JOGO' | 'FINALIZADA';
export type ResultadoPartida = 'VITORIA' | 'DERROTA' | 'EMPATE' | null;

export interface EstadoJogo {
  partidaId: number;
  status: StatusPartida;
  maoJogador: string[];
  maoDealer: string[];
  valorJogador: number;
  valorDealer: number;
  aposta: number | null;
  saldoAtual: number;
  resultado: ResultadoPartida;
  mensagem: string | null;
}
