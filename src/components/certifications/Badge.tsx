import type { Certification } from '../../types';
import { getIssuerIcon } from './issuer-icons';

/**
 * Escudo SVG propio (trazado original, no se copia ninguna marca): contorno
 * accent con relleno accent-dark y el icono del emisor centrado.
 */
const SHIELD_PATH = 'M32 4 L56 13 V30 C56 47 45 57 32 61 C19 57 8 47 8 30 V13 Z';

interface BadgeProps {
  cert: Certification;
  /** Clases de tamaño del badge (por defecto 64px, 80px en sm+). */
  className?: string;
}

/**
 * Insignia de certificación: escudo SVG propio con el icono del emisor
 * (simple-icons: AWS, MongoDB, Cisco) o un monograma si la marca no existe
 * en el paquete. Decorativa (`aria-hidden`): el emisor siempre se lee en el
 * texto de la tarjeta.
 */
export function Badge({ cert, className = 'h-16 w-16 sm:h-20 sm:w-20' }: BadgeProps) {
  const icon = getIssuerIcon(cert.issuer);

  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
      className={`shrink-0 ${className}`}
    >
      <path
        d={SHIELD_PATH}
        fill="#3A0E0E"
        stroke="#BC3A3A"
        strokeWidth={2.5}
        strokeLinejoin="round"
      />
      {icon.kind === 'path' ? (
        <g transform="translate(20 20)">
          <path d={icon.path} fill="#FFFFFF" />
        </g>
      ) : (
        <text x="32" y="39" textAnchor="middle" fontSize="24" fontWeight="700" fill="#FFFFFF">
          {icon.monogram}
        </text>
      )}
    </svg>
  );
}
