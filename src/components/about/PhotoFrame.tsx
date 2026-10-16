import { motion, useReducedMotion } from 'framer-motion';
import { profile } from '../../data/profile';
import { Reveal } from '../ui/Reveal';
import { TiltCard } from '../ui/TiltCard';
import { EASE } from '../ui/motion';

/**
 * Foto de "¿quién soy?" V2: retrato grande (~420px en desktop) con esquinas
 * asimétricas, formas de tinta SVG detrás (accent-dark/accent-mid) y un
 * anillo que se dibuja alrededor (`pathLength` 0→1 al entrar al viewport).
 * La tarjeta completa se inclina suavemente con el puntero (`TiltCard`,
 * sólo desktop sin reduced-motion). Reduced-motion: todo estático.
 */
export function PhotoFrame() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Reveal x={-28} y={0} className="relative self-start lg:w-[420px] lg:shrink-0">
      {/* Mancha de tinta oscura detrás de la esquina superior izquierda */}
      <svg aria-hidden="true" viewBox="0 0 200 200" className="absolute -left-10 -top-10 h-44 w-44">
        <path
          fill="#3A0E0E"
          d="M104 8 C 158 22 184 74 172 122 C 160 170 108 194 66 178 C 22 161 8 112 24 68 C 40 26 62 0 104 8 Z"
        />
      </svg>
      {/* Mancha accent-mid y salpicaduras detrás de la esquina inferior derecha */}
      <svg
        aria-hidden="true"
        viewBox="0 0 200 200"
        className="absolute -bottom-10 -right-1 h-36 w-36 rotate-12 sm:-right-8"
      >
        <path
          fill="#7B1D1D"
          d="M100 12 C 150 24 176 70 168 116 C 160 162 116 186 74 172 C 30 158 12 112 26 70 C 40 30 58 4 100 12 Z"
        />
        <circle cx="34" cy="40" r="5" fill="#BC3A3A" />
        <circle cx="168" cy="160" r="4" fill="#236B6B" />
      </svg>

      <TiltCard className="relative">
        <div className="relative">
          {/* Anillo que se dibuja alrededor de la foto */}
          <div aria-hidden="true" className="absolute -inset-3">
            <svg viewBox="0 0 460 380" preserveAspectRatio="none" className="h-full w-full">
              <motion.rect
                x="10"
                y="10"
                width="440"
                height="360"
                rx="28"
                fill="none"
                stroke="#BC3A3A"
                strokeWidth="2.5"
                vectorEffect="non-scaling-stroke"
                pathLength={1}
                initial={prefersReducedMotion ? false : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: '-64px' }}
                transition={{ duration: 1.2, ease: EASE }}
              />
            </svg>
          </div>
          <img
            src={profile.photo}
            alt={`Retrato de ${profile.name}`}
            width={460}
            height={368}
            fetchPriority="high"
            className="aspect-[5/4] w-full rounded-2xl rounded-tr-[110px] rounded-bl-[52px] bg-panel object-cover"
          />
        </div>
      </TiltCard>
    </Reveal>
  );
}
