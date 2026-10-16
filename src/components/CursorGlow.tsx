import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useIsDesktopPointer } from '../hooks/useIsDesktopPointer';

/** Diámetro del halo en px. */
const GLOW_SIZE = 560;
/** Factor de suavizado del seguimiento (0..1: menor = más lento). */
const LERP = 0.14;

/**
 * Halo radial rojo/teal muy sutil que sigue el cursor: se mueve con rAF +
 * `translate3d` (sólo transform, sin layout), con lerp para suavizar y
 * detención del loop cuando se estabiliza (cero trabajo en reposo).
 * Se renderiza SÓLO con puntero fino de desktop y sin reduced-motion.
 */
export function CursorGlow() {
  // Ambos hooks se llaman incondicionalmente (rules-of-hooks); el "enabled"
  // combina puntero fino de desktop + ausencia de reduced-motion.
  const isDesktopPointer = useIsDesktopPointer();
  const prefersReducedMotion = useReducedMotion() ?? false;
  const enabled = isDesktopPointer && !prefersReducedMotion;
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const glow = glowRef.current;
    if (!glow) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let raf = 0;
    let running = true;
    let hasMoved = false;

    const tick = () => {
      currentX += (targetX - currentX) * LERP;
      currentY += (targetY - currentY) * LERP;
      glow.style.transform = `translate3d(${currentX - GLOW_SIZE / 2}px, ${
        currentY - GLOW_SIZE / 2
      }px, 0)`;
      // En reposo el loop se apaga; se reanuda en el próximo pointermove.
      if (Math.abs(targetX - currentX) < 0.1 && Math.abs(targetY - currentY) < 0.1) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      if (!hasMoved) {
        hasMoved = true;
        glow.style.opacity = '1';
      }
      startLoop();
    };

    const onPointerLeaveWindow = () => {
      glow.style.opacity = '0';
    };

    const onPointerEnterWindow = () => {
      if (hasMoved) glow.style.opacity = '1';
    };

    raf = requestAnimationFrame(tick);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onPointerLeaveWindow);
    document.documentElement.addEventListener('pointerenter', onPointerEnterWindow);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener('pointerleave', onPointerLeaveWindow);
      document.documentElement.removeEventListener('pointerenter', onPointerEnterWindow);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-20 opacity-0 mix-blend-screen will-change-transform"
      style={{
        width: GLOW_SIZE,
        height: GLOW_SIZE,
        borderRadius: '50%',
        background:
          'radial-gradient(circle, rgba(188, 58, 58, 0.14) 0%, rgba(35, 107, 107, 0.10) 45%, transparent 70%)',
        transition: 'opacity 300ms ease',
      }}
    />
  );
}
