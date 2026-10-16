import { useEffect, useRef, type RefObject } from 'react';

/**
 * Selectores de elementos enfocables por teclado dentro del diálogo
 * (orden de aparición en el DOM = orden del ciclo de Tab).
 */
const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

interface UseDialogA11yOptions {
  /** `true` mientras el diálogo está montado (p. ej. `project !== null`). */
  open: boolean;
  onClose: () => void;
  /** Ref del elemento con `role="dialog"` (límite del focus trap). */
  dialogRef: RefObject<HTMLElement | null>;
  /** Elemento que recibe el foco al abrir (p. ej. el botón Cerrar). */
  initialFocusRef?: RefObject<HTMLElement | null>;
}

/** Elementos enfocables y visibles del contenedor, en orden de Tab. */
function getFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (element) => element.offsetParent !== null || element === document.activeElement,
  );
}

/**
 * Accesibilidad del modal de proyecto (`ProjectModal`): guarda el foco del
 * elemento que lo abrió y lo devuelve al cerrar; foco inicial dentro del
 * panel; focus trap (Tab/Shift+Tab ciclan dentro del diálogo); cierre con
 * Esc; y bloqueo del scroll del `body` (con compensación del ancho de la
 * scrollbar) mientras está abierto, restaurando su estado original al salir.
 */
export function useDialogA11y({ open, onClose, dialogRef, initialFocusRef }: UseDialogA11yOptions): void {
  // `onClose` puede ser una función nueva en cada render del padre; se guarda
  // en una ref para que el efecto de abrir/cerrar no se reinicie mientras el
  // diálogo está abierto (volvería a capturar el foco del botón Cerrar).
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return undefined;

    // 1) Foco del elemento que abrió el diálogo (el disparador de la tarjeta).
    const previousActive =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    // 2) Bloqueo del scroll del body, compensando la scrollbar para que no
    //    haya salto de layout en desktop.
    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // 3) Foco inicial dentro del panel (tras el montaje del contenido, que
    //    entra por AnimatePresence; un frame basta y no molesta a la animación).
    const focusTimer = window.setTimeout(() => {
      const target = initialFocusRef?.current;
      if (target && dialogRef.current?.contains(target)) {
        target.focus();
      } else if (dialogRef.current) {
        getFocusable(dialogRef.current)[0]?.focus();
      }
    }, 0);

    // 4) Teclado global: Esc cierra; Tab/Shift+Tab ciclan dentro del panel.
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== 'Tab') return;
      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusables = getFocusable(dialog);
      if (focusables.length === 0) {
        event.preventDefault();
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      const outside = !(active instanceof HTMLElement) || !dialog.contains(active);
      if (event.shiftKey) {
        if (active === first || active === dialog || outside) {
          event.preventDefault();
          last.focus();
        }
      } else if (active === last || active === dialog || outside) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown, true);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', handleKeyDown, true);
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      // Devuelve el foco al disparador (si sigue conectado al DOM).
      if (previousActive && previousActive.isConnected) {
        previousActive.focus();
      }
    };
  }, [open, dialogRef, initialFocusRef]);
}
