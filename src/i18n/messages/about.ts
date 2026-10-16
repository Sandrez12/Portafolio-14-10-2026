/**
 * Mensajes de UI del área "about" (incluye el título sr-only del Marquee,
 * cuya banda pertenece a esta área). Claves SIN prefijo (el prefijo
 * "about." se añade en `messages/index.ts`). `en` debe tener EXACTAMENTE
 * las mismas claves que `es` (lo exige el tipo).
 */
export const es = {
  eyebrow: 'Perfil',
  title: '¿quién soy?',
  subtitle:
    'Estudiante de Ingeniería de Sistemas, responsable y ordenado, con curiosidad y deseo constante de aprender.',
  softSkillsTitle: 'Habilidades blandas',
  whatIDoTitle: 'Qué hago',
  areaDbTitle: 'Bases de datos SQL y NoSQL',
  areaDbText:
    'Construcción y desarrollo de bases de datos con MySQL, MongoDB, Oracle y Oracle APEX, con certificación Introduction to MongoDB.',
  areaWebTitle: 'Desarrollo web',
  areaWebText:
    'Frontend y backend con HTML, CSS, JavaScript, PHP, Laravel, React y Flask; proyectos como el Gestor de Inventario y MoodJournal.',
  areaAiTitle: 'IA aplicada',
  areaAiText:
    'Traducción de señas de la LSC con una red LSTM bidireccional y clasificación de dibujos en Cognia; certificaciones AWS de Machine Learning para NLP y Generative AI Foundations.',
  areaIotTitle: 'IoT y nube',
  areaIotText:
    'AWS y Azure IoT Central; plataforma de telemetría con ingesta MQTT, gemelo digital, reglas y alertas.',
  factCareerLabel: 'Ingeniería de Sistemas',
  factCareerSub: 'UNAB · estudiante desde 2023',
  factLanguagesLabel: 'Idiomas',
  factLanguagesSub: 'Español nativo · Inglés C1 · Portugués básico',
  factCertsLabel: 'Certificaciones',
  factCertsSub: 'MongoDB, Cisco y AWS Academy (2025)',
  factProjectsLabel: 'Proyectos',
  factProjectsSub: 'IA, IoT, web y móvil',
  photoAlt: 'Retrato de {name}',
  marqueeTitle: 'Tecnologías',
} as const;

export const en: Record<keyof typeof es, string> = {
  eyebrow: 'Profile',
  title: 'who am I?',
  subtitle:
    'Systems Engineering student, responsible and organized, with curiosity and a constant desire to learn.',
  softSkillsTitle: 'Soft skills',
  whatIDoTitle: 'What I do',
  areaDbTitle: 'SQL and NoSQL databases',
  areaDbText:
    'Building and developing databases with MySQL, MongoDB, Oracle and Oracle APEX, with the Introduction to MongoDB certification.',
  areaWebTitle: 'Web development',
  areaWebText:
    'Frontend and backend with HTML, CSS, JavaScript, PHP, Laravel, React and Flask; projects such as Gestor de Inventario and MoodJournal.',
  areaAiTitle: 'Applied AI',
  areaAiText:
    'LSC sign-language translation with a bidirectional LSTM network and drawing classification in Cognia; AWS certifications in Machine Learning for NLP and Generative AI Foundations.',
  areaIotTitle: 'IoT and cloud',
  areaIotText:
    'AWS and Azure IoT Central; telemetry platform with MQTT ingestion, digital twin, rules and alerts.',
  factCareerLabel: 'Systems Engineering',
  factCareerSub: 'UNAB · student since 2023',
  factLanguagesLabel: 'Languages',
  factLanguagesSub: 'Native Spanish · English C1 · Basic Portuguese',
  factCertsLabel: 'Certifications',
  factCertsSub: 'MongoDB, Cisco and AWS Academy (2025)',
  factProjectsLabel: 'Projects',
  factProjectsSub: 'AI, IoT, web and mobile',
  photoAlt: 'Portrait of {name}',
  marqueeTitle: 'Technologies',
};
