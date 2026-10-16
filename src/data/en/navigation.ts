import { NAV_LINKS as ES_NAV_LINKS, type NavLink } from '../navigation';

/**
 * Etiquetas EN de los enlaces de navegación (mismos `id` que el módulo ES:
 * coinciden con los wrappers de `App.tsx`). Patrón del módulo ES con sólo
 * los campos de texto sobrescritos.
 */
const LABELS: Record<string, string> = {
  inicio: 'Home',
  'sobre-mi': 'About',
  trayectoria: 'Journey',
  skills: 'Skills',
  proyectos: 'Projects',
  certificaciones: 'Certifications',
  contacto: 'Contact',
};

export const NAV_LINKS: readonly NavLink[] = ES_NAV_LINKS.map((link) => ({
  ...link,
  label: LABELS[link.id] ?? link.label,
}));

/** Tipo compartido del módulo ES (misma estructura). */
export type { NavLink } from '../navigation';

/** Ids estables para el scroll-spy (idénticos al módulo ES). */
export { NAV_SECTION_IDS } from '../navigation';
