import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { useCountUp } from '../../hooks/useCountUp';

interface AnimatedNumberProps {
  /** Valor final del contador. */
  value: number;
  /** Duración en ms (por defecto 1200). */
  duration?: number;
  /** Decimales a mostrar (por defecto 0). */
  decimals?: number;
  /** Prefijo literal, p. ej. `'+57 '` o `'~'`. */
  prefix?: string;
  /** Sufijo literal, p. ej. `'%'`. */
  suffix?: string;
  className?: string;
}

/**
 * Número animado al entrar al viewport: cuenta de 0 a `value` con
 * `useCountUp` y formato `es-CO` (Intl). Reduced motion: valor final directo.
 *
 * Ejemplo: `<AnimatedNumber value={490} suffix=" videos" />`
 */
export function AnimatedNumber({
  value,
  duration = 1200,
  decimals = 0,
  prefix = '',
  suffix = '',
  className,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-64px' });
  const current = useCountUp(value, { duration, start: inView });

  const formatted = new Intl.NumberFormat('es-CO', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(current);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
