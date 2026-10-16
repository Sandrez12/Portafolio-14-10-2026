import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { siCss3, siHtml5, siJavascript, siPhp } from 'simple-icons';
import { skillCategories } from '../data/skills';
import { getTileIcon } from './skills/tile-icons';
import { SectionHeading } from './ui/SectionHeading';

/** Skills de una categoría del CV (todas salen de `src/data/skills.ts`). */
const categorySkills = (id: string): string[] =>
  skillCategories.find((category) => category.id === id)?.skills ?? [];

/**
 * Etiqueta corta de marquee para el nombre largo del CV (misma tecnología,
 * sin inventar): igual que la banda de tiles de Skills.
 */
const MARQUEE_LABELS: Record<string, string> = {
  'Microsoft Azure (IoT Central)': 'Azure',
};

/** Fila 1: lenguajes + web (datos del CV). */
const ROW_A: string[] = [...categorySkills('lenguajes'), ...categorySkills('web')];

/** Fila 2: bases de datos + móvil + nube (datos del CV). */
const ROW_B: string[] = [
  ...categorySkills('bases-de-datos'),
  ...categorySkills('movil'),
  ...categorySkills('nube-e-infraestructura').filter((tech) => tech !== 'Infraestructura y redes'),
];

/** Tecnologías únicas para la lista accesible (sr-only). */
const ALL_TECHS: string[] = [...new Set([...ROW_A, ...ROW_B])];

/**
 * Paths extra de `simple-icons` que la banda de tiles no necesita pero el
 * marquee sí (HTML, CSS, JavaScript y PHP), con tree-shaking por import
 * nominal. Java y Azure usan los fallbacks de `getTileIcon` (taza/monograma).
 */
const EXTRA_PATHS: Record<string, string> = {
  HTML: siHtml5.path,
  CSS: siCss3.path,
  JavaScript: siJavascript.path,
  PHP: siPhp.path,
};

/**
 * Marca (icono) de una tecnología del marquee: path de `simple-icons` (extra
 * o de la banda de skills), taza propia para Java o monograma tipográfico.
 */
function TechMark({ name }: { name: string }) {
  const label = MARQUEE_LABELS[name] ?? name;
  const icon = EXTRA_PATHS[name]
    ? { kind: 'path' as const, path: EXTRA_PATHS[name] }
    : getTileIcon(label);

  if (icon.kind === 'path') {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
        className="h-5 w-5 fill-current"
      >
        <path d={icon.path} />
      </svg>
    );
  }
  if (icon.kind === 'cup') {
    // Java fue retirada de `simple-icons` por políticas de marca: taza propia.
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="M5.5 9.5h9v4.5a4.5 4.5 0 0 1-4.5 4.5 4.5 4.5 0 0 1-4.5-4.5V9.5z" />
        <path d="M14.5 10.5h1.75a2.75 2.75 0 0 1 0 5.5H13.4" />
        <path d="M8.2 3.5c-.7 1 .7 1.8 0 2.8" />
        <path d="M11.8 3.5c-.7 1 .7 1.8 0 2.8" />
      </svg>
    );
  }
  return (
    <span
      aria-hidden="true"
      className="flex h-5 w-5 items-center justify-center rounded bg-accent font-sans text-[10px] font-bold leading-none text-ink"
    >
      {icon.monogram}
    </span>
  );
}

/** Un ítem del marquee: icono + nombre de la tecnología. */
function MarqueeItem({ name }: { name: string }) {
  return (
    <span className="flex min-h-[44px] items-center gap-2.5 text-sm font-medium text-ink sm:text-base">
      <TechMark name={name} />
      <span>{MARQUEE_LABELS[name] ?? name}</span>
    </span>
  );
}

interface MarqueeRowProps {
  items: readonly string[];
  /** Clases literales extra del track (duración/dirección), para que
   * Tailwind las genere en el build. */
  trackClass: string;
  /** Animar sólo mientras la banda está cerca del viewport. */
  animate: boolean;
}

/**
 * Una fila del marquee: track con el contenido DUPLICADO (loop perfecto de
 * `translateX 0→-50%`), pausado en hover/focus-within y cuando la banda
 * sale del viewport. Con `prefers-reduced-motion` la fila es estática y con
 * wrap (se oculta la mitad duplicada).
 */
function MarqueeRow({ items, trackClass, animate }: MarqueeRowProps) {
  const halfClasses =
    'flex shrink-0 items-center gap-10 pr-10 motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-x-6 motion-reduce:gap-y-3 motion-reduce:pr-0';

  return (
    <div className="group relative overflow-hidden py-4 sm:py-5">
      <div
        aria-hidden="true"
        className={[
          'flex w-max items-center',
          'group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]',
          'motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center',
          animate ? 'motion-safe:animate-marquee' : '',
          trackClass,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {/* Mitad original */}
        <div className={halfClasses}>
          {items.map((name) => (
            <MarqueeItem key={name} name={name} />
          ))}
        </div>
        {/* Mitad duplicada para el loop perfecto (oculta en reduced-motion) */}
        <div className={`${halfClasses} motion-reduce:hidden`}>
          {items.map((name) => (
            <MarqueeItem key={`dup-${name}`} name={name} />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Marquee V2: banda full-bleed #102E2E (bg-band) con DOS filas de tecnologías
 * del CV en sentidos opuestos (`motion-safe:animate-marquee`, la inversa con
 * `[animation-direction:reverse]`), pausadas en hover/focus-within y fuera del
 * viewport. Contenido duplicado marcado `aria-hidden` y una lista `sr-only`
 * para lectores de pantalla. Con `prefers-reduced-motion`: filas estáticas
 * con wrap (sólo se muestra la mitad original).
 */
export function Marquee() {
  const sectionRef = useRef<HTMLElement | null>(null);
  // Rendimiento: la animación sólo corre mientras la banda está en/near el
  // viewport (una vez fuera, el track pierde la clase de animación).
  const inView = useInView(sectionRef, { margin: '96px' });

  return (
    <section ref={sectionRef} aria-labelledby="marquee-title" className="relative bg-band">
      {/* Encabezado y contenido completo ocultos a la vista (una banda de
          marquee no lleva título visible) pero accesibles para lectores. */}
      <div className="sr-only">
        <SectionHeading id="marquee-title" title="Tecnologías" />
        <ul>
          {ALL_TECHS.map((tech) => (
            <li key={tech}>{MARQUEE_LABELS[tech] ?? tech}</li>
          ))}
        </ul>
      </div>

      <MarqueeRow items={ROW_A} animate={inView} trackClass="[animation-duration:36s]" />
      <MarqueeRow
        items={ROW_B}
        animate={inView}
        trackClass="[animation-direction:reverse] [animation-duration:48s]"
      />
    </section>
  );
}
