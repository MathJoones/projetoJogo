import Cabecalho from './components/Cabecalho';
import MesaDeJogo from './components/MesaDeJogo';
import Fichas from './components/Fichas';
import Placar from './components/Placar';
import Rodape from './components/Rodape';

export default function App() {
  return (
    <div>
      <Cabecalho />
      <MesaDeJogo />
      <Fichas />
      <Placar />
      <Rodape />
    </div>
  );
}
