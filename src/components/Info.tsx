import { contacts, education, languages } from '../data/profile';
import { Reveal } from './ui/Reveal';
import { SectionHeading } from './ui/SectionHeading';
import { ContactList } from './info/ContactList';
import { EducationTimeline } from './info/EducationTimeline';
import { LanguageBars } from './info/LanguageBars';

/** Título de tarjeta (Contacto / Idiomas), Montserrat 600. */
const PANEL_TITLE_CLASS = 'text-lg font-semibold text-ink';

/**
 * Sección "trayectoria" V2: línea de tiempo VERTICAL grande (línea central
 * que se dibuja con el scroll, nodos que se activan al entrar y tarjetas
 * alternadas) seguida de las tarjetas de contactos e idiomas (paneles
 * #102E2E sin sombra con gutter colgante en desktop, ver `_spec/BRIEF.md`).
 */
export function Info() {
  return (
    <section
      aria-labelledby="trayectoria-title contacts-title languages-title"
      className="py-16 sm:py-20 lg:py-24"
    >
      <SectionHeading
        id="trayectoria-title"
        eyebrow="educación y experiencia"
        title="trayectoria"
        subtitle="Formación académica y experiencias que han marcado mi camino."
      />

      <div className="mt-12 lg:mt-16">
        <EducationTimeline education={education} />
      </div>

      <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-8 lg:mt-16">
        <Reveal delay={0.05}>
          <h3 id="contacts-title" className={PANEL_TITLE_CLASS}>
            Contacto
          </h3>
          <div className="mt-4">
            <ContactList contacts={contacts} />
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <h3 id="languages-title" className={PANEL_TITLE_CLASS}>
            Idiomas
          </h3>
          <div className="mt-4">
            <LanguageBars languages={languages} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
