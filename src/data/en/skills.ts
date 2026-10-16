import type { SkillEvidence } from '../../components/skills/types';
import type { SkillCategory } from '../../types';
import { skillCategories as esSkillCategories, skillEvidence as esSkillEvidence } from '../skills';

/**
 * El orden de los filtros es una constante NO textual (ids de categoría), así
 * que se reexporta tal cual desde el módulo ES.
 */
export { TECHNICAL_FILTER_ORDER } from '../skills';

/**
 * EN de las categorías: se sobrescribe SOBRE el ES (patrón de `_spec/I18N.md`)
 * sólo el texto traducible — labels, descripción y habilidades no tecnológicas.
 * Ids idénticos; los nombres de tecnologías no cambian.
 */
const categoryText: Record<string, Partial<SkillCategory>> = {
  'bases-de-datos': { label: 'Databases', description: 'SQL and NoSQL' },
  lenguajes: { label: 'Languages' },
  web: { label: 'Web' },
  movil: { label: 'Mobile' },
  'nube-e-infraestructura': {
    label: 'Cloud and infrastructure',
    skills: ['AWS', 'Microsoft Azure (IoT Central)', 'Infrastructure and networking'],
  },
  'analisis-y-diseno': {
    label: 'Analysis and design',
    skills: ['Data modeling', 'UML', 'Flowcharts', 'Use case and sequence diagrams'],
  },
  herramientas: { label: 'Tools' },
  blandas: {
    label: 'Soft skills',
    skills: [
      'Teamwork',
      'Assertive communication',
      'Leadership',
      'Working under pressure',
      'Problem solving',
      'Adaptability and continuous learning',
      'Analytical thinking',
      'Resource and process management',
      'Decision making',
    ],
  },
};

export const skillCategories: SkillCategory[] = esSkillCategories.map((category) => ({
  ...category,
  ...categoryText[category.id],
}));

/**
 * EN de la evidencia de la banda de tiles: mismos proyectos, certificaciones y
 * referencias al CV, con su equivalente EN. Se parte del ES (claves idénticas)
 * y se sobrescriben todas las entradas.
 */
const evidenceText: Record<string, SkillEvidence> = {
  Python: ['LSC', 'Cognia'],
  Java: ['IoT Platform'],
  React: ['Cognia', 'MoodJournal'],
  Laravel: ['Inventory Manager'],
  MySQL: ['Inventory Manager'],
  PHP: ['Inventory Manager'],
  MongoDB: ['Introduction to MongoDB certification'],
  AWS: ['LSC (EC2)', '4 AWS Academy certifications'],
  Azure: ['IoT Central (from CV)'],
  Kotlin: ['From CV'],
  'Android Studio': ['From CV'],
  Oracle: ['From CV'],
  Flask: ['From CV'],
};

export const skillEvidence: Record<string, SkillEvidence> = {
  ...esSkillEvidence,
  ...evidenceText,
};

