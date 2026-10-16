import type { ContactItem, EducationEntry, Language, Profile } from '../types';
import photo from '../assets/foto-perfil.jpg';

export const profile: Profile = {
  name: 'Andrés Felipe Joya Buitrago',
  headline: 'Estudiante de Ingeniería de Sistemas | Python, Java, Kotlin, SQL y NoSQL',
  summary:
    'Estudiante de Ingeniería de Sistemas (Universidad Autónoma de Bucaramanga, 2023–actualidad) con trabajos en Python, Java y Kotlin y experiencia en construcción y desarrollo de bases de datos SQL y NoSQL y en Oracle APEX. Responsable y ordenado, con curiosidad y deseo constante de aprender; busco resolver cada problema de la manera más óptima posible.',
  email: 'joya.andres23@gmail.com',
  phone: '+57 315 394 9836',
  githubUrl: 'https://github.com/Sandrez12',
  linkedinUrl: 'https://www.linkedin.com/in/andres-joya-69a552357',
  // Para cambiar la foto: reemplaza `src/assets/foto-perfil.jpg`.
  photo,
};

/**
 * URL del PDF del CV. El PDF actual incluye la dirección física, que NO se
 * publica (ver `_spec/V2_BRIEF.md`): con cadena vacía, el botón
 * "Descargar CV" NO debe renderizarse. Al existir una versión sin dirección,
 * apuntar aquí el archivo público correspondiente.
 */
export const CV_URL = '';

/** Metadatos del sitio (coinciden con index.html; no inventar datos). */
export const siteMetadata = {
  title: 'Portafolio · Andrés Felipe Joya Buitrago',
  description:
    'Portafolio de Andrés Felipe Joya Buitrago, estudiante de Ingeniería de Sistemas con trabajos en Python, Java y Kotlin y experiencia en bases de datos SQL y NoSQL. Proyectos, habilidades y certificaciones.',
  locale: 'es_CO',
  themeColor: '#0C2424',
};

/** Canales de contacto (la dirección física NO se publica). */
export const contacts: ContactItem[] = [
  {
    id: 'email',
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    id: 'phone',
    label: 'Teléfono',
    value: profile.phone,
    href: `tel:${profile.phone.replace(/ /g, '')}`,
  },
  {
    id: 'github',
    label: 'GitHub',
    value: 'Sandrez12',
    href: profile.githubUrl,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: 'andres-joya',
    href: profile.linkedinUrl,
  },
];

/** Idiomas: barra segmentada de 8 segmentos, relleno blanco y resto accent. */
export const languages: Language[] = [
  {
    name: 'Español',
    level: 'nativo',
    description: 'Idioma nativo',
    filledSegments: 8,
    totalSegments: 8,
  },
  {
    name: 'Inglés',
    level: 'C1',
    description: 'Nivel C1',
    filledSegments: 7,
    totalSegments: 8,
  },
  {
    name: 'Portugués',
    level: 'básico',
    description: 'Nivel básico',
    filledSegments: 2,
    totalSegments: 8,
  },
];

/** Línea de tiempo de educación/experiencia (orden del CV). */
export const education: EducationEntry[] = [
  {
    period: '2023 – actualidad',
    title: 'Ingeniería de Sistemas',
    institution: 'Universidad Autónoma de Bucaramanga',
  },
  {
    period: 'Agosto 2025',
    title: 'Voluntario de logística',
    institution: 'Ulibro (voluntariado en eventos universitarios)',
    description:
      'Apoyó la logística y organización de eventos y gestionó la sección «Amigos del Agua».',
  },
  {
    period: '2020 – 2022',
    title: 'Bachillerato',
    institution: 'Liceo San Fernando',
  },
  {
    period: '2014 – 2019',
    title: 'Primaria',
    institution: 'Colegio Niño Jesús de Praga',
  },
];
