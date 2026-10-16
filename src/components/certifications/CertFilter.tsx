import type { IssuerFilter } from './filters';

interface CertFilterProps {
  /** Filtro activo (se refleja en `aria-pressed`). */
  active: IssuerFilter;
  options: readonly IssuerFilter[];
  onChange: (issuer: IssuerFilter) => void;
  className?: string;
}

const BASE_CLASSES =
  'inline-flex min-h-[44px] items-center rounded-full border px-5 text-sm font-medium transition-colors';

/**
 * Filtro por emisor (Todas / AWS / MongoDB / Cisco). Botones con
 * `aria-pressed` y target táctil de 44px. El estado activo se marca con
 * color estático (sin animación, seguro con reduced-motion).
 */
export function CertFilter({ active, options, onChange, className }: CertFilterProps) {
  return (
    <div
      role="group"
      aria-label="Filtrar certificaciones por emisor"
      className={`flex flex-wrap gap-2 ${className ?? ''}`}
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
                ? `${BASE_CLASSES} border-accent bg-accent text-ink`
                : `${BASE_CLASSES} border-teal text-ink-muted hover:border-accent hover:text-ink`
            }
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
