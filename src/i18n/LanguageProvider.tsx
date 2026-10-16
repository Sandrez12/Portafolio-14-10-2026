import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { CONTENT } from '../data/content';
import { LanguageContext } from './context';
import { DEFAULT_LANG, LANGS, type Lang } from './types';

const STORAGE_KEY = 'portfolio-lang';

function isLang(value: string | null): value is Lang {
  return value !== null && (LANGS as readonly string[]).includes(value);
}

/** Idioma inicial: el guardado por el visitante; si no, el del navegador (en/es). */
function getInitialLang(): Lang {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (isLang(saved)) return saved;
  } catch {
    /* localStorage no disponible: se ignora. */
  }
  const browser = typeof navigator !== 'undefined' ? navigator.language.toLowerCase() : '';
  return browser.startsWith('en') ? 'en' : DEFAULT_LANG;
}

/**
 * Proveedor del idioma: persiste la elección, actualiza `<html lang>`,
 * `<title>` y la meta description al cambiar de idioma.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* se ignora */
    }
  }, []);

  useEffect(() => {
    const { siteMetadata } = CONTENT[lang];
    document.documentElement.lang = lang;
    document.title = siteMetadata.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', siteMetadata.description);
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang }), [lang, setLang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
