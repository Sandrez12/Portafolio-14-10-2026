import { useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { EASE, getMotionTag, type MotionTag } from './motion';

interface RevealProps {
  children: ReactNode;
  /** Tag HTML a renderizar (por defecto `div`). */
  as?: MotionTag;
  className?: string;
  /** Retardo inicial en segundos (por defecto 0). */
  delay?: number;
  /** Desplazamiento vertical inicial en px (por defecto 24). */
  y?: number;
  /** Desplazamiento horizontal inicial en px (por defecto 0). */
  x?: number;
  /** Animar sólo la primera vez que entre al viewport (por defecto `true`). */
  once?: boolean;
  /** Duración en segundos (por defecto 0.6). */
  duration?: number;
}

/**
 * Reveal compartido de V2: fade + slide con easing deliberado `[0.22,1,0.36,1]`
 * al entrar al viewport. Respeta `prefers-reduced-motion` (sin animación:
 * estado final estático). Sustituye al Reveal de `components/skills/`.
 *
 * Ejemplo: `<Reveal as="li" delay={0.1} y={32} once>{...}</Reveal>`
 */
export function Reveal({
  children,
  as = 'div',
  className,
  delay = 0,
  y = 24,
  x = 0,
  once = true,
  duration = 0.6,
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const Tag = getMotionTag(as);

  return (
    <Tag
      className={className}
      initial={prefersReducedMotion ? false : { opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: '-64px' }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}
