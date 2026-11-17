import { Link } from 'react-router-dom';
import { useCart } from '@mfe/shared';
import './cart.css';

/** A small widget the shell renders in its header. The cart team owns it. */
export default function CartBadge() {
  const { count } = useCart();
  return (
    <Link to="/cart" className="ct-badge" aria-label={`Cart, ${count} items`}>
      Cart
      <span className={count ? 'ct-count on' : 'ct-count'}>{count}</span>
    </Link>
  );
}
