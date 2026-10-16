import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * Roles EXACTOS del CV que rotan en la línea de máquina de escribir del hero.
 * NO añadir textos que no estén en el CV (ver `_spec/V2_BRIEF.md`).
 */
const ROLE_TEXTS = [
  'Estudiante de Ingeniería de Sistemas',
  'Python · Java · Kotlin',
  'Bases de datos SQL y NoSQL',
  'Desarrollo web con React y Laravel',
  'Nube: AWS y Azure IoT Central',
] as const;

/** Velocidades de la máquina de escribir (ms por acción). */
const TYPE_MS = 55;
const ERASE_MS = 26;
const HOLD_MS = 2100;
const GAP_MS = 350;

/**
 * Línea de roles con efecto máquina de escribir: escribe cada rol del CV,
 * lo sostiene, lo borra y pasa al siguiente (bucle). Con
 * `prefers-reduced-motion` muestra estático el PRIMER rol, sin bucle.
 *
 * Accesibilidad: la línea animada es `aria-hidden` (los cambios por carácter
 * serían ruido para lectores de pantalla) y debajo va una lista `sr-only`
 * con los cinco roles completos.
 */
export function TypewriterRoles() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [roleIndex, setRoleIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const text = ROLE_TEXTS[roleIndex];
    let timeout: number | undefined;

    if (!deleting) {
      if (charCount < text.length) {
        timeout = window.setTimeout(() => setCharCount((count) => count + 1), TYPE_MS);
      } else {
        timeout = window.setTimeout(() => setDeleting(true), HOLD_MS);
      }
    } else if (charCount > 0) {
      timeout = window.setTimeout(() => setCharCount((count) => count - 1), ERASE_MS);
    } else {
      timeout = window.setTimeout(() => {
        setDeleting(false);
        setRoleIndex((index) => (index + 1) % ROLE_TEXTS.length);
      }, GAP_MS);
    }

    return () => window.clearTimeout(timeout);
  }, [prefersReducedMotion, roleIndex, charCount, deleting]);

  const visibleText = prefersReducedMotion
    ? ROLE_TEXTS[0]
    : ROLE_TEXTS[roleIndex].slice(0, charCount);

  return (
    <div>
      {/* Contenido completo para lectores de pantalla. */}
      <ul className="sr-only">
        {ROLE_TEXTS.map((role) => (
          <li key={role}>{role}</li>
        ))}
      </ul>
      <p
        aria-hidden="true"
        className="min-h-[66px] text-lg font-medium leading-relaxed text-ink sm:min-h-[42px] sm:text-2xl"
      >
        <span className="text-ink">{visibleText}</span>
        <span
          aria-hidden="true"
          className="ml-1 inline-block h-[1.05em] w-[3px] translate-y-[0.18em] rounded-full bg-accent motion-safe:animate-pulse-glow"
        />
      </p>
    </div>
  );
}
