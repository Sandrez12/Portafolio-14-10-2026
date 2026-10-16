/**
 * Tipos propios de la sección Skills V2 (viven aquí y NO en `src/types.ts`
 * para no pisar el dominio de otros agentes; ver `_spec/V2_COMPONENTS.md`).
 */

/** Ids estables de las categorías de habilidades del CV (valores exactos de src/data/skills.ts). */
export type SkillCategoryId =
  | 'bases-de-datos'
  | 'lenguajes'
  | 'web'
  | 'movil'
  | 'nube-e-infraestructura'
  | 'analisis-y-diseno'
  | 'herramientas'
  | 'blandas';

/**
 * Filtros del grid de categorías técnicas: 'todas' o una categoría con
 * tarjeta (las blandas van en su propia nube de chips, no en el grid).
 */
export type SkillFilterId = 'todas' | Exclude<SkillCategoryId, 'blandas'>;

/**
 * Evidencia VERIFICABLE que respalda una tecnología de la banda de tiles:
 * proyectos reales, certificaciones del CV o el propio CV. Nunca niveles de
 * dominio inventados (regla de `_spec/V2_BRIEF.md`).
 */
export type SkillEvidence = readonly string[];
