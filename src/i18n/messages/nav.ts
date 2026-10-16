/**
 * Mensajes de UI del área "nav". Claves SIN prefijo (el prefijo "nav." se
 * añade en `messages/index.ts`). `en` debe tener EXACTAMENTE las mismas
 * claves que `es` (lo exige el tipo).
 */
export const es = {
  navAria: 'Navegación principal',
  homeAria: 'Inicio',
  cta: 'Contacto',
  openMenu: 'Abrir menú de navegación',
  closeMenu: 'Cerrar menú de navegación',
  menuDialog: 'Menú de navegación',
  backToTop: 'Volver arriba',
} as const;

export const en: Record<keyof typeof es, string> = {
  navAria: 'Main navigation',
  homeAria: 'Home',
  cta: 'Contact',
  openMenu: 'Open navigation menu',
  closeMenu: 'Close navigation menu',
  menuDialog: 'Navigation menu',
  backToTop: 'Back to top',
};
