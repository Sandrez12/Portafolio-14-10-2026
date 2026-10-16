import type { SkillEvidence, SkillFilterId } from '../components/skills/types';
import type { SkillCategory } from '../types';

/**
 * Orden de los filtros del grid de categorías técnicas (labels exactos de
 * `skillCategories`): Todas va primero y se añade en la UI.
 */
export const TECHNICAL_FILTER_ORDER: readonly Exclude<SkillFilterId, 'todas'>[] = [
  'lenguajes',
  'bases-de-datos',
  'web',
  'movil',
  'nube-e-infraestructura',
  'analisis-y-diseno',
  'herramientas',
];

/**
 * Evidencia verificable que respalda cada tecnología de la banda de tiles
 * ("Respaldado por: …"). Sólo proyectos, certificaciones o el CV — nada de
 * porcentajes de dominio ni años inventados (regla de `_spec/V2_BRIEF.md`).
 */
export const skillEvidence: Record<string, SkillEvidence> = {
  Python: ['LSC', 'Cognia'],
  Java: ['Plataforma IoT'],
  React: ['Cognia', 'MoodJournal'],
  Laravel: ['Gestor de Inventario'],
  MySQL: ['Gestor de Inventario'],
  PHP: ['Gestor de Inventario'],
  MongoDB: ['Certificación Introduction to MongoDB'],
  AWS: ['LSC (EC2)', '4 certificaciones AWS Academy'],
  Azure: ['IoT Central (del CV)'],
  Kotlin: ['Del CV'],
  'Android Studio': ['Del CV'],
  Oracle: ['Del CV'],
  Flask: ['Del CV'],
};

/**
 * Habilidades agrupadas por categorías del CV.
 * Los tiles rojos de la banda de skills usan las categorías con tecnologías
 * principales; las blandas y herramientas se listan como texto.
 */

export const skillCategories: SkillCategory[] = [
  {
    id: 'bases-de-datos',
    label: 'Bases de datos',
    description: 'SQL y NoSQL',
    skills: ['MySQL', 'MongoDB', 'Oracle', 'Oracle APEX'],
  },
  {
    id: 'lenguajes',
    label: 'Lenguajes',
    skills: ['Python', 'Java', 'Kotlin'],
  },
  {
    id: 'web',
    label: 'Web',
    skills: ['HTML', 'CSS', 'JavaScript', 'PHP', 'Laravel', 'React', 'Flask'],
  },
  {
    id: 'movil',
    label: 'Móvil',
    skills: ['Kotlin', 'Android Studio'],
  },
  {
    id: 'nube-e-infraestructura',
    label: 'Nube e infraestructura',
    skills: ['AWS', 'Microsoft Azure (IoT Central)', 'Infraestructura y redes'],
  },
  {
    id: 'analisis-y-diseno',
    label: 'Análisis y diseño',
    skills: [
      'Modelado de datos',
      'UML',
      'Diagramas de flujo',
      'Casos de uso y secuenciales',
    ],
  },
  {
    id: 'herramientas',
    label: 'Herramientas',
    skills: ['Excel', 'Word', 'PowerPoint'],
  },
  {
    id: 'blandas',
    label: 'Blandas',
    skills: [
      'Trabajo en equipo',
      'Comunicación asertiva',
      'Liderazgo',
      'Trabajo bajo presión',
      'Resolución de problemas',
      'Adaptabilidad y aprendizaje continuo',
      'Pensamiento analítico',
      'Gestión de recursos y procesos',
      'Toma de decisiones',
    ],
  },
];
