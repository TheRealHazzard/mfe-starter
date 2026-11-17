import { Link, Route, Routes, useParams } from 'react-router-dom';
import { bus, cart, formatPrice } from '@mfe/shared';
import { products, type Product } from './data';
import './products.css';

function addToCart(p: Product) {
  cart.add({ id: p.id, name: p.name, price: p.price });
  bus.emit('toast', { message: `${p.name} added to cart`, tone: 'success' });
}

function Swatch({ hue }: { hue: number }) {
  return <div className="pr-swatch" style={{ background: `linear-gradient(135deg, hsl(${hue} 70% 45%), hsl(${hue + 40} 70% 30%))` }} />;
}

function List() {
  return (
    <section>
      <h1 className="pr-title">Products</h1>
      <div className="pr-grid">
        {products.map((p) => (
          <article key={p.id} className="pr-card">
            <Link to={p.id}>
              <Swatch hue={p.hue} />
              <h2>{p.name}</h2>
            </Link>
            <p>{p.blurb}</p>
            <div className="pr-row">
              <strong>{formatPrice(p.price)}</strong>
              <button className="btn" onClick={() => addToCart(p)}>Add to cart</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Detail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  if (!product) return <p>Product not found. <Link to="..">Back to products</Link></p>;
  return (
    <section className="pr-detail">
      <Swatch hue={product.hue} />
      <div>
        <Link to="..">&larr; All products</Link>
        <h1 className="pr-title">{product.name}</h1>
        <p>{product.blurb}</p>
        <p><strong>{formatPrice(product.price)}</strong></p>
        <button className="btn" onClick={() => addToCart(product)}>Add to cart</button>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <Routes>
      <Route index element={<List />} />
      <Route path=":id" element={<Detail />} />
    </Routes>
  );
}
