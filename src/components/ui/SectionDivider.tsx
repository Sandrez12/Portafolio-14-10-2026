type SectionDividerVariant = 'wave' | 'ribbons' | 'drip';

interface SectionDividerProps {
  /** Variante del divisor (por defecto `wave`). */
  variant?: SectionDividerVariant;
  /** Alturas/ajustes extra para el contenedor (se combinan con la base). */
  className?: string;
}

const HEIGHT_CLASSES: Record<SectionDividerVariant, string> = {
  wave: 'h-16 sm:h-24',
  ribbons: 'h-16 sm:h-20',
  drip: 'h-14 sm:h-20',
};

/**
 * Divisor de sección: cintas/ondas entintadas SVG propias (no copiadas) en
 * accent/accent-mid/accent-dark/teal que ocupan TODO el ancho sin provocar
 * scroll horizontal (SVG block al 100%, sin márgenes negativos).
 * Es puramente decorativo: `aria-hidden`.
 *
 * Ejemplo: `<SectionDivider variant="ribbons" />`
 */
export function SectionDivider({ variant = 'wave', className }: SectionDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={`w-full overflow-hidden ${HEIGHT_CLASSES[variant]} ${className ?? ''}`}
    >
      {variant === 'wave' ? (
        <svg
          viewBox="0 0 1440 96"
          preserveAspectRatio="none"
          className="block h-full w-full"
          focusable="false"
        >
          <path
            d="M0 62 C 240 18 480 18 720 46 C 960 74 1200 74 1440 38 L1440 96 L0 96 Z"
            fill="#7B1D1D"
          />
          <path
            d="M0 76 C 260 38 520 32 760 58 C 1000 84 1240 84 1440 54 L1440 96 L0 96 Z"
            fill="#BC3A3A"
          />
        </svg>
      ) : null}

      {variant === 'ribbons' ? (
        <svg
          viewBox="0 0 1440 140"
          preserveAspectRatio="none"
          className="block h-full w-full"
          focusable="false"
        >
          <path
            d="M-20 82 C 220 34 460 116 700 78 C 940 40 1160 116 1460 58"
            fill="none"
            stroke="#236B6B"
            strokeWidth={16}
            strokeLinecap="round"
          />
          <path
            d="M-20 108 C 240 70 480 138 720 104 C 960 70 1180 134 1460 94"
            fill="none"
            stroke="#7B1D1D"
            strokeWidth={10}
            strokeLinecap="round"
          />
          <path
            d="M-20 52 C 260 96 500 12 740 48 C 980 84 1200 24 1460 54"
            fill="none"
            stroke="#BC3A3A"
            strokeWidth={7}
            strokeLinecap="round"
          />
        </svg>
      ) : null}

      {variant === 'drip' ? (
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="block h-full w-full"
          focusable="false"
        >
          {/* Banda superior con goterones de tinta que cuelgan. */}
          <path d="M0 0 H1440 V14 H0 Z" fill="#BC3A3A" />
          <path d="M120 0 C 120 34 128 58 140 58 C 152 58 160 34 160 0 Z" fill="#BC3A3A" />
          <path d="M420 0 C 420 52 428 88 442 88 C 456 88 462 52 462 0 Z" fill="#7B1D1D" />
          <path d="M760 0 C 760 30 766 50 776 50 C 786 50 792 30 792 0 Z" fill="#BC3A3A" />
          <path d="M1010 0 C 1010 44 1018 76 1030 76 C 1042 76 1050 44 1050 0 Z" fill="#3A0E0E" />
          <path d="M1300 0 C 1300 26 1306 44 1314 44 C 1322 44 1328 26 1328 0 Z" fill="#7B1D1D" />
        </svg>
      ) : null}
    </div>
  );
}
