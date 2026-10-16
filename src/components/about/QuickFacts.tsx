import type { ReactNode } from 'react';
import { useContent, useT } from '../../i18n';
import { AnimatedNumber } from '../ui/AnimatedNumber';
import { Reveal } from '../ui/Reveal';

/** Props comunes de los iconos SVG propios de las tarjetas. */
const ICON_PROPS = {
  viewBox: '0 0 24 24',
  'aria-hidden': true,
  focusable: false,
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  className: 'h-6 w-6',
} as const;

/** Birrete de graduación (estudios). */
function GraduationCapIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M12 4 2.5 9 12 14 21.5 9 12 4Z" />
      <path d="M6 11.5V17c0 1.7 2.7 3 6 3s6-1.3 6-3v-5.5" />
    </svg>
  );
}

/** Globo (idiomas). */
function GlobeIcon() {
  return (
    <svg {...ICON_PROPS}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.7 2.6 4 5.6 4 9s-1.3 6.4-4 9c-2.7-2.6-4-5.6-4-9s1.3-6.4 4-9Z" />
    </svg>
  );
}

/** Insignia (certificaciones). */
function BadgeIcon() {
  return (
    <svg {...ICON_PROPS}>
      <circle cx="12" cy="9" r="5.5" />
      <path d="M9.5 13.5 8 21l4-2.2L16 21l-1.5-7.5" />
    </svg>
  );
}

/** Carpeta (proyectos). */
function FolderIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2.5h8a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
    </svg>
  );
}

/**
 * "Datos rápidos" V2: 4 tarjetas panel con icono propio y cifras del CV
 * (ver `_spec/V2_BRIEF.md`: sólo estas cifras están permitidas). Las cifras
 * provienen de `useContent()` (idiomas, certificaciones, proyectos); el año
 * de inicio de la carrera es un dato fijo (contarlo no tendría sentido).
 * Reduced-motion: valor final directo (comportamiento de `AnimatedNumber`).
 */
interface Fact {
  id: string;
  icon: ReactNode;
  value: ReactNode;
  label: string;
  sub: string;
}

/**
 * "Datos rápidos": 4 tarjetas panel con icono, cifra grande (font-display) y
 * detalle. Hover con elevación (sólo transform). Entrada escalonada con
 * `Reveal` (delay por índice).
 */
export function QuickFacts() {
  const { languages, certifications, projects } = useContent();
  const t = useT();

  const facts: Fact[] = [
    {
      id: 'carrera',
      icon: <GraduationCapIcon />,
      value: '2023',
      label: t('about.factCareerLabel'),
      sub: t('about.factCareerSub'),
    },
    {
      id: 'idiomas',
      icon: <GlobeIcon />,
      value: <AnimatedNumber value={languages.length} />,
      label: t('about.factLanguagesLabel'),
      sub: t('about.factLanguagesSub'),
    },
    {
      id: 'certificaciones',
      icon: <BadgeIcon />,
      value: <AnimatedNumber value={certifications.length} />,
      label: t('about.factCertsLabel'),
      sub: t('about.factCertsSub'),
    },
    {
      id: 'proyectos',
      icon: <FolderIcon />,
      value: <AnimatedNumber value={projects.length} />,
      label: t('about.factProjectsLabel'),
      sub: t('about.factProjectsSub'),
    },
  ];

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {facts.map((fact, index) => (
        <Reveal
          as="li"
          key={fact.id}
          delay={index * 0.08}
          className="flex flex-col gap-3 rounded-xl bg-panel p-5 transition-transform duration-200 hover:-translate-y-1"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent text-ink">
            {fact.icon}
          </span>
          <p className="font-display text-4xl leading-none text-ink">{fact.value}</p>
          <p className="text-sm font-semibold text-ink">{fact.label}</p>
          <p className="text-xs leading-relaxed text-ink-muted">{fact.sub}</p>
        </Reveal>
      ))}
    </ul>
  );
}
