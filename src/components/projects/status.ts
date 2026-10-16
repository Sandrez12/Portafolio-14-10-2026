import type { MessageKey } from '../../i18n/messages';
import type { ProjectStatus } from '../../types';

/**
 * Insignia de estado: el TEXTO lleva la información (clave de mensaje que los
 * componentes resuelven con `t(...)`); el color del punto (teal/ink/accent) es
 * solo refuerzo visual, nunca el único canal.
 */
export const STATUS_STYLES: Record<ProjectStatus, { dot: string; label: MessageKey }> = {
  completo: { dot: 'bg-teal', label: 'projects.statusCompleto' },
  parcial: { dot: 'bg-ink', label: 'projects.statusParcial' },
  prototipo: { dot: 'bg-accent', label: 'projects.statusPrototipo' },
};

/** Clave de mensaje de autoría honesta: equipo vs individual (resolver con `t`). */
export function teamBadgeLabel(teamProject: boolean): MessageKey {
  return teamProject ? 'projects.badgeTeam' : 'projects.badgeIndividual';
}
