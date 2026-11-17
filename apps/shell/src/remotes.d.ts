// Types for the modules the shell loads from other deployments at runtime.
declare module 'products/App' {
  const App: import('react').ComponentType;
  export default App;
}
declare module 'cart/App' {
  const App: import('react').ComponentType;
  export default App;
}
declare module 'cart/CartBadge' {
  const CartBadge: import('react').ComponentType;
  export default CartBadge;
}
