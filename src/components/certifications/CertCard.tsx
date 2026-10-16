import { motion, useReducedMotion } from 'framer-motion';
import type { Certification } from '../../types';
import { EASE } from '../ui/motion';
import { Badge } from './Badge';

interface CertCardProps {
  cert: Certification;
  /** El listado ya entró al viewport: arranca la entrada escalonada. */
  inView: boolean;
  /** Retardo de entrada en segundos (0 después del primer filtrado). */
  delay: number;
}

/**
 * Tarjeta de certificación V2: panel #102E2E con insignia de escudo del
 * emisor, título completo tal como consta en los datos, emisor y año.
 * Entrada fade+slide con retardo escalonado; hover con elevación
 * (`whileHover`, sólo transform) y brillo decorativo (sólo opacity).
 * `layout` permite el reflow animado al filtrar. Reduced-motion: tarjeta
 * estática, sin elevación ni brillo.
 */
export function CertCard({ cert, inView, delay }: CertCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const settled = prefersReducedMotion || inView;

  return (
    <motion.li
      layout={!prefersReducedMotion}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      animate={{
        opacity: settled ? 1 : 0,
        y: settled ? 0 : 24,
        transition: { duration: 0.55, ease: EASE, delay: prefersReducedMotion ? 0 : delay },
      }}
      exit={
        prefersReducedMotion
          ? undefined
          : { opacity: 0, scale: 0.96, transition: { duration: 0.25, ease: EASE } }
      }
      whileHover={
        prefersReducedMotion ? undefined : { y: -6, transition: { duration: 0.25, ease: EASE } }
      }
      className="group relative flex items-start gap-5 overflow-hidden rounded-xl bg-panel p-6 sm:p-7"
    >
      {/* Brillo decorativo al pasar el puntero (sólo opacity, pointer-events none). */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 motion-safe:group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(300px 150px at 30% 0%, rgba(188, 58, 58, 0.24), transparent 70%)',
        }}
      />

      <Badge cert={cert} />

      <div className="relative min-w-0">
        <h3 className="font-sans text-base font-semibold leading-snug text-ink">{cert.title}</h3>
        <p className="mt-1.5 text-sm text-ink-muted">
          {cert.issuer} · {cert.year}
        </p>
      </div>
    </motion.li>
  );
}
