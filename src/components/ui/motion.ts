import { motion } from 'framer-motion';

/**
 * Easing deliberado del sistema V2 (ver `_spec/V2_BRIEF.md`): curva
 * suave de salida rápida y llegada larga. Úsalo en todas las
 * transiciones de entrada/salida.
 */
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Tags HTML disponibles para props `as` (Reveal, Stagger, StaggerItem). */
export const MOTION_TAGS = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  aside: motion.aside,
  header: motion.header,
  footer: motion.footer,
  nav: motion.nav,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
  span: motion.span,
  p: motion.p,
  figure: motion.figure,
  blockquote: motion.blockquote,
} as const;

export type MotionTag = keyof typeof MOTION_TAGS;

/** Vista homogénea (mismas props de motion) para renderizar cualquier tag. */
export type AnyMotionTag = typeof motion.div;

/** Resuelve el componente motion de un tag (`getMotionTag('li')` → `motion.li`). */
export function getMotionTag(tag: MotionTag): AnyMotionTag {
  return MOTION_TAGS[tag] as AnyMotionTag;
}
