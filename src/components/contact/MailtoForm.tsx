import { useId, useState, type ChangeEvent, type FormEvent } from 'react';
import { useContent, useT, type TranslateFn } from '../../i18n';
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

/** Validación mínima honesta de los tres campos (mensajes por idioma vía `t`). */
function validate(values: FormValues, t: TranslateFn): FormErrors {
  const errors: FormErrors = {};
  if (values.name.trim().length < 2) {
    errors.name = t('contact.nameError');
  }
  if (values.subject.trim().length < 3) {
    errors.subject = t('contact.subjectError');
  }
  if (values.message.trim().length < 10) {
    errors.message = t('contact.messageError');
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
  const t = useT();
  const { profile } = useContent();
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
    const nextErrors = validate(values, t);
    setErrors(nextErrors);
    if (nextErrors.name || nextErrors.subject || nextErrors.message) return;

    // Texto fijo del cuerpo del mailto, traducido según el idioma activo.
    const body = t('contact.mailBody', {
      name: values.name.trim(),
      message: values.message.trim(),
    });
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
            {t('contact.nameLabel')}
          </label>
          <input
            id={`${formId}-name`}
            name="name"
            type="text"
            autoComplete="name"
            placeholder={t('contact.namePlaceholder')}
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
            {t('contact.subjectLabel')}
          </label>
          <input
            id={`${formId}-subject`}
            name="subject"
            type="text"
            autoComplete="off"
            placeholder={t('contact.subjectPlaceholder')}
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
            {t('contact.messageLabel')}
          </label>
          <textarea
            id={`${formId}-message`}
            name="message"
            rows={4}
            placeholder={t('contact.messagePlaceholder')}
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
            {t('contact.submit')}
          </Button>
          <p className="mt-3 text-xs leading-relaxed text-ink-muted">
            {t('contact.privacyNote')}
          </p>
        </div>
      </div>
    </form>
  );
}