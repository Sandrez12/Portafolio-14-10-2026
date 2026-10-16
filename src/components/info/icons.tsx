import type { ReactElement } from 'react';
import type { ContactItem, EducationEntry } from '../../types';

interface IconProps {
  /** Clases del SVG (tamaño y color). Por defecto 20px, hereda `currentColor`. */
  className?: string;
}

type IconComponent = (props: IconProps) => ReactElement;

/** Icono de correo (monocromo blanco vía `currentColor`). */
export function EmailIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
}

/** Icono de teléfono (monocromo blanco vía `currentColor`). */
export function PhoneIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  );
}

/** Icono de GitHub (monocromo blanco vía `currentColor`). */
export function GithubIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

/** Icono de LinkedIn (monocromo blanco vía `currentColor`). */
export function LinkedinIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  );
}

const contactIcons: Record<ContactItem['id'], IconComponent> = {
  email: EmailIcon,
  phone: PhoneIcon,
  github: GithubIcon,
  linkedin: LinkedinIcon,
};

interface ContactIconProps {
  /** Id estable del canal de contacto (elige el icono). */
  id: ContactItem['id'];
  className?: string;
}

/** Elige el icono del canal de contacto a partir de su id estable. */
export function ContactIcon({ id, className = 'h-5 w-5' }: ContactIconProps) {
  const Icon = contactIcons[id];
  return <Icon className={className} />;
}

/* ------------------------------------------------------------------ */
/* Iconos de la línea de tiempo de trayectoria (trazos SVG propios).    */
/* ------------------------------------------------------------------ */

/** Icono de estudios universitarios (birrete de graduación, trazo propio). */
export function UniversityIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 4 2.5 8.75 12 13.5l9.5-4.75L12 4z" />
      <path d="M6.5 10.75V15c0 1.66 2.46 3 5.5 3s5.5-1.34 5.5-3v-4.25" />
      <path d="M21.5 9v5" />
    </svg>
  );
}

/** Icono de voluntariado (corazón en la palma, trazo propio). */
export function VolunteerIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 20.5C7.2 16.8 3.5 13.6 3.5 9.9 3.5 7.2 5.6 5 8.3 5c1.5 0 2.9.8 3.7 2 .8-1.2 2.2-2 3.7-2 2.7 0 4.8 2.2 4.8 4.9 0 3.7-3.7 6.9-8.5 10.6z" />
    </svg>
  );
}

/** Icono de bachillerato (libro abierto, trazo propio). */
export function SchoolIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M4 5.5c3-.9 6-.4 8 1.2 2-1.6 5-2.1 8-1.2v13.4c-3-.9-6-.4-8 1.2-2-1.6-5-2.1-8-1.2V5.5z" />
      <path d="M12 6.7v13.4" />
    </svg>
  );
}

/** Icono de primaria (lápiz, trazo propio). */
export function PrimaryIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="m4 20 1-4L16.5 4.5a2.12 2.12 0 0 1 3 3L8 19l-4 1z" />
      <path d="m14.5 6.5 3 3" />
    </svg>
  );
}

/** Tipos de entrada de la línea de tiempo con icono propio. */
export type JourneyIconId = 'university' | 'volunteer' | 'school' | 'primary';

const journeyIcons: Record<JourneyIconId, IconComponent> = {
  university: UniversityIcon,
  volunteer: VolunteerIcon,
  school: SchoolIcon,
  primary: PrimaryIcon,
};

/**
 * Resuelve el icono de una entrada de educación/experiencia a partir de su
 * título (las entradas exactas viven en `src/data/profile.ts`).
 */
function journeyIconId(entry: EducationEntry): JourneyIconId {
  const title = entry.title.toLowerCase();
  if (title.includes('ingeniería') || title.includes('engineering')) return 'university';
  if (title.includes('voluntario') || title.includes('volunteer')) return 'volunteer';
  if (title.includes('bachillerato') || title.includes('high school')) return 'school';
  return 'primary';
}

interface JourneyIconProps {
  /** Entrada de educación/experiencia (elige el icono por su título). */
  entry: EducationEntry;
  className?: string;
}

/** Elige el icono de la línea de tiempo a partir de la entrada exacta. */
export function JourneyIcon({ entry, className = 'h-5 w-5' }: JourneyIconProps) {
  const Icon = journeyIcons[journeyIconId(entry)];
  return <Icon className={className} />;
}
