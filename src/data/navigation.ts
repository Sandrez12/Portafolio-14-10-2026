/**
 * Enlaces de la navegación V2. `id` coincide EXACTAMENTE con el `id` del
 * `<div>` wrapper de cada bloque en `App.tsx` (scroll-spy + anclas).
 * No añadir secciones sin actualizar los wrappers de App.
 */
export interface NavLink {
  /** Id del wrapper de la sección en App.tsx (ancla `#id`). */
  id: string;
  /** Etiqueta visible en la barra de navegación. */
  label: string;
}

export const NAV_LINKS: readonly NavLink[] = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'sobre-mi', label: 'Sobre mí' },
  { id: 'trayectoria', label: 'Trayectoria' },
  { id: 'skills', label: 'Skills' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'certificaciones', label: 'Certificaciones' },
  { id: 'contacto', label: 'Contacto' },
];

/** Ids estables para el scroll-spy (`useActiveSection`). */
export const NAV_SECTION_IDS: readonly string[] = NAV_LINKS.map((link) => link.id);
