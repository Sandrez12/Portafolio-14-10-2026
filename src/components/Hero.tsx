import { useRef, type PointerEventHandler } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { siGithub, siLinkedin } from 'simple-icons';
import { CV_URL, profile } from '../data/profile';
import { useIsDesktopPointer } from '../hooks/useIsDesktopPointer';
import { HeroEdge } from './decor/HeroEdge';
import { HeroArt } from './hero/HeroArt';
import { HeroTitle } from './hero/HeroTitle';
import { ScrollIndicator } from './hero/ScrollIndicator';
import { TypewriterRoles } from './hero/TypewriterRoles';
import { Button } from './ui/Button';
import { EASE } from './ui/motion';

/** Enlaces sociales del hero (datos de `src/data/profile.ts`). */
const SOCIAL_LINKS = [
  {
    id: 'github',
    label: 'GitHub de Andrés (se abre en pestaña nueva)',
    href: profile.githubUrl,
    path: siGithub.path,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn de Andrés (se abre en pestaña nueva)',
    href: profile.linkedinUrl,
    path: siLinkedin.path,
  },
] as const;

/**
 * Hero V2: sección full-bleed con altura de ~una pantalla (clamp
 * 560px–100svh, tope 900px). A la izquierda, la placa panel con el título
 * ENORME "Portafolio" (letra a letra), el nombre, la línea de roles con
 * máquina de escribir, los botones y los enlaces sociales; a la derecha
 * (desktop), la ilustración por capas `HeroArt` sangrando por los bordes,
 * con parallax por puntero (sólo desktop pointer, sin reduced-motion); en
 * móvil/tablet la ilustración va arriba en flujo con degradado hacia bg.
 * Abajo, indicador de scroll animado.
 *
 * El parallax se calcula aquí: posición del puntero normalizada
 * (-0.5..0.5) en MotionValues suavizados con springs y consumida por
 * `HeroArt` vía `useTransform`; sin puntero fino o con reduced-motion, los
 * valores nunca se actualizan (capas estáticas).
 */
export function Hero() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const isDesktopPointer = useIsDesktopPointer();
  const canParallax = isDesktopPointer && !prefersReducedMotion;

  const sectionRef = useRef<HTMLElement | null>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const parallaxX = useSpring(rawX, { stiffness: 55, damping: 16, mass: 0.6 });
  const parallaxY = useSpring(rawY, { stiffness: 55, damping: 16, mass: 0.6 });

  const handlePointerMove: PointerEventHandler<HTMLElement> = (event) => {
    if (!canParallax || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    rawX.set(Math.max(-0.5, Math.min(0.5, (event.clientX - rect.left) / rect.width - 0.5)));
    rawY.set(Math.max(-0.5, Math.min(0.5, (event.clientY - rect.top) / rect.height - 0.5)));
  };

  const handlePointerLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-labelledby="hero-title"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative -mt-16 flex min-h-[clamp(560px,100svh,900px)] flex-col overflow-x-clip"
    >
      {/* Móvil/tablet: ilustración arriba de todo, en flujo y a plena vista,
          con degradado suave SOLO en su borde inferior hacia bg. */}
      <div
        aria-hidden="true"
        className="pointer-events-none relative h-[min(42vh,400px)] min-h-[300px] w-full shrink-0 lg:hidden"
        style={{
          maskImage: 'linear-gradient(to bottom, black 58%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 58%, transparent 100%)',
        }}
      >
        <HeroArt parallaxX={parallaxX} parallaxY={parallaxY} className="h-full w-full" />
      </div>
      {/* Desktop: ilustración ocupando ~la mitad derecha, a plena altura,
          sangrando por los bordes superior y derecho. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[min(52vw,780px)] lg:block"
      >
        <HeroArt parallaxX={parallaxX} parallaxY={parallaxY} className="h-full w-full" />
      </div>

      {/* Desktop: fragmentos entintados sangrando por el borde
          inferior-izquierdo, como en la referencia. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 hidden h-[150px] w-[min(26vw,300px)] lg:block"
      >
        <HeroEdge className="h-full w-full" />
      </div>

      {/* Contenido */}
      <div className="relative z-10 mx-auto flex w-full max-w-container flex-1 flex-col justify-center gap-7 px-5 pb-24 pt-10 sm:px-8 lg:gap-8 lg:pb-16">
        <HeroTitle />

        <TypewriterRoles />

        {/* Botones y enlaces sociales: entran tras el título. */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0, ease: EASE }}
          className="flex flex-col gap-5"
        >
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <Button href="#proyectos" variant="primary">
              Ver proyectos
            </Button>
            <Button href="#contacto" variant="ghost">
              Contacto
            </Button>
            {CV_URL !== '' ? (
              <Button href={CV_URL} variant="ghost" target="_blank" rel="noopener noreferrer">
                Descargar CV
              </Button>
            ) : null}
          </div>

          <ul className="flex items-center gap-3">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full text-ink ring-1 ring-inset ring-teal transition-colors duration-200 hover:bg-panel hover:ring-accent"
                >
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    focusable="false"
                    className="h-5 w-5 fill-current"
                  >
                    <path d={link.path} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
