import { motion, useReducedMotion, useTransform, type MotionValue } from 'framer-motion';
import { EASE } from '../ui/motion';

interface HeroArtProps {
  className?: string;
  /**
   * Posición del puntero normalizada (-0.5..0.5) con spring, calculada por el
   * Hero (sólo se actualiza con puntero fino de desktop y sin
   * reduced-motion; en cualquier otro caso queda en 0 = capas estáticas).
   */
  parallaxX: MotionValue<number>;
  parallaxY: MotionValue<number>;
}

/**
 * Ilustración ORIGINAL V2 del hero (trazo propio, no copiado de la
 * referencia): cintas-onda "entintadas" por capas en
 * accent-dark/accent-mid/accent/teal que sangran por los bordes, con una
 * silueta de laptop con código, un grafo de nodos y glifos flotantes como
 * guiño a la ingeniería de sistemas.
 *
 * - Parallax por puntero: cada capa se desplaza con un factor distinto
 *   (`useTransform` sobre los MotionValues con spring del Hero; si el puntero
 *   no los actualiza, quedan en 0 y todo es estático).
 * - Trazos que se dibujan al cargar: `pathLength` 0→1 (sin reduced-motion).
 * - Elementos flotantes: `motion-safe:animate-float` en envoltorios internos
 *   (nunca en el mismo nodo que el transform de parallax, para no pisarse).
 *
 * Puramente decorativa: `aria-hidden` aquí y en el consumidor.
 */
