import type { ReactElement } from 'react';
import type { ProjectTag } from '../../types';

/**
 * Ilustraciones originales por tag (glifos de trazo monocromo sobre
 * accent-dark, dibujadas a mano en SVG). Decorativas: el contenedor lleva
 * `aria-hidden` y no hay texto en el SVG.
 */
const ILLUSTRATIONS: Record<ProjectTag, ReactElement> = {
  // IA: red de nodos/neuronas conectadas, con un nodo destacado en accent.
  IA: (
    <g fill="none" strokeLinecap="round">
      <path
        d="M28 122 L72 70 M72 70 L118 106 M72 70 L116 34 M116 34 L176 86 M118 106 L176 86 M176 86 L208 46 M118 106 L168 132 M168 132 L208 46"
        stroke="#236B6B"
        strokeWidth="1.4"
      />
      <g fill="#C9D7DA" stroke="none">
        <circle cx="28" cy="122" r="3.4" />
        <circle cx="72" cy="70" r="3.4" />
        <circle cx="116" cy="34" r="3.4" />
        <circle cx="118" cy="106" r="3.4" />
        <circle cx="168" cy="132" r="3.4" />
        <circle cx="208" cy="46" r="3.4" />
      </g>
      <circle cx="176" cy="86" r="9" stroke="#BC3A3A" strokeWidth="2.4" />
      <circle cx="176" cy="86" r="3" fill="#BC3A3A" stroke="none" />
    </g>
  ),
  // IoT: nodo central con ondas y sensores conectados con líneas punteadas.
  IoT: (
    <g fill="none" strokeLinecap="round">
      <g stroke="#236B6B" strokeWidth="1.6">
        <path d="M98 80 A 22 22 0 0 1 142 80" />
        <path d="M86 80 A 34 34 0 0 1 154 80" />
        <path d="M74 80 A 46 46 0 0 1 166 80" />
      </g>
      <g stroke="#236B6B" strokeWidth="1.4" strokeDasharray="4 5">
        <path d="M48 48 L110 74 M192 48 L130 74 M44 112 L108 88 M188 116 L132 88" />
      </g>
      <g stroke="#C9D7DA" strokeWidth="2">
        <circle cx="40" cy="40" r="6" />
        <circle cx="200" cy="40" r="6" />
        <circle cx="36" cy="120" r="6" />
        <circle cx="204" cy="124" r="6" />
      </g>
      <g fill="#BC3A3A" stroke="none">
        <circle cx="40" cy="40" r="1.8" />
        <circle cx="200" cy="40" r="1.8" />
        <circle cx="36" cy="120" r="1.8" />
        <circle cx="204" cy="124" r="1.8" />
      </g>
      <circle cx="120" cy="80" r="12" stroke="#BC3A3A" strokeWidth="2.4" />
      <circle cx="120" cy="80" r="4" fill="#BC3A3A" stroke="none" />
    </g>
  ),
  // Web: ventana de navegador con barra de direcciones y bloques de contenido.
  Web: (
    <g fill="none" strokeLinecap="round">
      <rect x="24" y="26" width="192" height="112" rx="10" stroke="#236B6B" strokeWidth="2.4" />
      <path d="M24 52 H216" stroke="#236B6B" strokeWidth="2" />
      <g fill="#BC3A3A" stroke="none">
        <circle cx="38" cy="39" r="3" />
        <circle cx="50" cy="39" r="3" />
        <circle cx="62" cy="39" r="3" />
      </g>
      <rect x="84" y="33" width="120" height="12" rx="6" stroke="#C9D7DA" strokeWidth="1.4" />
      <rect x="38" y="64" width="64" height="58" rx="6" stroke="#BC3A3A" strokeWidth="1.8" />
      <path
        d="M116 72 H200 M116 86 H184 M116 100 H196 M116 114 H164"
        stroke="#C9D7DA"
        strokeWidth="1.6"
      />
    </g>
  ),
  // Móvil: teléfono con notch, bloque destacado y líneas de contenido.
  Móvil: (
    <g fill="none" strokeLinecap="round">
      <rect x="94" y="14" width="52" height="132" rx="12" stroke="#236B6B" strokeWidth="2.4" />
      <path d="M110 22 H130" stroke="#C9D7DA" strokeWidth="1.8" />
      <rect x="102" y="32" width="36" height="30" rx="5" stroke="#BC3A3A" strokeWidth="1.8" />
      <path
        d="M102 72 H138 M102 84 H130 M102 96 H138 M102 108 H124 M102 120 H134"
        stroke="#C9D7DA"
        strokeWidth="1.6"
      />
      <circle cx="120" cy="138" r="4" stroke="#C9D7DA" strokeWidth="1.6" />
    </g>
  ),
};

/**
 * Cintas decorativas (accent y teal) que sangran por los bordes de la
 * cabecera. Se estiran con `preserveAspectRatio="none"` para cubrir todo el
 * ancho sin scroll horizontal.
 */
function CoverRibbons({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 160"
      preserveAspectRatio="none"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M-12 34 C 36 8, 92 54, 140 22 S 236 40, 252 18"
        stroke="#BC3A3A"
        strokeWidth="14"
        strokeLinecap="round"
        opacity="0.28"
      />
      <path
        d="M-12 138 C 44 112, 96 156, 150 128 S 232 150, 252 132"
        stroke="#236B6B"
        strokeWidth="10"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  );
}

interface ProjectCoverProps {
  /** Etiqueta de dominio: elige la ilustración (IA / IoT / Web / Móvil). */
  tag: ProjectTag;
  /** Clases extra; se usan sobre todo para fijar la altura desde el padre. */
  className?: string;
}

/**
 * Cabecera ilustrada de un proyecto: SVG original por tag sobre fondo
 * `accent-dark` con cintas accent/teal. Decorativa (`aria-hidden`).
 *
 * El movimiento responde al hover del PADRE (que debe llevar la clase
 * `group`): parallax sutil en las cintas y zoom en la ilustración, SÓLO con
 * transform (`motion-safe:` lo desactiva con `prefers-reduced-motion`).
 *
 * Ejemplo: `<div className="group"><ProjectCover tag="IA" /></div>`
 */
export function ProjectCover({ tag, className }: ProjectCoverProps) {
  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden bg-accent-dark ${className ?? 'h-36 sm:h-44'}`}
    >
      {/* Cintas: parallax suave al hacer hover sobre la tarjeta (sólo transform). */}
      <CoverRibbons className="absolute inset-0 h-full w-full motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover:-translate-y-3" />
      {/* Ilustración: zoom sutil al hacer hover sobre la tarjeta (sólo transform). */}
      <svg
        viewBox="0 0 240 160"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover:scale-110"
      >
        {ILLUSTRATIONS[tag]}
      </svg>
      {/* Fundido inferior hacia el panel (sólo color, sin movimiento). */}
      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-panel to-transparent" />
    </div>
  );
}
