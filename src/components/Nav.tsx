import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { NAV_LINKS, NAV_SECTION_IDS } from '../data/navigation';
import { useActiveSection } from '../hooks/useActiveSection';
import { Button } from './ui/Button';
import { MobileMenu } from './nav/MobileMenu';
import { ScrollProgress } from './nav/ScrollProgress';

/** Umbral (px) a partir del cual la barra "se solidifica" (vidrio + borde). */
const SOLIDIFY_AFTER = 24;

/**
 * Nav sticky superior V2: transparente al inicio, se solidifica con vidrio
 * (`bg-bg/70 backdrop-blur`) al hacer scroll. Wordmark "AJ" (font-display),
 * links de `src/data/navigation.ts` con scroll-spy (`useActiveSection`) y
 * píldora indicadora animada (`layoutId`, estática con reduced-motion),
 * CTA "Contacto", barra de progreso de scroll de 3px en accent y menú
 * móvil accesible (aria-expanded/aria-controls, focus trap, Esc, bloqueo
 * de scroll, cierre al navegar).
 */
export function Nav() {
  const activeSection = useActiveSection(NAV_SECTION_IDS);
  const prefersReducedMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const wasOpen = useRef(false);

  // Solidificación al hacer scroll (rAF, setState con valor repetido es barato).
  useEffect(() => {
    let raf = 0;
    let scheduled = false;
    const update = () => {
      scheduled = false;
      setScrolled(window.scrollY > SOLIDIFY_AFTER);
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

  // Al cerrar el menú, el foco vuelve al botón hamburguesa (quien lo abrió).
  useEffect(() => {
    if (wasOpen.current && !menuOpen) menuButtonRef.current?.focus();
    wasOpen.current = menuOpen;
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40">
      <div
        className={`border-b transition-colors duration-300 ${
          scrolled ? 'border-teal/40 bg-bg/70 backdrop-blur-md' : 'border-transparent bg-transparent'
        }`}
      >
        <nav
          aria-label="Navegación principal"
          className="mx-auto flex h-16 w-full max-w-container items-center justify-between gap-4 px-5 sm:px-8"
        >
          {/* Wordmark: iniciales del nombre (font-display, enlaza a Inicio). */}
          <a href="#inicio" className="font-display text-2xl leading-none text-ink" aria-label="Inicio">
            AJ
          </a>

          {/* Links desktop con scroll-spy + píldora animada (layoutId). */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative inline-flex min-h-[44px] items-center rounded-full px-3.5 text-sm font-medium transition-colors duration-200 ${
                      isActive ? 'text-ink' : 'text-ink-muted hover:text-ink'
                    }`}
                  >
                    {isActive ? (
                      prefersReducedMotion ? (
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 rounded-full bg-panel ring-1 ring-teal/60"
                        />
                      ) : (
                        <motion.span
                          layoutId="nav-active-pill"
                          aria-hidden="true"
                          className="absolute inset-0 rounded-full bg-panel ring-1 ring-teal/60"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      )
                    ) : null}
                    <span className="relative">{link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="hidden lg:block">
            <Button href="#contacto" variant="primary" className="px-5">
              Contacto
            </Button>
          </div>

          {/* Hamburguesa accesible (44px): abre/cierra el panel móvil. */}
          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-ink lg:hidden"
          >
            <span aria-hidden="true" className="relative block h-4 w-6">
              <span
                className={`absolute left-0 top-0 h-0.5 w-6 bg-current transition-transform duration-300 ${
                  menuOpen ? 'translate-y-[7px] rotate-45' : ''
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] h-0.5 w-6 bg-current transition-opacity duration-200 ${
                  menuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`absolute left-0 top-[14px] h-0.5 w-6 bg-current transition-transform duration-300 ${
                  menuOpen ? '-translate-y-[7px] -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </nav>

        <ScrollProgress />
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
