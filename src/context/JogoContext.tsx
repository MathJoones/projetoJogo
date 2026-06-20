import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { Aluno, EstadoJogo } from '../types';
import * as blackjackApi from '../api/blackjackApi';

interface JogoContextType {
  aluno: Aluno | null;
  estado: EstadoJogo | null;
  valorAposta: number;
  carregando: boolean;
  erro: string | null;
  setAluno: (aluno: Aluno | null) => void;
  setValorAposta: (valor: number) => void;
  iniciarJogo: () => Promise<void>;
  fazerAposta: () => Promise<void>;
  pedir: () => Promise<void>;
  parar: () => Promise<void>;
  dobrar: () => Promise<void>;
  novaPartida: () => void;
  sair: () => void;
}

const JogoContext = createContext<JogoContextType | null>(null);

export function JogoProvider({ children }: { children: ReactNode }) {
  const [aluno, setAluno] = useState<Aluno | null>(null);
  const [estado, setEstado] = useState<EstadoJogo | null>(null);
  const [valorAposta, setValorAposta] = useState<number>(10);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const wrap = useCallback(async (fn: () => Promise<void>) => {
    setErro(null);
    setCarregando(true);
    try {
      await fn();
    } catch (e: unknown) {
      setErro(e instanceof Error ? e.message : 'Erro desconhecido');
    } finally {
      setCarregando(false);
    }
  }, []);

  const iniciarJogo = useCallback(async () => {
    if (!aluno) return;
    await wrap(async () => {
      const novoEstado = await blackjackApi.iniciarPartida(aluno.id);
      setEstado(novoEstado);
    });
  }, [aluno, wrap]);

  const fazerAposta = useCallback(async () => {
    if (!aluno || !estado) return;
    await wrap(async () => {
      const novoEstado = await blackjackApi.apostar(estado.partidaId, valorAposta);
      setEstado(novoEstado);
      setAluno(prev => prev ? { ...prev, saldo: novoEstado.saldoAtual } : null);
    });
  }, [aluno, estado, valorAposta, wrap]);

  const pedir = useCallback(async () => {
    if (!estado) return;
    await wrap(async () => {
      const novoEstado = await blackjackApi.pedir(estado.partidaId);
      setEstado(novoEstado);
      setAluno(prev => prev ? { ...prev, saldo: novoEstado.saldoAtual } : null);
    });
  }, [estado, wrap]);

  const parar = useCallback(async () => {
    if (!estado) return;
    await wrap(async () => {
      const novoEstado = await blackjackApi.parar(estado.partidaId);
      setEstado(novoEstado);
      setAluno(prev => prev ? { ...prev, saldo: novoEstado.saldoAtual } : null);
    });
  }, [estado, wrap]);

  const dobrar = useCallback(async () => {
    if (!estado) return;
    await wrap(async () => {
      const novoEstado = await blackjackApi.dobrar(estado.partidaId);
      setEstado(novoEstado);
      setAluno(prev => prev ? { ...prev, saldo: novoEstado.saldoAtual } : null);
    });
  }, [estado, wrap]);

  const novaPartida = useCallback(() => {
    setEstado(null);
    setErro(null);
  }, []);

  const sair = useCallback(() => {
    setAluno(null);
    setEstado(null);
    setErro(null);
  }, []);

  return (
    <JogoContext.Provider value={{
      aluno, estado, valorAposta, carregando, erro,
      setAluno, setValorAposta,
      iniciarJogo, fazerAposta, pedir, parar, dobrar,
      novaPartida, sair,
    }}>
      {children}
    </JogoContext.Provider>
  );
}

export function useJogo(): JogoContextType {
  const ctx = useContext(JogoContext);
  if (!ctx) throw new Error('useJogo deve ser usado dentro de JogoProvider');
  return ctx;
}
