import type { Project } from '../../types';
import { useT } from '../../i18n';
import { Button } from '../ui/Button';
import { TiltCard } from '../ui/TiltCard';
import { GithubIcon } from './icons';
import { ProjectCover } from './ProjectCover';
import { STATUS_STYLES, teamBadgeLabel } from './status';

/** Chips de stack visibles como máximo; el resto se resume con «+N». */
const MAX_CHIPS = 5;

interface ProjectCardProps {
  project: Project;
  /** Posición en la lista (0-based): fija la numeración 01–05 de la sección. */
  index: number;
  /** Abre el modal de detalle; recibe el elemento que dispara la apertura. */
  onOpen: (project: Project, trigger: HTMLElement) => void;
}

/**
 * Tarjeta de proyecto del grid V2: panel sin sombras, envuelta en `TiltCard`
 * (tilt 3D sólo desktop sin reduced-motion), con cabecera ilustrada
 * `ProjectCover`, numeración en Caveat Brush, título, tagline, aporte
 * (2 líneas), chips de stack, insignias honestas de estado y autoría, y los
 * accesos «Ver detalle» (modal) y «Código en GitHub» (pestaña nueva).
 */
export function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  const t = useT();
  const status = STATUS_STYLES[project.status];
  const chips = project.stack.slice(0, MAX_CHIPS);
  const restCount = project.stack.length - chips.length;
  // Numeración de dos dígitos (01, 02, ...), decorativa.
  const number = String(index + 1).padStart(2, '0');

  return (
    <TiltCard className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl bg-panel ring-1 ring-teal transition-shadow duration-300 hover:ring-accent focus-within:ring-accent">
      <ProjectCover tag={project.tag} />
      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <span
            className="font-display text-4xl leading-none text-accent/90"
            aria-hidden="true"
          >
            {number}
          </span>
          <div className="flex flex-wrap justify-end gap-2">
            {/* Estado honesto: el texto lleva la información; el color refuerza. */}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-bg px-2.5 py-1 text-xs font-medium text-ink-muted">
              <span
                className={`h-1.5 w-1.5 rounded-full ${status.dot}`}
                aria-hidden="true"
              />
              {t(status.label)}
            </span>
            {/* Autoría: equipo vs individual. */}
            <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium text-ink-muted ring-1 ring-inset ring-teal">
              {t(teamBadgeLabel(project.teamProject))}
            </span>
          </div>
        </div>

        <div className="min-w-0">
          <h3 className="text-balance text-lg font-semibold leading-snug text-ink">
            {project.title}
          </h3>
          <p className="mt-1 text-sm text-ink-muted">{project.tagline}</p>
        </div>

        {/* Aporte personal (vs equipo), recortado a 2 líneas. */}
        <p className="line-clamp-2 text-sm text-ink-muted/90">
          {project.contribution}
        </p>

        {/* Stack: hasta 5 chips + resumen del resto. */}
        <ul className="flex flex-wrap gap-2">
          {chips.map((tech) => (
            <li
              key={tech}
              className="rounded-md bg-bg px-2 py-1 text-xs text-ink-muted"
            >
              {tech}
            </li>
          ))}
          {restCount > 0 ? (
            <li
              className="rounded-md px-2 py-1 text-xs font-medium text-accent ring-1 ring-inset ring-accent"
              aria-label={t('projects.moreTechsAria', { count: restCount })}
            >
              +{restCount}
            </li>
          ) : null}
        </ul>

        {/* Accesos: detalle (modal) y repo (pestaña nueva). Ambos ≥ 44px. */}
        <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
          <Button
            variant="primary"
            onClick={(event) => onOpen(project, event.currentTarget)}
          >
            {t('projects.viewDetail')}
          </Button>
          <Button
            variant="ghost"
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('projects.codeOnGithubAria', { title: project.title })}
          >
            <GithubIcon size={16} />
            {t('projects.codeOnGithub')}
          </Button>
        </div>
      </div>
    </TiltCard>
  );
}
