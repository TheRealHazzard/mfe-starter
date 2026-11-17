export type Handler<T> = (payload: T) => void;

/** A tiny typed pub/sub bus. Apps talk through events and never import each other. */
export function createBus<E extends Record<string, unknown>>() {
  const handlers = new Map<keyof E, Set<Handler<never>>>();
  return {
    on<K extends keyof E>(event: K, handler: Handler<E[K]>): () => void {
      const set = handlers.get(event) ?? new Set<Handler<never>>();
      set.add(handler as Handler<never>);
      handlers.set(event, set);
      return () => {
        set.delete(handler as Handler<never>);
      };
    },
    emit<K extends keyof E>(event: K, payload: E[K]): void {
      handlers.get(event)?.forEach((h) => (h as Handler<E[K]>)(payload));
    },
  };
}

export type AppEvents = {
  toast: { message: string; tone?: 'info' | 'success' };
};

/** The one bus every app shares (because @mfe/shared is a Module Federation singleton). */
export const bus = createBus<AppEvents>();
