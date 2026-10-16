import type { ContactItem } from '../../types';
import { Stagger, StaggerItem } from '../ui/Stagger';
import { ContactIcon } from './icons';

interface ContactListProps {
  contacts: ContactItem[];
}

/**
 * Tarjeta de contactos V2: filas más grandes con icono en círculo accent de
 * 44px (≥ target táctil) colgado en el gutter a la izquierda de la tarjeta
 * en desktop y dentro de la fila en móvil, con entrada escalonada al entrar
 * al viewport. Los enlaces siguen siendo accesibles (`aria-label`, `rel`,
 * `target` en externos). Sin sombras (tokens de la referencia).
 */
export function ContactList({ contacts }: ContactListProps) {
  return (
    // Gutter reservado (64px) donde cuelgan los iconos fuera de la tarjeta.
    <div className="lg:pl-16">
      <Stagger as="ul" className="rounded-2xl bg-panel px-5 py-1 lg:px-6 lg:py-2" delay={0.05}>
        {contacts.map((contact) => {
          const isExternal = contact.href.startsWith('http');
          return (
            <StaggerItem
              as="li"
              key={contact.id}
              className="relative flex min-h-[64px] items-center gap-4 lg:gap-0"
            >
              <span
                aria-hidden="true"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-ink lg:absolute lg:-left-[4.25rem] lg:top-1/2 lg:-translate-y-1/2"
              >
                <ContactIcon id={contact.id} className="h-6 w-6" />
              </span>
              <a
                href={contact.href}
                aria-label={`${contact.label}: ${contact.value}`}
                {...(isExternal
                  ? { target: '_blank', rel: 'noreferrer noopener' }
                  : { rel: 'noreferrer' })}
                className="min-w-0 flex-1 truncate text-base font-medium text-ink transition-colors hover:text-ink-muted hover:underline hover:decoration-accent hover:underline-offset-4 lg:text-lg"
              >
                {contact.value}
              </a>
            </StaggerItem>
          );
        })}
      </Stagger>
    </div>
  );
}
