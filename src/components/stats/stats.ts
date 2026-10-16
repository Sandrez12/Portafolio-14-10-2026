import type { MessageKey } from '../../i18n';
import type { StatItem } from './types';

/**
 * Cifras de la sección Stats. SÓLO las permitidas por `_spec/V2_BRIEF.md`:
 * 5 proyectos, 6 certificaciones, 3 idiomas, 41 glosas de LSC, 91,84 % de
 * accuracy de test y 490 videos del dataset de LSC. Nada inventado.
 */
export const STATS: readonly StatItem[] = [
  {
    id: 'proyectos',
    index: '01',
    value: 5,
    label: 'proyectos',
    context: 'personales y en equipo, con código publicado en GitHub.',
  },
  {
    id: 'certificaciones',
    index: '02',
    value: 6,
    label: 'certificaciones',
    context: 'obtenidas en 2025 con AWS, MongoDB y Cisco.',
  },
  {
    id: 'idiomas',
    index: '03',
    value: 3,
    label: 'idiomas',
    context: 'español (nativo), inglés (C1) y portugués (básico).',
  },
  {
    id: 'glosas-lsc',
    index: '04',
    value: 41,
    label: 'glosas de LSC',
    context: 'que reconoce el traductor de Lengua de Señas Colombiana.',
  },
  {
    id: 'accuracy-lsc',
    index: '05',
    value: 91.84,
    decimals: 2,
    suffix: '%',
    label: 'accuracy de test',
    context: 'del modelo LSTM bidireccional del traductor LSC.',
  },
  {
    id: 'videos-lsc',
    index: '06',
    value: 490,
    label: 'videos de LSC',
    context: 'del dataset de señas con el que se entrenó y evaluó el traductor.',
  },
];

/**
 * Claves de mensajes (stats.*) de la etiqueta y la frase de contexto de cada
 * cifra, por id estable; los literales ES son EXACTAMENTE los de STATS y el
 * EN vive en `src/i18n/messages/stats.ts`.
 */
export const STAT_LABEL_KEYS: Record<string, MessageKey> = {
  proyectos: 'stats.labelProyectos',
  certificaciones: 'stats.labelCertificaciones',
  idiomas: 'stats.labelIdiomas',
  'glosas-lsc': 'stats.labelGlosasLsc',
  'accuracy-lsc': 'stats.labelAccuracyLsc',
  'videos-lsc': 'stats.labelVideosLsc',
};

export const STAT_CONTEXT_KEYS: Record<string, MessageKey> = {
  proyectos: 'stats.contextProyectos',
  certificaciones: 'stats.contextCertificaciones',
  idiomas: 'stats.contextIdiomas',
  'glosas-lsc': 'stats.contextGlosasLsc',
  'accuracy-lsc': 'stats.contextAccuracyLsc',
  'videos-lsc': 'stats.contextVideosLsc',
};
