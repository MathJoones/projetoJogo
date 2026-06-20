import type { EstadoJogo } from '../types';

const BASE = '/api/blackjack';

async function extrairErro(res: Response): Promise<string> {
  const contentType = res.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    const json = await res.json();
    return json.erro ?? json.message ?? JSON.stringify(json);
  }
  const text = await res.text();
  return text || `Erro ${res.status}`;
}

async function postJson<T>(url: string, body?: unknown): Promise<T> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(await extrairErro(res));
  return res.json();
}

export async function iniciarPartida(alunoId: number): Promise<EstadoJogo> {
  return postJson(`${BASE}/iniciar`, { alunoId });
}

export async function apostar(partidaId: number, valor: number): Promise<EstadoJogo> {
  return postJson(`${BASE}/${partidaId}/apostar`, { valor });
}

export async function pedir(partidaId: number): Promise<EstadoJogo> {
  return postJson(`${BASE}/${partidaId}/pedir`);
}

export async function parar(partidaId: number): Promise<EstadoJogo> {
  return postJson(`${BASE}/${partidaId}/parar`);
}

export async function dobrar(partidaId: number): Promise<EstadoJogo> {
  return postJson(`${BASE}/${partidaId}/dobrar`);
}

export async function getEstado(partidaId: number): Promise<EstadoJogo> {
  const res = await fetch(`${BASE}/${partidaId}/estado`);
  if (!res.ok) throw new Error(await extrairErro(res));
  return res.json();
}
