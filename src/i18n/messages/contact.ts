/**
 * Mensajes de UI del área "contact". Claves SIN prefijo (el prefijo "contact." se
 * añade en `messages/index.ts`). `en` debe tener EXACTAMENTE las mismas
 * claves que `es` (lo exige el tipo).
 */
export const es = {
  eyebrow: 'Contacto',
  title: '¿Hablamos?',
  intro:
    '¿Tienes una idea, un proyecto o una pregunta? Escríbeme por cualquiera de estos canales: la conversación empieza con un correo.',
  formTitle: 'Escribe desde aquí',
  formSubtitle: 'Completa los campos y abre un borrador en tu cliente de correo.',
  channelsTitle: 'Canales directos',
  downloadCv: 'Descargar CV',
  copyButtonAriaLabel: 'Copiar correo electrónico',
  copyButton: 'Copiar correo',
  copiedButton: '¡Copiado!',
  copiedStatus: 'Correo copiado',
  selectedStatus:
    'No se pudo copiar automáticamente: correo seleccionado, usa Ctrl+C para copiarlo',
  nameLabel: 'Nombre',
  namePlaceholder: 'Tu nombre',
  nameError: 'Escribe tu nombre (al menos 2 caracteres).',
  subjectLabel: 'Asunto',
  subjectPlaceholder: 'De qué quieres hablar',
  subjectError: 'Escribe un asunto (al menos 3 caracteres).',
  messageLabel: 'Mensaje',
  messagePlaceholder: 'Cuéntame tu idea, proyecto o pregunta',
  messageError: 'Escribe tu mensaje (al menos 10 caracteres).',
  submit: 'Abrir en mi correo',
  privacyNote: 'Se abrirá tu cliente de correo; no se envía ningún dato a servidores.',
  mailBody: 'Hola Andrés, soy {name}:\n\n{message}',
} as const;

export const en: Record<keyof typeof es, string> = {
  eyebrow: 'Contact',
  title: "Let's talk?",
  intro:
    'Got an idea, a project, or a question? Write to me through any of these channels: the conversation starts with an email.',
  formTitle: 'Write from here',
  formSubtitle: 'Fill in the fields and open a draft in your email client.',
  channelsTitle: 'Direct channels',
  downloadCv: 'Download CV',
  copyButtonAriaLabel: 'Copy email address',
  copyButton: 'Copy email',
  copiedButton: 'Copied!',
  copiedStatus: 'Email copied',
  selectedStatus: 'Could not copy automatically: email selected, use Ctrl+C to copy it',
  nameLabel: 'Name',
  namePlaceholder: 'Your name',
  nameError: 'Enter your name (at least 2 characters).',
  subjectLabel: 'Subject',
  subjectPlaceholder: 'What you want to talk about',
  subjectError: 'Enter a subject (at least 3 characters).',
  messageLabel: 'Message',
  messagePlaceholder: 'Tell me your idea, project, or question',
  messageError: 'Enter your message (at least 10 characters).',
  submit: 'Open in my email',
  privacyNote: 'Your email client will open; no data is sent to any servers.',
  mailBody: "Hi Andrés, I'm {name}:\n\n{message}",
};
