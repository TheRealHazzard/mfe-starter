import { lazy } from 'react';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import { RemoteBoundary } from './RemoteBoundary';
import { Toasts } from './Toasts';

// Each import() below is a network request to another deployment, made at runtime.
const Products = lazy(() => import('products/App'));
const Cart = lazy(() => import('cart/App'));
const CartBadge = lazy(() => import('cart/CartBadge'));

function Home() {
  return (
    <section className="home">
      <h1>Micro-frontend starter</h1>
      <p className="lead">
        This page is the <strong>shell</strong>. The products and cart screens are separate apps, built and deployed on their own,
        and stitched together in your browser at runtime.
      </p>
      <div className="cards">
        <Link to="/products" className="card">
          <h2>Products</h2>
          <p>Served from its own origin (port 4001). Try opening it standalone.</p>
        </Link>
        <Link to="/cart" className="card">
          <h2>Cart</h2>
          <p>Served from port 4002. Its badge in the header is also a remote component.</p>
        </Link>
      </div>
      <p className="muted">
        Try it: stop the cart dev server, then reload. The cart region fails on its own and everything else keeps working.
      </p>
    </section>
  );
}

export default function App() {
  return (
    <>
      <header className="top">
        <Link to="/" className="brand">mfe<span>/</span>starter</Link>
        <nav>
          <NavLink to="/products">Products</NavLink>
          <RemoteBoundary name="cart badge" fallback={<Link to="/cart">Cart</Link>}>
            <CartBadge />
          </RemoteBoundary>
        </nav>
      </header>
      <main className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/*" element={<RemoteBoundary name="products"><Products /></RemoteBoundary>} />
          <Route path="/cart" element={<RemoteBoundary name="cart"><Cart /></RemoteBoundary>} />
          <Route path="*" element={<p>Page not found. <Link to="/">Go home</Link></p>} />
        </Routes>
      </main>
      <Toasts />
    </>
  );
}
