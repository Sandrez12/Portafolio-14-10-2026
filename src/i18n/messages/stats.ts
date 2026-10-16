/**
 * Mensajes de UI del área "stats". Claves SIN prefijo (el prefijo "stats." se
 * añade en `messages/index.ts`). `en` debe tener EXACTAMENTE las mismas
 * claves que `es` (lo exige el tipo).
 *
 * Las claves de etiqueta/frase de contexto van por id de cifra (ver
 * `src/components/stats/stats.ts`); los literales ES son EXACTAMENTE los
 * actuales de ese archivo.
 */
export const es = {
  eyebrow: 'Resumen',
  title: 'en cifras',
  subtitle: 'Datos verificables de proyectos, certificaciones e idiomas, y del traductor de Lengua de Señas Colombiana.',
  labelProyectos: 'proyectos',
  contextProyectos: 'personales y en equipo, con código publicado en GitHub.',
  labelCertificaciones: 'certificaciones',
  contextCertificaciones: 'obtenidas en 2025 con AWS, MongoDB y Cisco.',
  labelIdiomas: 'idiomas',
  contextIdiomas: 'español (nativo), inglés (C1) y portugués (básico).',
  labelGlosasLsc: 'glosas de LSC',
  contextGlosasLsc: 'que reconoce el traductor de Lengua de Señas Colombiana.',
  labelAccuracyLsc: 'accuracy de test',
  contextAccuracyLsc: 'del modelo LSTM bidireccional del traductor LSC.',
  labelVideosLsc: 'videos de LSC',
  contextVideosLsc: 'del dataset de señas con el que se entrenó y evaluó el traductor.',
} as const;

export const en: Record<keyof typeof es, string> = {
  eyebrow: 'Overview',
  title: 'in numbers',
  subtitle:
    'Verifiable data from projects, certifications and languages, and from the Colombian Sign Language translator.',
  labelProyectos: 'projects',
  contextProyectos: 'personal and team, with code published on GitHub.',
  labelCertificaciones: 'certifications',
  contextCertificaciones: 'earned in 2025 with AWS, MongoDB and Cisco.',
  labelIdiomas: 'languages',
  contextIdiomas: 'Spanish (native), English (C1) and Portuguese (basic).',
  labelGlosasLsc: 'LSC glosses',
  contextGlosasLsc: 'recognized by the Colombian Sign Language translator.',
  labelAccuracyLsc: 'test accuracy',
  contextAccuracyLsc: 'of the bidirectional LSTM model of the LSC translator.',
  labelVideosLsc: 'LSC videos',
  contextVideosLsc: 'of the sign dataset used to train and evaluate the translator.',
};

