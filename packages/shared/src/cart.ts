export type CartItem = { id: string; name: string; price: number; qty: number };

const KEY = 'mfe-starter:cart';

function load(): readonly CartItem[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

let items: readonly CartItem[] = load();
const listeners = new Set<() => void>();

function commit(next: readonly CartItem[]) {
  items = next; // a new array each time, so React can compare by reference
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // storage unavailable: the cart still works for this session
  }
  listeners.forEach((l) => l());
}

export const cart = {
  getItems: () => items,
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  add(item: Omit<CartItem, 'qty'>) {
    const existing = items.find((i) => i.id === item.id);
    commit(
      existing
        ? items.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i))
        : [...items, { ...item, qty: 1 }],
    );
  },
  setQty(id: string, qty: number) {
    commit(qty <= 0 ? items.filter((i) => i.id !== id) : items.map((i) => (i.id === id ? { ...i, qty } : i)));
  },
  remove(id: string) {
    commit(items.filter((i) => i.id !== id));
  },
  clear() {
    commit([]);
  },
};

export function totals(list: readonly CartItem[]) {
  return {
    count: list.reduce((n, i) => n + i.qty, 0),
    amount: list.reduce((sum, i) => sum + i.qty * i.price, 0),
  };
}
