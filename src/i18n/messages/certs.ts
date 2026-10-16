/**
 * Mensajes de UI del área "certs" (sección Certificaciones). Claves SIN
 * prefijo (el prefijo "certs." se añade en `messages/index.ts`). `en` debe
 * tener EXACTAMENTE las mismas claves que `es` (lo exige el tipo).
 */
export const es = {
  eyebrow: 'Credenciales',
  title: 'certificaciones',
  subtitle: 'Seis insignias obtenidas en 2025 en cloud, datos, IA y redes.',
  all: 'Todas',
  filterAria: 'Filtrar certificaciones por emisor',
} as const;

export const en: Record<keyof typeof es, string> = {
  eyebrow: 'Credentials',
  title: 'certifications',
  subtitle: 'Six badges earned in 2025 in cloud, data, AI and networking.',
  all: 'All',
  filterAria: 'Filter certifications by issuer',
};

