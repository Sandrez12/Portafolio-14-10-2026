import { useId, useMemo, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { Project, ProjectMetric } from '../../types';
import { useContent, useT } from '../../i18n';
import { Button } from '../ui/Button';
import { EASE } from '../ui/motion';
import { ArchitectureDiagram } from './ArchitectureDiagram';
import { GithubIcon } from './icons';
import { FILTER_LABEL_KEYS } from './filterLabels';
import { STATUS_STYLES, teamBadgeLabel } from './status';
import { useDialogA11y } from './useDialogA11y';

interface ProjectModalProps {
  /** Proyecto a mostrar; `null` lo cierra (la salida se anima con AnimatePresence). */
  project: Project | null;
  onClose: () => void;
}

/** Valor visible de una métrica: prefijo + valor con sus decimales + sufijo. */
function formatMetricValue(metric: ProjectMetric): string {
  return `${metric.prefix ?? ''}${metric.value.toFixed(metric.decimals ?? 0)}${metric.suffix ?? ''}`;
}

/** Número 01–05 según la posición en la lista de proyectos del idioma activo (nada inventado). */
function projectNumber(projects: readonly Project[], id: string): string | null {
  const index = projects.findIndex((p) => p.id === id);
  return index >= 0 ? String(index + 1).padStart(2, '0') : null;
}

/** Etiqueta de sección del modal (Montserrat, mayúsculas espaciadas). */
const SECTION_TITLE_CLASSES =
  'font-sans text-xs font-bold uppercase tracking-[0.18em] text-ink-muted';

/** Bloque de contenido del modal: título de sección + contenido. */
function ModalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-2.5">
      <h3 className={SECTION_TITLE_CLASSES}>{title}</h3>
      {children}
    </section>
  );
}

/** Píldora de metadato (etiqueta de dominio, estado, autoría). */
function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-teal/60 px-3 py-1 text-xs font-medium text-ink-muted">
      {children}
    </span>
  );
}

/**
 * Diálogo accesible de detalle de proyecto. Con `project === null` no renderiza
 * nada (AnimatePresence anima la salida). Portal a `document.body`, overlay
 * `bg-bg/80` con blur (clic fuera cierra), panel `bg-panel` scrolleable
 * (`max-h-[90svh]`, `overscroll-contain`), `role="dialog"` + `aria-modal` +
 * `aria-labelledby`, focus trap con foco inicial en Cerrar, Esc para cerrar y
 * bloqueo de scroll del body (`useDialogA11y`). Todo el contenido viene de
 * `src/data/projects.ts`: sin demos ni datos inventados.
 */
export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { projects } = useContent();
  const t = useT();
  const prefersReducedMotion = useReducedMotion() ?? false;
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const titleId = useId();

  useDialogA11y({ open: project !== null, onClose, dialogRef, initialFocusRef: closeRef });

  const number = useMemo(
    () => (project ? projectNumber(projects, project.id) : null),
    [project, projects],
  );

  // Entrada/salida: opacity + translateY/scale con el easing del sistema; con
  // reduced-motion sólo opacity (sin movimiento).
  const hidden = prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.97 };
  const visible = prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 };

  return createPortal(
    <AnimatePresence>
      {project ? (
        <motion.div
          key={project.id}
          className="fixed inset-0 z-50 flex items-end justify-center bg-bg/80 p-4 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          onClick={(event) => {
            // Clic en el overlay (no en el panel) cierra el diálogo.
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={hidden}
            animate={visible}
            exit={hidden}
            transition={{ duration: 0.4, ease: EASE }}
            className="relative flex max-h-[90svh] w-full max-w-3xl flex-col overflow-y-auto overscroll-contain rounded-2xl border border-teal/50 bg-panel shadow-2xl shadow-black/60"
          >
            <button
              ref={closeRef}
              type="button"
              aria-label={t('projects.closeDialog')}
              onClick={onClose}
              className="absolute right-4 top-4 z-10 inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-teal/60 bg-bg/90 text-xl leading-none text-ink-muted transition-colors hover:border-accent hover:text-ink"
            >
              <span aria-hidden="true">&times;</span>
            </button>

            <div className="flex min-w-0 flex-col gap-6 p-6 sm:p-8">
              <header className="flex flex-col gap-3 pr-12 sm:pr-14">
                <div className="flex flex-wrap items-center gap-2">
                  {number && (
                    <span
                      aria-hidden="true"
                      className="font-sans text-sm font-bold tracking-[0.3em] text-accent"
                    >
                      {number}
                    </span>
                  )}
                  <Pill>
                    <span className="font-semibold uppercase tracking-wide text-ink">
                      {t(FILTER_LABEL_KEYS[project.tag])}
                    </span>
                  </Pill>
                  <Pill>
                    <span
                      aria-hidden="true"
                      className={`h-1.5 w-1.5 rounded-full ${STATUS_STYLES[project.status].dot}`}
                    />
                    {t(STATUS_STYLES[project.status].label)}
                  </Pill>
                  <Pill>{t(teamBadgeLabel(project.teamProject))}</Pill>
                </div>
                <div>
                  <h2
                    id={titleId}
                    className="text-balance break-words font-sans text-2xl font-bold leading-tight text-ink sm:text-3xl"
                  >
                    {project.title}
                  </h2>
                  <p className="mt-1 break-words font-hand text-2xl leading-snug text-ink-muted">
                    {project.tagline}
                  </p>
                </div>
              </header>

              <p className="break-words text-base leading-relaxed text-ink-muted">{project.description}</p>

              <ModalSection title={t('projects.sectionKeyPoints')}>
                <ul className="flex flex-col gap-2">
                  {project.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3 text-sm leading-relaxed text-ink-muted">
                      <span aria-hidden="true" className="mt-0.5 shrink-0 text-accent">
                        ▸
                      </span>
                      <span className="min-w-0 break-words">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </ModalSection>

              {project.metrics && project.metrics.length > 0 ? (
                <ModalSection title={t('projects.sectionMetrics')}>
                  <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {project.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="flex flex-col items-center gap-1 rounded-lg bg-bg px-3 py-3 text-center ring-1 ring-teal/40"
                      >
                        <dd className="order-1 font-sans text-xl font-bold tabular-nums text-ink">
                          {formatMetricValue(metric)}
                        </dd>
                        <dt className="order-2 text-xs leading-snug text-ink-muted">{metric.label}</dt>
                      </div>
                    ))}
                  </dl>
                </ModalSection>
              ) : null}
              <ModalSection title={t('projects.sectionArchitecture')}>
                <ArchitectureDiagram diagram={project.architecture} />
              </ModalSection>

              <ModalSection title={t('projects.sectionStack')}>
                <ul className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-md bg-bg px-2.5 py-1.5 text-[13px] font-medium text-ink-muted ring-1 ring-teal/40"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </ModalSection>

              <ModalSection title={t('projects.sectionContribution')}>
                <p className="break-words text-sm leading-relaxed text-ink-muted">{project.contribution}</p>
              </ModalSection>

              <ModalSection title={t('projects.sectionNextStep')}>
                <p className="break-words text-sm leading-relaxed text-ink-muted">{project.nextStep}</p>
              </ModalSection>

              {project.note ? (
                <p
                  role="note"
                  className="break-words rounded-r-lg border-l-2 border-accent bg-bg/60 p-4 text-sm italic leading-relaxed text-ink-muted"
                >
                  {project.note}
                </p>
              ) : null}

              <footer className="mt-1 flex flex-wrap items-center gap-3">
                <Button href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                  <GithubIcon size={16} />
                  {t('projects.codeOnGithub')}
                </Button>
              </footer>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
