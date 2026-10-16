import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { skillCategories, skillEvidence, TECHNICAL_FILTER_ORDER } from '../data/skills';
import type { SkillCategory } from '../types';
import { CategoryFilter, type FilterOption } from './skills/CategoryFilter';
import { SkillCategoryCard } from './skills/SkillCategoryCard';
import { SkillTile } from './skills/SkillTile';
import { SoftSkillsCloud } from './skills/SoftSkillsCloud';
import type { SkillFilterId } from './skills/types';
import { Container } from './ui/Container';
import { SectionHeading } from './ui/SectionHeading';
import { Stagger, StaggerItem } from './ui/Stagger';

/**
 * Tecnologías principales del CV que aparecen como tiles rojos en la banda
 * (todas provienen de src/data/skills.ts; Java usa una taza SVG propia y
 * Azure un monograma). Cada una tiene evidencia verificable en
 * `skillEvidence` (proyectos, certificaciones o el CV).
 */
const BAND_SKILLS: string[] = [
  'Python',
  'Java',
  'Kotlin',
  'React',
  'Laravel',
  'Flask',
  'MySQL',
  'MongoDB',
  'Oracle',
  'AWS',
  'Azure',
  'Android Studio',
];

/** Categorías técnicas (sin blandas) en el orden de los filtros del CV. */
const TECHNICAL_CATEGORIES: SkillCategory[] = TECHNICAL_FILTER_ORDER.map((id) =>
  skillCategories.find((category) => category.id === id),
).filter((category): category is SkillCategory => category !== undefined);

/** Opciones del filtro: Todas + categorías técnicas (labels exactos del CV). */
const FILTER_OPTIONS: FilterOption[] = [
  { id: 'todas', label: 'Todas' },
  ...TECHNICAL_FILTER_ORDER.map((id) => ({
    id,
    label: skillCategories.find((category) => category.id === id)?.label ?? id,
  })),
];

/** Categoría de habilidades blandas del CV (nube de chips propia). */
const SOFT_SKILLS = skillCategories.find((category) => category.id === 'blandas');

/**
 * Skills V2: encabezado grande, banda full-bleed con tiles de 96px y tooltip
 * de evidencia verificable ("Respaldado por: …"), filtro por categoría con
 * reordenado animado (AnimatePresence + layout) y nube de habilidades blandas.
 *
 * La banda conserva intacta la técnica full-bleed original (márgenes
 * calc(50% - 50vw) que dependen del px-4 sm:px-6 del wrapper de App): ver el
 * comentario inline. El resto del contenido cancela ese padding para
 * alinearse con el Container (max-w 1240px) del resto de la página.
 */
export function Skills() {
  const [filter, setFilter] = useState<SkillFilterId>('todas');
  const prefersReducedMotion = useReducedMotion();

  const visibleCategories =
    filter === 'todas'
      ? TECHNICAL_CATEGORIES
      : TECHNICAL_CATEGORIES.filter((category) => category.id === filter);

  return (
    <section id="skills" aria-labelledby="skills-title" className="py-16 sm:py-20">
      {/*
        El wrapper de App lleva px-4 sm:px-6 (necesario para que el sangrado
        full-bleed de la banda cuadre exacto con los bordes de la ventana);
        se cancela aquí para alinear el resto de la sección con el Container
        de las demás secciones (max-w 1240, px-5 sm:px-8).
      */}
      <div className="-mx-4 sm:-mx-6">
        <Container>
          <SectionHeading
            id="skills-title"
            eyebrow="Stack"
            title="skills"
            align="center"
            subtitle="Lenguajes, bases de datos, web, móvil y nube con los que construyo — cada tecnología de la banda está respaldada por un proyecto, una certificación o mi CV."
          />
        </Container>
      </div>

      {/*
        Banda full-bleed: App centra el contenido en un contenedor, así que
        este bloque lo compensa con márgenes calc(50% - 50vw) para extenderse
        exactamente hasta los bordes de la ventana (100vw, centrada y sin
        transformaciones, que es lo que permitía que overflow-x-clip del body
        la recortara). El contenido interno replica el Container del resto de
        la página (max-w 1240 + mismos paddings) y así queda alineado.
      */}
      <div className="mx-[calc(50%_-_50vw)] mt-12 bg-band sm:mt-14">
        <Container>
          {/*
            items-start + justify-items-center: los tiles se alinean por
            arriba y los labels reservan la altura de dos líneas (min-h fijo
            en SkillTile), así "Android Studio" no desalinea la fila.
            3 columnas <sm, 4 en sm–lg y 6 en ≥lg (coincide con la alineación
            de tooltips por borde de SkillTile.tooltipAlign).
          */}
          <Stagger
            as="ul"
            className="mx-auto grid max-w-3xl grid-cols-3 items-start justify-items-center gap-x-3 gap-y-10 py-12 sm:grid-cols-4 sm:gap-x-6 sm:py-14 lg:grid-cols-6"
          >
            {BAND_SKILLS.map((name, index) => (
              <StaggerItem as="li" key={name} y={32} className="flex justify-center">
                <SkillTile name={name} evidence={skillEvidence[name] ?? []} index={index} />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </div>

      <div className="-mx-4 sm:-mx-6">
        <Container>
          {/* Filtro + grid de categorías (filtra y reordena con layout). */}
          <div className="mt-14 sm:mt-16">
            <CategoryFilter options={FILTER_OPTIONS} value={filter} onChange={setFilter} />
            {/* Estado del filtro para lectores de pantalla. */}
            <p aria-live="polite" className="sr-only">
              {`Mostrando ${visibleCategories.length} ${
                visibleCategories.length === 1 ? 'categoría' : 'categorías'
              }`}
            </p>
            <motion.ul
              layout={!prefersReducedMotion}
              className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              <AnimatePresence initial={false}>
                {visibleCategories.map((category) => (
                  <SkillCategoryCard key={category.id} category={category} />
                ))}
              </AnimatePresence>
            </motion.ul>
          </div>

          {SOFT_SKILLS ? <SoftSkillsCloud category={SOFT_SKILLS} /> : null}
        </Container>
      </div>
    </section>
  );
}
