import { motion, useReducedMotion } from 'framer-motion';
import { useT } from '../../i18n';
import type { Language } from '../../types';
import { EASE } from '../ui/motion';

interface LanguageBarsProps {
  languages: Language[];
}

/** Etiquetas cortas que cuelgan en el gutter (es/en/pt), por nombre ES o EN. */
const SHORT_LABELS: Record<string, string> = {
  Español: 'es',
  Spanish: 'es',
  Inglés: 'en',
  English: 'en',
  Portugués: 'pt',
  Portuguese: 'pt',
};

const shortLabel = (language: Language): string =>
  SHORT_LABELS[language.name] ?? language.name.slice(0, 2).toLowerCase();

/** Retardo entre segmentos al llenarse (stagger, en segundos). */
const SEGMENT_STAGGER = 0.08;

/**
 * Tarjeta de idiomas V2: por idioma, etiqueta corta en el gutter, nombre con
 * nivel (`8/8` segmentos) y barra segmentada de 8 en la que los segmentos
 * rellenos (blanco, desde la derecha) se LLENAN uno a uno al entrar al
 * viewport (stagger con `scaleX` + `opacity`, transform-origin right).
 * Reduced-motion: barra completa estática.
 */
export function LanguageBars({ languages }: LanguageBarsProps) {
  const t = useT();
  const prefersReducedMotion = useReducedMotion() ?? false;

  return (
    // Gutter reservado (64px) donde cuelgan las etiquetas fuera de la tarjeta.
    <div className="lg:pl-16">
      <ul className="rounded-2xl bg-panel px-5 py-1 lg:px-6 lg:py-2">
        {languages.map((language, langIndex) => {
          const baseDelay = 0.1 + langIndex * 0.25;
          return (
            <li key={language.name} className="relative flex items-center gap-3 py-4 lg:gap-0">
              <span
                aria-hidden="true"
                className="w-5 shrink-0 text-sm font-medium text-ink lg:absolute lg:-left-[4.25rem] lg:top-1/2 lg:w-auto lg:-translate-y-1/2"
              >
                {shortLabel(language)}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-[15px] font-medium text-ink lg:text-base">{language.name}</p>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">
                    {language.level} · {language.filledSegments}/{language.totalSegments}
                  </p>
                </div>
                <div
                  role="img"
                  aria-label={t('info.languageLevelAriaLabel', {
                    name: language.name,
                    level: language.level,
                    filled: language.filledSegments,
                    total: language.totalSegments,
                  })}
                  className="mt-2 grid h-2 gap-[5px]"
                  style={{
                    gridTemplateColumns: `repeat(${language.totalSegments}, minmax(0, 1fr))`,
                  }}
                >
                  {Array.from({ length: language.totalSegments }, (_, index) => {
                    // Relleno blanco desde la derecha hacia la izquierda.
                    const filled = index >= language.totalSegments - language.filledSegments;
                    if (!filled) {
                      return (
                        <span key={index} aria-hidden="true" className="rounded-[2px] bg-accent" />
                      );
                    }
                    // Se llena desde la derecha: el segmento más a la derecha entra primero.
                    const delay =
                      baseDelay + (language.totalSegments - 1 - index) * SEGMENT_STAGGER;
                    return (
                      <motion.span
                        key={index}
                        aria-hidden="true"
                        className="rounded-[2px] bg-ink"
                        initial={prefersReducedMotion ? false : { scaleX: 0, opacity: 0.35 }}
                        whileInView={{ scaleX: 1, opacity: 1 }}
                        viewport={{ once: true, margin: '-48px' }}
                        transition={{ duration: 0.4, delay, ease: EASE }}
                        style={{ originX: 1 }}
                      />
                    );
                  })}
                </div>
                <p className="mt-2 text-[13px] text-ink-muted">{language.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
