import { useState } from 'react';
import { useJogo } from '../context/JogoContext';
import * as alunoApi from '../api/alunoApi';

export default function Login() {
  const { setAluno } = useJogo();
  const [modo, setModo] = useState<'login' | 'registrar'>('login');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro('');
    setCarregando(true);
    try {
      const aluno = modo === 'login'
        ? await alunoApi.login(email, senha)
        : await alunoApi.registrar(nome, email, senha);
      setAluno(aluno);
    } catch (err: unknown) {
      setErro(err instanceof Error ? err.message : 'Erro ao entrar');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="login-container">
      <header className="login-header">
        <h1>Casino Royal</h1>
        <p>Bem-vindo ao melhor cassino online</p>
      </header>

      <div className="login-card">
        <div className="login-tabs">
          <button
            className={modo === 'login' ? 'tab active' : 'tab'}
            onClick={() => setModo('login')}
          >
            Entrar
          </button>
          <button
            className={modo === 'registrar' ? 'tab active' : 'tab'}
            onClick={() => setModo('registrar')}
          >
            Criar conta
          </button>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {modo === 'registrar' && (
            <div className="form-group">
              <label>Nome</label>
              <input
                type="text"
                value={nome}
                onChange={e => setNome(e.target.value)}
                placeholder="Seu nome"
                required
              />
            </div>
          )}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
            />
          </div>
          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {erro && <p className="erro">{erro}</p>}

          <button type="submit" className="btn-primario" disabled={carregando}>
            {carregando ? 'Aguarde...' : modo === 'login' ? 'Entrar' : 'Criar conta'}
          </button>
        </form>

        {modo === 'registrar' && (
          <p className="bonus-info">Novo jogador recebe R$ 1.000 em fichas!</p>
        )}
      </div>
    </div>
  );
}
