import { useLanguage } from '../../i18n';
import type { Lang } from '../../i18n';

const OPTIONS: ReadonlyArray<{ lang: Lang; label: string; aria: string }> = [
  { lang: 'es', label: 'ES', aria: 'Español' },
  { lang: 'en', label: 'EN', aria: 'English' },
];

/** Selector ES | EN accesible (grupo de botones con `aria-pressed`, ≥40px). */
export function LanguageToggle({ className = '' }: { className?: string }) {
  const { lang, setLang } = useLanguage();
  return (
    <div
      role="group"
      aria-label="Idioma / Language"
      className={`inline-flex items-center rounded-full border border-teal p-0.5 ${className}`}
    >
      {OPTIONS.map((option) => {
        const active = option.lang === lang;
        return (
          <button
            key={option.lang}
            type="button"
            lang={option.lang}
            aria-pressed={active}
            aria-label={option.aria}
            onClick={() => setLang(option.lang)}
            className={`min-h-[40px] min-w-[44px] rounded-full px-3 text-xs font-semibold tracking-wide transition-colors ${
              active ? 'bg-accent text-ink' : 'text-ink-muted hover:text-ink'
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
