import type { SkillFilterId } from './types';

/** Opción del filtro de categorías (id estable + label visible del CV). */
export interface FilterOption {
  id: SkillFilterId;
  label: string;
}

interface CategoryFilterProps {
  /** Opciones en orden (Todas primero); labels exactos de src/data/skills.ts. */
  options: readonly FilterOption[];
  /** Filtro activo. */
  value: SkillFilterId;
  onChange: (id: SkillFilterId) => void;
}

/**
 * Filtro por categoría de Skills: botones tipo toggle con `aria-pressed` y
 * objetivo táctil ≥44px. Sólo cambia colores (sin movimiento), así que
 * respeta reduced-motion por construcción.
 */
export function CategoryFilter({ options, value, onChange }: CategoryFilterProps) {
  return (
    <div
      role="group"
      aria-label="Filtrar habilidades por categoría"
      className="flex flex-wrap justify-center gap-2.5"
    >
      {options.map((option) => {
        const active = value === option.id;
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.id)}
            className={`min-h-[44px] rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
              active
                ? 'border-accent bg-accent text-ink'
                : 'border-teal/60 bg-transparent text-ink-muted hover:border-accent/70 hover:text-ink'
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
