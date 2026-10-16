import type { ProjectStatus } from '../../types';

/**
 * Insignia de estado: el texto lleva la información; el color del punto
 * (teal/ink/accent) es solo refuerzo visual, nunca el único canal.
 */
export const STATUS_STYLES: Record<ProjectStatus, { dot: string; label: string }> = {
  completo: { dot: 'bg-teal', label: 'Completo' },
  parcial: { dot: 'bg-ink', label: 'Parcial' },
  prototipo: { dot: 'bg-accent', label: 'Prototipo' },
};

/** Etiqueta honesta de autoría: equipo vs individual. */
export function teamBadgeLabel(teamProject: boolean): string {
  return teamProject ? 'Trabajo en equipo' : 'Proyecto individual';
}
