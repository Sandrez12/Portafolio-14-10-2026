import type { ReactNode } from 'react';
import type { SkillCategoryId } from './types';

/**
 * Glifos SVG PROPIOS (trazo blanco monocromo, 24x24) para las tarjetas de
 * categoría de Skills: cilindro (bases), `</>` (lenguajes), globo (web),
 * teléfono (móvil), nube, mini-diagrama (análisis), llave (herramientas) y
 * personas (blandas). Decorativos: `aria-hidden` en el uso.
 */
interface CategoryIconProps {
  /** Id estable de la categoría (valor exacto de src/data/skills.ts). */
  id: SkillCategoryId;
  className?: string;
}

/** Atributos comunes de trazo (los glifos se dibujan, no se rellenan). */
const STROKE = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

/** Contenido (paths) de cada glifo, por id de categoría. */
const GLYPHS: Record<SkillCategoryId, ReactNode> = {
  // Bases de datos: cilindro con bandas.
  'bases-de-datos': (
    <>
      <ellipse cx="12" cy="5.5" rx="7" ry="2.6" />
      <path d="M5 5.5v13c0 1.45 3.13 2.62 7 2.62s7-1.17 7-2.62v-13" />
      <path d="M5 12c0 1.45 3.13 2.62 7 2.62S19 13.45 19 12" />
    </>
  ),
  // Lenguajes: llaves de código con barra.
  lenguajes: (
    <>
      <path d="M8.5 7 4 12l4.5 5" />
      <path d="m15.5 7 4.5 5-4.5 5" />
      <path d="m13.6 5-3.2 14" />
    </>
  ),
  // Web: globo con ecuador y meridiano.
  web: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17" />
      <path d="M12 3.5c2.3 2.3 3.6 5.3 3.6 8.5s-1.3 6.2-3.6 8.5c-2.3-2.3-3.6-5.3-3.6-8.5S9.7 5.8 12 3.5Z" />
    </>
  ),
  // Móvil: teléfono con botón.
  movil: (
    <>
      <rect x="7.5" y="3" width="9" height="18" rx="2.5" />
      <path d="M10.75 17.6h2.5" />
    </>
  ),
  // Nube e infraestructura: nube.
  'nube-e-infraestructura': (
    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
  ),
  // Análisis y diseño: nodos conectados (mini diagrama).
  'analisis-y-diseno': (
    <>
      <circle cx="5.5" cy="6" r="2" />
      <circle cx="18.5" cy="8.5" r="2" />
      <circle cx="9" cy="18" r="2" />
      <path d="m7.3 7.1 9.4 1M6.6 7.9 8.2 16m9.1-6.5L10.8 16.7" />
    </>
  ),
  // Herramientas: llave.
  herramientas: (
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z" />
  ),
  // Blandas: dos personas (equipo).
  blandas: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.8 19.5a5.7 5.7 0 0 1 10.4 0" />
      <path d="M15.5 11.2a3.2 3.2 0 0 0 0-6.4" />
      <path d="M17.5 19.5a5.7 5.7 0 0 0-2.4-4.6" />
    </>
  ),
};

/** Icono de una categoría de habilidades (SVG de trazo, decorativo). */
export function CategoryIcon({ id, className }: CategoryIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={className ?? 'h-6 w-6'}
      {...STROKE}
    >
      {GLYPHS[id]}
    </svg>
  );
}
