import { useEffect, useRef, useState } from 'react';
import type {
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent as ReactPointerEvent,
} from 'react';
import { useT } from '../../i18n';
import { getTileIcon } from './tile-icons';
import type { SkillEvidence } from './types';

/**
 * Taza de café simplificada (blanco monocromo): Java fue retirada de
 * `simple-icons` por políticas de marca, así que se dibuja un icono propio
 * con trazo y el mismo tamaño (h-10 w-10) que los paths de `simple-icons`.
 */
function JavaCupIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-10 w-10 text-ink"
    >
      {/* Cuerpo de la taza con base redondeada */}
      <path d="M5.5 9.5h9v4.5a4.5 4.5 0 0 1-4.5 4.5 4.5 4.5 0 0 1-4.5-4.5V9.5z" />
      {/* Asa */}
      <path d="M14.5 10.5h1.75a2.75 2.75 0 0 1 0 5.5H13.4" />
      {/* Vapor */}
      <path d="M8.2 3.5c-.7 1 .7 1.8 0 2.8" />
      <path d="M11.8 3.5c-.7 1 .7 1.8 0 2.8" />
    </svg>
  );
}

/** Icono (blanco) del tile según la tecnología. */
function TileGlyph({ name }: { name: string }) {
  const icon = getTileIcon(name);

  if (icon.kind === 'path') {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
        className="h-10 w-10 fill-ink"
      >
        <path d={icon.path} />
      </svg>
    );
  }
  if (icon.kind === 'cup') {
    return <JavaCupIcon />;
  }
  return (
    <span aria-hidden="true" className="font-sans text-3xl font-bold leading-none text-ink">
      {icon.monogram}
    </span>
  );
}

/**
 * Alineación del tooltip según la columna del tile en cada breakpoint de la
 * banda (3 columnas <sm, 4 en sm–lg, 6 en ≥lg): en la primera/última columna
 * el tooltip se alinea hacia dentro para no salirse de la ventana (el body
 * recorta en X y nunca debe generarse scroll horizontal).
 */
function tooltipAlign(index: number): string {
  const classes: string[] = [];
  if (index % 3 === 0) classes.push('max-sm:justify-start');
  if (index % 3 === 2) classes.push('max-sm:justify-end');
  if (index % 4 === 0) classes.push('sm:max-lg:justify-start');
  if (index % 4 === 3) classes.push('sm:max-lg:justify-end');
  if (index % 6 === 0) classes.push('lg:justify-start');
  if (index % 6 === 5) classes.push('lg:justify-end');
  return classes.join(' ');
}

interface SkillTileProps {
  /** Nombre de la tecnología; es la etiqueta visible bajo el tile. */
  name: string;
  /** Evidencia verificable ("Respaldado por: …"); vacío ⇒ tile sin tooltip. */
  evidence: SkillEvidence;
  /** Posición 0-based dentro de la banda: alinea el tooltip en los bordes. */
  index: number;
}

/**
 * Tile rojo de la banda de skills (96x96, radio 16, icono blanco) con la
 * etiqueta centrada debajo (reserva dos líneas para "Android Studio").
 *
 * El tile es un `<button>` accesible que muestra un tooltip "Respaldado por:"
 * con evidencia VERIFICABLE (proyectos, certificaciones o el CV — nunca
 * porcentajes de dominio):
 * - Ratón: se abre al pasar por encima y se cierra al salir.
 * - Teclado: se abre al recibir foco y se cierra al perderlo o con Esc.
 * - Táctil: un toque lo abre y otro toque (o Esc / un toque fuera) lo cierra.
 *
 * El tooltip se anima SOLO con opacity/transform (el bloque global de
 * reduced-motion de index.css anula la transición) y su contenido vive
 * siempre en el DOM, asociado con `aria-describedby` para lectores de
 * pantalla.
 */
