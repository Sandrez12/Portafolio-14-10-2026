/** Filtro de certificaciones: "Todas" o uno de los emisores constatados. */
export type IssuerFilter = 'Todas' | 'AWS' | 'MongoDB' | 'Cisco';

/** Opciones del filtro (emisores presentes en `src/data/certifications.ts`). */
export const ISSUER_FILTERS: readonly IssuerFilter[] = ['Todas', 'AWS', 'MongoDB', 'Cisco'];
