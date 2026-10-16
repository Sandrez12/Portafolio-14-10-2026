import { useScrollProgress } from '../../hooks/useScrollProgress';

/**
 * Barra de progreso de scroll (3px) en el borde inferior del Nav, en accent.
 * El `scaleX` se actualiza directamente desde `useScrollProgress` (rAF):
 * no es una animación autónoma, es feedback atado al scroll del usuario.
 */
export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div aria-hidden="true" className="h-[3px] w-full">
      <div className="h-full origin-left bg-accent" style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}
