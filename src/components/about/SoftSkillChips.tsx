import { useContent, useT } from '../../i18n';
import { Ornament } from '../ui/Ornament';
import { Reveal } from '../ui/Reveal';
import { Stagger, StaggerItem } from '../ui/Stagger';

/**
 * Habilidades blandas del CV como chips que aparecen en stagger
 * (`Stagger`/`StaggerItem`; reduced-motion: se muestran directamente).
 * Hover con cambio de color (sin ocultar contenido). Las habilidades
 * provienen de la categoría "blandas" de `useContent()` (idioma activo).
 */
export function SoftSkillChips() {
  const { skillCategories } = useContent();
  const t = useT();
  /** Habilidades blandas del CV (categoría "blandas" de `skillCategories`). */
  const softSkills = skillCategories.find((category) => category.id === 'blandas')?.skills ?? [];

  return (
    <div>
      <Reveal className="mb-5 flex items-center gap-3">
        <Ornament className="h-9 w-5 shrink-0" />
        <h3 className="font-sans text-xl font-bold leading-tight text-ink sm:text-2xl">
          {t('about.softSkillsTitle')}
        </h3>
      </Reveal>

      <Stagger as="ul" className="flex flex-wrap gap-2.5">
        {softSkills.map((skill) => (
          <StaggerItem
            as="li"
            key={skill}
            y={16}
            className="rounded-full bg-panel px-4 py-2 text-sm text-ink-muted transition-colors duration-200 hover:text-ink hover:ring-1 hover:ring-accent/60"
          >
            {skill}
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
