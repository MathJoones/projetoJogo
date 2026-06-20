import type { Aluno } from '../types';

const BASE = '/api/alunos';

async function extrairErro(res: Response): Promise<string> {
  const contentType = res.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    const json = await res.json();
    return json.erro ?? json.message ?? JSON.stringify(json);
  }
  const text = await res.text();
  return text || `Erro ${res.status}`;
}

export async function registrar(nome: string, email: string, senha: string): Promise<Aluno> {
  const res = await fetch(`${BASE}/registrar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, email, senha }),
  });
  if (!res.ok) throw new Error(await extrairErro(res));
  return res.json();
}

export async function login(email: string, senha: string): Promise<Aluno> {
  const res = await fetch(`${BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha }),
  });
  if (!res.ok) throw new Error(await extrairErro(res));
  return res.json();
}

export async function buscarAluno(id: number): Promise<Aluno> {
  const res = await fetch(`${BASE}/${id}`);
  if (!res.ok) throw new Error(await extrairErro(res));
  return res.json();
}
