import { useEffect, useState } from 'react';
import { bus } from '@mfe/shared';

type Toast = { id: number; message: string; tone?: 'info' | 'success' };
let nextId = 1;

/** Listens on the shared event bus, so remotes can show a message without knowing the shell exists. */
export function Toasts() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(
    () =>
      bus.on('toast', (t) => {
        const toast = { ...t, id: nextId++ };
        setToasts((list) => [...list, toast]);
        setTimeout(() => setToasts((list) => list.filter((x) => x.id !== toast.id)), 2800);
      }),
    [],
  );

  return (
    <div className="toasts" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.tone ?? 'info'}`}>{t.message}</div>
      ))}
    </div>
  );
}
