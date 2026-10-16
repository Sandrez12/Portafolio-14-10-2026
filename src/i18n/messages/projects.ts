/**
 * Mensajes de UI del área "projects". Claves SIN prefijo (el prefijo "projects." se
 * añade en `messages/index.ts`). `en` debe tener EXACTAMENTE las mismas
 * claves que `es` (lo exige el tipo).
 */
export const es = {
  eyebrow: 'Trabajo seleccionado',
  title: 'proyectos',
  subtitle:
    'Cinco proyectos con el código disponible en GitHub: inteligencia artificial, IoT, web y móvil. Cada uno explica qué es, su estado real y cuál fue mi aporte.',
  filterGroupLabel: 'Filtrar proyectos por categoría',
  filterTodos: 'Todos',
  filterIA: 'IA',
  filterIoT: 'IoT',
  filterWeb: 'Web',
  filterMobile: 'Móvil',
  listLabel: 'Lista de proyectos',
  viewDetail: 'Ver detalle',
  codeOnGithub: 'Código en GitHub',
  codeOnGithubAria: 'Código de {title} en GitHub',
  closeDialog: 'Cerrar detalle del proyecto',
  moreTechsAria: 'y {count} tecnologías más',
  sectionKeyPoints: 'Puntos clave',
  sectionMetrics: 'Métricas verificadas',
  sectionArchitecture: 'Arquitectura',
  sectionStack: 'Stack',
  sectionContribution: 'Mi aporte',
  sectionNextStep: 'Siguiente paso',
  statusCompleto: 'Completo',
  statusParcial: 'Parcial',
  statusPrototipo: 'Prototipo',
  badgeTeam: 'Trabajo en equipo',
  badgeIndividual: 'Proyecto individual',
} as const;

export const en: Record<keyof typeof es, string> = {
  eyebrow: 'Selected work',
  title: 'projects',
  subtitle:
    'Five projects with code available on GitHub: artificial intelligence, IoT, web and mobile. Each one explains what it is, its real status and what my contribution was.',
  filterGroupLabel: 'Filter projects by category',
  filterTodos: 'All',
  filterIA: 'AI',
  filterIoT: 'IoT',
  filterWeb: 'Web',
  filterMobile: 'Mobile',
  listLabel: 'Projects list',
  viewDetail: 'View details',
  codeOnGithub: 'Code on GitHub',
  codeOnGithubAria: 'Code of {title} on GitHub',
  closeDialog: 'Close project details',
  moreTechsAria: 'and {count} more technologies',
  sectionKeyPoints: 'Key points',
  sectionMetrics: 'Verified metrics',
  sectionArchitecture: 'Architecture',
  sectionStack: 'Stack',
  sectionContribution: 'My contribution',
  sectionNextStep: 'Next step',
  statusCompleto: 'Complete',
  statusParcial: 'Partial',
  statusPrototipo: 'Prototype',
  badgeTeam: 'Team project',
  badgeIndividual: 'Individual project',
};