export function SkillTile({ name, evidence, index }: SkillTileProps) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const tileRef = useRef<HTMLButtonElement | null>(null);
  /** Marca de tiempo del último evento de puntero: distingue foco de teclado del foco tras un toque/clic. */
  const lastPointerAt = useRef(0);
  /** Tipo del último puntero: con ratón el hover ya mantiene el tooltip y el clic no debe alternarlo. */
  const lastPointerType = useRef<'mouse' | 'touch' | 'pen' | null>(null);

  // Táctil: cerrar el tooltip abierto con un toque en cualquier otra parte.
  useEffect(() => {
    if (!open) return;
    const closeOnOutsidePointerDown = (event: PointerEvent) => {
      if (
        tileRef.current !== null &&
        event.target instanceof Node &&
        !tileRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('pointerdown', closeOnOutsidePointerDown);
    return () => document.removeEventListener('pointerdown', closeOnOutsidePointerDown);
  }, [open]);

  const handlePointerEnter = (event: ReactPointerEvent<HTMLButtonElement>) => {
    lastPointerAt.current = performance.now();
    lastPointerType.current = event.pointerType;
    if (event.pointerType === 'mouse') {
      setOpen(true);
    }
  };

  const handlePointerLeave = (event: ReactPointerEvent<HTMLButtonElement>) => {
    // En táctil el pointerleave del dedo no cierra el tooltip abierto con toque.
    if (event.pointerType === 'mouse') {
      setOpen(false);
    }
  };

  const handleFocus = () => {
    // Foco poco después de un evento de puntero = foco por toque/clic (lo
    // maneja el clic); sin puntero reciente es navegación por teclado.
    if (performance.now() - lastPointerAt.current > 150) {
      setOpen(true);
    }
  };

  const handleClick = () => {
    // Con ratón el hover ya controla el tooltip (alternarlo con el clic lo
    // escondería sin intención); en táctil/lápiz el toque alterna.
    if (lastPointerType.current === 'mouse') return;
    setOpen((previous) => !previous);
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Escape') {
      setOpen(false);
    }
  };

  const tile = (
    <>
      <span className="flex h-24 w-24 items-center justify-center rounded-[16px] bg-accent transition-transform duration-200 ease-out group-hover:-translate-y-1 group-focus-visible:-translate-y-1">
        <TileGlyph name={name} />
      </span>
      <span className="min-h-10 px-1 text-center text-[15px] font-medium leading-tight text-ink">
        {name}
      </span>
    </>
  );

  // Defensivo: una tecnología sin evidencia registrada se muestra como tile
  // estático (un botón sin tooltip no aportaría nada).
  if (evidence.length === 0) {
    return <span className="flex flex-col items-center gap-2">{tile}</span>;
  }

  const tooltipId = `skill-evidence-${index}`;

  return (
    <button
      ref={tileRef}
      type="button"
      aria-expanded={open}
      aria-describedby={tooltipId}
      className="group relative flex cursor-pointer flex-col items-center gap-2"
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onFocus={handleFocus}
      onBlur={() => setOpen(false)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {tile}
      {/*
        Tooltip visual anclado ARRIBA del tile. El envoltorio absoluto ocupa
        el ancho del botón y centra el tooltip (justify-center); en los bordes
        de cada breakpoint se alinea hacia dentro (tooltipAlign). Nunca
        captura el puntero y sólo se muestra con el estado `open`, que
        gestionan hover-de-ratón / foco-de-teclado / toque.
      */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute bottom-full left-0 right-0 z-20 mb-3 flex justify-center ${tooltipAlign(index)}`}
      >
        <span
          className={`block w-max max-w-[13rem] rounded-xl border border-teal/50 bg-accent-dark px-3.5 py-2.5 text-left shadow-lg shadow-black/40 transition-[opacity,transform] duration-200 ease-out ${
            open ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
          }`}
        >
          <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
            {t('skills.backedBy')}
          </span>
          <span className="mt-1 block text-[13px] font-medium leading-snug text-ink">
            {evidence.join(' · ')}
          </span>
        </span>
      </span>
      {/* Contenido del tooltip para lectores de pantalla (aria-describedby):
          versión sr-only porque el visual se oculta por opacidad. */}
      <span id={tooltipId} role="tooltip" className="sr-only">
        {t('skills.backedBySr', { evidence: evidence.join(', ') })}
      </span>
    </button>
  );
}
