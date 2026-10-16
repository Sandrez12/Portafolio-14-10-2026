import { createContext } from 'react';
import type { Lang } from './types';

export interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);
