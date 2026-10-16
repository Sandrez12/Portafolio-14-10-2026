/**
 * Mensajes de UI del área "info". Claves SIN prefijo (el prefijo "info." se
 * añade en `messages/index.ts`). `en` debe tener EXACTAMENTE las mismas
 * claves que `es` (lo exige el tipo).
 */
export const es = {
  eyebrow: 'educación y experiencia',
  title: 'trayectoria',
  subtitle: 'Formación académica y experiencias que han marcado mi camino.',
  contactsTitle: 'Contacto',
  languagesTitle: 'Idiomas',
  languageLevelAriaLabel: '{name}: nivel {level} ({filled} de {total} segmentos)',
} as const;

export const en: Record<keyof typeof es, string> = {
  eyebrow: 'education and experience',
  title: 'journey',
  subtitle: 'Academic background and experiences that have shaped my path.',
  contactsTitle: 'Contact',
  languagesTitle: 'Languages',
  languageLevelAriaLabel: '{name}: level {level} ({filled} of {total} segments)',
};
