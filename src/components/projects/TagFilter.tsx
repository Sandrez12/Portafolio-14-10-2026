import { motion, useReducedMotion } from 'framer-motion';
import { useT } from '../../i18n';
import type { ProjectTag } from '../../types';
import { FILTER_LABEL_KEYS } from './filterLabels';
import { EASE } from '../ui/motion';

/** Filtro de proyectos: "Todos" o una de las etiquetas de dominio. */
export type ProjectFilter = 'Todos' | ProjectTag;

interface TagFilterProps {
  /** Filtro activo (se refleja en `aria-pressed`). */
  active: ProjectFilter;
  options: readonly ProjectFilter[];
  onChange: (tag: ProjectFilter) => void;
}

const BASE_CLASSES =
  'relative inline-flex min-h-[44px] items-center rounded-full border px-4 text-sm font-medium transition-colors';

/**
 * Filtro por etiqueta de dominio (Todos / IA / IoT / Web / Móvil).
 * Botones con `aria-pressed` y píldora de fondo que se desliza entre el
 * botón activo con `layoutId` de framer (sólo transform, desactivado con
 * `prefers-reduced-motion`).
 */
export function TagFilter({ active, options, onChange }: TagFilterProps) {
  const t = useT();
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      role="group"
      aria-label={t('projects.filterGroupLabel')}
      className="flex flex-wrap gap-2"
    >
      {options.map((option) => {
        const isActive = option === active;
        return (
          <button
            key={option}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(option)}
            className={
              isActive
                ? `${BASE_CLASSES} border-accent text-ink${prefersReducedMotion ? ' bg-accent' : ''}`
                : `${BASE_CLASSES} border-teal text-ink-muted hover:border-accent hover:text-ink`
            }
          >
            {isActive && !prefersReducedMotion && (
              <motion.span
                layoutId="projects-filter-pill"
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-accent"
                transition={{ duration: 0.4, ease: EASE }}
              />
            )}
            <span className="relative z-10">{t(FILTER_LABEL_KEYS[option])}</span>
          </button>
        );
      })}
    </div>
  );
}
