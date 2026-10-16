import { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { certifications } from '../data/certifications';
import { CertCard } from './certifications/CertCard';
import { CertFilter } from './certifications/CertFilter';
import { ISSUER_FILTERS, type IssuerFilter } from './certifications/filters';
import { SectionHeading } from './ui/SectionHeading';

/**
 * Certificaciones V2: seis insignias grandes (escudo SVG propio + icono del
 * emisor) con título, emisor y año TAL COMO CONSTAN en
 * `src/data/certifications.ts`. Filtro por emisor (botones `aria-pressed`)
 * con reflow animado (`AnimatePresence` + `layout`) y entrada escalonada.
 * Línea decorativa "2025" (año común de las seis). SIN enlaces de credencial
 * (no existen URLs verificadas: no se inventan). El `Container` y el `id`
 * de navegación los aporta el wrapper de `App.tsx`.
 */
export function Certifications() {
  const prefersReducedMotion = useReducedMotion();
  const [issuer, setIssuer] = useState<IssuerFilter>('Todas');
  const [hasFiltered, setHasFiltered] = useState(false);
  const listRef = useRef<HTMLUListElement | null>(null);
  const inView = useInView(listRef, { once: true, margin: '-64px' });

  const filtered = useMemo(
    () => (issuer === 'Todas' ? certifications : certifications.filter((c) => c.issuer === issuer)),
    [issuer],
  );

  const handleChange = (next: IssuerFilter) => {
    setIssuer(next);
    setHasFiltered(true);
  };

  return (
    <section aria-labelledby="certifications-title" className="py-14 sm:py-20">
      <SectionHeading
        id="certifications-title"
        eyebrow="Credenciales"
        title="certificaciones"
        subtitle="Seis insignias obtenidas en 2025 en cloud, datos, IA y redes."
      />

      {/* Línea decorativa con el año común de las certificaciones. */}
      <div aria-hidden="true" className="mt-6 mb-8 flex items-center gap-4">
        <span className="h-px flex-1 bg-teal/50" />
        <span className="font-hand text-2xl leading-none text-accent">2025</span>
        <span className="h-px flex-1 bg-teal/50" />
      </div>

      <CertFilter
        active={issuer}
        options={ISSUER_FILTERS}
        onChange={handleChange}
        className="mb-8"
      />

      <motion.ul
        ref={listRef}
        layout={!prefersReducedMotion}
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((cert, index) => (
            <CertCard
              key={cert.title}
              cert={cert}
              inView={inView}
              delay={hasFiltered ? 0 : index * 0.08}
            />
          ))}
        </AnimatePresence>
      </motion.ul>
    </section>
  );
}
