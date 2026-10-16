import { useContent } from '../../i18n';
import { ContactIcon } from '../info/icons';
import { TiltCard } from '../ui/TiltCard';

/**
 * Tarjetas grandes de contacto/redes (Email, Teléfono, GitHub, LinkedIn,
 * desde `src/data/profile.ts`): inclinación 3D suave al pasar el puntero
 * (`TiltCard`, sólo desktop sin reduced-motion; estáticas en cualquier otro
 * caso) y enlaces accesibles con `aria-label`. Sin sombras (tokens).
 */
export function ContactChannels() {
  const { contacts } = useContent();

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
      {contacts.map((contact) => {
        const isExternal = contact.href.startsWith('http');
        return (
          <li key={contact.id}>
            <TiltCard className="h-full">
              <a
                href={contact.href}
                aria-label={`${contact.label}: ${contact.value}`}
                {...(isExternal
                  ? { target: '_blank', rel: 'noreferrer noopener' }
                  : { rel: 'noreferrer' })}
                className="flex h-full min-h-[96px] items-center gap-4 rounded-2xl bg-panel p-5 transition-colors hover:bg-[#143434]"
              >
                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-ink"
                >
                  <ContactIcon id={contact.id} className="h-6 w-6" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">
                    {contact.label}
                  </span>
                  <span className="mt-1 block truncate text-base font-medium text-ink">
                    {contact.value}
                  </span>
                </span>
              </a>
            </TiltCard>
          </li>
        );
      })}
    </ul>
  );
}