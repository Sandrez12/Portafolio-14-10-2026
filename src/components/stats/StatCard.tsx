import { motion, useReducedMotion } from 'framer-motion';
import { AnimatedNumber } from '../ui/AnimatedNumber';
import { EASE } from '../ui/motion';
import type { StatItem } from './types';

interface StatCardProps {
  stat: StatItem;
}

/**
 * Tarjeta de cifra V2: panel #102E2E con numeración "01"–"06", línea de
 * acento SVG que se dibuja (`pathLength` 0→1) al entrar al viewport,
 * contador grande en Caveat Brush (`AnimatedNumber`), etiqueta y frase de
 * contexto. Hover con elevación (sólo transform, neutralizado con
 * `motion-safe:` para `prefers-reduced-motion`).
 */
export function StatCard({ stat }: StatCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative overflow-hidden rounded-xl bg-panel p-6 pb-7 transition-transform duration-300 motion-safe:hover:-translate-y-1.5 motion-safe:hover:ring-1 motion-safe:hover:ring-accent/60">
      {/* Numeración de la tarjeta. */}
      <span
        aria-hidden="true"
        className="font-sans text-xs font-semibold tracking-[0.3em] text-accent"
      >
        {stat.index}
      </span>

      {/* Línea de acento que se dibuja al entrar (sólo opacity/pathLength). */}
      <svg viewBox="0 0 120 8" aria-hidden="true" focusable="false" className="mt-3 block h-2 w-16">
        <motion.path
          d="M2 4 C 40 1 80 7 118 3"
          pathLength={1}
          fill="none"
          stroke="#BC3A3A"
          strokeWidth={3}
          strokeLinecap="round"
          initial={prefersReducedMotion ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: '-48px' }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
        />
      </svg>

      {/* Cifra grande en la fuente display del sistema. */}
      <p
        className="mt-4 font-display leading-none text-ink"
        style={{ fontSize: 'clamp(3rem, 7vw, 4.5rem)' }}
      >
        <AnimatedNumber value={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
      </p>

      <p className="mt-3 text-sm font-semibold text-ink">{stat.label}</p>
      <p className="mt-1 text-sm leading-snug text-ink-muted">{stat.context}</p>
    </div>
  );
}
