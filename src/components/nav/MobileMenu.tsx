import { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useContent, useT } from '../../i18n';
import { Button } from '../ui/Button';
import { LanguageToggle } from '../ui/LanguageToggle';
import { EASE } from '../ui/motion';

interface MobileMenuProps {
  /** Panel visible. */
  open: boolean;
  /** Cierra el panel (lo llama Esc, Tab-wrap fuera de foco nunca, links y CTA). */
  onClose: () => void;
}

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled])';

/**
 * Menú móvil a pantalla completa: dialog modal con focus trap (Tab envuelto),
 * cierre con Escape, cierre al navegar y bloqueo del scroll del body
 * (compensando el ancho de la barra de scroll para evitar salto de layout).
 * Reduced motion: aparece/desaparece sin animación.
 */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { navLinks } = useContent();
  const t = useT();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    // Foco inicial dentro del panel (inicio del trap).
    panel.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;
      // Focus trap: el Tab nunca sale del panel.
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    panel.addEventListener('keydown', onKeyDown);

    // Bloqueo del scroll del body con compensación de scrollbar.
    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      panel.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={t('nav.menuDialog')}
          className="fixed inset-0 z-50 flex flex-col bg-bg/95 px-5 pb-8 pt-6 backdrop-blur-md sm:px-8"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.25, ease: EASE }}
        >
          <nav aria-label={t('nav.navAria')} className="flex flex-1 flex-col justify-center">
            <ul>
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={onClose}
                    className="flex min-h-[44px] items-center border-b border-teal/30 px-2 py-3 font-hand text-3xl leading-none text-ink transition-colors duration-200 hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          {/* Selector de idioma ES | EN dentro del panel (sus botones entran
              en el focus trap al igual que links y CTA). */}
          <div className="mb-5 flex justify-center">
            <LanguageToggle />
          </div>
          <Button href="#contacto" variant="primary" className="w-full" onClick={onClose}>
            {t('nav.cta')}
          </Button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
