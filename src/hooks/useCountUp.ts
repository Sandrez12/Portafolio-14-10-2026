import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

interface UseCountUpOptions {
  /** Duración de la animación en ms (por defecto 1200). */
  duration?: number;
  /**
   * Inicia la cuenta. Mientras sea `false` retorna 0; al pasar a `true`
   * anima de 0 a `target` (úsalo junto a un `useInView`).
   */
  start?: boolean;
}

/**
 * Contador animado con requestAnimationFrame y easing easeOutCubic.
 * Respeta `prefers-reduced-motion` devolviendo directamente el valor final.
 *
 * Ejemplo: `const value = useCountUp(6, { start: inView, duration: 900 });`
 */
export function useCountUp(target: number, options: UseCountUpOptions = {}): number {
  const { duration = 1200, start = true } = options;
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    if (prefersReducedMotion) {
      // Reduced motion: estado final estático, sin animación.
      setValue(target);
      return;
    }
    if (!start) {
      // Todavía no debe comenzar: espera en 0.
      setValue(0);
      return;
    }

    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - t0) / duration);
      const eased = 1 - (1 - progress) ** 3; // easeOutCubic
      setValue(eased * target);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start, prefersReducedMotion]);

  if (prefersReducedMotion) return target;
  return start ? value : 0;
}
