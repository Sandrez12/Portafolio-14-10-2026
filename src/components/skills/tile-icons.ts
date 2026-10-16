import {
  siAmazonwebservices,
  siAndroidstudio,
  siFlask,
  siKotlin,
  siLaravel,
  siMongodb,
  siMysql,
  siOracle,
  siPython,
  siReact,
} from 'simple-icons';

/**
 * Icono de un tile de la banda de skills: path SVG de `simple-icons`
 * (tree-shaking por import nombrado), taza propia para Java o monograma
 * si la marca no está disponible en el paquete.
 */
export type TileIcon =
  { kind: 'path'; path: string } | { kind: 'cup' } | { kind: 'monogram'; monogram: string };

/** Paths de simple-icons por nombre de tecnología (según src/data/skills.ts). */
const pathIcons: Record<string, string> = {
  Python: siPython.path,
  Kotlin: siKotlin.path,
  React: siReact.path,
  Laravel: siLaravel.path,
  Flask: siFlask.path,
  MySQL: siMysql.path,
  MongoDB: siMongodb.path,
  Oracle: siOracle.path,
  AWS: siAmazonwebservices.path,
  'Android Studio': siAndroidstudio.path,
};

/**
 * Java fue retirada de `simple-icons` por políticas de marca: se dibuja una
 * taza de café simplificada propia (ver JavaCupIcon en SkillTile.tsx).
 */
const cupIcons = new Set<string>(['Java']);

/** Azure también fue retirada de simple-icons: monograma tipográfico. */
const monograms: Record<string, string> = {
  Azure: 'A',
};

/** Devuelve el icono de tile para una tecnología; monograma como fallback. */
export function getTileIcon(name: string): TileIcon {
  const path = pathIcons[name];
  if (path) {
    return { kind: 'path', path };
  }
  if (cupIcons.has(name)) {
    return { kind: 'cup' };
  }
  return { kind: 'monogram', monogram: monograms[name] ?? name.charAt(0) };
}
