import { useSyncExternalStore } from 'react';
import { cart, totals } from './cart';

/** Subscribe a component to the shared cart. */
export function useCart() {
  const items = useSyncExternalStore(cart.subscribe, cart.getItems, cart.getItems);
  return { items, ...totals(items) };
}
