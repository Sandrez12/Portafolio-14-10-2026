import type { Project } from '../../types';
import { AnimatedNumber } from '../ui/AnimatedNumber';
import { Button } from '../ui/Button';
import { Stagger, StaggerItem } from '../ui/Stagger';
import { ArchitectureDiagram } from './ArchitectureDiagram';
import { GithubIcon } from './icons';
import { ProjectCover } from './ProjectCover';
import { STATUS_STYLES, teamBadgeLabel } from './status';

interface FeaturedProjectProps {
  project: Project;
  /** Posición en la lista (0-based): fija la numeración enorme. */
  index: number;
  /** Abre el modal de detalle; recibe el elemento que dispara la apertura. */
  onOpen: (project: Project, trigger: HTMLElement) => void;
}

/**
 * Tarjeta destacada a ANCHO COMPLETO para el primer proyecto de la sección.
 * En desktop son 2 columnas: texto + métricas a la izquierda y, a la derecha,
 * la cabecera ilustrada grande y el diagrama de arquitectura; en móvil se
 * apila en 1 columna. Métricas con `AnimatedNumber` (el valor siempre es
 * numérico, ver `ProjectMetric`), chips en `Stagger` e insignias honestas de
 * estado y autoría. Sin sombras: panel + ring.
 */
export function FeaturedProject({ project, index, onOpen }: FeaturedProjectProps) {
  const status = STATUS_STYLES[project.status];
  const metrics = project.metrics ?? [];
  // Numeración enorme de dos dígitos (p. ej. «01»), decorativa.
  const number = String(index + 1).padStart(2, '0');

  return (
    <article className="group relative min-w-0 overflow-hidden rounded-3xl bg-panel ring-1 ring-teal">
      <div className="grid lg:grid-cols-2">
        {/* Columna de texto (izquierda en desktop, arriba en móvil). */}
        <div className="flex min-w-0 flex-col gap-6 p-6 sm:p-8 lg:p-10">
          <div className="flex items-start justify-between gap-4">
            <span
              className="font-display text-6xl leading-none text-accent sm:text-7xl"
              aria-hidden="true"
            >
              {number}
            </span>
            <div className="flex flex-wrap justify-end gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-bg px-2.5 py-1 text-xs font-medium text-ink-muted">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${status.dot}`}
                  aria-hidden="true"
                />
                {status.label}
              </span>
              <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium text-ink-muted ring-1 ring-inset ring-teal">
                {teamBadgeLabel(project.teamProject)}
              </span>
            </div>
          </div>

          <div className="min-w-0">
            <h3 className="text-balance text-2xl font-bold leading-tight text-ink sm:text-3xl">
              {project.title}
            </h3>
            <p className="mt-2 text-ink-muted">{project.tagline}</p>
          </div>

          {/* Métricas verificadas: contadores al entrar al viewport. */}
          {metrics.length > 0 ? (
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              {metrics.map((metric) => (
                <li key={metric.label} className="min-w-0 rounded-xl bg-bg p-3">
                  <span className="font-display text-2xl leading-tight text-ink sm:text-3xl">
                    <AnimatedNumber
                      value={metric.value}
                      decimals={metric.decimals}
                      prefix={metric.prefix}
                      suffix={metric.suffix}
                    />
                  </span>
                  <span className="mt-1 block text-xs leading-snug text-ink-muted">
                    {metric.label}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}

          {/* Stack completo, con entrada escalonada. */}
          <Stagger as="ul" className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <StaggerItem
                as="li"
                key={tech}
                y={16}
                className="rounded-md bg-bg px-2.5 py-1.5 text-xs text-ink-muted"
              >
                {tech}
              </StaggerItem>
            ))}
          </Stagger>

          {/* Aporte personal (vs equipo), siempre visible. */}
          <p className="text-sm leading-relaxed text-ink-muted">
            {project.contribution}
          </p>

          <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
            <Button
              variant="primary"
              onClick={(event) => onOpen(project, event.currentTarget)}
            >
              Ver detalle
            </Button>
            <Button
              variant="ghost"
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Código de ${project.title} en GitHub`}
            >
              <GithubIcon size={16} />
              Código en GitHub
            </Button>
          </div>
        </div>

        {/* Columna visual (derecha en desktop, debajo en móvil). */}
        <div className="flex min-w-0 flex-col">
          <ProjectCover tag={project.tag} className="h-44 sm:h-52 lg:h-56" />
          <div className="p-6 sm:p-8 lg:p-10 lg:pt-6">
            <ArchitectureDiagram diagram={project.architecture} className="w-full" />
          </div>
        </div>
      </div>
    </article>
  );
}
