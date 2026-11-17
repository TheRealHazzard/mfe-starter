import { Link } from 'react-router-dom';
import { bus, cart, formatPrice, useCart } from '@mfe/shared';
import './cart.css';

export default function App() {
  const { items, count, amount } = useCart();

  if (!count) {
    return (
      <section>
        <h1 className="ct-title">Your cart</h1>
        <p className="ct-muted">Nothing here yet. <Link to="/products">Browse products</Link></p>
      </section>
    );
  }

  return (
    <section>
      <h1 className="ct-title">Your cart</h1>
      <ul className="ct-list">
        {items.map((i) => (
          <li key={i.id} className="ct-line">
            <div>
              <strong>{i.name}</strong>
              <div className="ct-muted">{formatPrice(i.price)} each</div>
            </div>
            <div className="ct-qty">
              <button className="btn ghost" aria-label={`Remove one ${i.name}`} onClick={() => cart.setQty(i.id, i.qty - 1)}>&minus;</button>
              <span>{i.qty}</span>
              <button className="btn ghost" aria-label={`Add one ${i.name}`} onClick={() => cart.setQty(i.id, i.qty + 1)}>+</button>
            </div>
            <strong>{formatPrice(i.price * i.qty)}</strong>
          </li>
        ))}
      </ul>
      <div className="ct-total">
        <span>Total ({count} items)</span>
        <strong>{formatPrice(amount)}</strong>
      </div>
      <button
        className="btn"
        onClick={() => {
          cart.clear();
          bus.emit('toast', { message: 'Order placed. This is a demo, nothing was charged.', tone: 'success' });
        }}
      >
        Checkout
      </button>
    </section>
  );
}
