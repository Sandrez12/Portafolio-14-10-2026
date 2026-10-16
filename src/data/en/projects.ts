import type { ArchitectureDiagram, Project } from '../../types';
import { projects as esProjects } from '../projects';

/**
 * EN de los proyectos (patrón de `_spec/I18N.md`, sección 2): se parte del ES
 * (fuente de verdad) y se sobrescribe SOLO el texto traducible. Ids, URLs,
 * stacks, cifras, status, tag y teamProject permanecen idénticos.
 */
const text: Record<string, Partial<Project>> = {
  lsc: {
    title: 'LSC – Colombian Sign Language Translator',
    tagline: 'From the recorded sign to the Spanish sentence, with AI.',
    description:
      'Expo/React Native app that records the sign (up to 5 s); a FastAPI API on AWS extracts keypoints with MediaPipe (30 frames), a bidirectional LSTM in PyTorch classifies 41 glosses, and Gemini 2.5 Flash builds the Spanish sentence.',
    highlights: [
      'Classification of 41 glosses with a bidirectional LSTM in PyTorch',
      'Keypoint extraction with MediaPipe over 30 frames',
      '91.84% test accuracy on 490 videos',
      'Spanish sentence generation with Gemini 2.5 Flash',
    ],
    note: 'The original dataset belongs to another author; the contribution is the training pipeline, the backend, and the app.',
    contribution:
      'Individual contribution: training pipeline, backend, and mobile app (the original dataset belongs to another author).',
    nextStep: 'Integrate read-aloud playback of the translated sentence.',
    metrics: [
      { label: 'glosses', value: 41 },
      { label: 'test videos', value: 490 },
      { label: 'test accuracy', value: 91.84, decimals: 2, suffix: '%' },
      { label: 'frames per video', value: 30 },
    ],
  },
  iot: {
    title: 'IoT – Telemetry, Digital Twin, and Alerts Platform',
    tagline: 'MQTT ingestion, digital twin, and alerts on Spring Boot 3.',
    description:
      'Spring Boot 3 + PostgreSQL platform with MQTT ingestion, a digital twin (desired/reported), rules and alerts with severity, commands with ACK, rollups/retention, SSE, and a Chart.js dashboard.',
    highlights: [
      'Digital twin with desired/reported properties and commands with ACK',
      "Rules and alerts module with severity (Andrés's contribution)",
      'Rollups and retention policy for historical data',
      'Real-time dashboard via SSE with Chart.js',
    ],
    note: "Team project (bleon133's repository); Andrés's contribution is the rules and alerts module.",
    contribution: "Team project (bleon133's repository). Contribution: rules and alerts module.",
    nextStep: 'Per-device credentials and security hardening, per the project ROADMAP.',
    metrics: [
      { label: 'Flyway migrations (V1–V9)', value: 9 },
      { label: 'data retention', value: 90, suffix: ' days' },
      { label: 'MQTT QoS', value: 1, prefix: 'level ' },
    ],
  },
  cognia: {
    title: 'Cognia – AI-powered Therapeutic Activities for Children with Autism',
    tagline: 'Five therapeutic modules that adjust difficulty with AI.',
    description:
      'React 19 app with 5 modules (Cognitive, Sensory, Social, Technical, Family), a Node/Express + SQLite backend, and an AI module in FastAPI + Keras that classifies drawings (circle, square, triangle) and adjusts the difficulty.',
    highlights: [
      'Five therapeutic modules: Cognitive, Sensory, Social, Technical, and Family',
      'Drawing classification with FastAPI + Keras',
      'Automatic difficulty adjustment based on the classification',
    ],
    contribution:
      "Team project (zquintero246's repository). The specific contribution within the team is not verified, so it is not claimed here.",
    nextStep: 'Unify the endpoints between the frontend, the backend, and the AI module.',
    metrics: [{ label: 'therapeutic modules', value: 5 }],
  },
  moodjournal: {
    title: 'MoodJournal – Emotional Journal with Sentiment Analysis',
    tagline: 'One entry per day, with sentiment analysis and streaks.',
    description:
      'Emotional journal with one entry per day, sentiment analysis in an Edge Function (Deno), a dashboard with a 7-day chart, streaks via SQL triggers, a light/dark theme, and RLS on every table.',
    highlights: [
      'Sentiment analysis in an Edge Function (Deno)',
      'Dashboard with a 7-day chart and streaks via SQL triggers',
      'Row Level Security on every table',
    ],
    contribution: 'Individual project.',
    nextStep: 'Send the daily reminders as notifications.',
    metrics: [{ label: 'tables with RLS', value: 5 }],
  },
  'gestor-inventario': {
    title: 'Inventory Manager',
    tagline: 'Web inventory system built with Laravel 10.',
    description:
      'Web inventory system in Laravel 10: products, customers, suppliers, entries and exits with automatic stock adjustment and availability validation, soft deletes with a recycle bin, and Jetstream/Fortify authentication.',
    highlights: [
      'Entries and exits with automatic stock adjustment and availability validation',
      'Soft deletes with a recycle bin',
      'Authentication with Jetstream/Fortify',
    ],
    contribution: 'Individual project.',
    nextStep: 'Unify the contact validations and the permanent deletion of entries.',
    metrics: [{ label: 'system modules', value: 5 }],
  },
};

