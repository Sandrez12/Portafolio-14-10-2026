import type { Project } from '../types';

/**
 * Proyectos (datos verificados leyendo el código de cada repo, ver
 * `_spec/BRIEF.md`). Nada inventado: si un dato no consta, se omite o se
 * declara con transparencia (p. ej. el aporte específico en Cognia).
 *
 * El orden del array fija la numeración 01–05; el primero (LSC) es el
 * proyecto destacado de la sección.
 */
export const projects: Project[] = [
  {
    id: 'lsc',
    title: 'LSC – Traductor de Lengua de Señas Colombiana',
    tagline: 'De la seña grabada a la frase en español, con IA.',
    description:
      'App Expo/React Native que graba la seña (hasta 5 s); una API FastAPI en AWS extrae los keypoints con MediaPipe (30 frames), una LSTM bidireccional en PyTorch clasifica 41 glosas y Gemini 2.5 Flash arma la frase en español.',
    highlights: [
      'Clasificación de 41 glosas con LSTM bidireccional en PyTorch',
      'Extracción de keypoints con MediaPipe sobre 30 frames',
      '91.84 % de accuracy de test en 490 videos',
      'Generación de la frase en español con Gemini 2.5 Flash',
    ],
    stack: [
      'Python',
      'PyTorch',
      'MediaPipe',
      'FastAPI',
      'Gemini',
      'React Native',
      'Expo',
      'TypeScript',
      'AWS EC2',
    ],
    status: 'completo',
    repoUrl: 'https://github.com/Sandrez12/LSC',
    tag: 'IA',
    teamProject: false,
    note: 'El dataset original es de otro autor; el aporte es el pipeline de entrenamiento, el backend y la app.',
    contribution:
      'Aporte individual: pipeline de entrenamiento, backend y app móvil (el dataset original es de otro autor).',
    nextStep: 'Integrar la lectura en voz alta de la frase traducida.',
    metrics: [
      { label: 'glosas', value: 41 },
      { label: 'videos de test', value: 490 },
      { label: 'accuracy de test', value: 91.84, decimals: 2, suffix: '%' },
      { label: 'frames por video', value: 30 },
    ],
    architecture: {
      caption: 'Arquitectura de LSC: de la seña grabada a la frase en español',
      nodes: [
        { id: 'app', label: 'App Expo · React Native', kind: 'app' },
        { id: 'api', label: 'API FastAPI · AWS EC2', kind: 'api' },
        { id: 'mediapipe', label: 'MediaPipe · keypoints', kind: 'ml' },
        { id: 'lstm', label: 'LSTM bidireccional · PyTorch', kind: 'ml' },
        { id: 'gemini', label: 'Gemini 2.5 Flash', kind: 'cloud' },
        { id: 'frase', label: 'Frase en español', kind: 'output' },
      ],
      edges: [
        { from: 'app', to: 'api' },
        { from: 'api', to: 'mediapipe', label: '30 frames' },
        { from: 'mediapipe', to: 'lstm' },
        { from: 'lstm', to: 'gemini', label: '41 glosas' },
        { from: 'gemini', to: 'frase' },
      ],
    },
  },
  {
    id: 'iot',
    title: 'IoT – Plataforma de telemetría, gemelo digital y alertas',
    tagline: 'Ingesta MQTT, gemelo digital y alertas sobre Spring Boot 3.',
    description:
      'Plataforma Spring Boot 3 + PostgreSQL con ingesta MQTT, gemelo digital (desired/reported), reglas y alertas con severidad, comandos con ACK, rollups/retención, SSE y dashboard con Chart.js.',
    highlights: [
      'Gemelo digital con propiedades desired/reported y comandos con ACK',
      'Módulo de reglas y alertas con severidad (aporte de Andrés)',
      'Rollups y política de retención de datos históricos',
      'Dashboard en tiempo real vía SSE con Chart.js',
    ],
    stack: [
      'Java 21',
      'Spring Boot',
      'Spring Integration',
      'MQTT',
      'PostgreSQL',
      'Flyway',
      'Thymeleaf',
      'Chart.js',
    ],
    status: 'parcial',
    repoUrl: 'https://github.com/bleon133/iotParcial2',
    tag: 'IoT',
    teamProject: true,
    note: 'Proyecto en equipo (repositorio de bleon133); el aporte de Andrés es el módulo de reglas y alertas.',
    contribution:
      'Proyecto en equipo (repositorio de bleon133). Aporte: módulo de reglas y alertas.',
    nextStep:
      'Credenciales por dispositivo y refuerzo de seguridad, según el ROADMAP del proyecto.',
    metrics: [
      { label: 'migraciones Flyway (V1–V9)', value: 9 },
      { label: 'retención de datos', value: 90, suffix: ' días' },
      { label: 'QoS MQTT', value: 1, prefix: 'nivel ' },
    ],
    architecture: {
      caption: 'Arquitectura IoT: de los dispositivos al dashboard',
      nodes: [
        { id: 'devices', label: 'Dispositivos IoT', kind: 'device' },
        { id: 'broker', label: 'MQTT broker', kind: 'broker' },
        { id: 'ingest', label: 'Spring Integration · ingesta', kind: 'api' },
        { id: 'db', label: 'PostgreSQL · Flyway', kind: 'db' },
        { id: 'rules', label: 'Reglas y alertas', kind: 'rules' },
        { id: 'twin', label: 'Gemelo digital', kind: 'twin' },
        { id: 'dashboard', label: 'Dashboard Chart.js', kind: 'dashboard' },
      ],
      edges: [
        { from: 'devices', to: 'broker', label: 'MQTT' },
        { from: 'broker', to: 'ingest' },
        { from: 'ingest', to: 'db' },
        { from: 'db', to: 'rules' },
        { from: 'db', to: 'twin' },
        { from: 'rules', to: 'dashboard', label: 'SSE' },
        { from: 'twin', to: 'dashboard', label: 'SSE' },
      ],
    },
  },
  {
    id: 'cognia',
    title: 'Cognia – Actividades terapéuticas con IA para niños con autismo',
    tagline: 'Cinco módulos terapéuticos que ajustan dificultad con IA.',
    description:
      'App React 19 con 5 módulos (Cognitivo, Sensorial, Social, Técnico, Familiar), backend Node/Express + SQLite y un módulo de IA en FastAPI + Keras que clasifica dibujos (círculo, cuadrado, triángulo) y ajusta la dificultad.',
    highlights: [
      'Cinco módulos terapéuticos: Cognitivo, Sensorial, Social, Técnico y Familiar',
      'Clasificación de dibujos con FastAPI + Keras',
      'Ajuste automático de dificultad según la clasificación',
    ],
    stack: [
      'React',
      'Chakra UI',
      'Node',
      'Express',
      'SQLite',
      'Firebase',
      'Python',
      'FastAPI',
      'TensorFlow/Keras',
    ],
    status: 'prototipo',
    repoUrl: 'https://github.com/zquintero246/Cognia',
    tag: 'IA',
    teamProject: true,
    contribution:
      'Proyecto en equipo (repositorio de zquintero246). El aporte específico dentro del equipo no consta verificado, así que no lo afirmo.',
    nextStep: 'Unificar los endpoints entre el frontend, el backend y el módulo de IA.',
    metrics: [{ label: 'módulos terapéuticos', value: 5 }],
    architecture: {
      caption: 'Arquitectura de Cognia: módulos React, backend y módulo de IA',
      nodes: [
        { id: 'react', label: 'React 19 · 5 módulos', kind: 'app' },
        { id: 'node', label: 'Node / Express', kind: 'api' },
        { id: 'sqlite', label: 'SQLite', kind: 'db' },
        { id: 'ia', label: 'FastAPI + Keras', kind: 'ml' },
        { id: 'firebase', label: 'Firebase', kind: 'cloud' },
      ],
      edges: [
        { from: 'react', to: 'node' },
        { from: 'node', to: 'sqlite' },
        { from: 'react', to: 'ia' },
        { from: 'react', to: 'firebase' },
      ],
    },
  },
  {
    id: 'moodjournal',
    title: 'MoodJournal – Diario emocional con análisis de sentimiento',
    tagline: 'Una entrada al día, con análisis de sentimiento y rachas.',
    description:
      'Diario emocional con una entrada por día, análisis de sentimiento en una Edge Function (Deno), dashboard con gráfico de 7 días, rachas por trigger SQL, tema claro/oscuro y RLS en todas las tablas.',
    highlights: [
      'Análisis de sentimiento en Edge Function (Deno)',
      'Dashboard con gráfico de 7 días y rachas por trigger SQL',
      'Row Level Security en todas las tablas',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind', 'Supabase'],
    status: 'parcial',
    repoUrl: 'https://github.com/Sandrez12/MoodJournal',
    tag: 'Web',
    teamProject: false,
    contribution: 'Proyecto individual.',
    nextStep: 'Enviar los recordatorios diarios como notificaciones.',
    metrics: [{ label: 'tablas con RLS', value: 5 }],
    architecture: {
      caption: 'Arquitectura de MoodJournal: de la entrada al análisis de sentimiento',
      nodes: [
        { id: 'react', label: 'React + TypeScript', kind: 'app' },
        { id: 'supabase', label: 'Supabase · Auth / Postgres', kind: 'db' },
        { id: 'edge', label: 'Edge Function · sentimiento', kind: 'edge' },
      ],
      edges: [
        { from: 'react', to: 'supabase' },
        { from: 'supabase', to: 'edge' },
      ],
    },
  },
  {
    id: 'gestor-inventario',
    title: 'Gestor de Inventario',
    tagline: 'Sistema web de inventario con Laravel 10.',
    description:
      'Sistema web de inventario en Laravel 10: productos, clientes, proveedores, entradas y salidas con ajuste automático de stock y validación de disponibilidad, soft deletes con papelera y autenticación Jetstream/Fortify.',
    highlights: [
      'Entradas y salidas con ajuste automático de stock y validación de disponibilidad',
      'Soft deletes con papelera de reciclaje',
      'Autenticación con Jetstream/Fortify',
    ],
    stack: ['PHP', 'Laravel', 'Livewire', 'Tailwind', 'MySQL'],
    status: 'parcial',
    repoUrl: 'https://github.com/Sandrez12/Gestor-de-Inventario',
    tag: 'Web',
    teamProject: false,
    contribution: 'Proyecto individual.',
    nextStep: 'Unificar las validaciones de contacto y el borrado permanente de entradas.',
    metrics: [{ label: 'módulos del sistema', value: 5 }],
    architecture: {
      caption: 'Arquitectura del Gestor de Inventario: de la UI a la base de datos',
      nodes: [
        { id: 'ui', label: 'Blade / Livewire', kind: 'app' },
        { id: 'controllers', label: 'Controladores Laravel', kind: 'api' },
        { id: 'db', label: 'Eloquent / MySQL', kind: 'db' },
        { id: 'auth', label: 'Jetstream / Fortify', kind: 'auth' },
      ],
      edges: [
        { from: 'ui', to: 'controllers' },
        { from: 'controllers', to: 'db' },
        { from: 'auth', to: 'controllers' },
      ],
    },
  },
];
