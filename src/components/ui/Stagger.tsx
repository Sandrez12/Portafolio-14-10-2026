import { useReducedMotion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';
import { EASE, getMotionTag, type MotionTag } from './motion';

interface StaggerProps {
  children: ReactNode;
  /** Tag HTML del contenedor (por defecto `div`). */
  as?: MotionTag;
  className?: string;
  /** Retardo antes de empezar la cadena (`delayChildren`, en segundos). */
  delay?: number;
  /** Animar sólo la primera vez que entre al viewport (por defecto `true`). */
  once?: boolean;
}

/**
 * Contenedor de entrada escalonada: los `StaggerItem` hijos directos entran
 * en cadena con `staggerChildren: 0.08`. Respeta `prefers-reduced-motion`
 * (los hijos se muestran directamente en su estado final).
 *
 * Ejemplo: `<Stagger as="ul">{items.map(i => <StaggerItem as="li">...</StaggerItem>)}</Stagger>`
 */
export function Stagger({ children, as = 'div', className, delay = 0, once = true }: StaggerProps) {
  const prefersReducedMotion = useReducedMotion();
  const Tag = getMotionTag(as);

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: delay } },
  };

  return (
    <Tag
      className={className}
      variants={container}
      initial={prefersReducedMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once, margin: '-64px' }}
    >
      {children}
    </Tag>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  /** Tag HTML del item (por defecto `div`). Debe ser hijo directo de `Stagger`. */
  as?: MotionTag;
  className?: string;
  /** Desplazamiento vertical inicial en px (por defecto 24). */
  y?: number;
  /** Desplazamiento horizontal inicial en px (por defecto 0). */
  x?: number;
}

/**
 * Item de `Stagger`: fade + slide con el easing del sistema (`[0.22,1,0.36,1]`).
 * No lleva `whileInView` propio: hereda la propagación de variantes del padre.
 *
 * Ejemplo: `<StaggerItem as="li" y={32}>...</StaggerItem>`
 */
export function StaggerItem({ children, as = 'div', className, y = 24, x = 0 }: StaggerItemProps) {
  const Tag = getMotionTag(as);

  const item: Variants = {
    hidden: { opacity: 0, x, y },
    visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.55, ease: EASE } },
  };

  return (
    <Tag className={className} variants={item}>
      {children}
    </Tag>
  );
}
