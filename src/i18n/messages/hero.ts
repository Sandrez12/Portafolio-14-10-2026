/**
 * Mensajes de UI del área "hero". Claves SIN prefijo (el prefijo "hero." se
 * añade en `messages/index.ts`). `en` debe tener EXACTAMENTE las mismas
 * claves que `es` (lo exige el tipo). Los roles del typewriter usan claves
 * numeradas (`role1`…`role5`, lista de longitud fija).
 */
export const es = {
  title: 'Portafolio',
  scrollLabel: 'scroll',
  scrollDown: 'Bajar a la sección ¿quién soy?',
  githubAria: 'GitHub de Andrés (se abre en pestaña nueva)',
  linkedinAria: 'LinkedIn de Andrés (se abre en pestaña nueva)',
  viewProjects: 'Ver proyectos',
  contact: 'Contacto',
  downloadCv: 'Descargar CV',
  role1: 'Estudiante de Ingeniería de Sistemas',
  role2: 'Python · Java · Kotlin',
  role3: 'Bases de datos SQL y NoSQL',
  role4: 'Desarrollo web con React y Laravel',
  role5: 'Nube: AWS y Azure IoT Central',
} as const;

export const en: Record<keyof typeof es, string> = {
  title: 'Portfolio',
  scrollLabel: 'scroll',
  scrollDown: 'Scroll down to the who am I? section',
  githubAria: "Andrés's GitHub (opens in a new tab)",
  linkedinAria: "Andrés's LinkedIn (opens in a new tab)",
  viewProjects: 'View projects',
  contact: 'Contact',
  downloadCv: 'Download CV',
  role1: 'Systems Engineering student',
  role2: 'Python · Java · Kotlin',
  role3: 'SQL and NoSQL databases',
  role4: 'Web development with React and Laravel',
  role5: 'Cloud: AWS and Azure IoT Central',
};
