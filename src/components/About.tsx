import { profile } from '../data/profile';
import { HighlightedSummary } from './about/HighlightedSummary';
import { PhotoFrame } from './about/PhotoFrame';
import { QuickFacts } from './about/QuickFacts';
import { SoftSkillChips } from './about/SoftSkillChips';
import { WhatIDo } from './about/WhatIDo';
import { Reveal } from './ui/Reveal';
import { SectionHeading } from './ui/SectionHeading';

/**
 * "¿quién soy?" V2: encabezado estándar (`SectionHeading`) + layout grande de
 * dos columnas (foto ~420px con marco entintado y resumen del perfil en
 * tipografía grande con las palabras clave resaltadas en accent, sin alterar
 * el texto del CV). Debajo: "datos rápidos" (4 tarjetas panel con
 * AnimatedNumber/iconos), "Qué hago" (4 tarjetas con iconos propios) y las
 * habilidades blandas del CV como chips en stagger. Todo respeta
 * prefers-reduced-motion (Reveal/Stagger/AnimatedNumber/TiltCard).
 */
export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative mt-16 sm:mt-20 lg:mt-24">
      <SectionHeading
        id="about-title"
        eyebrow="Perfil"
        title="¿quién soy?"
        subtitle="Estudiante de Ingeniería de Sistemas, responsable y ordenado, con curiosidad y deseo constante de aprender."
      />

      {/* Columna grande: foto entintada + resumen en tipografía grande. */}
      <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-14">
        <PhotoFrame />
        <Reveal delay={0.15} className="flex-1 lg:pt-6">
          <p className="text-balance text-lg leading-relaxed text-ink-muted sm:text-xl">
            <HighlightedSummary text={profile.summary} />
          </p>
        </Reveal>
      </div>

      <div className="mt-12 sm:mt-14">
        <QuickFacts />
      </div>

      <div className="mt-14 sm:mt-16">
        <WhatIDo />
      </div>

      <div className="mt-14 sm:mt-16">
        <SoftSkillChips />
      </div>
    </section>
  );
}
