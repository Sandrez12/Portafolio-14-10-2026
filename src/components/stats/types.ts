/**
 * Tipos de la sección Stats (V2). Viven en archivo propio (no en
 * `src/types.ts`) según el alcance del job.
 */

/**
 * Cifra verificada del portafolio. SÓLO se permiten las cifras constatadas
 * por `_spec/V2_BRIEF.md`: prohibido inventar años de experiencia, niveles
 * de dominio en %, clientes o métricas.
 */
export interface StatItem {
  /** Identificador estable para keys. */
  id: string;
  /** Numeración visible de la tarjeta ("01"–"06"). */
  index: string;
  /** Valor verificado del contador. */
  value: number;
  /** Decimales a mostrar (p. ej. 2 para 91,84). */
  decimals?: number;
  /** Sufijo literal del contador, p. ej. "%" o " videos". */
  suffix?: string;
  /** Etiqueta corta bajo el número, p. ej. "proyectos". */
  label: string;
  /** Frase de contexto verificada, sin cifras inventadas. */
  context: string;
}
