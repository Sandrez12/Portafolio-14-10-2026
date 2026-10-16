import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useCallback, useMemo, useState } from 'react';
import { useContent, useT } from '../i18n';
import type { Project } from '../types';
import { FeaturedProject } from './projects/FeaturedProject';
import { ProjectCard } from './projects/ProjectCard';
import { ProjectModal } from './projects/ProjectModal';
import { TagFilter, type ProjectFilter } from './projects/TagFilter';
import { EASE } from './ui/motion';
import { Reveal } from './ui/Reveal';
import { SectionHeading } from './ui/SectionHeading';

const FILTER_OPTIONS: readonly ProjectFilter[] = ['Todos', 'IA', 'IoT', 'Web', 'Móvil'];

/**
 * Proyectos V2: destacado (el primero, a ancho completo) + grid de 2
 * columnas con filtro por etiqueta y modal de detalle accesible. El filtro
 * anima la entrada/salida de las tarjetas con `layout` de framer (sólo
 * transform/opacity; sin movimiento con `prefers-reduced-motion`).
 */
export function Projects() {
  const { projects } = useContent();
  const t = useT();
  const prefersReducedMotion = useReducedMotion();
  const [filter, setFilter] = useState<ProjectFilter>('Todos');
  const [selected, setSelected] = useState<Project | null>(null);

  const handleOpen = useCallback((project: Project) => setSelected(project), []);
  const handleClose = useCallback(() => setSelected(null), []);

  const featured = filter === 'Todos' ? projects[0] : undefined;
  const gridProjects = useMemo(() => {
    const byTag = filter === 'Todos' ? projects : projects.filter((p) => p.tag === filter);
    return featured ? byTag.filter((p) => p.id !== featured.id) : byTag;
  }, [filter, featured, projects]);

  return (
    <section aria-labelledby="projects-title" className="relative py-16 sm:py-20 lg:py-24">
      <SectionHeading
        id="projects-title"
        eyebrow={t('projects.eyebrow')}
        title={t('projects.title')}
        subtitle={t('projects.subtitle')}
      />

      <Reveal className="mt-8">
        <TagFilter active={filter} options={FILTER_OPTIONS} onChange={setFilter} />
      </Reveal>

      {featured && (
        <Reveal className="mt-8" y={32}>
          <FeaturedProject project={featured} index={0} onOpen={handleOpen} />
        </Reveal>
      )}

      <motion.ul
        layout={!prefersReducedMotion}
        className="mt-8 grid list-none gap-6 p-0 md:grid-cols-2"
        aria-label={t('projects.listLabel')}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {gridProjects.map((project) => (
            <motion.li
              key={project.id}
              layout={!prefersReducedMotion}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: 12 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="flex"
            >
              <ProjectCard
                project={project}
                index={projects.findIndex((p) => p.id === project.id)}
                onOpen={handleOpen}
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <ProjectModal project={selected} onClose={handleClose} />
    </section>
  );
}
