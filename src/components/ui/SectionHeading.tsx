import { motion, useReducedMotion } from 'framer-motion';
import { Ornament } from './Ornament';
import { Reveal } from './Reveal';
import { EASE } from './motion';

interface SectionHeadingProps {
  /** Id del `<h2>`: referéncialo con `aria-labelledby` en la `<section>` contenedora. */
  id: string;
  /** Texto del título (Montserrat 700, clamp(2rem, 4vw, 3.5rem)). */
  title: string;
  /** Etiqueta corta encima del título (opcional, en accent). */
  eyebrow?: string;
  /** Subtítulo opcional debajo del título, en ink-muted. */
  subtitle?: string;
  /** Alineación del bloque (por defecto `left`). */
  align?: 'left' | 'center';
  className?: string;
}

/**
 * Encabezado de sección V2: eyebrow opcional + Ornament + `<h2>` fluido
 * Montserrat 700 + subtítulo opcional + subrayado SVG que se dibuja
 * (`pathLength` 0→1) al entrar al viewport. Reduced motion: todo estático.
 *
 * Ejemplo:
 * `<section aria-labelledby="stats-title"><SectionHeading id="stats-title" title="en cifras" /></section>`
 */
export function SectionHeading({
  id,
  title,
  eyebrow,
  subtitle,
  align = 'left',
  className,
}: SectionHeadingProps) {
  const prefersReducedMotion = useReducedMotion();
  const centered = align === 'center';

  return (
    <Reveal
      className={`flex flex-col ${centered ? 'items-center text-center' : 'items-start'} ${className ?? ''}`}
    >
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
          {eyebrow}
        </p>
      ) : null}

      <div className="flex items-center gap-3">
        <Ornament className="h-10 w-6 shrink-0" />
        <h2
          id={id}
          className="font-sans font-bold leading-none text-ink"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
        >
          {title}
        </h2>
      </div>

      {subtitle ? (
        <p className={`mt-4 max-w-prose text-base leading-relaxed text-ink-muted ${centered ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      ) : null}

      {/* Subrayado entintado que se dibuja al entrar (pathLength 0→1). */}
      <svg
        viewBox="0 0 240 10"
        aria-hidden="true"
        focusable="false"
        className={`mt-4 block h-2.5 w-48 ${centered ? 'mx-auto' : ''}`}
      >
        <motion.path
          d="M2 6 C 64 1 176 10 238 4"
          pathLength={1}
          fill="none"
          stroke="#BC3A3A"
          strokeWidth={3}
          strokeLinecap="round"
          initial={prefersReducedMotion ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: '-64px' }}
          transition={{ duration: 0.9, ease: EASE }}
        />
      </svg>
    </Reveal>
  );
}
