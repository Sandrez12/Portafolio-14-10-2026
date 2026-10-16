import { useEffect, useState } from 'react';

/**
 * Progreso de scroll de la página (0..1) actualizado con requestAnimationFrame
 * (una actualización por frame, como máximo, y sólo si el valor cambia).
 *
 * Ejemplo: `const progress = useScrollProgress(); // 0.42`
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    let raf = 0;
    let scheduled = false;

    const update = () => {
      scheduled = false;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const next = max > 0 ? Math.min(1, Math.max(0, doc.scrollTop / max)) : 0;
      setProgress((prev) => (prev === next ? prev : next));
    };

    const schedule = () => {
      if (!scheduled) {
        scheduled = true;
        raf = requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  return progress;
}
