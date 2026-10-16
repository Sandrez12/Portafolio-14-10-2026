import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useT } from '../i18n';
import { EASE } from './ui/motion';

/** Aparece tras este umbral de scroll (px). */
const SHOW_AFTER = 600;

/**
 * Botón flotante "Volver arriba": aparece tras 600px de scroll (rAF) con una
 * entrada sutil (fade + subida) que se omite con reduced-motion. El scroll
 * al tope usa `behavior: smooth` sólo sin reduced-motion.
 */
export function BackToTop() {
  const t = useT();
  const [visible, setVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    let raf = 0;
    let scheduled = false;
    const update = () => {
      scheduled = false;
      setVisible(window.scrollY > SHOW_AFTER);
    };
    const schedule = () => {
      if (!scheduled) {
        scheduled = true;
        raf = requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', schedule);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          aria-label={t('nav.backToTop')}
          onClick={() => window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' })}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="fixed bottom-6 right-6 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full bg-accent text-ink transition-colors duration-200 hover:bg-accent-mid"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            aria-hidden="true"
            focusable="false"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 19V5" />
            <path d="M5 12l7-7 7 7" />
          </svg>
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
