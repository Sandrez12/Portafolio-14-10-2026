/**
 * Mensajes de UI del área "skills". Claves SIN prefijo (el prefijo "skills." se
 * añade en `messages/index.ts`). `en` debe tener EXACTAMENTE las mismas
 * claves que `es` (lo exige el tipo).
 */
export const es = {
  eyebrow: 'Stack',
  title: 'skills',
  subtitle:
    'Lenguajes, bases de datos, web, móvil y nube con los que construyo — cada tecnología de la banda está respaldada por un proyecto, una certificación o mi CV.',
  filterAll: 'Todas',
  filterAria: 'Filtrar habilidades por categoría',
  showingOne: 'Mostrando {count} categoría',
  showingMany: 'Mostrando {count} categorías',
  backedBy: 'Respaldado por',
  backedBySr: 'Respaldado por: {evidence}',
  softTitle: 'habilidades blandas',
} as const;

export const en: Record<keyof typeof es, string> = {
  eyebrow: 'Stack',
  title: 'skills',
  subtitle:
    'Languages, databases, web, mobile and cloud I build with — every technology in the band is backed by a project, a certification or my CV.',
  filterAll: 'All',
  filterAria: 'Filter skills by category',
  showingOne: 'Showing {count} category',
  showingMany: 'Showing {count} categories',
  backedBy: 'Backed by',
  backedBySr: 'Backed by: {evidence}',
  softTitle: 'soft skills',
};

