/**
 * Tipos del portafolio. Los datos viven en `src/data/` y deben coincidir con
 * la especificación de `_spec/BRIEF.md` (no inventar ni añadir datos).
 */

/** Un canal de contacto (iconos monocromos blancos en la UI). */
export interface ContactItem {
  /** Identificador estable usado por la UI para elegir el icono. */
  id: 'email' | 'phone' | 'github' | 'linkedin';
  label: string;
  /** Texto visible, p. ej. la dirección de correo. */
  value: string;
  /** `href` accesible (mailto:, tel:, https://...). */
  href: string;
}

/** Idioma con barra segmentada de 8 segmentos. */
export interface Language {
  name: string;
  /** Etiqueta de nivel mostrada junto al nombre, p. ej. "C1". */
  level: string;
  /** Descripción corta que va debajo de la barra. */
  description: string;
  /** Segmentos rellenos (blanco) sobre el total. */
  filledSegments: number;
  totalSegments: number;
}

/** Fila de la línea de tiempo de educación/experiencia. */
export interface EducationEntry {
  /** Periodo mostrado en la columna de año, p. ej. "2023 – actualidad". */
  period: string;
  title: string;
  institution: string;
  /** Detalle opcional (p. ej. el aporte en el voluntariado Ulibro). */
  description?: string;
}

/** Datos personales y resumen. La dirección física NO se publica. */
export interface Profile {
  name: string;
  headline: string;
  summary: string;
  email: string;
  phone: string;
  githubUrl: string;
  linkedinUrl: string;
  /**
   * Asset de la foto de "¿quién soy?". Por defecto es el placeholder
   * `src/assets/photo-placeholder.svg`; reemplazable por una foto real.
   */
  photo: string;
}

/** Categoría de habilidades (agrupación tomada del CV). */
export interface SkillCategory {
  /** Identificador estable (slug) para keys/anchors. */
  id: string;
  label: string;
  /** Nota de categoría, p. ej. "SQL y NoSQL". */
  description?: string;
  skills: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  year: number;
}

/** Etiqueta de dominio del proyecto (cabecera ilustrada por tag). */
export type ProjectTag = 'IA' | 'IoT' | 'Web' | 'Móvil';

export type ProjectStatus = 'completo' | 'parcial' | 'prototipo';

/** Métrica verificada de un proyecto: sólo cifras constatadas, nunca inventadas. */
export interface ProjectMetric {
  /** Etiqueta de la métrica, p. ej. "videos de test". */
  label: string;
  /** Valor verificado de la métrica. */
  value: number;
  /** Decimales a mostrar, p. ej. 2 para 91.84. */
  decimals?: number;
  /** Prefijo literal del contador, p. ej. "V". */
  prefix?: string;
  /** Sufijo literal del contador, p. ej. "%" o " días". */
  suffix?: string;
}

/** Clase visual del nodo del diagrama (elige el glifo dibujado). */
export type DiagramNodeKind =
  | 'app'
  | 'api'
  | 'db'
  | 'ml'
  | 'cloud'
  | 'device'
  | 'broker'
  | 'rules'
  | 'twin'
  | 'dashboard'
  | 'output'
  | 'auth'
  | 'edge';

/** Nodo de un diagrama de arquitectura. */
export interface DiagramNode {
  /** Identificador estable referenciado por las aristas. */
  id: string;
  /** Etiqueta visible (se parte en varias líneas si es larga). */
  label: string;
  /** Clase visual (glifo) del nodo. */
  kind: DiagramNodeKind;
}

/** Arista dirigida entre dos nodos del diagrama. */
export interface DiagramEdge {
  /** Id del nodo de origen. */
  from: string;
  /** Id del nodo de destino. */
  to: string;
  /** Etiqueta opcional dibujada sobre el trazo, p. ej. "SSE". */
  label?: string;
}

/** Diagrama de arquitectura de un proyecto (lo dibuja `ArchitectureDiagram`). */
export interface ArchitectureDiagram {
  /** Nombre accesible del diagrama (va al `<title>` del SVG). */
  caption: string;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
}

/** Proyecto del portafolio (tono honesto: aporte, estado y equipo siempre visibles). */
export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  /** 3–4 puntos clave. */
  highlights: string[];
  /** Stack técnico mostrado como chips. */
  stack: string[];
  status: ProjectStatus;
  repoUrl: string;
  tag: ProjectTag;
  /** `true` si fue trabajo en equipo. */
  teamProject: boolean;
  /** Nota de contexto (autoría de dataset, aporte propio, etc.). */
  note?: string;
  /** Año del proyecto: SÓLO si está verificado (si no consta, se omite). */
  year?: number;
  /** Aporte personal dentro del proyecto (individual vs equipo), con transparencia. */
  contribution: string;
  /** Siguiente paso honesto y concreto del proyecto. */
  nextStep: string;
  /** Cifras verificadas del proyecto (sólo las constatadas). */
  metrics?: ProjectMetric[];
  /** Diagrama de arquitectura del flujo real del proyecto. */
  architecture: ArchitectureDiagram;
}
