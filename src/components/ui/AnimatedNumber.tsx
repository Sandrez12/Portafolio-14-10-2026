import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { useCountUp } from '../../hooks/useCountUp';
import { useLanguage } from '../../i18n';

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
 * `useCountUp` y formato `Intl` según el idioma activo ('es-CO' / 'en-US').
 * Reduced motion: valor final directo.
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
  const { lang } = useLanguage();
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-64px' });
  const current = useCountUp(value, { duration, start: inView });

  // Formato numérico según el idioma activo: coma decimal en es-CO (91,84).
  const formatted = new Intl.NumberFormat(lang === 'en' ? 'en-US' : 'es-CO', {
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
