import { About } from './components/About';
import { BackToTop } from './components/BackToTop';
import { Certifications } from './components/Certifications';
import { Contact } from './components/Contact';
import { CursorGlow } from './components/CursorGlow';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Info } from './components/Info';
import { Marquee } from './components/Marquee';
import { Nav } from './components/Nav';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Stats } from './components/Stats';
import { Container } from './components/ui/Container';
import { Grain } from './components/ui/Grain';
import { SectionDivider } from './components/ui/SectionDivider';

/**
 * Layout base V2 (ver `_spec/V2_BRIEF.md`): sin contenedor único; cada
 * sección controla su ancho. Hero/Skills/Marquee/dividers son full-bleed y
 * el resto se envuelve en `Container` (max-w 1240px, px-5 sm:px-8).
 *
 * Los `id` de los wrappers coinciden con `src/data/navigation.ts`
 * (scroll-spy del Nav) y `scroll-mt-24` compensa la barra sticky.
 *
 * NOTA sobre Hero y Skills: sus wrappers conservan `px-4 sm:px-6` para que
 * los márgenes negativos de V1 (sangrados del Hero y banda full-bleed de
 * Skills con `calc(50% - 50vw)`) sigan cuadrando EXACTAMENTE con los bordes
 * de la ventana, sin scroll horizontal. Cuando se rediseñen en V2 pueden
 * cambiar a la técnica que prefieran manteniendo esa garantía.
 */
export default function App() {
  return (
    <div className="min-h-screen bg-bg font-sans text-ink">
      <a href="#main" className="skip-link">
        Saltar al contenido principal
      </a>
      <Nav />
      <CursorGlow />
      <main id="main">
        <div id="inicio" className="scroll-mt-24">
          <Hero />
        </div>
        <Marquee />
        <div id="sobre-mi" className="scroll-mt-24">
          <Container>
            <About />
          </Container>
        </div>
        <Stats />
        <SectionDivider variant="wave" />
        <div id="trayectoria" className="scroll-mt-24">
          <Container>
            <Info />
          </Container>
        </div>
        <div id="skills" className="scroll-mt-24 px-4 sm:px-6">
          <Skills />
        </div>
        <SectionDivider variant="ribbons" />
        <div id="proyectos" className="scroll-mt-24">
          <Container>
            <Projects />
          </Container>
        </div>
        <SectionDivider variant="wave" />
        <div id="certificaciones" className="scroll-mt-24">
          <Container>
            <Certifications />
          </Container>
        </div>
        <SectionDivider variant="drip" />
        <div id="contacto" className="scroll-mt-24">
          <Contact />
        </div>
      </main>
      <Container>
        <Footer />
      </Container>
      <BackToTop />
      <Grain />
    </div>
  );
}

