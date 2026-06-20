import { JogoProvider, useJogo } from './context/JogoContext';
import Cabecalho from './components/Cabecalho';
import MesaDeJogo from './components/MesaDeJogo';
import Fichas from './components/Fichas';
import Placar from './components/Placar';
import Rodape from './components/Rodape';
import Login from './components/Login';

function Jogo() {
  const { aluno } = useJogo();

  if (!aluno) {
    return <Login />;
  }

  return (
    <div className="app-layout">
      <Cabecalho />
      <Placar />
      <main className="app-main">
        <Fichas />
        <MesaDeJogo />
      </main>
      <Rodape />
    </div>
  );
}

export default function App() {
  return (
    <JogoProvider>
      <Jogo />
    </JogoProvider>
  );
}
