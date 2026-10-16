import type { Lang } from '../i18n/types';
import * as enCertifications from './en/certifications';
import * as enNavigation from './en/navigation';
import * as enProfile from './en/profile';
import * as enProjects from './en/projects';
import * as enSkills from './en/skills';
import * as esCertifications from './certifications';
import * as esNavigation from './navigation';
import * as esProfile from './profile';
import * as esProjects from './projects';
import * as esSkills from './skills';

/** PDF del CV por idioma ('' ⇒ no se muestra el botón "Descargar CV"). */
const CV_FILES: Record<Lang, string> = {
  es: '/cv/CV_AndresJoya_ES.pdf',
  en: '/cv/CV_AndresJoya_EN.pdf',
};

type ProfileModule = typeof esProfile;
type ProjectsModule = typeof esProjects;
type SkillsModule = typeof esSkills;
type CertificationsModule = typeof esCertifications;
type NavigationModule = typeof esNavigation;

/** Todo el contenido (no-UI) de un idioma: lo que devuelve `useContent()`. */
export interface Content {
  profile: ProfileModule['profile'];
  contacts: ProfileModule['contacts'];
  languages: ProfileModule['languages'];
  education: ProfileModule['education'];
  siteMetadata: ProfileModule['siteMetadata'];
  projects: ProjectsModule['projects'];
  skillCategories: SkillsModule['skillCategories'];
  skillEvidence: SkillsModule['skillEvidence'];
  certifications: CertificationsModule['certifications'];
  navLinks: NavigationModule['NAV_LINKS'];
  /** URL pública del CV en este idioma, o '' si aún no existe. */
  cvUrl: string;
}

function build(
  lang: Lang,
  p: ProfileModule,
  pr: ProjectsModule,
  s: SkillsModule,
  c: CertificationsModule,
  n: NavigationModule,
): Content {
  return {
    profile: p.profile,
    contacts: p.contacts,
    languages: p.languages,
    education: p.education,
    siteMetadata: p.siteMetadata,
    projects: pr.projects,
    skillCategories: s.skillCategories,
    skillEvidence: s.skillEvidence,
    certifications: c.certifications,
    navLinks: n.NAV_LINKS,
    cvUrl: CV_FILES[lang],
  };
}

export const CONTENT: Record<Lang, Content> = {
  es: build('es', esProfile, esProjects, esSkills, esCertifications, esNavigation),
  en: build('en', enProfile, enProjects, enSkills, enCertifications, enNavigation),
};
