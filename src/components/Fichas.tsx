
const products = [
  { title: 'Ficha 1 - R$10', id: 1 },
  { title: 'Ficha 2 - R$50', id: 2 },
  { title: 'Ficha 3 - R$100',  id: 3 },
];

export default function Fichas() {
  const listItems = products.map(product =>
    <li
      key={product.id}
      style={{
        color: product.id ? 'blue' : 'darkgreen'
      }}
    >
      {product.title}
    </li>
  );

  return (
    <ul>{listItems}</ul>
  );
}
