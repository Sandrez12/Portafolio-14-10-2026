import type { MouseEventHandler, ReactNode } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useIsDesktopPointer } from '../../hooks/useIsDesktopPointer';

type ButtonVariant = 'primary' | 'ghost';

interface ButtonProps {
  children: ReactNode;
  /** Estilo visual (por defecto `primary`). */
  variant?: ButtonVariant;
  /**
   * Si se define, renderiza un enlace `<a>`; si no, un `<button>`.
   * Usa `#id` para anclas internas o URLs externas.
   */
  href?: string;
  /** `type` del `<button>` (por defecto `button`; ignorado en enlaces). */
  type?: 'button' | 'submit' | 'reset';
  /** Para enlaces externos, p. ej. `target="_blank"`. */
  target?: string;
  /** `rel` del enlace, p. ej. `noopener noreferrer`. */
  rel?: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  'aria-label'?: string;
}

const BASE_CLASSES =
  'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg px-6 py-2.5 text-sm font-medium transition-colors duration-200';

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: 'bg-accent font-semibold text-ink hover:bg-accent-mid',
  ghost: 'ring-1 ring-inset ring-teal text-ink hover:ring-accent',
};

/** Desplazamiento máximo del efecto magnético (sutil, en px). */
const MAGNET_MAX = 6;

/**
 * Botón del sistema V2: variantes `primary`/`ghost`, como link (`href`) o
 * `<button>`, altura táctil mínima de 44px y foco visible (outline global).
 * Efecto magnético sutil (±6px con spring) SÓLO con puntero fino de desktop
 * y sin `prefers-reduced-motion`.
 *
 * Ejemplo: `<Button href="#contacto" variant="primary">Contacto</Button>`
 */
export function Button({
  children,
  variant = 'primary',
  href,
  type = 'button',
  target,
  rel,
  className,
  onClick,
  'aria-label': ariaLabel,
}: ButtonProps) {
  // Ambos hooks se llaman incondicionalmente (rules-of-hooks); el magnetismo
  // se activa SÓLO con puntero fino de desktop y sin reduced-motion.
  const isDesktopPointer = useIsDesktopPointer();
  const prefersReducedMotion = useReducedMotion() ?? false;
  const canMagnet = isDesktopPointer && !prefersReducedMotion;

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 260, damping: 18, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 260, damping: 18, mass: 0.5 });

  const handleMouseMove: MouseEventHandler<HTMLElement> = (event) => {
    if (!canMagnet) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    rawX.set(Math.max(-MAGNET_MAX, Math.min(MAGNET_MAX, dx * 0.18)));
    rawY.set(Math.max(-MAGNET_MAX, Math.min(MAGNET_MAX, dy * 0.18)));
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const classes = `${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${className ?? ''}`;
  const motionProps = {
    className: classes,
    style: { x, y },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    whileHover: canMagnet ? { scale: 1.03 } : undefined,
    whileTap: canMagnet ? { scale: 0.97 } : undefined,
    children,
    onClick,
    'aria-label': ariaLabel,
  };

  if (href) {
    return (
      <motion.a href={href} target={target} rel={rel} {...motionProps}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button type={type} {...motionProps}>
      {children}
    </motion.button>
  );
}
