import type { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Contenedor de contenido de V2: `max-w-container` (1240px, ver
 * tailwind.config.js) centrado con `px-5 sm:px-8`. Las secciones full-bleed
 * (Hero, Skills, Marquee, divisores) NO lo usan: gestionan su propio ancho.
 *
 * Ejemplo: `<Container><About /></Container>`
 */
export function Container({ children, className }: ContainerProps) {
  return <div className={`mx-auto w-full max-w-container px-5 sm:px-8 ${className ?? ''}`}>{children}</div>;
}
