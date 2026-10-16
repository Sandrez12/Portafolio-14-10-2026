import { useMediaQuery } from './useMediaQuery';

/**
 * `true` sólo en dispositivos con puntero fino y hover estable (desktop).
 * Úsalo para efectos magnéticos/tilt/glow, siempre combinado con
 * `useReducedMotion` de framer-motion.
 *
 * Ejemplo: `const canHover = useIsDesktopPointer();`
 */
export function useIsDesktopPointer(): boolean {
  return useMediaQuery('(hover: hover) and (pointer: fine)');
}
