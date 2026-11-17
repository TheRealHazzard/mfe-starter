import { beforeEach, describe, expect, it, vi } from 'vitest';
import { cart, totals } from './cart';
import { createBus } from './bus';

const apple = { id: 'a', name: 'Apple', price: 2 };

describe('cart', () => {
  beforeEach(() => cart.clear());

  it('adds new items and increments existing ones', () => {
    cart.add(apple);
    cart.add(apple);
    expect(cart.getItems()).toEqual([{ ...apple, qty: 2 }]);
  });

  it('removes an item when its quantity drops to zero', () => {
    cart.add(apple);
    cart.setQty('a', 0);
    expect(cart.getItems()).toHaveLength(0);
  });

  it('computes totals', () => {
    cart.add(apple);
    cart.add({ id: 'b', name: 'Bread', price: 5 });
    cart.setQty('a', 3);
    expect(totals(cart.getItems())).toEqual({ count: 4, amount: 11 });
  });

  it('notifies subscribers with a new array reference, and stops after unsubscribe', () => {
    const listener = vi.fn();
    const before = cart.getItems();
    const off = cart.subscribe(listener);
    cart.add(apple);
    expect(listener).toHaveBeenCalledTimes(1);
    expect(cart.getItems()).not.toBe(before);
    off();
    cart.add(apple);
    expect(listener).toHaveBeenCalledTimes(1);
  });
});

describe('bus', () => {
  it('delivers events to subscribers until they unsubscribe', () => {
    const bus = createBus<{ ping: number }>();
    const handler = vi.fn();
    const off = bus.on('ping', handler);
    bus.emit('ping', 1);
    off();
    bus.emit('ping', 2);
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(1);
  });
});
