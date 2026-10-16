import { useId, useState, type ChangeEvent, type FormEvent } from 'react';
import { profile } from '../../data/profile';
import { Button } from '../ui/Button';

/** Valores controlados del mini-formulario generador de mailto. */
interface FormValues {
  name: string;
  subject: string;
  message: string;
}

/** Errores por campo (se asocian con `aria-describedby`). */
type FormErrors = Partial<Record<keyof FormValues, string>>;

const EMPTY_VALUES: FormValues = { name: '', subject: '', message: '' };

const LABEL_CLASSES = 'mb-1.5 block text-sm font-medium text-ink';

const FIELD_CLASSES =
  'min-h-[44px] w-full rounded-lg bg-bg px-4 py-2.5 text-base text-ink placeholder:text-ink-muted/60 ring-1 ring-inset ring-teal transition-colors focus:ring-accent';

const ERROR_CLASSES = 'mt-1.5 text-sm text-accent';

/** Validación mínima honesta de los tres campos. */
function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (values.name.trim().length < 2) {
    errors.name = 'Escribe tu nombre (al menos 2 caracteres).';
  }
  if (values.subject.trim().length < 3) {
    errors.subject = 'Escribe un asunto (al menos 3 caracteres).';
  }
  if (values.message.trim().length < 10) {
    errors.message = 'Escribe tu mensaje (al menos 10 caracteres).';
  }
  return errors;
}

/**
 * Mini-formulario generador de mailto: labels visibles, validación con
 * errores asociados vía `aria-describedby` (y `role="alert"`), y botón
 * "Abrir en mi correo" que construye `mailto:${profile.email}?subject=…&body=…`
 * con `encodeURIComponent`. No se envía nada a servidores: se abre el
 * cliente de correo del visitante.
 */
export function MailtoForm() {
  const formId = useId();
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange =
    (field: keyof FormValues) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = event.target;
      setValues((prev) => {
        if (field === 'name') return { ...prev, name: value };
        if (field === 'subject') return { ...prev, subject: value };
        return { ...prev, message: value };
      });
      // Limpia el error del campo en cuanto se corrige.
      setErrors((prev) => {
        if (!prev[field]) return prev;
        const next = { ...prev };
        delete next[field];
        return next;
      });
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (nextErrors.name || nextErrors.subject || nextErrors.message) return;

    const body = `Hola Andrés, soy ${values.name.trim()}:\n\n${values.message.trim()}`;
    const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(
      values.subject.trim(),
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid gap-5">
        <div>
          <label htmlFor={`${formId}-name`} className={LABEL_CLASSES}>
            Nombre
          </label>
          <input
            id={`${formId}-name`}
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Tu nombre"
            value={values.name}
            onChange={handleChange('name')}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? `${formId}-name-error` : undefined}
            className={FIELD_CLASSES}
          />
          {errors.name ? (
            <p id={`${formId}-name-error`} role="alert" className={ERROR_CLASSES}>
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={`${formId}-subject`} className={LABEL_CLASSES}>
            Asunto
          </label>
          <input
            id={`${formId}-subject`}
            name="subject"
            type="text"
            autoComplete="off"
            placeholder="De qué quieres hablar"
            value={values.subject}
            onChange={handleChange('subject')}
            aria-invalid={errors.subject ? true : undefined}
            aria-describedby={errors.subject ? `${formId}-subject-error` : undefined}
            className={FIELD_CLASSES}
          />
          {errors.subject ? (
            <p id={`${formId}-subject-error`} role="alert" className={ERROR_CLASSES}>
              {errors.subject}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={`${formId}-message`} className={LABEL_CLASSES}>
            Mensaje
          </label>
          <textarea
            id={`${formId}-message`}
            name="message"
            rows={4}
            placeholder="Cuéntame tu idea, proyecto o pregunta"
            value={values.message}
            onChange={handleChange('message')}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? `${formId}-message-error` : undefined}
            className={`${FIELD_CLASSES} min-h-[120px] resize-y`}
          />
          {errors.message ? (
            <p id={`${formId}-message-error`} role="alert" className={ERROR_CLASSES}>
              {errors.message}
            </p>
          ) : null}
        </div>

        <div>
          <Button type="submit" variant="primary" className="w-full sm:w-auto">
            Abrir en mi correo
          </Button>
          <p className="mt-3 text-xs leading-relaxed text-ink-muted">
            Se abrirá tu cliente de correo; no se envía ningún dato a servidores.
          </p>
        </div>
      </div>
    </form>
  );
}