interface CartaVisualProps {
  carta: string;
  virada?: boolean;
}

const NAIPE_SIMBOLO: Record<string, string> = {
  C: '♣',
  D: '♦',
  H: '♥',
  S: '♠',
};

const NAIPE_COR: Record<string, string> = {
  C: 'preto',
  D: 'vermelho',
  H: 'vermelho',
  S: 'preto',
};

function parseCarta(carta: string): { valor: string; naipe: string } {
  if (carta === '?') return { valor: '?', naipe: '' };
  const naipe = carta.slice(-1);
  const valor = carta.slice(0, -1);
  return { valor, naipe };
}

export default function CartaVisual({ carta, virada = false }: CartaVisualProps) {
  if (virada || carta === '?') {
    return (
      <div className="carta carta-virada">
        <span>🂠</span>
      </div>
    );
  }

  const { valor, naipe } = parseCarta(carta);
  const simbolo = NAIPE_SIMBOLO[naipe] ?? '';
  const cor = NAIPE_COR[naipe] ?? 'preto';

  return (
    <div className={`carta carta-${cor}`}>
      <span className="carta-topo">{valor}{simbolo}</span>
      <span className="carta-centro">{simbolo}</span>
      <span className="carta-base">{valor}{simbolo}</span>
    </div>
  );
}
