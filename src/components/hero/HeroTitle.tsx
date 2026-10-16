import { Fragment } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { useContent, useT } from '../../i18n';
import { EASE } from '../ui/motion';

const plaque: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const lettersWrap: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const letter: Variants = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

const nameLine: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/**
 * Título ENORME del hero V2: "Portafolio" en Caveat Brush fluido (hasta
 * ~12rem en pantallas grandes) con entrada letra a letra (sólo
 * transform/opacity, stagger ~65ms) dentro de la placa panel #102E2E, con el
 * nombre en Caveat 700 (font-hand) debajo, como en el diseño de referencia.
 *
 * Accesibilidad: el `<h1>` lleva `aria-label` y las letras animadas van en un
 * span `aria-hidden` (la animación nunca oculta el contenido: sin
 * `prefers-reduced-motion` todo aparece directamente en su estado final).
 *
 * Entre letra y letra se inserta un espacio de ancho cero (`\u200b`) para que,
 * si la palabra no cabe, el navegador pueda partir la línea en lugar de
 * desbordar horizontalmente.
 */
export function HeroTitle() {
  const t = useT();
  const { profile } = useContent();
  /** Palabra del título del hero (se anima letra a letra), ya traducida. */
  const title = t('hero.title');
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      variants={plaque}
      initial={prefersReducedMotion ? false : 'hidden'}
      animate="visible"
      className="relative z-10 -ml-3 inline-block self-start bg-panel py-5 pl-7 pr-9 sm:-ml-5 sm:py-7 sm:pl-10 sm:pr-12 lg:-ml-6 lg:py-9 lg:pl-12 lg:pr-14"
    >
      {/* Filo accent a la izquierda de la placa, como pincelada de tinta. */}
      <span
        aria-hidden="true"
        className="absolute -left-1.5 top-6 bottom-6 w-1.5 rounded-full bg-accent"
      />
      <h1
        id="hero-title"
        aria-label={title}
        className="font-display leading-[0.95] text-ink text-[clamp(3.5rem,12vw,7.5rem)] lg:text-[clamp(4.5rem,9vw,12rem)]"
      >
        <motion.span aria-hidden="true" variants={lettersWrap} className="inline-block">
          {title.split('').map((char, index) => (
            <Fragment key={index}>
              <motion.span variants={letter} className="inline-block">
                {char}
              </motion.span>
              {index < title.length - 1 ? '\u200b' : null}
            </Fragment>
          ))}
        </motion.span>
      </h1>
      <motion.p
        variants={nameLine}
        className="mt-2 font-hand font-bold leading-tight text-ink sm:mt-3 text-[clamp(1.6rem,4vw,3rem)]"
      >
        {profile.name}
      </motion.p>
    </motion.div>
  );
}
