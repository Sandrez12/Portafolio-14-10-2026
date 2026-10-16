import { siAmazonwebservices, siCisco, siMongodb } from 'simple-icons';

/**
 * Icono del emisor de una certificación: path SVG de `simple-icons`
 * (import nombrado, tree-shaking) o monograma tipográfico si la marca no
 * está disponible en el paquete. Mismo patrón que
 * `src/components/skills/tile-icons.ts`.
 */
export type IssuerIcon = { kind: 'path'; path: string } | { kind: 'monogram'; monogram: string };

/** Paths de simple-icons por emisor (según `src/data/certifications.ts`). */
const pathIcons: Record<string, string> = {
  AWS: siAmazonwebservices.path,
  MongoDB: siMongodb.path,
  Cisco: siCisco.path,
};

/** Devuelve el icono de un emisor; monograma como fallback. */
export function getIssuerIcon(issuer: string): IssuerIcon {
  const path = pathIcons[issuer];
  return path ? { kind: 'path', path } : { kind: 'monogram', monogram: issuer.charAt(0) };
}
