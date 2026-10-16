/**
 * Mensajes de UI del área "footer". Claves SIN prefijo (el prefijo "footer." se
 * añade en `messages/index.ts`). `en` debe tener EXACTAMENTE las mismas
 * claves que `es` (lo exige el tipo).
 */
export const es = {
  heading: 'Pie de página',
  navAriaLabel: 'Navegación del pie de página',
  emailAriaLabel: 'Email',
  githubAriaLabel: 'GitHub',
  linkedinAriaLabel: 'LinkedIn',
  backToTop: 'Volver arriba',
  credits: 'Hecho con React, TypeScript, Tailwind CSS y Framer Motion · © {year} {name}',
} as const;

export const en: Record<keyof typeof es, string> = {
  heading: 'Page footer',
  navAriaLabel: 'Footer navigation',
  emailAriaLabel: 'Email',
  githubAriaLabel: 'GitHub',
  linkedinAriaLabel: 'LinkedIn',
  backToTop: 'Back to top',
  credits: 'Built with React, TypeScript, Tailwind CSS and Framer Motion · © {year} {name}',
};