export function HeroArt({ className = 'h-full w-full', parallaxX, parallaxY }: HeroArtProps) {
  const prefersReducedMotion = useReducedMotion();
  // El dibujado de trazos sólo ocurre sin reduced-motion.
  const draw = (delay: number) => ({
    initial: prefersReducedMotion ? false : { pathLength: 0 },
    animate: { pathLength: 1 },
    transition: { duration: 1.5, delay, ease: EASE },
  });
  const fade = (delay: number) => ({
    initial: prefersReducedMotion ? false : { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.8, delay, ease: EASE },
  });

  // Parallax por capas (factores crecientes hacia el primer plano).
  const backX = useTransform(parallaxX, (v) => v * 10);
  const backY = useTransform(parallaxY, (v) => v * 8);
  const midX = useTransform(parallaxX, (v) => v * 20);
  const midY = useTransform(parallaxY, (v) => v * 16);
  const nearX = useTransform(parallaxX, (v) => v * 30);
  const nearY = useTransform(parallaxY, (v) => v * 24);
  const frontX = useTransform(parallaxX, (v) => v * 40);
  const frontY = useTransform(parallaxY, (v) => v * 32);

  return (
    <div className={`relative ${className}`} aria-hidden="true">
      {/* ── Capa trasera: cintas entintadas que sangran por arriba/derecha ── */}
      <motion.div style={{ x: backX, y: backY }} className="absolute inset-0">
        <svg viewBox="0 0 760 900" preserveAspectRatio="xMaxYMin slice" className="h-full w-full">
          {/* Masa oscura que sangra por la esquina superior derecha */}
          <motion.path
            fill="#3A0E0E"
            d="M780 -70 C 640 -90 556 -36 536 60 C 516 156 592 248 704 258 C 764 264 784 234 794 190 Z"
            {...fade(0.1)}
          />
          {/* Cinta-onda ancha (accent-dark): espina dorsal de la composición */}
          <motion.path
            fill="none"
            stroke="#3A0E0E"
            strokeWidth="132"
            strokeLinecap="round"
            d="M 96 -80 C 34 92 84 212 204 292 C 324 372 472 402 562 482 C 642 554 672 662 630 732"
            {...draw(0.15)}
          />
          {/* Cinta-onda media (accent-mid) */}
          <motion.path
            fill="none"
            stroke="#7B1D1D"
            strokeWidth="90"
            strokeLinecap="round"
            d="M 244 -80 C 196 72 246 172 356 242 C 466 312 566 362 626 452 C 676 526 682 612 642 672"
            {...draw(0.35)}
          />
          {/* Cinta fina (accent) abrazando la esquina superior derecha */}
          <motion.path
            fill="none"
            stroke="#BC3A3A"
            strokeWidth="48"
            strokeLinecap="round"
            d="M 404 -80 C 384 -10 424 42 504 82 C 584 122 646 202 670 302"
            {...draw(0.55)}
          />
          {/* Masa oscura secundaria que sangra por el borde derecho */}
          <motion.path
            fill="#3A0E0E"
            d="M 792 424 C 700 402 638 472 664 544 C 686 606 756 630 806 610 Z"
            {...fade(0.5)}
          />
        </svg>
      </motion.div>
      {/* ── Capa media: trazos teal, tentáculo en espiral y salpicaduras ── */}
      <motion.div style={{ x: midX, y: midY }} className="absolute inset-0">
        <svg viewBox="0 0 760 900" preserveAspectRatio="xMaxYMin slice" className="h-full w-full">
          <motion.path
            fill="none"
            stroke="#236B6B"
            strokeWidth="15"
            strokeLinecap="round"
            d="M 560 320 C 496 352 420 356 364 330"
            {...draw(0.9)}
          />
          <motion.path
            fill="none"
            stroke="#236B6B"
            strokeWidth="17"
            strokeLinecap="round"
            d="M 588 500 C 520 540 434 544 374 514"
            {...draw(1.05)}
          />
          <motion.path
            fill="none"
            stroke="#7B1D1D"
            strokeWidth="16"
            strokeLinecap="round"
            d="M 30 44 C 92 26 154 38 202 80"
            {...draw(0.8)}
          />
          {/* Tentáculo en espiral (accent) */}
          <motion.path
            fill="none"
            stroke="#BC3A3A"
            strokeWidth="20"
            strokeLinecap="round"
            d="M 448 268 C 532 250 604 280 628 352 C 650 416 622 470 566 472 C 526 474 498 444 512 410 C 520 388 546 380 562 394"
            {...draw(1.0)}
          />
          {/* Hoja entintada en teal */}
          <motion.path
            fill="#236B6B"
            d="M 258 366 C 310 336 370 344 392 386 C 366 430 304 422 274 400 C 258 388 250 380 258 366 Z"
            {...fade(1.0)}
          />
          {/* Salpicaduras de tinta */}
          <motion.g {...fade(1.1)}>
            <circle cx="252" cy="168" r="4" fill="#BC3A3A" />
            <circle cx="282" cy="194" r="2.5" fill="#BC3A3A" />
            <circle cx="222" cy="138" r="3" fill="#7B1D1D" />
            <circle cx="322" cy="296" r="3.5" fill="#BC3A3A" />
            <circle cx="348" cy="320" r="2.5" fill="#236B6B" />
            <circle cx="152" cy="340" r="3" fill="#236B6B" />
            <circle cx="516" cy="620" r="4" fill="#BC3A3A" />
            <circle cx="546" cy="646" r="2.5" fill="#236B6B" />
            <circle cx="160" cy="590" r="3" fill="#BC3A3A" />
            <circle cx="396" cy="646" r="2.5" fill="#236B6B" />
          </motion.g>
        </svg>
      </motion.div>
      {/* ── Capa cercana: laptop con código (flota suave) ── */}
      <motion.div style={{ x: nearX, y: nearY }} className="absolute bottom-[8%] left-[6%] w-[46%]">
        <div className="motion-safe:animate-float motion-safe:[animation-duration:9s]">
          <svg viewBox="0 0 300 220" className="h-auto w-full">
            <g transform="rotate(-7 150 120)">
              {/* Pantalla */}
              <motion.path
                d="M62 34 h176 a12 12 0 0 1 12 12 v104 a12 12 0 0 1 -12 12 h-176 a12 12 0 0 1 -12 -12 v-104 a12 12 0 0 1 12 -12 z"
                fill="#0C2424"
                stroke="#236B6B"
                strokeWidth="3"
                strokeLinejoin="round"
                {...draw(0.9)}
              />
              {/* Barra superior con puntos */}
              <circle cx="78" cy="52" r="4.5" fill="#BC3A3A" />
              <circle cx="93" cy="52" r="4.5" fill="#7B1D1D" />
              <circle cx="108" cy="52" r="4.5" fill="#236B6B" />
              {/* Líneas de "código" */}
              <motion.g {...fade(1.2)}>
                <rect x="78" y="72" width="86" height="7" rx="3.5" fill="#C9D7DA" />
                <rect x="78" y="90" width="122" height="7" rx="3.5" fill="#236B6B" />
                <rect x="96" y="108" width="98" height="7" rx="3.5" fill="#BC3A3A" />
                <rect x="96" y="126" width="64" height="7" rx="3.5" fill="#7B1D1D" />
                <rect x="78" y="144" width="108" height="7" rx="3.5" fill="#C9D7DA" opacity="0.7" />
              </motion.g>
              {/* Base de la laptop */}
              <motion.path
                d="M40 176 h220 l20 26 h-260 z"
                fill="#0C2424"
                stroke="#236B6B"
                strokeWidth="3"
                strokeLinejoin="round"
                {...draw(1.15)}
              />
            </g>
          </svg>
        </div>
      </motion.div>

      {/* ── Capa cercana: grafo de nodos (red/conexiones) ── */}
      <motion.div style={{ x: nearX, y: nearY }} className="absolute right-[5%] top-[15%] w-[40%]">
        <svg viewBox="0 0 260 200" className="h-auto w-full">
          <motion.g
            fill="none"
            stroke="#236B6B"
            strokeWidth="2.5"
            strokeLinejoin="round"
            {...draw(1.3)}
          >
            <path d="M46 148 L104 62 L182 84 L156 156 Z" />
            <path d="M104 62 L156 156" />
            <path d="M46 148 L182 84" opacity="0.5" />
          </motion.g>
          <motion.g {...fade(1.5)}>
            <circle cx="46" cy="148" r="9" fill="#C9D7DA" />
            <circle cx="104" cy="62" r="7" fill="#236B6B" />
            <circle cx="182" cy="84" r="6" fill="#C9D7DA" />
            <circle cx="156" cy="156" r="6" fill="#BC3A3A" />
          </motion.g>
          {/* Nodo suelto que "late" */}
          <motion.circle
            cx="226"
            cy="132"
            r="8"
            fill="#BC3A3A"
            className="motion-safe:animate-pulse-glow"
            {...fade(1.6)}
          />
        </svg>
      </motion.div>
      {/* ── Capa frontal: glifos flotantes ── */}
      <motion.div style={{ x: frontX, y: frontY }} className="absolute inset-0">
        {/* Glifo `</>` */}
        <div className="absolute right-[14%] top-[6%] motion-safe:animate-float">
          <svg viewBox="0 0 48 40" className="h-auto w-12">
            <g
              fill="none"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="#236B6B"
            >
              <path d="M16 10 L6 20 L16 30" />
              <path d="M32 10 L42 20 L32 30" />
              <path d="M27 4 L21 36" stroke="#BC3A3A" />
            </g>
          </svg>
        </div>
        {/* Llaves { } */}
        <div className="absolute left-[2%] top-[24%] motion-safe:animate-float motion-safe:[animation-delay:1.8s]">
          <svg viewBox="0 0 44 40" className="h-auto w-10">
            <path
              d="M12 8 C6 8 4 14 4 20 C4 26 6 32 12 32 C18 32 20 26 20 20 C20 14 18 8 12 8 Z M40 8 C34 8 32 14 32 20 C32 26 34 32 40 32"
              fill="none"
              stroke="#BC3A3A"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>
        {/* Cilindro de base de datos mini (guiño a SQL/NoSQL) */}
        <div className="absolute bottom-[2%] right-[26%] motion-safe:animate-float motion-safe:[animation-delay:0.9s]">
          <svg viewBox="0 0 40 48" className="h-auto w-9">
            <g fill="none" stroke="#236B6B" strokeWidth="3" strokeLinecap="round">
              <ellipse cx="20" cy="10" rx="14" ry="6" />
              <path d="M6 10 v28 c0 3.3 6.3 6 14 6 s14 -2.7 14 -6 v-28" />
              <path d="M6 24 c0 3.3 6.3 6 14 6 s14 -2.7 14 -6" opacity="0.7" />
            </g>
          </svg>
        </div>
        {/* Salpicaduras que flotan */}
        <div className="absolute left-[16%] top-[52%] motion-safe:animate-float motion-safe:[animation-delay:2.6s]">
          <span className="block h-2 w-2 rounded-full bg-accent" />
        </div>
        <div className="absolute right-[34%] bottom-[34%] motion-safe:animate-float motion-safe:[animation-delay:3.4s]">
          <span className="block h-1.5 w-1.5 rounded-full bg-ink-muted" />
        </div>
      </motion.div>
    </div>
  );
}
