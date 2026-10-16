import type { MessageKey } from '../../i18n/messages';
import type { ProjectFilter } from './TagFilter';

/**
 * Clave de mensaje para la ETIQUETA VISIBLE de cada filtro (Botones del
 * `TagFilter` y píldora de dominio del `ProjectModal`). El valor interno
 * ('Todos' | 'IA' | 'IoT' | 'Web' | 'Móvil') se mantiene como dato (comparación
 * con `project.tag`); sólo el texto que se muestra se traduce con `t(...)`.
 */
export const FILTER_LABEL_KEYS: Record<ProjectFilter, MessageKey> = {
  Todos: 'projects.filterTodos',
  IA: 'projects.filterIA',
  IoT: 'projects.filterIoT',
  Web: 'projects.filterWeb',
  Móvil: 'projects.filterMobile',
};