import type { ContactItem, EducationEntry, Language, Profile } from '../../types';
import {
  contacts as esContacts,
  education as esEducation,
  languages as esLanguages,
  profile as esProfile,
  siteMetadata as esSiteMetadata,
} from '../profile';

/** PDF del CV: mismo recurso público que en ES (reexportado). */
export { CV_URL } from '../profile';

/**
 * Profile EN: patrón de la guía — se importa el módulo ES (fuente de verdad)
 * y se sobrescriben SOLO los campos de texto. Ids, URLs, cifras, teléfono,
 * correo y la foto permanecen idénticos. La dirección física NO se publica.
 */
export const profile: Profile = {
  ...esProfile,
  headline: 'Systems Engineering student | Python, Java, Kotlin, SQL and NoSQL',
  summary:
    'Systems Engineering student (Universidad Autónoma de Bucaramanga, 2023–present) with work in Python, Java and Kotlin and experience building and developing SQL and NoSQL databases and Oracle APEX. Responsible and organized, curious, with a constant desire to learn; I look for the most optimal way to solve every problem.',
};

/** Metadatos del sitio EN (sólo texto y locale; `themeColor` igual al ES). */
export const siteMetadata = {
  ...esSiteMetadata,
  title: 'Portfolio · Andrés Felipe Joya Buitrago',
  description:
    'Portfolio of Andrés Felipe Joya Buitrago, Systems Engineering student with work in Python, Java and Kotlin and experience with SQL and NoSQL databases. Projects, skills and certifications.',
  locale: 'en_US',
};

/** Etiquetas EN de los canales de contacto (valores e `href` idénticos). */
const contactLabels: Record<ContactItem['id'], string> = {
  email: 'Email',
  phone: 'Phone',
  github: 'GitHub',
  linkedin: 'LinkedIn',
};

export const contacts: ContactItem[] = esContacts.map((contact) => ({
  ...contact,
  label: contactLabels[contact.id],
}));

/** Texto EN de los idiomas, indexado por el nombre ES (segmentos iguales). */
const languageText: Record<string, Partial<Language>> = {
  Español: { name: 'Spanish', level: 'native', description: 'Native language' },
  Inglés: { name: 'English', level: 'C1', description: 'C1 level' },
  Portugués: { name: 'Portuguese', level: 'basic', description: 'Basic level' },
};

export const languages: Language[] = esLanguages.map((language) => ({
  ...language,
  ...languageText[language.name],
}));

/** Texto EN de la línea de tiempo, indexado por el título ES. */
const educationText: Record<string, Partial<EducationEntry>> = {
  'Ingeniería de Sistemas': {
    period: '2023 – present',
    title: 'Systems Engineering',
  },
  'Voluntario de logística': {
    period: 'August 2025',
    title: 'Logistics volunteer',
    description:
      'Supported the logistics and organization of events and managed the “Amigos del Agua” section.',
  },
  Bachillerato: { title: 'High school' },
  Primaria: { title: 'Primary school' },
};

export const education: EducationEntry[] = esEducation.map((entry) => ({
  ...entry,
  ...educationText[entry.title],
}));
