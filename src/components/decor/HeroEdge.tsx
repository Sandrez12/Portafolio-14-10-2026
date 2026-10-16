interface HeroEdgeProps {
  className?: string;
}

/**
 * Fragmentos decorativos ORIGINALES del hero (no copiados de la referencia):
 * cintas-onda "entintadas" en accent-mid/accent/teal con una masa oscura y
 * salpicaduras, que sangran por el borde izquierdo e inferior del hero, a la
 * manera de la referencia. Se consumen anclados a `bottom-0 left-0` con
 * `preserveAspectRatio="xMinYMax slice"`. Puramente decorativo: se marca
 * aria-hidden aquí y en el consumidor.
 */
export function HeroEdge({ className = 'h-full w-full' }: HeroEdgeProps) {
  return (
    <svg
      viewBox="0 0 240 160"
      preserveAspectRatio="xMinYMax slice"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* Masa oscura que sangra por la esquina inferior izquierda */}
      <path fill="#3A0E0E" d="M -70 170 C -6 138 52 152 70 190 L -70 190 Z" />
      {/* Cinta ancha (accent-mid) que entra por el borde izquierdo */}
      <path
        fill="none"
        stroke="#7B1D1D"
        strokeWidth="26"
        strokeLinecap="round"
        d="M -60 44 C 30 14 118 22 196 74"
      />
      {/* Cinta fina (accent) paralela */}
      <path
        fill="none"
        stroke="#BC3A3A"
        strokeWidth="14"
        strokeLinecap="round"
        d="M -60 98 C 40 76 128 88 204 142"
      />
      {/* Trazo teal que sangra por el borde inferior */}
      <path
        fill="none"
        stroke="#236B6B"
        strokeWidth="10"
        strokeLinecap="round"
        d="M -60 132 C 40 120 106 126 164 160"
      />
      {/* Par de nodos conectados (eco del grafo del hero) */}
      <path d="M 92 120 L 132 150" stroke="#236B6B" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="92" cy="120" r="4" fill="#236B6B" />
      <circle cx="132" cy="150" r="3" fill="#BC3A3A" />
      {/* Salpicaduras de tinta */}
      <circle cx="120" cy="58" r="3" fill="#BC3A3A" />
      <circle cx="74" cy="38" r="2.5" fill="#236B6B" />
      <circle cx="168" cy="112" r="3" fill="#BC3A3A" />
      <circle cx="140" cy="18" r="2" fill="#C9D7DA" opacity="0.8" />
      <circle cx="206" cy="84" r="2.5" fill="#BC3A3A" />
    </svg>
  );
}
