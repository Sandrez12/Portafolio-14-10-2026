import { motion, useReducedMotion } from 'framer-motion';
import { useT } from '../../i18n';

/**
 * Indicador de scroll del hero: enlace accesible a la sección "¿quién soy?"
 * con una "rueda" cuyo punto baja en bucle (sólo transform/opacity). Con
 * `prefers-reduced-motion` el punto queda estático.
 */
export function ScrollIndicator() {
  const t = useT();
  const prefersReducedMotion = useReducedMotion() ?? false;

  return (
    <a
      href="#sobre-mi"
      aria-label={t('hero.scrollDown')}
      className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-ink-muted transition-colors duration-200 hover:text-ink sm:bottom-6"
    >
      <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">{t('hero.scrollLabel')}</span>
      <span className="flex h-10 w-6 justify-center rounded-full p-1.5 ring-1 ring-inset ring-teal">
        <motion.span
          className="block h-2 w-1 rounded-full bg-accent"
          animate={prefersReducedMotion ? undefined : { y: [0, 14, 0], opacity: [1, 0.4, 1] }}
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }
          }
        />
      </span>
    </a>
  );
}
