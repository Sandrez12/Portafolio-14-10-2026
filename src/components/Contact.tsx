import { motion, useReducedMotion } from 'framer-motion';
import { CV_URL } from '../data/profile';
import { ContactChannels } from './contact/ContactChannels';
import { EmailCta } from './contact/EmailCta';
import { InkBackdrop } from './contact/InkBackdrop';
import { MailtoForm } from './contact/MailtoForm';
import { Button } from './ui/Button';
import { Reveal } from './ui/Reveal';
import { EASE } from './ui/motion';

/**
 * Sección "contacto" V2 (full-bleed sobre fondo con formas de tinta SVG
 * propias): título ENORME en font-display con entrada animada, correo
 * gigante como enlace mailto con botón "Copiar correo", mini-formulario
 * generador de mailto, tarjetas grandes de contacto/redes y botón
 * "Descargar CV" SÓLO si `CV_URL !== ''` (la dirección física NO se publica,
 * ver `_spec/V2_BRIEF.md`). Reduced-motion: entradas estáticas.
 */
export function Contact() {
  const prefersReducedMotion = useReducedMotion() ?? false;

  return (
    <section
      aria-labelledby="contacto-title"
      className="relative overflow-hidden bg-bg py-16 sm:py-24 lg:py-28"
    >
      <InkBackdrop />

      <div className="relative mx-auto w-full max-w-container px-5 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Contacto</p>

        <motion.h2
          id="contacto-title"
          className="mt-4 font-display leading-[0.95] text-ink"
          style={{ fontSize: 'clamp(3.5rem, 12vw, 9rem)' }}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 64 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          ¿Hablamos?
        </motion.h2>

        <Reveal delay={0.15}>
          <p className="mt-6 max-w-prose text-lg leading-relaxed text-ink-muted">
            ¿Tienes una idea, un proyecto o una pregunta? Escríbeme por cualquiera de estos
            canales: la conversación empieza con un correo.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-10 lg:mt-14">
            <EmailCta />
          </div>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[minmax(0,11fr)_minmax(0,9fr)] lg:gap-14">
          <Reveal delay={0.1}>
            <div className="rounded-2xl bg-panel p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-ink">Escribe desde aquí</h3>
              <p className="mt-1.5 text-sm text-ink-muted">
                Completa los campos y abre un borrador en tu cliente de correo.
              </p>
              <div className="mt-6">
                <MailtoForm />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div>
              <h3 className="text-lg font-semibold text-ink">Canales directos</h3>
              <div className="mt-4">
                <ContactChannels />
              </div>
            </div>
          </Reveal>
        </div>

        {CV_URL !== '' ? (
          <Reveal delay={0.25} className="mt-10">
            <Button href={CV_URL} variant="primary">
              Descargar CV
            </Button>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
