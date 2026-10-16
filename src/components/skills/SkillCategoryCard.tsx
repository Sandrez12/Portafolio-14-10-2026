import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { SkillCategory } from '../../types';
import { EASE } from '../ui/motion';
import { CategoryIcon } from './category-icons';
import type { SkillCategoryId } from './types';

interface SkillCategoryCardProps {
  /** Categoría del CV (label/description/skills exactos de src/data/skills.ts). */
  category: SkillCategory;
}

/**
 * Tarjeta de categoría de Skills V2: icono SVG propio de la categoría,
 * título + nota del CV y chips de tecnologías con entrada en stagger.
 *
 * Se usa dentro de un `AnimatePresence` con `layout`: la tarjeta entra/sale
 * con fade+slide (sólo transform/opacity) y se reordena suavemente al
 * filtrar. El hover (elevación) va en un wrapper interno NO animado por
 * framer para que el transform de CSS no choque con el de las variantes.
 * Reduced-motion: estado final estático, sin layout ni stagger.
 */
export function SkillCategoryCard({ category }: SkillCategoryCardProps) {
  const prefersReducedMotion = useReducedMotion();

  const cardVariants: Variants = {
    hidden: prefersReducedMotion ? {} : { opacity: 0, y: 28, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: EASE } },
    exit: prefersReducedMotion
      ? {}
      : { opacity: 0, scale: 0.96, transition: { duration: 0.22, ease: 'easeIn' } },
  };

  // Los chips heredan la propagación de variantes de la tarjeta (stagger).
  const chipsVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.05 } },
  };
  const chipVariants: Variants = {
    hidden: prefersReducedMotion ? {} : { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
  };

  return (
    <motion.li
      layout={!prefersReducedMotion}
      variants={cardVariants}
      initial={prefersReducedMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '-48px' }}
      exit="exit"
      className="h-full"
    >
      {/*
        Wrapper interno de la tarjeta: aquí vive el hover/focus (elevación
        con transform + aro de acento) sin pelear con el transform de framer.
      */}
      <div className="flex h-full flex-col rounded-2xl bg-panel p-6 transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30 hover:ring-1 hover:ring-accent/60 focus-within:ring-1 focus-within:ring-accent/60 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
        <div className="flex items-center gap-3.5">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent text-ink">
            {/* El id de SkillCategory es `string`; el elenco de datos usa
                exactamente los ids de SkillCategoryId (src/data/skills.ts). */}
            <CategoryIcon id={category.id as SkillCategoryId} className="h-6 w-6" />
          </span>
          <div>
            <h3 className="font-sans text-lg font-semibold leading-tight text-ink">
              {category.label}
            </h3>
            {category.description ? (
              <p className="mt-0.5 text-[13px] text-ink-muted">{category.description}</p>
            ) : null}
          </div>
        </div>

        <motion.ul variants={chipsVariants} className="mt-4 flex flex-wrap gap-2">
          {category.skills.map((skill) => (
            <motion.li
              key={skill}
              variants={chipVariants}
              className="rounded-md bg-bg px-2.5 py-1.5 text-[13px] font-medium text-ink-muted transition-colors duration-200 hover:text-ink hover:ring-1 hover:ring-accent/50"
            >
              {skill}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.li>
  );
}
