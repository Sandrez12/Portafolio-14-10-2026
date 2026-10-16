import { useEffect, useRef, useState } from 'react';
import { profile } from '../../data/profile';
import { Button } from '../ui/Button';

/** Tiempo (ms) que se muestra el feedback antes de volver al estado normal. */
const FEEDBACK_MS = 2400;

type CopyStatus = 'idle' | 'copied' | 'selected';

/** Mensajes para la región aria-live del resultado de la copia. */
const STATUS_MESSAGES: Record<CopyStatus, string> = {
  idle: '',
  copied: 'Correo copiado',
  selected:
    'No se pudo copiar automáticamente: correo seleccionado, usa Ctrl+C para copiarlo',
};

function CopyGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="9" y="9" width="12" height="12" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

/**
 * Correo gigante como enlace mailto + botón "Copiar correo" con
 * `navigator.clipboard` y fallback a la selección del texto del correo.
 * Feedback visual en el propio botón (icono + texto) y región `aria-live`
 * con el resultado ("Correo copiado").
 */
export function EmailCta() {
  const emailRef = useRef<HTMLAnchorElement>(null);
  const [status, setStatus] = useState<CopyStatus>('idle');
  const timerRef = useRef<number | undefined>(undefined);

  // Limpia el temporizador del feedback al desmontar.
  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const showStatus = (next: CopyStatus) => {
    window.clearTimeout(timerRef.current);
    setStatus(next);
    timerRef.current = window.setTimeout(() => setStatus('idle'), FEEDBACK_MS);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      showStatus('copied');
    } catch {
      // Fallback: seleccionar el correo para que se copie manualmente.
      const node = emailRef.current;
      const selection = window.getSelection();
      if (node && selection) {
        const range = document.createRange();
        range.selectNodeContents(node);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      showStatus('selected');
    }
  };

  return (
    <div>
      <a
        ref={emailRef}
        href={`mailto:${profile.email}`}
        className="break-all font-hand text-ink underline decoration-teal decoration-2 underline-offset-[10px] transition-colors hover:decoration-accent"
        style={{ fontSize: 'clamp(1.75rem, 6.5vw, 3.5rem)' }}
      >
        {profile.email}
      </a>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Button onClick={handleCopy} variant="ghost" aria-label="Copiar correo electrónico">
          {status === 'copied' ? <CheckGlyph /> : <CopyGlyph />}
          {status === 'copied' ? '¡Copiado!' : 'Copiar correo'}
        </Button>
        <p role="status" aria-live="polite" className="sr-only">
          {STATUS_MESSAGES[status]}
        </p>
      </div>
    </div>
  );
}