import { useT } from '../../i18n';
import type { SkillCategory } from '../../types';
import { Reveal } from '../ui/Reveal';
import { Stagger, StaggerItem } from '../ui/Stagger';
import { CategoryIcon } from './category-icons';

interface SoftSkillsCloudProps {
  /** Categoría 'blandas' del CV (skills exactos de src/data/skills.ts). */
  category: SkillCategory;
}

/**
 * Nube de chips de habilidades blandas del CV: entrada en stagger, hover con
 * elevación sutil (transform en un wrapper interno para no chocar con el
 * transform del StaggerItem) y SIN barras de porcentaje (regla del brief:
 * nunca inventar niveles de dominio).
 */
export function SoftSkillsCloud({ category }: SoftSkillsCloudProps) {
  const t = useT();

  return (
    <Reveal className="mt-16 sm:mt-20">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-ink">
          <CategoryIcon id="blandas" className="h-5 w-5" />
        </span>
        <h3 className="font-sans text-xl font-bold lowercase leading-none text-ink">
          {t('skills.softTitle')}
        </h3>
      </div>

      <Stagger as="ul" delay={0.1} className="mt-5 flex flex-wrap gap-2.5">
        {category.skills.map((skill) => (
          <StaggerItem as="li" key={skill} y={16}>
            {/*
              El chip es un span interno: su hover (transform) no interfiere
              con las variantes del StaggerItem (framer controla el li).
            */}
            <span className="inline-block rounded-full bg-panel px-4 py-2.5 text-sm font-medium text-ink-muted transition-[transform,color,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:text-ink hover:ring-1 hover:ring-accent/60 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
              {skill}
            </span>
          </StaggerItem>
        ))}
      </Stagger>
    </Reveal>
  );
}
