/**
 * Mensajes de UI del área "common". Claves SIN prefijo (el prefijo "common." se
 * añade en `messages/index.ts`). `en` debe tener EXACTAMENTE las mismas
 * claves que `es` (lo exige el tipo).
 */
export const es = {
  skipLink: 'Saltar al contenido principal',
} as const;

export const en: Record<keyof typeof es, string> = {
  skipLink: 'Skip to main content',
};
