import CartaVisual from './CartaVisual';

interface MaoCartasProps {
  cartas: string[];
  titulo: string;
  valor: number;
  esconderSegunda?: boolean;
}

export default function MaoCartas({ cartas, titulo, valor, esconderSegunda = false }: MaoCartasProps) {
  return (
    <div className="mao-cartas">
      <h3>{titulo} — {esconderSegunda ? '?' : valor} pts</h3>
      <div className="cartas-linha">
        {cartas.map((carta, i) => (
          <CartaVisual
            key={i}
            carta={esconderSegunda && i === 1 ? '?' : carta}
          />
        ))}
      </div>
    </div>
  );
}
