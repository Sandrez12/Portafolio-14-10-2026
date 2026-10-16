import { Ornament } from '../ui/Ornament';
import { Reveal } from '../ui/Reveal';
import { Stagger, StaggerItem } from '../ui/Stagger';

/** Props comunes de los iconos SVG propios de "Qué hago". */
const ICON_PROPS = {
  viewBox: '0 0 24 24',
  'aria-hidden': true,
  focusable: false,
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  className: 'h-7 w-7',
} as const;

/** Cilindro de base de datos (SQL y NoSQL). */
function DatabaseIcon() {
  return (
    <svg {...ICON_PROPS}>
      <ellipse cx="12" cy="5.5" rx="7" ry="2.8" />
      <path d="M5 5.5v13c0 1.55 3.1 2.8 7 2.8s7-1.25 7-2.8v-13" />
      <path d="M5 12c0 1.55 3.1 2.8 7 2.8s7-1.25 7-2.8" opacity="0.7" />
    </svg>
  );
}

/** Ventana con código (desarrollo web). */
function WebIcon() {
  return (
    <svg {...ICON_PROPS}>
      <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
      <path d="M7.5 10.5 10 13l-2.5 2.5" />
      <path d="M13 15.5h3.5" />
    </svg>
  );
}

/** Red de nodos (IA aplicada). */
function NeuralIcon() {
  return (
    <svg {...ICON_PROPS}>
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="12" cy="5" r="2.5" />
      <circle cx="12" cy="19" r="2.5" />
      <circle cx="18" cy="12" r="2.5" />
      <path d="M8.2 10.9 10.3 7.1" />
      <path d="M13.7 7.1 15.8 10.9" />
      <path d="M8.2 13.1 10.3 16.9" />
      <path d="M15.8 13.1 13.7 16.9" />
    </svg>
  );
}

/** Nube con nodo colgante (IoT y nube). */
function CloudIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M7 18.5h10a4 4 0 0 0 .6-7.96A6 6 0 0 0 5.7 8.6 4.5 4.5 0 0 0 7 18.5Z" />
      <path d="M12 18.5V21" />
      <circle cx="12" cy="22" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

/**
 * "Qué hago" V2: 4 áreas basadas SOLO en el CV y los proyectos verificados
 * (ver `_spec/BRIEF.md`; nada inventado: mismos stack, certificaciones y
 * módulos de los proyectos).
 */
const AREAS = [
  {
    id: 'bases-de-datos',
    icon: <DatabaseIcon />,
    title: 'Bases de datos SQL y NoSQL',
    text: 'Construcción y desarrollo de bases de datos con MySQL, MongoDB, Oracle y Oracle APEX, con certificación Introduction to MongoDB.',
  },
  {
    id: 'web',
    icon: <WebIcon />,
    title: 'Desarrollo web',
    text: 'Frontend y backend con HTML, CSS, JavaScript, PHP, Laravel, React y Flask; proyectos como el Gestor de Inventario y MoodJournal.',
  },
  {
    id: 'ia',
    icon: <NeuralIcon />,
    title: 'IA aplicada',
    text: 'Traducción de señas de la LSC con una red LSTM bidireccional y clasificación de dibujos en Cognia; certificaciones AWS de Machine Learning para NLP y Generative AI Foundations.',
  },
  {
    id: 'iot-nube',
    icon: <CloudIcon />,
    title: 'IoT y nube',
    text: 'AWS y Azure IoT Central; plataforma de telemetría con ingesta MQTT, gemelo digital, reglas y alertas.',
  },
];

/**
 * "Qué hago": 4 tarjetas panel con icono SVG propio, título y 1–2 frases del
 * CV/proyectos. Entrada escalonada (`Stagger`), hover con elevación y ring
 * accent (sólo transform y colores).
 */
export function WhatIDo() {
  return (
    <div>
      <Reveal className="mb-6 flex items-center gap-3">
        <Ornament className="h-9 w-5 shrink-0" />
        <h3 className="font-sans text-xl font-bold leading-tight text-ink sm:text-2xl">Qué hago</h3>
      </Reveal>

      <Stagger as="ul" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {AREAS.map((area) => (
          <StaggerItem
            as="li"
            key={area.id}
            className="flex h-full flex-col gap-3 rounded-xl bg-panel p-6 transition-all duration-200 hover:-translate-y-1 hover:ring-1 hover:ring-accent/60"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-ink">
              {area.icon}
            </span>
            <h4 className="text-base font-semibold leading-snug text-ink">{area.title}</h4>
            <p className="text-sm leading-relaxed text-ink-muted">{area.text}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