/** Caption y labels EN de cada diagrama, indexados por id de proyecto. */
const architectureText: Record<
  string,
  { caption: string; nodes: Record<string, string>; edges: Record<string, string> }
> = {
  lsc: {
    caption: 'LSC architecture: from the recorded sign to the Spanish sentence',
    nodes: {
      app: 'App Expo · React Native',
      api: 'API FastAPI · AWS EC2',
      mediapipe: 'MediaPipe · keypoints',
      lstm: 'Bidirectional LSTM · PyTorch',
      gemini: 'Gemini 2.5 Flash',
      frase: 'Spanish sentence',
    },
    edges: {
      'app->api': '',
      'api->mediapipe': '30 frames',
      'mediapipe->lstm': '',
      'lstm->gemini': '41 glosses',
      'gemini->frase': '',
    },
  },
  iot: {
    caption: 'IoT architecture: from devices to the dashboard',
    nodes: {
      devices: 'IoT Devices',
      broker: 'MQTT broker',
      ingest: 'Spring Integration · ingestion',
      db: 'PostgreSQL · Flyway',
      rules: 'Rules and alerts',
      twin: 'Digital twin',
      dashboard: 'Chart.js dashboard',
    },
    edges: {
      'devices->broker': 'MQTT',
      'broker->ingest': '',
      'ingest->db': '',
      'db->rules': '',
      'db->twin': '',
      'rules->dashboard': 'SSE',
      'twin->dashboard': 'SSE',
    },
  },
  cognia: {
    caption: 'Cognia architecture: React modules, backend, and AI module',
    nodes: {
      react: 'React 19 · 5 modules',
      node: 'Node / Express',
      sqlite: 'SQLite',
      ia: 'FastAPI + Keras',
      firebase: 'Firebase',
    },
    edges: {
      'react->node': '',
      'node->sqlite': '',
      'react->ia': '',
      'react->firebase': '',
    },
  },
  moodjournal: {
    caption: 'MoodJournal architecture: from the entry to sentiment analysis',
    nodes: {
      react: 'React + TypeScript',
      supabase: 'Supabase · Auth / Postgres',
      edge: 'Edge Function · sentiment',
    },
    edges: {
      'react->supabase': '',
      'supabase->edge': '',
    },
  },
  'gestor-inventario': {
    caption: 'Inventory Manager architecture: from the UI to the database',
    nodes: {
      ui: 'Blade / Livewire',
      controllers: 'Laravel controllers',
      db: 'Eloquent / MySQL',
      auth: 'Jetstream / Fortify',
    },
    edges: {
      'ui->controllers': '',
      'controllers->db': '',
      'auth->controllers': '',
    },
  },
};

function translateArchitecture(
  architecture: ArchitectureDiagram,
  translations: { caption: string; nodes: Record<string, string>; edges: Record<string, string> },
): ArchitectureDiagram {
  return {
    caption: translations.caption,
    nodes: architecture.nodes.map((node) => ({
      ...node,
      label: translations.nodes[node.id] ?? node.label,
    })),
    edges: architecture.edges.map((edge) => {
      const label = translations.edges[`${edge.from}->${edge.to}`];
      return label === undefined || label === '' ? edge : { ...edge, label };
    }),
  };
}

export const projects: Project[] = esProjects.map((project) => ({
  ...project,
  ...text[project.id],
  architecture: translateArchitecture(project.architecture, architectureText[project.id]),
}));
