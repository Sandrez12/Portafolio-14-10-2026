import { StatCard } from './stats/StatCard';
import { STATS } from './stats/stats';
import { Container } from './ui/Container';
import { SectionHeading } from './ui/SectionHeading';
import { Stagger, StaggerItem } from './ui/Stagger';

/**
 * Stats V2: seis contadores grandes (SÓLO cifras verificadas por
 * `_spec/V2_BRIEF.md`, ver `src/components/stats/stats.ts`) en tarjetas
 * panel con numeración 01–06, línea de acento que se dibuja y entrada
 * escalonada. Grid responsive de 1/2/3 columnas.
 */
export function Stats() {
  return (
    <section aria-labelledby="stats-title" className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          id="stats-title"
          eyebrow="Resumen"
          title="en cifras"
          subtitle="Datos verificables de proyectos, certificaciones e idiomas, y del traductor de Lengua de Señas Colombiana."
        />

        <Stagger
          as="ul"
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
        >
          {STATS.map((stat) => (
            <StaggerItem as="li" key={stat.id} className="h-full">
              <StatCard stat={stat} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
