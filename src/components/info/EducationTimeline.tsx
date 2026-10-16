import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import type { EducationEntry } from '../../types';
import { EASE } from '../ui/motion';
import { JourneyIcon } from './icons';

interface EducationTimelineProps {
  education: EducationEntry[];
}

/** Activación de nodos y tarjetas al entrar al viewport (una sola vez). */
const NODE_VIEWPORT = { once: true, margin: '-72px' } as const;

/**
 * Línea de tiempo VERTICAL de educación/experiencia: línea central que se
 * dibuja con el scroll (`useScroll` sobre la sección + `useSpring` +
 * `scaleY`, SÓLO sin reduced-motion; con reduced-motion la línea se muestra
 * completa), nodos con icono SVG propio por tipo de entrada que se activan
 * al entrar al viewport y tarjetas panel #102E2E alternando izquierda/derecha
 * en desktop (una sola columna en móvil) con la esquina derecha muy
 * redondeada (lenguaje visual de la referencia, sin sombras).
 */
export function EducationTimeline({ education }: EducationTimelineProps) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const timelineRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.85', 'end 0.45'],
  });
  const drawnScale = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

  return (
    <ol ref={timelineRef} className="relative">
      {/* Línea base teal: lo que falta por recorrer. */}
      <span
        aria-hidden="true"
        className="absolute bottom-3 left-[22px] top-3 w-1 rounded-full bg-teal lg:left-[calc(50%-2px)]"
      />
      {/* Trazo accent que se dibuja con el scroll (sólo transform: scaleY). */}
      <motion.span
        aria-hidden="true"
        className="absolute bottom-3 left-[22px] top-3 w-1 rounded-full bg-accent lg:left-[calc(50%-2px)]"
        style={prefersReducedMotion ? { scaleY: 1, originY: 0 } : { scaleY: drawnScale, originY: 0 }}
      />

      {education.map((entry, index) => (
        <TimelineItem key={`${entry.period}-${entry.title}`} entry={entry} index={index} />
      ))}
    </ol>
  );
}

interface TimelineItemProps {
  entry: EducationEntry;
  index: number;
}

function TimelineItem({ entry, index }: TimelineItemProps) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  // En desktop las tarjetas alternan izquierda/derecha respecto a la línea central.
  const isLeft = index % 2 === 0;

  return (
    <li className="relative mb-8 pl-16 last:mb-0 sm:mb-10 lg:mb-12 lg:grid lg:grid-cols-2 lg:gap-x-20 lg:pl-0">
      {/* Nodo sobre la línea central (posición estática; la animación va en el hijo interior). */}
      <span
        aria-hidden="true"
        className="absolute left-[2px] top-1 z-10 lg:left-[calc(50%-22px)]"
      >
        <motion.span
          className="relative flex h-11 w-11 items-center justify-center rounded-full border border-teal bg-bg"
          initial={prefersReducedMotion ? false : { scale: 0.4, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={NODE_VIEWPORT}
          transition={{ type: 'spring', stiffness: 240, damping: 18 }}
        >
          <JourneyIcon entry={entry} className="h-5 w-5 text-ink" />
          {/* Aro accent que "enciende" el nodo al entrar (sólo transform/opacity). */}
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-accent"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={NODE_VIEWPORT}
            transition={{ duration: 0.45, ease: EASE, delay: 0.2 }}
          />
        </motion.span>
      </span>

      <motion.div
        className={`rounded-2xl bg-panel p-5 sm:p-6 lg:rounded-r-[75px] ${
          isLeft ? 'lg:col-start-1' : 'lg:col-start-2'
        }`}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={NODE_VIEWPORT}
        transition={{ duration: 0.65, ease: EASE }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
          {entry.period}
        </p>
        <p className="mt-2 text-lg font-semibold text-ink sm:text-xl">{entry.title}</p>
        <p className="mt-1 text-sm text-ink-muted sm:text-[15px]">{entry.institution}</p>
        {entry.description ? (
          <p className="mt-3 border-l-2 border-teal pl-3 text-sm leading-relaxed text-ink-muted">
            {entry.description}
          </p>
        ) : null}
      </motion.div>
    </li>
  );
}
