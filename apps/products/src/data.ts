export type Product = {
  id: string;
  name: string;
  price: number;
  blurb: string;
  hue: number;
};

export const products: Product[] = [
  { id: 'aurora-lamp', name: 'Aurora Desk Lamp', price: 89, blurb: 'Warm-to-cool dimmable light with a wireless charging base.', hue: 200 },
  { id: 'slate-keyboard', name: 'Slate Keyboard', price: 149, blurb: 'Low-profile mechanical keyboard with hot-swappable switches.', hue: 260 },
  { id: 'orbit-mouse', name: 'Orbit Mouse', price: 59, blurb: 'Lightweight ergonomic mouse with a six-month battery.', hue: 160 },
  { id: 'pulse-headset', name: 'Pulse Headset', price: 129, blurb: 'Closed-back headset tuned for long focus sessions.', hue: 20 },
  { id: 'atlas-stand', name: 'Atlas Laptop Stand', price: 45, blurb: 'Machined aluminium stand that folds flat for travel.', hue: 320 },
  { id: 'ember-mug', name: 'Ember Mug', price: 35, blurb: 'Insulated mug that keeps coffee hot for four hours.', hue: 40 },
];
