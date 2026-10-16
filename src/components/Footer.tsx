import { useReducedMotion } from 'framer-motion';
import { useContent, useT } from '../i18n';
import { EmailIcon, GithubIcon, LinkedinIcon } from './info/icons';
import { Reveal } from './ui/Reveal';

const SOCIAL_LINK_CLASSES =
  'inline-flex h-11 w-11 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-accent hover:text-ink';

const NAV_LINK_CLASSES =
  'inline-flex min-h-[44px] items-center rounded-md px-3 text-sm font-medium text-ink-muted transition-colors hover:bg-bg hover:text-ink';

/**
 * Footer V2: wordmark grande del nombre en font-display, mini navegación
 * (`NAV_LINKS`), redes (Email, GitHub, LinkedIn), créditos técnicos, año
 * dinámico y botón "Volver arriba" accesible (smooth sólo sin
 * reduced-motion). Panel #102E2E sin sombras (tokens de la referencia).
 */
export function Footer() {
  const t = useT();
  const { navLinks, profile } = useContent();
  const year = new Date().getFullYear();
  const prefersReducedMotion = useReducedMotion();

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <footer
      aria-labelledby="footer-title"
      className="mt-16 rounded-2xl bg-panel px-6 py-10 sm:mt-20 sm:px-10 lg:px-14 lg:py-14"
    >
      <h2 id="footer-title" className="sr-only">
        {t('footer.heading')}
      </h2>

      <Reveal>
        <p
          className="break-words font-display leading-none text-ink"
          style={{ fontSize: 'clamp(2.25rem, 7vw, 4.5rem)' }}
        >
          {profile.name}
        </p>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-muted">{profile.headline}</p>
      </Reveal>

      <nav aria-label={t('footer.navAriaLabel')} className="mt-8">
        <ul className="flex flex-wrap gap-x-1 gap-y-1">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a href={`#${link.id}`} className={NAV_LINK_CLASSES}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-8 flex flex-col gap-6 border-t border-teal pt-8 sm:flex-row sm:items-center sm:justify-between">
        <ul className="flex gap-3">
          <li>
            <a
              href={`mailto:${profile.email}`}
              aria-label={t('footer.emailAriaLabel')}
              rel="noreferrer"
              className={SOCIAL_LINK_CLASSES}
            >
              <EmailIcon className="h-5 w-5" />
            </a>
          </li>
          <li>
            <a
              href={profile.githubUrl}
              aria-label={t('footer.githubAriaLabel')}
              target="_blank"
              rel="noreferrer noopener"
              className={SOCIAL_LINK_CLASSES}
            >
              <GithubIcon className="h-5 w-5" />
            </a>
          </li>
          <li>
            <a
              href={profile.linkedinUrl}
              aria-label={t('footer.linkedinAriaLabel')}
              target="_blank"
              rel="noreferrer noopener"
              className={SOCIAL_LINK_CLASSES}
            >
              <LinkedinIcon className="h-5 w-5" />
            </a>
          </li>
        </ul>

        <button
          type="button"
          onClick={handleBackToTop}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-ink-muted ring-1 ring-inset ring-teal transition-colors hover:text-ink hover:ring-accent"
        >
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
            <path d="M12 19V5" />
            <path d="M5 12l7-7 7 7" />
          </svg>
          {t('footer.backToTop')}
        </button>
      </div>

      <p className="mt-8 text-xs leading-relaxed text-ink-muted sm:text-sm">
        {t('footer.credits', { year, name: profile.name })}
      </p>
    </footer>
  );
}
