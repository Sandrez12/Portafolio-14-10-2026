import { useT } from '../i18n';
import { StatCard } from './stats/StatCard';
import { STATS, STAT_CONTEXT_KEYS, STAT_LABEL_KEYS } from './stats/stats';
import { Container } from './ui/Container';
import { SectionHeading } from './ui/SectionHeading';
import { Stagger, StaggerItem } from './ui/Stagger';

/**
 * Stats V2: seis contadores grandes (SÓLO cifras verificadas por
 * `_spec/V2_BRIEF.md`, ver `src/components/stats/stats.ts`) en tarjetas
 * panel con numeración 01–06, línea de acento que se dibuja y entrada
 * escalonada. Grid responsive de 1/2/3 columnas. Etiquetas y frases de
 * contexto se traducen con `useT` (claves por id en `stats.ts`).
 */
export function Stats() {
  const t = useT();

  const stats = STATS.map((stat) => {
    const labelKey = STAT_LABEL_KEYS[stat.id];
    const contextKey = STAT_CONTEXT_KEYS[stat.id];
    return {
      ...stat,
      label: labelKey ? t(labelKey) : stat.label,
      context: contextKey ? t(contextKey) : stat.context,
    };
  });

  return (
    <section aria-labelledby="stats-title" className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          id="stats-title"
          eyebrow={t('stats.eyebrow')}
          title={t('stats.title')}
          subtitle={t('stats.subtitle')}
        />

        <Stagger
          as="ul"
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
        >
          {stats.map((stat) => (
            <StaggerItem as="li" key={stat.id} className="h-full">
              <StatCard stat={stat} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
