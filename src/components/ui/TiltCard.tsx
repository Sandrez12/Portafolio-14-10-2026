import type { PointerEventHandler, ReactNode } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useIsDesktopPointer } from '../../hooks/useIsDesktopPointer';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Inclinación máxima en grados (por defecto 8). */
  maxTilt?: number;
}

/**
 * Tarjeta con inclinación 3D suave (rotateX/rotateY con spring) siguiendo el
 * puntero. Sólo se activa con puntero fino de desktop y sin
 * `prefers-reduced-motion`; en cualquier otro caso es una tarjeta estática.
 *
 * Ejemplo: `<TiltCard className="rounded-xl bg-panel p-6">{...}</TiltCard>`
 */
export function TiltCard({ children, className, maxTilt = 8 }: TiltCardProps) {
  // Ambos hooks se llaman incondicionalmente (rules-of-hooks); el tilt se
  // activa SÓLO con puntero fino de desktop y sin reduced-motion.
  const isDesktopPointer = useIsDesktopPointer();
  const prefersReducedMotion = useReducedMotion() ?? false;
  const canTilt = isDesktopPointer && !prefersReducedMotion;

  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, { stiffness: 180, damping: 20, mass: 0.6 });
  const rotateY = useSpring(rawRotateY, { stiffness: 180, damping: 20, mass: 0.6 });

  const handlePointerMove: PointerEventHandler<HTMLDivElement> = (event) => {
    if (!canTilt) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rawRotateY.set(px * maxTilt);
    rawRotateX.set(-py * maxTilt);
  };

  const handlePointerLeave = () => {
    rawRotateX.set(0);
    rawRotateY.set(0);
  };

  return (
    <motion.div
      className={className}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {children}
    </motion.div>
  );
}
