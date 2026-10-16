import { useCallback, useContext } from 'react';
import { CONTENT, type Content } from '../data/content';
import { LanguageContext, type LanguageContextValue } from './context';
import { enMessages, esMessages, type MessageKey } from './messages';

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage debe usarse dentro de <LanguageProvider>');
  return ctx;
}

/** Contenido (perfil, proyectos, skills, certificaciones...) del idioma activo. */
export function useContent(): Content {
  return CONTENT[useLanguage().lang];
}

export type TranslateFn = (key: MessageKey, vars?: Record<string, string | number>) => string;

/** Traductor de textos de UI: `t('hero.cta')`, con variables `{nombre}`. */
export function useT(): TranslateFn {
  const { lang } = useLanguage();
  return useCallback(
    (key, vars) => {
      const table: Record<string, string> = lang === 'en' ? enMessages : esMessages;
      const template = table[key] ?? (esMessages as Record<string, string>)[key] ?? key;
      if (!vars) return template;
      return template.replace(/\{(\w+)\}/g, (_, name: string) => String(vars[name] ?? `{${name}}`));
    },
    [lang],
  );
}
